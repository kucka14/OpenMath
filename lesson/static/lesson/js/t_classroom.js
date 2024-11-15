
function changeClasscode(oldClasscode, newClasscode) {
    const classroomRow = document.getElementById('classroom-row-' + oldClasscode);
    classroomRow.id = 'classroom-row-' + newClasscode;
    classroomRow.setAttribute('data-classcode', newClasscode);
    document.getElementById('classroom-row-link-' + oldClasscode).id = 'classroom-row-link-' + newClasscode;
    document.getElementById('class-refresh-button-' + oldClasscode).id = 'class-refresh-button-' + newClasscode;
    setTimeout(function() {
        document.getElementById('classroom-row-link-' + newClasscode).click();
    });
}

function deleteClass(classcode) {
    document.getElementById('classroom-row-' + classcode).remove();
    displayTarget.innerHTML = `
        <div style="margin-top: auto; margin-bottom: auto;">
            Select or create a class to get started.
        </div>
    `;
}

function changeClasscodeSuccessFunction(message) {
    if (message[0][0] === 'change') {
        const oldClasscode = message[0][1];
        const newClasscode = message[0][2];
        changeClasscode(oldClasscode, newClasscode);
        flashAlert(messageMake('new_classcode_alert_redundant'));
    } else if (message[0][0] === 'gone') {
        deleteClass(message[0][1]);
        flashAlert(messageMake('gone_class_alert'));
    } else {
        const oldClasscode = message[1];
        if (oldClasscode === 'noaccess') {
            flashAlert(messageMake('change_classcode_noaccess'));
        } else {
            const newClasscode = message[2];
            if (progressSocket !== '') {
                if (progressSocket.readyState !== WebSocket.CLOSING) {
                    dataSend('statusData', ['change_classcode', oldClasscode, newClasscode], 'all', progressSocket);
                }
            }
        }
    }
}

function deleteClassSuccessFunction(message) {
    if (message[0][0] === 'change') {
        const oldClasscode = message[0][1];
        const newClasscode = message[0][2];
        changeClasscode(oldClasscode, newClasscode);
        flashAlert(messageMake('new_classcode_alert_stop'));
    } else if (message[0][0] === 'gone') {
        deleteClass(message[0][1]);
        flashAlert(messageMake('gone_class_alert_redundant'));
    } else {
        if (message[1] === 'access') {
            const classcode = message[2];
            deleteClass(classcode);
        } else {
            flashAlert(messageMake('delete_class_noaccess'));
        }
    }
}

function editStudentnameSuccessFunction(message) {
    if (message[0][0] === 'change') {
        const oldClasscode = message[0][1];
        const newClasscode = message[0][2];
        changeClasscode(oldClasscode, newClasscode);
        flashAlert(messageMake('new_classcode_alert'));
    }
    if (message[0][0] === 'gone') {
        deleteClass(message[0][1]);
        flashAlert(messageMake('gone_class_alert'));
    } else {
        if (message[1] === 'noaccess') {
            flashAlert(messageMake('edit_studentname_noaccess'));
        }
    }
}

function openLessonsSuccessFunction(message) {
    if (message[0][0] === 'change') {
        const oldClasscode = message[0][1];
        const newClasscode = message[0][2];
        changeClasscode(oldClasscode, newClasscode);
        flashAlert(messageMake('new_classcode_alert'));
    }
    if (message[0][0] === 'gone') {
        deleteClass(message[0][1]);
        flashAlert(messageMake('gone_class_alert'));
    } else {
        if (message[1] === 'access') {
            const classcode = message[2];
            document.getElementById('class-refresh-button-' + classcode).click();
            setTimeout(function() {
                flashAlert('Lessons successfully changed. Student will need to refresh their page to see changes.');
            }, 1000);
        } else {
            flashAlert(messageMake('open_lessons_noaccess'));
        }
    }
}

function editClassnameSuccessFunction(message) {
    if (message[0][0] === 'change') {
        const oldClasscode = message[0][1];
        const newClasscode = message[0][2];
        changeClasscode(oldClasscode, newClasscode);
        flashAlert(messageMake('new_classcode_alert'));
    }
    if (message[0][0] === 'gone') {
        deleteClass(message[0][1]);
        flashAlert(messageMake('gone_class_alert'));
    } else {
        if (message[1] === 'noaccess') {
            flashAlert(messageMake('edit_classname_noaccess'));
        }
    }
}

function removeStudentSuccessFunction(message) {
    if (message[0][0] === 'change') {
        const oldClasscode = message[0][1];
        const newClasscode = message[0][2];
        changeClasscode(oldClasscode, newClasscode);
        flashAlert(messageMake('new_classcode_alert'));
    }
    if (message[0][0] === 'gone') {
        deleteClass(message[0][1]);
        flashAlert(messageMake('gone_class_alert'));
    } else {
        setTimeout(function() {
            if (message[1] === 'access') {
                const userId = message[2][0];
                const classcode = message[2][1];
                if ((progressSocket !== '') && (userId in activeStudentDict) && (classcode === currentClasscode)) {
                    if (progressSocket.readyState !== WebSocket.CLOSING) {
                        const studentChannel = activeStudentDict[userId][0];
                        dataSend('statusData', 'remove', studentChannel, progressSocket);
                    }
                } else {
                    document.getElementById('classroom-row-link-' + classcode).click();
                }
            } else {
                flashAlert(messageMake('remove_student_noaccess'));
            }
        });
    }
}

