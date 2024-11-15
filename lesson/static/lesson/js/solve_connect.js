
let connectSockets = {};
let currentConnections = 0;

let solveLevel = [0, 0];
let lessonComplete = false;
let incorrectCount = 0;
let lessonProgressLevel = 0;
let longtextDict = {};
let sectionTracklist = [];
let totalWorkTime = 0;
let interestBoolean = false;

let timerInterval = '';
let repeatTracklist = ['', []];
let resizeOn = true;
let currentMatchFunction = '';
let lessonRetry = [];
let sessionWorkTime = 0;
let sessionInterval = '';
let restartCurrent = false;
let setFunctionWaiting = false;
let listenerList = [];
let logCheckCount = 0;
let explainCount = 0;

function classroomDisconnect() {
    const tempConnectSockets = connectSockets;
    connectSockets = {};
    for (const socketCouplet in tempConnectSockets) {
        const connectSocket = tempConnectSockets[socketCouplet][0];
        if (connectSocket.readyState !== WebSocket.CLOSED && connectSocket.readyState !== WebSocket.CLOSING) {
            connectSocket.close();
        }
    }
}

function connectConnectSocket(classcode) {
    const wsScheme = window.location.protocol === "https:" ? "wss" : "ws";
    const connectSocket = new WebSocket(wsScheme + '://' + window.location.host + '/ws/' + classcode + '/');
    connectSockets[classcode] = [connectSocket, 'all'];
    let onopenSentS = false;
    connectSocket.onopen = function() {
        if (!(onopenSentS)) {
            onopenSentS = true;
            const teacherChannel = connectSockets[classcode][1];
            dataSend('attendanceData', userId, teacherChannel, this);
            currentConnections += 1;
        }
    }
    connectSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        const allData = data.allData;
        const dataType = allData['dataType'];
        const sendData = allData['sendData'];
        const sendOrigin = allData['sendOrigin'];
        if (dataType === 'statusData') {
            if (Object.keys(connectSockets).includes(classcode)) {
                if (connectSockets[classcode][1] === 'all') {
                    connectSockets[classcode][1] = sendOrigin;
                } else {
                    connectSockets[classcode][1] = 'all';
                }
                if (sendData === 'open') {
                    dataSend('attendanceData', userId, sendOrigin, this);
                } else if (sendData === 'remove') {
                    delete enrolledDict[classcode];
                    dataSend('attendanceData', 'remove-confirm', sendOrigin, this);
                    if (connectSocket.readyState !== WebSocket.CLOSING) {
                        connectSocket.close();
                    }
                } else if (sendData[0] === 'change_classcode'){
                    const newClasscode = sendData[2];
                    const classname = enrolledDict[classcode]['name'];
                    delete enrolledDict[classcode];
                    enrolledDict[newClasscode] = {'name': classname, 'teachers': []};
                    if (connectSocket.readyState !== WebSocket.CLOSING) {
                        connectSocket.close();
                    }
                }
            }
        }
    }
    connectSocket.onclose = function() {
        delete connectSockets[classcode];
        currentConnections -= 1;
    }
}

function classroomConnect() {
    for (const classcode in enrolledDict) {
        connectConnectSocket(classcode);
    }
}

function liveUpdate() {
    for (const socketCouplet in connectSockets) {
        const connectSocket = connectSockets[socketCouplet][0];
        const teacherChannel = connectSockets[socketCouplet][1];
        const classcode = socketCouplet;
        if (connectSocket.readyState !== WebSocket.CLOSING) {
            const studentInfo = {
                                'cased_username': casedUsername,
                                'user_id': userId,
                                'progress_dict': progressDict,
                            }
            dataSend('progressData', [usertype, classcode, studentInfo], teacherChannel, connectSocket);
        }
    }
}

function waitForConnections() {
    return new Promise((resolve) => {
        count = 0;
        const tempInterval = setInterval(function() {
            if ((currentConnections === Object.keys(enrolledDict).length) || (count > 100)) {
                clearInterval(tempInterval);
                resolve();
            };
            count += 1;
        }, 100);
    });
}

function solveSaveSuccessFunction(message) {
    if (message === 'request_refresh') {
        if (requestRefreshCount < 2) {
            flashAlert('You are further ahead on another device. Please refresh this page before continuing.');
            requestRefreshCount += 1;
            sessionStorage.setItem('requestRefreshCount', requestRefreshCount);
            restartCurrent = true;
        }
    }
}