function changePermissionStatusSuccessFunction(message) {
    if (message[0][0] === 'change') {
        const oldClasscode = message[0][1];
        const newClasscode = message[0][2];
        changeClasscode(oldClasscode, newClasscode);
        flashAlert(messageMake('new_classcode_alert'));
    }
    if (message[0][0] === 'gone') {
        deleteClass(message[0][1]);
        flashAlert(messageMake('gone_class_alert'));
    } else {
        const studentUserId = message[1];
        const classcode = message[2];
        if (classcode === currentClasscode) {
            const target = document.getElementById('permission-toggle-' + studentUserId);
            if (target.innerHTML.trim() === 'Make Owner') {
                target.innerHTML = 'Remove Ownership';
            } else {
                target.innerHTML = 'Make Owner';
            }
            target.disabled = false;
        }
    }
}

function viewPasswordSuccessFunction(message) {
    flashAlert(`The password for this user is ${message}.`);
}

function resetPasswordSuccessFunction(message) {
    const password = message[0];
    const teacherDisplayName = message[1];
    const studentUsername = message[2];
    flashAlert(`The password has been reset for ${teacherDisplayName} (username: ${studentUsername}). Their password is now <strong>${password}</strong>. They are now advised to login, go to settings, and change their password.`);
}

function addClassroomHeader(headerText, label) {
    const header = document.createElement('div');
    header.classList.add('classroom-display-header');
    header.innerHTML = headerText;
    const accordionContainer = document.createElement('div');
    accordionContainer.classList.add('accordion');
    accordionContainer.classList.add('accordion-container');
    accordionContainer.id = label;
    displayTarget.appendChild(header);
    displayTarget.appendChild(accordionContainer);
}

function setOpenLessonsTrigger(studentOverrideList, studentProgressDict, classcode, classId, studentUserId) {
    const openLessonsTrigger = document.getElementById('open-lessons-trigger-' + studentUserId);
    openLessonsTrigger.onclick = function() {
        const target = document.querySelector('#open-lessons-grid');
        target.innerHTML = '';
        let tempOverrideList = studentOverrideList;
        for (const lessonKey in lessonDict) {
            const lesson = lessonDict[lessonKey];
            const fullName = lesson['full_name'];
            const buttonName = lesson['button_name'];
            const studentProgressList = completedKeysToList(studentProgressDict);
            const lineDiv = document.createElement('div');
            lineDiv.classList.add('open-lessons-line');
            const textDivA = document.createElement('div');
            textDivA.innerHTML = fullName + ' (' + buttonName + ')';
            textDivA.style.fontWeight = 'bold';
            const textDivB = document.createElement('div');
            textDivB.style.marginTop = '5px';
            textDivB.style.marginBottom = '5px';
            let button = '';
            pass = false;
            if (progressDict[lesson] !== undefined) {
                if (studentProgressDict[lessonKey]['lessonComplete'] === true) {
                    textDivB.innerHTML = 'Complete';
                    lineDiv.style.backgroundColor = 'blue';
                    pass = true;
                }
            }
            if (!pass) {
                if (checkPrereqs(lessonKey, studentProgressList)) {
                    textDivB.innerHTML = 'Open (due to student progress)';
                    lineDiv.style.backgroundColor = 'green';
                } else {
                    button = document.createElement('button');
                    button.style.marginTop = '5px';
                    button.style.marginBottom = '5px';
                    button.classList.add('btn');
                    button.classList.add('btn-outline-light');
                    if (studentOverrideList.includes(lessonKey)) {
                        textDivB.innerHTML = 'Open (due to teacher override)';
                        button.innerHTML = 'Close This Lesson';
                        lineDiv.style.backgroundColor = 'green';
                    } else {
                        textDivB.innerHTML = 'Closed';
                        button.innerHTML = 'Open This Lesson';
                    }
                    button.onclick = function() {
                        lineDiv.style.border = '3px solid black';
                        if (this.innerHTML.trim() === 'Open This Lesson') {
                            textDivB.innerHTML = 'Pending Open';
                            this.innerHTML = 'Close This Lesson';
                            tempOverrideList.push(lessonKey);
                            lineDiv.style.backgroundColor = 'green';
                        } else {
                            textDivB.innerHTML = 'Pending Close';
                            this.innerHTML = 'Open This Lesson';
                            removeByValue(tempOverrideList, lessonKey);
                            lineDiv.style.backgroundColor = colorDict['gray4'];
                        }
                    }
                }
            }
            lineDiv.appendChild(textDivA);
            lineDiv.appendChild(textDivB);
            if (button !== '') {
                lineDiv.appendChild(button);
            }
            target.appendChild(lineDiv);
        }
        document.querySelector('#open-lessons-submit').onclick = function() {
            studentOverrideList = tempOverrideList;
            document.querySelector('#open-lessons-cancel').click();
            flashAlert('Changing Lessons...', duration=0, maxWidth=300, clickDismiss=false);
            axiosPost('a34855817d7232825b3305dd9b74269e/',
                  JSON.stringify({save_type: 'open_lessons', override_list: studentOverrideList, classcode: classcode, class_id: classId, user_id: studentUserId}),
                  successFunction=openLessonsSuccessFunction
            );
        }
    }
}

function setStudentnameTrigger(studentUserId, classcode, classId) {
    const editStudentnameTrigger = document.getElementById('edit-studentname-trigger-' + studentUserId);
    setYellowHover(editStudentnameTrigger);
    editStudentnameTrigger.onclick = function(e) {
        const teacherDisplayName = document.getElementById('infocore-' + studentUserId).getAttribute('data-teacher-display-name');
        const inputTarget = document.querySelector('#edit-studentname-input');
        inputTarget.value = teacherDisplayName;
        document.querySelector('#hidden-studentname-input').value = studentUserId;
        document.querySelector('#hidden-classcode-input').value = classcode;
        document.querySelector('#hidden-classid-input').value = classId;
        setTimeout(function() {
            inputTarget.focus();
        }, 750);
        return false;
    }
}

function setRemoveStudentTrigger(studentUserId, studentUsername, classcode, classId) {
    document.getElementById('remove-student-' + studentUserId).onclick = function() {
        const teacherDisplayName = document.getElementById('infocore-' + studentUserId).getAttribute('data-teacher-display-name');
        confirmAction(
            `Are you sure you want to remove ${teacherDisplayName} (username: ${studentUsername}) from this class?`,
            function() {
                  flashAlert('Removing Student...', duration=0, maxWidth=300, clickDismiss=false);
                  axiosPost('a34855817d7232825b3305dd9b74269e/',
                        JSON.stringify({save_type: 'remove_student', classcode: classcode, class_id: classId, user_id: studentUserId}),
                        successFunction=removeStudentSuccessFunction
                  );
            }
        );
    }
}

function addProgressLines(studentProgressDict, studentUserId) {
    const progressLines = document.createElement('div');
    progressLines.style.width = '100%';
    let data = false;
    const lessonOrderList = orderKeysByIndex(lessonDict);
    for (const lesson of lessonOrderList) {
        if (Object.keys(studentProgressDict).includes(lesson)) {
            if (!arraysEqual(studentProgressDict[lesson]['solveLevel'], [0, 0])) {
                data = true;
                const lessonProgressLevel = studentProgressDict[lesson]['lessonProgressLevel'];
                const progressBarDiv = document.createElement('div');
                progressBarDiv.style = 'flex: 1; min-width: 60px; margin-left: 5px; padding-top: 3px; margin-right: 5px;';
                progressBarDiv.innerHTML = `
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${lessonProgressLevel}%;"></div>
                    </div>
                `;
                let lessonLongtextDict = studentProgressDict[lesson]['longtextDict'];
                const line = document.createElement('div');
                line.classList.add('progress-lines-line');
                const titleLink = document.createElement('a');
                titleLink.href = '#';
                titleLink.id = 'view-longtext-' + studentUserId + lesson;
                titleLink.setAttribute('data-bs-target', '#view-longtext-modal');
                titleLink.setAttribute('data-bs-toggle', 'modal');
                titleLink.onclick = function() {
                    const teacherDisplayName = document.getElementById('infocore-' + studentUserId).getAttribute('data-teacher-display-name');
                    let longtextDisplayHTML = 'This student has not yet submitted any free response questions for this lesson.';
                    if (lessonLongtextDict.length !== 0) {
                        longtextDisplayHTML = '<div style="margin-bottom: 10px;">Progress: ' + progressBarDiv.outerHTML + '</div>';
                        let qaList = [];
                        for (const questionId in lessonLongtextDict) {
                            const question = lessonLongtextDict[questionId];
                            let qaDisplay = '';
                            const newHTML = '<div style="border: 1px solid gray;">' + question[0] + '</div>';
                            qaDisplay += newHTML;
                            if (question.length === 1) {
                                qaDisplay += '<div>No response submitted.</div>';
                            } else {
                                const newHTML = `<div style="text-align: left;">
                                                    <strong>${teacherDisplayName}'s Response:</strong> ${question.slice(-1)}
                                                </div>`;
                                qaDisplay += newHTML;
                            }
                            qaList.push(qaDisplay);
                        }
                        const joinedText = qaList.join('<hr>');
                        longtextDisplayHTML += joinedText;
                    }
                    document.querySelector('#view-longtext-title').innerHTML = teacherDisplayName + ' - ' + lessonDict[lesson]['full_name'];
                    document.querySelector('#view-longtext-text').innerHTML = longtextDisplayHTML;
                    return false;
                }
                titleLink.innerHTML = `
                    <div style="font-weight: bold;">${lessonDict[lesson]['full_name']} (${lessonDict[lesson]['button_name']}): </div>
                `;
                line.appendChild(titleLink);
                line.appendChild(progressBarDiv);
                progressLines.appendChild(line);
            }
        }
    }
    if (!data) {
        progressLines.innerHTML = 'No student data yet.'
    }
    const progressLinesDiv = document.getElementById('progress-lines-' + studentUserId);
    progressLinesDiv.innerHTML = '';
    progressLinesDiv.appendChild(progressLines);
}

function addPassResetDiv(passResetType, studentUserId, classId, studentUsername) {
    let passResetDiv = '';
    let buttonText = '';
    if (passResetType === 'reset' || passResetType === 'block') {
        buttonText = 'Reset Password';
    } else if (passResetType === 'view') {
        buttonText = 'View Password';
    }
    if (buttonText !== '') {
        passResetDiv = `
            <button class="btn btn-sm btn-outline-secondary" id="student-pass-reset-${studentUserId}">${buttonText}</button>
        `;
    }
    document.getElementById('pass-reset-div-' + studentUserId).innerHTML = passResetDiv;

    if (passResetDiv !== '') {
        const resetTarget = document.getElementById('student-pass-reset-' + studentUserId);
        resetTarget.onclick = function() {
            const teacherDisplayName = document.getElementById('infocore-' + studentUserId).getAttribute('data-teacher-display-name');
            if (passResetType === 'block') {
                flashAlert('This person has an email associated with their account. To reset their password, they can click "Forgot Username/Password" when they login. Email openmath.us@gmail.com for further questions.');
            } else if (passResetType === 'view') {
                axiosPost('b9069f9ed3647ebeaf4e110f21e2ad9b/',
                      JSON.stringify({reset_type: 'view', user_id: studentUserId, class_id: classId}),
                      successFunction=viewPasswordSuccessFunction
                );
            } else if (passResetType === 'reset') {
                confirmAction(
                    `Are you sure you want to reset the password for ${teacherDisplayName} (username: ${studentUsername})?`,
                    function() {
                        axiosPost('b9069f9ed3647ebeaf4e110f21e2ad9b/',
                              JSON.stringify({reset_type: 'reset', user_id: studentUserId, class_id: classId}),
                              successFunction=resetPasswordSuccessFunction
                        );
                    }
                );
            }
        }
    }
}