function solveSave(lessonName, sendLiveUpdate=true) {
    if (lessonName === currentLesson) {
        if (lessonName in progressDict) {
            const newInfo = {
                            'solveLevel': solveLevel,
                            'incorrectCount': incorrectCount,
                            'lessonProgressLevel': lessonProgressLevel,
                            'longtextDict': longtextDict,
                            'sectionTracklist': sectionTracklist,
                            'lessonComplete': lessonComplete,
                            'totalWorkTime': totalWorkTime,
                            'interestBoolean': interestBoolean,
                        }
            progressDict[lessonName] = newInfo;
            const nowChange = [lessonName, solveLevel, restartCurrent];
            axiosPost('cd7bea60ca9c3ca7836c5b49fc0035a3/',
                    JSON.stringify({progress_dict: progressDict, now_change: nowChange}),
                    successFunction=solveSaveSuccessFunction
            );
            restartCurrent = false;

            if (sendLiveUpdate) {
                if (currentConnections !== Object.keys(enrolledDict).length) {
                    classroomDisconnect();
                    classroomConnect();
                    waitForConnections()
                    .then(function() {
                        liveUpdate();
                    });
                } else {
                    liveUpdate();
                }
            }
        }
    }
}

function updateActivity(activityBoolean) {
    function sendActivityUpdate() {
        for (const socketCouplet in connectSockets) {
            const connectSocket = connectSockets[socketCouplet][0];
            const teacherChannel = connectSockets[socketCouplet][1];
            const classcode = socketCouplet;
            if (connectSocket.readyState !== WebSocket.CLOSING) {
                dataSend('activeData', [userId, activityBoolean, classcode], teacherChannel, connectSocket);
            }
        }
    }
    if (currentConnections !== Object.keys(enrolledDict).length) {
        waitForConnections()
        .then(function() {
            sendActivityUpdate();
        });
    } else {
        sendActivityUpdate();
    }
}

function genSetFunction(save=true, animation=true) {
    if (animation) {
        solveAnimation();
        setTimeout(function() {
            currentSetFunction(save=save);
        }, 200);
    } else {
        currentSetFunction(save=save);
    }
}

function startLesson(lessonName, setFunction) {
    if (progressDict[lessonName] === undefined) {
        progressDict[lessonName] = {
                    'solveLevel': [0, 0],
                    'incorrectCount': 0,
                    'lessonProgressLevel': 0,
                    'longtextDict': {},
                    'sectionTracklist': [],
                    'lessonComplete': false,
                    'totalWorkTime': 0,
                    'interestBoolean': false,
                }
    }
    solveLevel = progressDict[lessonName]['solveLevel'];
    if (solveLevel === undefined) {
        solveLevel = [0, 0];
    }
    incorrectCount = progressDict[lessonName]['incorrectCount'];
    if (incorrectCount === undefined) {
        incorrectCount = 0;
    }
    lessonProgressLevel = progressDict[lessonName]['lessonProgressLevel'];
    if (lessonProgressLevel === undefined) {
        lessonProgressLevel = 0;
    }
    longtextDict = progressDict[lessonName]['longtextDict'];
    if (longtextDict === undefined) {
        longtextDict = {};
    }
    sectionTracklist = progressDict[lessonName]['sectionTracklist'];
    if (sectionTracklist === undefined) {
        sectionTracklist = [];
    }
    lessonComplete = progressDict[lessonName]['lessonComplete'];
    if (lessonComplete === undefined) {
        lessonComplete = false;
    }
    totalWorkTime = progressDict[lessonName]['totalWorkTime'];
    if (totalWorkTime === undefined) {
        totalWorkTime = 0;
    }
    interestBoolean = progressDict[lessonName]['interestBoolean'];
    if (interestBoolean === undefined) {
        interestBoolean = false;
    }
    sessionWorkTime = 0;
    currentSetFunction = setFunction;
    currentLesson = lessonName;
    if (currentConnections !== Object.keys(enrolledDict).length) {
        classroomDisconnect();
        classroomConnect(enrolledDict);
    }

    const sourcesDisplay = document.querySelector('#sources-display');
    sourcesDisplay.innerHTML = '';
    const sourcesList = setFunctions[lessonName][1];
    for (const source of sourcesList) {
        sourcesDisplay.innerHTML += `
            <div>
                <a href="${source}" target="_blank">
                    ${source}
                </a>
            </div>
        `;
    }
    document.querySelector('#preinstructions-solve-title').innerHTML = lessonDict[currentLesson]['full_name'];

    setFunctionWaiting = true;
    setSolveRest();

    if (omIsDevEnv) {
//        solveLevel = [9, 0];
        activateRestScreen();
        // activateSolveScreen();
    } else {
        activateRestScreen();
    }

    waitForConnections()
    .then(function() {
        solveSave(currentLesson, sendLiveUpdate=false);
    });
    window.onresize = resizeSolvebox;
}

if (omIsDevEnv) {
    // document.querySelector('#non-solve-container').style.display = 'none';
    // document.querySelector('#solve-container').style.display = 'block';
    // startLesson('OSD', setOSD);
}