function addPermissionDiv(studentType, permissionStatus, selfinfo, studentUserId, studentUsername) {
    let permissionDiv = '';
    if ((studentType === 't') && (selfinfo[casedUsername]['permission_status'] === 'owner')) {
        let buttonText = 'Make Owner';
        if (permissionStatus === 'owner') {
            buttonText = 'Remove Ownership';
        }
        permissionDiv = `
            <button class="btn btn-sm btn-outline-secondary" id="permission-toggle-${studentUserId}">${buttonText}</button>
        `
    }
    document.getElementById('permission-div-' + studentUserId).innerHTML = permissionDiv;
    if (permissionDiv !== '') {
        const permissionTarget = document.getElementById('permission-toggle-' + studentUserId);
        permissionTarget.onclick = function() {
            const currentTeacherDisplayName = document.getElementById('infocore-' + studentUserId).getAttribute('data-teacher-display-name');
            let actionType = 'remove_ownership';
            let actionText = messageMake('remove_ownership_warning', variables=[currentTeacherDisplayName, studentUsername]);
            if (this.innerHTML.trim() === 'Make Owner') {
                actionType = 'add_owner';
                actionText = messageMake('add_owner_warning', variables=[currentTeacherDisplayName, studentUsername]);
            }
            confirmAction(
                actionText,
                function() {
                      permissionTarget.disabled = true;
                      axiosPost('a34855817d7232825b3305dd9b74269e/',
                            JSON.stringify({save_type: actionType, classcode: classcode, user_id: studentUserId, class_id: classId}),
                            successFunction=changePermissionStatusSuccessFunction
                      );
                }
            );
        }
    }
}

function addWorkTimes(studentProgressDict, studentUserId) {
    let summedTime = 0;
    for (const lesson in studentProgressDict) {
        summedTime += studentProgressDict[lesson]['totalWorkTime'];
    }
    const displayTime = secondsToClock(summedTime);
    document.getElementById('total-active-time-' + studentUserId).innerHTML = displayTime;
}

function addClassroomInfoline(target, userinfo, classcode, classId, studentType, fromStudent) {

    const studentUsername = userinfo['cased_username'];
    const studentUserId = userinfo['user_id'];
    const studentProgressDict = userinfo['progress_dict'];
    let teacherDisplayName = '';
    let passResetType = '';
    let studentOverrideList = '';
    if (!fromStudent) {
        teacherDisplayName = userinfo['teacher_display_name'];
        if (teacherDisplayName === '') {
            teacherDisplayName = userinfo['display_name'];
        }
        passResetType = userinfo['pass_reset_type'];
        studentOverrideList = userinfo['override_list'];
    }

    const infoline = document.getElementById('accordion-item-' + studentUserId);
    if (infoline === null && !fromStudent) {
        let displayType = 'Student';
        if (studentType === 't') {
            displayType = 'Teacher';
        }
        const infocore = `
            <div id="infocore-${studentUserId}" data-teacher-display-name="${teacherDisplayName}" class="accordion-header accordion-header-container">
                <button id="student-accordion-header-${studentUserId}" class="accordion-button collapsed accordion-student-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${studentUserId}">
                    <span class="button-ellipsis">
                        ${teacherDisplayName}
                    </span>
                </button>
                <a href="#" class="edit-studentname-trigger" id="edit-studentname-trigger-${studentUserId}" data-bs-toggle="modal" data-bs-target="#edit-studentname-modal">
                    ${editRowLinkOff}
                </a>
            </div>
            <div id="flush-collapse-${studentUserId}" class="accordion-collapse collapse">
                <div class="accordion-body accordion-body-div">
                    <div class="accordion-body-general">
                        <div style="margin-right: 10px;" class="ellipsis-line">
                            username: ${studentUsername}
                        </div>
                        <div style="margin-right: 10px;">
                            <button class="btn btn-sm btn-outline-secondary" id="remove-student-${studentUserId}">Remove ${displayType}</button>
                        </div>
                        <div id="permission-div-${studentUserId}"></div>
                        <div id="pass-reset-div-${studentUserId}"></div>
                    </div>
                    <div class="accordion-body-general">
                        <button class="btn btn-sm btn-outline-secondary" id="open-lessons-trigger-${studentUserId}" data-bs-toggle="modal" data-bs-target="#open-lessons-modal">Open/Close Lessons</button>
                    </div>
                    <div class="accordion-body-general" title="Total active time across all lessons">
                        <strong>Total Active Time:</strong>&nbsp<span id="total-active-time-${studentUserId}"></span>
                    </div>
                    <div  class="accordion-body-general" id="progress-lines-${studentUserId}"></div>
                </div>
            </div>
        `
        const newLine = document.createElement('div');
        newLine.id = 'accordion-item-' + studentUserId;
        newLine.classList.add('accordion-item');
        newLine.innerHTML = infocore;
        target.appendChild(newLine);

        setOpenLessonsTrigger(studentOverrideList, studentProgressDict, classcode, classId, studentUserId);
        setStudentnameTrigger(studentUserId, classcode, classId);
        setRemoveStudentTrigger(studentUserId, studentUsername, classcode, classId);
    }

    addProgressLines(studentProgressDict, studentUserId);
    addWorkTimes(studentProgressDict, studentUserId);
    if (!fromStudent) {
        addPassResetDiv(passResetType, studentUserId, classId, studentUsername);
        const permissionStatus = userinfo['permission_status'];
        addPermissionDiv(studentType, permissionStatus, selfinfo, studentUserId, studentUsername);
    }
}

function addUpdateStudentLine(studentType, studentList, classcode, classId, fromStudent=false) {
    let headerText = '';
    let label = '';
    if (studentType === 't' && studentList.length > 0) {
        headerText = 'Co-Teachers';
        label = 'coteacher-accordion';
    } else if (studentType === 's13' && studentList.length > 0) {
        headerText = 'Students (13+)';
        label = 's13student-accordion';
    } else if (studentType === 's12' && studentList.length > 0) {
        headerText = 'Students (12-)';
        label = 's12student-accordion';
    }
    if (document.getElementById(label) === null) {
        addClassroomHeader(headerText, label);
    }
    const target = document.getElementById(label);
    for (const student of studentList) {
        addClassroomInfoline(target, student, classcode, classId, studentType, fromStudent);
    }
}

function changeStudentActivity(activityBoolean, studentUserId) {
    if (Object.keys(activeStudentDict).includes(studentUserId.toString())) {
        if (activityBoolean === 'active') {
            if (activeStudentDict[studentUserId][1] === 'inactive') {
                activeStudentDict[studentUserId][1] = 'active';
                setTimeout(function() {
                    document.getElementById('student-accordion-header-' + studentUserId).setAttribute('style', 'color: green !important');;
                }, 1000);
            }
        } else if (activityBoolean === 'inactive') {
            if (activeStudentDict[studentUserId][1] === 'active') {
                activeStudentDict[studentUserId][1] = 'inactive'
                setTimeout(function() {
                    document.getElementById('student-accordion-header-' + studentUserId).setAttribute('style', 'color: blue !important');
                }, 1000);
            }
        }
    }
}

function updateStudentActivity() {
    const accordionButtons = document.getElementsByClassName('accordion-button');
    for (const button of accordionButtons) {
        button.setAttribute('style', `color: ${colorDict['gray4']} !important`);
    }
    for (const studentUserId in activeStudentDict) {
        const target = document.getElementById('student-accordion-header-' + studentUserId);
        let color = 'blue';
        if (activeStudentDict[studentUserId][1] === 'active') {
            color = 'green';
        }
        const attribute = `color: ${color} !important`;
        target.setAttribute('style', attribute);
    }
}

function connectProgressSocket(classcode, classId) {
    const wsScheme = window.location.protocol === "https:" ? "wss" : "ws";
    progressSocket = new WebSocket(wsScheme + ':' + window.location.host + '/ws/' + classcode + '/');
    let onopenSentT = false;
    progressSocket.onopen = function() {
        if (!(onopenSentT)) {
            onopenSentT = true;
            dataSend('statusData', 'open', 'all', this);
        }
    }
    progressSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        const allData = data.allData;
        const dataType = allData['dataType'];
        const sendData = allData['sendData'];
        const sendOrigin = allData['sendOrigin'];
        if (dataType === 'attendanceData') {
            if (sendData === 'remove-confirm') {
                document.getElementById('classroom-row-link-' + classcode).click();
            } else if (!(sendData in activeStudentDict) && selfinfo[casedUsername]['user_id'] !== sendData) {
                activeStudentDict[sendData] = [sendOrigin, 'inactive'];
                dataSend('statusData', 'open-confirm', sendOrigin, this);
                const studentAccordionDiv = document.getElementById('student-accordion-header-' + sendData);
                if (studentAccordionDiv !== null) {
                    setTimeout(function() {
                        studentAccordionDiv.setAttribute('style', 'color: blue !important');
                    }, 1000);
                }
            }
        } else if (dataType === 'disconnectData') {
            for (const student in activeStudentDict) {
                if (activeStudentDict[student][0] === sendOrigin) {
                    delete activeStudentDict[student];
                    const studentAccordionDiv = document.getElementById('student-accordion-header-' + student);
                    if (studentAccordionDiv !== null) {
                        setTimeout(function() {
                            studentAccordionDiv.setAttribute('style', `color: ${colorDict['gray4']} !important`);
                        }, 1000);
                    }
                }
            }
        } else if (dataType === 'progressData') {
            const studentType = sendData[0];
            const incomingClasscode = sendData[1];
            const studentInfo = sendData[2];
            if ((incomingClasscode === currentClasscode) && (currentClasscode === classcode) && (studentInfo['user_id'] !== selfinfo[casedUsername]['user_id'])) {
                if (document.querySelector(`#infocore-${studentInfo['user_id']}`) !== null) {
                    addUpdateStudentLine(studentType, [studentInfo], classcode, classId, fromStudent=true);
                    changeStudentActivity('active', studentInfo['user_id']);
                } else {
                    delete activeStudentDict[studentInfo['user_id']];
                }
            }
        } else if (dataType === 'statusData') {
            if (sendData[0] === 'change_classcode') {
                const oldClasscode = sendData[1];
                const newClasscode = sendData[2];
                changeClasscode(oldClasscode, newClasscode);
            }
        } else if (dataType === 'activeData') {
            const incomingClasscode = sendData[2];
            if ((incomingClasscode === currentClasscode) && (currentClasscode === classcode) && (sendData[0] !== selfinfo[casedUsername]['user_id'])) {
                if (document.getElementById('student-accordion-header-' + sendData[0]) !== null) {
                    changeStudentActivity(sendData[1], sendData[0]);
                } else {
                    delete activeStudentDict[sendData[0]];
                }
            }
        }
    }
    progressSocket.onclose = function() {
        progressSocket = '';
    }
}

function completeDataPull(classcode, classDict, coteachers, s13students, s12students, classId) {
    connectProgressSocket(classcode, classId);

    let holderDisplay = true
    coteacherList = Object.values(coteachers);
    if (coteacherList.length > 0 && classcode === currentClasscode) {
        addUpdateStudentLine('t', coteacherList, classcode, classId);
        holderDisplay = false;
    }
    s13studentList = Object.values(s13students);
    if (s13studentList.length > 0 && classcode === currentClasscode) {
        addUpdateStudentLine('s13', s13studentList, classcode, classId);
        holderDisplay = false;
    }
    s12studentList = Object.values(s12students);
    if (s12studentList.length > 0 && classcode === currentClasscode) {
        addUpdateStudentLine('s12', s12studentList, classcode, classId);
        holderDisplay = false;
    }
    if (holderDisplay) {
        const messageDiv = document.createElement('div');
        messageDiv.id = 'holder-message-div';
        messageDiv.innerHTML = '<br>There are no students in this class.<br><br>Students can join the class by using the classcode above.<br><br>They can do this when creating an account, or on their own classroom page.';
        displayTarget.appendChild(messageDiv);
    }
    setTimeout(function() {
        placeDisplayBorder();
        updateStudentActivity();
    });
}

function pullClassDataSuccessFunction(message) {
    if (message[0][0] === 'change') {
        const oldClasscode = message[0][1];
        const newClasscode = message[0][2];
        changeClasscode(oldClasscode, newClasscode);
        flashAlert(messageMake('new_classcode_alert'));
    } else if (message[0][0] === 'gone') {
        deleteClass(message[0][1]);
        flashAlert(messageMake('gone_class_alert'));
    } else {
        const loadingDiv = document.querySelector('#loading-div');
        if (loadingDiv !== null) {
            loadingDiv.remove();
        }
        const holderDiv = document.querySelector('#holder-message-div');
        if (holderDiv !== null) {
            holderDiv.remove();
        }
        const classcode = message[1];
        if (classcode === currentClasscode) {
            const classDict = message[2];
            const refreshCheck = message[3];
            const classId = message[4];
            selfinfo = classDict['self'];
            const coteachers = classDict['coteachers'];
            const s13students = classDict['s13students'];
            const s12students = classDict['s12students'];

            if (refreshCheck) {
                const classRefreshButton = document.getElementById('class-refresh-button-' + classcode);
                classRefreshButton.style.color = 'black';
                classRefreshButton.style.pointerEvents = 'auto';
                const totalUsers = Object.keys(coteachers).length + Object.keys(s13students).length + Object.keys(s12students).length;
                const totalDisplayedUsers = document.getElementsByClassName('accordion-header').length;
                if (totalUsers !== totalDisplayedUsers) {
                    document.getElementById('classroom-row-link-' + classcode).click();
                    return false;
                } else {
                    completeDataPull(classcode, classDict, coteachers, s13students, s12students, classId);
                }
            } else {
                completeDataPull(classcode, classDict, coteachers, s13students, s12students, classId);
                setTimeout(function() {
                    const refreshButton = document.getElementById('class-refresh-button-' + classcode);
                    refreshButton.onclick = function() {
                        this.style.color = 'red';
                        this.style.pointerEvents = 'none';
                        prePullClassData(classcode, true, classId);
                        return false;
                    }
                    refreshButton.disabled = false;
                });
            }
        }
    }
}

function pullClassData(classcode, refreshCheck, classId) {
    axiosPost('b8d4518c2f285f8d04ba68c69d569388/',
              JSON.stringify({pull_type: 'classdict', classcode: classcode, refresh_check: refreshCheck, class_id: classId}),
              successFunction=pullClassDataSuccessFunction,
    );
}

function prePullClassData(classcode, refreshCheck, classId) {
    activeStudentDict = {};
    if (progressSocket !== '') {
        progressSocket.onclose = function() {
            progressSocket = '';
            pullClassData(classcode, refreshCheck, classId);
        }
        if (progressSocket.readyState !== WebSocket.CLOSING) {
            progressSocket.close();
        }
    } else {
        pullClassData(classcode, refreshCheck, classId);
    }
}

function rowClickFunction(ownObject) {

    const rows = document.getElementsByClassName('classroom-row');
    for (const row of rows) {
        row.querySelector('.classroom-row-link').style.color = 'black';
        row.querySelector('.classroom-edit-link').style.color = 'black';
        row.style.backgroundColor = 'white';
    }
    ownObject.style.color = 'white';
    ownObject.parentElement.style.backgroundColor = colorDict['primary-blue'];
    ownObject.parentElement.querySelector('.classroom-edit-link').style.color = 'white';

    const classcode = ownObject.parentElement.getAttribute('data-classcode');
    const classId = ownObject.parentElement.getAttribute('data-classid');
    const classname = getFirstChild(getFirstChild(ownObject)).innerHTML.trim();
    displayTarget.innerHTML = '';
    currentClasscode = classcode;

    const mainClassHeader = document.createElement('div');
    mainClassHeader.id = 'class-display-header';
    mainClassHeader.classList.add('shadowed-sm');

    const displayHeaderLeft = document.createElement('div');
    displayHeaderLeft.id = 'class-display-header-left';
    displayHeaderLeft.innerHTML = `
        <span id="classcode-span" title="Classcode to join class">${classcode}</span>
        <a id="change-classcode-button" href="#" title="Generate new classcode">
            ${editPencilNeutral}
        </a>
        <a id="class-delete-button" href="#" title="Delete this class">
            ${trashcanNeutral}
        </a>
    `;

    const displayHeaderCenter = document.createElement('div');
    displayHeaderCenter.id = 'class-display-header-center';
    displayHeaderCenter.classList.add('ellipsis-line');
    displayHeaderCenter.innerHTML = `${classname}`;
    displayHeaderCenter.title = classname;

    const displayHeaderRight = document.createElement('div');
    displayHeaderRight.id = 'class-display-header-right';
    displayHeaderRight.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-circle-fill" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8"/>
        </svg>
        <div style="font-size: 10px; margin-right: 5px;" title="Students who have entered a lesson will appear in blue.">&nbsp= Logged In&nbsp</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-circle-fill" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8"/>
        </svg>
        <div style="font-size: 10px; margin-right: 10px;" title="Students who are actively working on a lesson will appear in green.">&nbsp= Active</div>
        <a href="#" style="color: black;" class="class-refresh-button" id="class-refresh-button-${classcode}" title="Refresh class page">
            ${refreshArrow}
        </a>
    `;

    mainClassHeader.appendChild(displayHeaderLeft);
    mainClassHeader.appendChild(displayHeaderCenter);
    mainClassHeader.appendChild(displayHeaderRight);

    displayTarget.appendChild(mainClassHeader);
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-div';
    loadingDiv.style.marginTop = '30px';
    loadingDiv.innerHTML = `
        <div class="spinner-border" style="color: ${colorDict['primary-blue']};" role="status"></div>
    `;
    displayTarget.appendChild(loadingDiv);

    displayTarget.querySelector('#class-delete-button').onclick = function() {
        confirmAction(
            messageMake('delete_class_warning', variables=[classname, classcode]),
            function() {
                flashAlert('Deleting Class...', duration=0, maxWidth=300, clickDismiss=false);
                axiosPost('a34855817d7232825b3305dd9b74269e/',
                      JSON.stringify({save_type: 'delete_class', classcode: classcode, class_id: classId}),
                      successFunction=deleteClassSuccessFunction
                );
            }
        );
        return false;
    }

    const changeClasscodeButton = displayTarget.querySelector('#change-classcode-button');
    setYellowHover(changeClasscodeButton);
    changeClasscodeButton.onclick = function() {
        confirmAction(
            messageMake('change_classcode_warning'),
            function() {
                flashAlert('Changing Classcode...', duration=0, maxWidth=300, clickDismiss=false);
                axiosPost('a34855817d7232825b3305dd9b74269e/',
                      JSON.stringify({save_type: 'change_classcode', classcode: classcode, class_id: classId}),
                      successFunction=changeClasscodeSuccessFunction
                );
            }
        );
        return false;
    }

    prePullClassData(classcode, false, classId);

}

function editClickFunction(ownObject) {
    const divParent = ownObject.parentElement.parentElement;
    const classcode = divParent.getAttribute('data-classcode');
    const classId = divParent.getAttribute('data-classid');
    const rowName = divParent.querySelector('#row-name-name');
    const rowInput = divParent.querySelector('#row-name-input');
    const rowInputInput = divParent.querySelector('#row-input-input');
    if (ownObject.querySelector('svg').getAttribute('data-type') === 'edit') {
        ownObject.innerHTML = editRowLinkOn;
        rowName.style.display = 'none';
        rowInput.style.display = 'block';
        rowInputInput.selectionStart = rowInputInput.selectionEnd = rowInputInput.value.length;
        rowInputInput.focus();
        rowInputInput.oninput = function() {
            if (this.value.trim() !== rowName.innerHTML.trim()) {
                this.style.color = colorDict['blue-black'];
            } else {
                this.style.color = 'black';
            }
        }
        rowInputInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                ownObject.click();
            }
        }
    } else {
        ownObject.innerHTML = editRowLinkOff;
        rowName.style.display = 'block';
        rowInput.style.display = 'none';
        rowInputInput.style.color = 'black';
        newValue = rowInputInput.value.trim();
        if (newValue !== rowName.innerHTML.trim()) {
            rowName.innerHTML = newValue;
            document.querySelector('#class-display-header-center').innerHTML = newValue;
            document.querySelector('#class-display-header-center').title = newValue;
        }
        axiosPost('a34855817d7232825b3305dd9b74269e/',
              JSON.stringify({save_type: 'edit_classname', classcode: classcode, new_name: newValue, class_id: classId}),
              successFunction=editClassnameSuccessFunction,
        );
    }
}

function addClassnavClass(classcode, classname, addFunctions, classId) {
    const classnavClass = document.createElement('div');
    classnavClass.classList.add('classroom-row');
    classnavClass.id = 'classroom-row-' + classcode;
    classnavClass.setAttribute('data-classcode', classcode);
    classnavClass.setAttribute('data-classid', classId);
    const classroomRowLink = document.createElement('a');
    classroomRowLink.href = '#';
    classroomRowLink.classList.add('classroom-row-link');
    classroomRowLink.id = 'classroom-row-link-' + classcode;
    if (addFunctions) {
        classroomRowLink.onclick = function() {
            rowClickFunction(this);
            return false;
        }
    } else {
        classroomRowLink.style.pointerEvents = 'none';
    }
    classroomRowLink.innerHTML = `
        <div class="classroom-row-left">
            <div id="row-name-name" class="ellipsis-line">
                ${classname}
            </div>
        </div>
    `;

    const rowNameInput = document.createElement('div');
    rowNameInput.classList.add('classroom-edit-inputdiv');
    rowNameInput.id = 'row-name-input';
    rowNameInput.style.display = 'none';
    rowNameInput.innerHTML = `
        <input class="classroom-edit-input" id="row-input-input" value="${classname}">
    `

    const editRowLinkContainer = document.createElement('div');
    editRowLinkContainer.classList.add('classroom-row-right');
    const classroomEditLink = document.createElement('a');
    classroomEditLink.href = '#';
    classroomEditLink.classList.add('classroom-edit-link');
    classroomEditLink.id = 'classroom-edit-link-' + classcode;
    classroomEditLink.innerHTML = editRowLinkOff;
    if (addFunctions) {
        classroomEditLink.onclick = function() {
            editClickFunction(this);
            return false;
        }
        setYellowHover(classroomEditLink);
    } else {
        classroomEditLink.style.pointerEvents = 'none';
    }
    editRowLinkContainer.appendChild(classroomEditLink);
    classnavClass.appendChild(classroomRowLink);
    classnavClass.appendChild(rowNameInput);
    classnavClass.appendChild(editRowLinkContainer);
    classnavTarget.appendChild(classnavClass);
}

function createClassroomSuccessFunction(message) {
    const classcode = message[0];
    const divId = message[1];
    const classroomId = message[2];
    if (divId === -1) {
        flashAlert('That is not a valid classcode.');
    } else if (divId === -2) {
        flashAlert('You are already in that class.');
    } else {
        if (typeof(divId) === 'string') {
            addClassnavClass(classcode, divId, addFunctions=true, classId=classroomId);
            classnavTarget.scrollTop = classnavTarget.scrollHeight;
            flashAlert('You have been added to the class ' + divId + '.');
        } else {
            const targetDiv = document.getElementById('classroom-row-' + divId);
            targetDiv.id = 'classroom-row-' + classcode;
            targetDiv.setAttribute('data-classcode', classcode);
            targetDiv.setAttribute('data-classid', classroomId);
            const targetLinks = targetDiv.getElementsByTagName('a');
            const rowLink = targetLinks[0];
            const editLink = targetLinks[1];
            rowLink.style.pointerEvents = 'auto';
            editLink.style.pointerEvents = 'auto';
            rowLink.id = 'classroom-row-link-' + classcode;
            rowLink.onclick = function() {
                rowClickFunction(this);
                return false;
            }
            editLink.onclick = function() {
                editClickFunction(this);
                return false;
            }
            setYellowHover(editLink);
        }
    }
}

document.querySelector('#name-classroom-cancel').onclick = function() {
    document.querySelector('#name-classroom-input').value = '';
    document.querySelector('#name-join-hidden-input').value = '';
    document.querySelector('#name-classroom-input').removeEventListener('input', autoCapitalize);
}

document.querySelector('#name-classroom-trigger').onclick = function() {
    document.querySelector('#name-join-hidden-input').value = 'name';
    document.querySelector('#name-classroom-label').innerHTML = 'Classroom Name:';
    document.querySelector('#name-classroom-submit').innerHTML = 'Create Classroom';
    setTimeout(function() {
        document.querySelector('#name-classroom-input').focus();
    }, 750);
}

document.querySelector('#join-classroom-trigger').onclick = function() {
    document.querySelector('#name-join-hidden-input').value = 'join';
    document.querySelector('#name-classroom-label').innerHTML = 'Classcode:';
    document.querySelector('#name-classroom-submit').innerHTML = 'Join Classroom';
    document.querySelector('#name-classroom-input').addEventListener('input', autoCapitalize);
    setTimeout(function() {
        document.querySelector('#name-classroom-input').focus();
    }, 750);
}

document.querySelector('#name-classroom-input').onkeypress = function(e) {
    if (e.key === 'Enter') {
        document.querySelector('#name-classroom-submit').click();
    }
}

document.querySelector('#edit-studentname-cancel').onclick = function() {
    document.querySelector('#edit-studentname-input').value = '';
}

document.querySelector('#edit-studentname-input').onkeypress = function(e) {
    if (e.key === 'Enter') {
        document.querySelector('#edit-studentname-submit').click();
    }
}

document.querySelector('#name-classroom-submit').onclick = function() {
    let newdata = document.querySelector('#name-classroom-input').value.trim();
    if (newdata === '') {
        flashAlert('The class name cannot be blank.');
    } else {
        const submitType = document.querySelector('#name-join-hidden-input').value;
        document.querySelector('#name-classroom-cancel').click();
        if (submitType === 'name') {
            addClassnavClass(idCount, newdata, addFunctions=false, classId='');
            saveType = 'new_classroom';
            classnavTarget.scrollTop = classnavTarget.scrollHeight;
        } else if (submitType === 'join') {
            newdata = newdata.toUpperCase()
            saveType = 'join_classroom';
            flashAlert('Joining Class...', duration=0, maxWidth=300, clickDismiss=false);
        }
        axiosPost('a34855817d7232825b3305dd9b74269e/',
                  JSON.stringify({save_type: saveType, newdata: newdata, div_id: idCount}),
                  successFunction=createClassroomSuccessFunction,
        );
        idCount += 1;
    }
}

document.querySelector('#edit-studentname-submit').onclick = function() {
    const teacherDisplayName = document.querySelector('#edit-studentname-input').value.trim();
    if (teacherDisplayName === '') {
        flashAlert("The student's display name cannot be blank.");
    } else {
        const studentUserId = document.querySelector('#hidden-studentname-input').value;
        document.getElementById('infocore-' + studentUserId).setAttribute('data-teacher-display-name', teacherDisplayName);
        const classcode = document.querySelector('#hidden-classcode-input').value;
        const classId = document.querySelector('#hidden-classid-input').value;

        document.querySelector('#edit-studentname-cancel').click();
        document.getElementById('student-accordion-header-' + studentUserId).innerHTML = teacherDisplayName;
        axiosPost('a34855817d7232825b3305dd9b74269e/',
                  JSON.stringify({save_type: 'edit_teacher_display', user_id: studentUserId, classcode: classcode, teacher_display_name: teacherDisplayName, class_id: classId}),
                  successFunction=editStudentnameSuccessFunction
          );
    }
}

for (const classroom of simpleClasslist) {
    const classname = classroom.name;
    const classcode = classroom.classcode;
    const classroomId = classroom.id;
    addClassnavClass(classcode, classname, addFunctions=true, classId=classroomId);
}
