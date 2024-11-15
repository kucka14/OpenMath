
let keyMap = {};
const unkeyList = ['Alt', 'Control', 'Meta', 'Shift'];

function updateKeymap(e) {
    if (!unkeyList.includes(e.key)) {
        const currentKey = e.key.toLowerCase();
        let keyQuery = keyMap[currentKey];
        if (e.type === 'keydown') {
            if (keyQuery === undefined || keyQuery === -1) {
                keyMap[currentKey] = -1;
            } else {
                keyMap[currentKey] -= 1;
            }
        } else if (e.type === 'keyup') {
            if (keyQuery === undefined || keyQuery === 1) {
                keyMap[currentKey] = 1;
            } else {
                keyMap[currentKey] += 1;
            }
        }
    }
}
document.addEventListener('keydown', updateKeymap);
document.addEventListener('keyup', updateKeymap);

function getAllKeydowns() {
    let keydownList = [];
    for (const key in keyMap) {
        if (keyMap[key] === -1) {
            keydownList.push(key);
        }
    }
    return keydownList;
}

let casedUsername = JSON.parse(document.getElementById('cased_username').textContent);
const userId = JSON.parse(document.getElementById('user_id').textContent);
let progressDict = JSON.parse(document.getElementById('progress_dict').textContent);
let overrideList = JSON.parse(document.getElementById('override_list').textContent);
const isNewUser = JSON.parse(document.getElementById('is_new_user').textContent);
const usertype = JSON.parse(document.getElementById('usertype').textContent);
const enrolledDict = JSON.parse(document.getElementById('enrolled_dict').textContent);
let displayname = JSON.parse(document.getElementById('display_name').textContent);
let picturePassword = JSON.parse(document.getElementById('picture_password').textContent);
const omIsDevEnv = JSON.parse(document.getElementById('om_is_dev_env').textContent);
let currentSetFunction = '';
let currentLesson = '';
let currentSubLessonDict = '';
let requestRefreshCount = JSON.parse(sessionStorage.getItem('requestRefreshCount'));
if (requestRefreshCount === null) {
    requestRefreshCount = 0;
    sessionStorage.setItem('requestRefreshCount', requestRefreshCount);
}

const dashAnimation = new Vivus('golden-ratio-spiral', {
                                type: 'oneByOne',
                                duration: 500,
                            }, function() {
                                document.querySelector('#home-bottom-right-inner-cover').style.opacity = '1';
                                document.querySelector('#home-bottom-right-inner').style.opacity = '0.9';
                            }
                        );
dashAnimation.stop().reset();
dashAnimation.play();
document.querySelector('#home-bottom-right').onclick = function() {
    document.querySelector('#home-bottom-right-inner-cover').style.opacity = '0';
    document.querySelector('#home-bottom-right-inner').style.opacity = '1';
    dashAnimation.reset().play();
}

function makeGridBase(columnNumber) {
    const bigTableRows = document.getElementsByClassName('big-table-row');
    for (let i = 0; i < bigTableRows.length; i++) {
        const row = bigTableRows[i];
        row.innerHTML = '';
        let rowText = '';
        const dataY = row.getAttribute('dataY');
        for (let j = 0; j < columnNumber; j++) {
            const cellId = 'b' + j.toString() + dataY;
            const cellText = `
                              <td class="big-cell" id="${cellId}"></td>
                            `
            rowText = rowText.concat(cellText);
        }
        row.innerHTML = rowText;
    }
    const smallTableRows = document.getElementsByClassName('small-table-row');
    for (let i = 0; i < smallTableRows.length; i++) {
        const row = smallTableRows[i];
        row.innerHTML = '';
        let rowText = '';
        const smallColumnNumber = columnNumber * 2;
        const dataY = row.getAttribute('dataY');
        for (let j = 0; j < smallColumnNumber; j++) {
            const cellId = 's' + j.toString() + dataY;
            const cellText = `
                              <td class="small-cell" id="${cellId}"></td>
                            `
            rowText = rowText.concat(cellText);
        }
        row.innerHTML = rowText;
    }
    const containerWidth = columnNumber * 120; //if change this, must change css widths as well
    document.querySelector('#sequence-container').style.width = containerWidth.toString() + 'px';
}

function getSmallBox(x, y) {
    const smallBoxId = 's' + x.toString() + y.toString();
    const smallBox = document.getElementById(smallBoxId);
    return smallBox;
}

function drawSequencePath(startX, startY, endX, endY) {
    const pathType = '2px solid ' + colorDict['blue-black'];
    const lowerRightx = (startX * 2) + 1;
    const lowerRighty = startY * 2;
    const lowerRight = getSmallBox(lowerRightx, lowerRighty);
    lowerRight.style.borderTop = pathType;
    lowerRight.classList.add('sequence-lines');

    const yDelta = (endY - startY) * 2;
    if (yDelta < 0) {
        const yChange = Math.abs(yDelta);
        lowerRight.style.borderRight = pathType;
        for (let i = 1; i <= yChange - 1; i++) {
            const target = getSmallBox(lowerRightx, lowerRighty - i);
            target.style.borderRight = pathType;
            target.classList.add('sequence-lines');
        }
    } else if (yDelta > 0) {
        for (let i = 1; i <= yDelta; i++) {
            const target = getSmallBox(lowerRightx, lowerRighty + i);
            target.style.borderRight = pathType;
            target.classList.add('sequence-lines');
        }
    }

    const xDelta = ((endX - startX) * 2) - 1;
    for (let i = 1; i <= xDelta; i++) {
        const target = getSmallBox(lowerRightx + i, endY * 2);
        target.style.borderTop = pathType;
        target.classList.add('sequence-lines');
    }

}

function getColumnNumber(subLessonDict) {
    let highX = 0;
    for (const lesson in subLessonDict) {
        const newX = subLessonDict[lesson]['x-position'];
        if (newX > highX) {
            highX = newX;
        }
    }
    return highX + 1;
}

function listToGrid(subLessonDict) {
    const columnNumber = getColumnNumber(subLessonDict);
    makeGridBase(columnNumber);
    for (const nickname in subLessonDict) {
        const xPos = subLessonDict[nickname]['x-position'];
        const yPos = subLessonDict[nickname]['y-position'];
        const targetId = 'b' + xPos.toString() + yPos.toString();
        const target = document.getElementById(targetId);
        const button = document.createElement('button');
        const buttonId = targetId + 'b';
        button.classList.add('sequence-button');
        if (usertype !== 't') {
            button.disabled = true;
        }
        button.id = buttonId;
        button.innerHTML = subLessonDict[nickname]['button_name'];
        button.title = subLessonDict[nickname]['full_name'];
        button.setAttribute('data-nickname', nickname);
        target.appendChild(button);

        const prereqs = subLessonDict[nickname]['prereqs'];
        for (let i = 0; i < prereqs.length; i++) {
            const endNickname = prereqs[i];
            const xPosStart = subLessonDict[endNickname]['x-position'];
            const yPosStart = subLessonDict[endNickname]['y-position'];
            drawSequencePath(xPosStart, yPosStart, xPos, yPos);
        }
    }
}

function checkPrereqs(lesson, progressList) {
    const prereqs = lessonDict[lesson]['prereqs'];
    if (prereqs.length === 0) {
        return true;
    } else {
        for (let i = 0; i < prereqs.length; i++) {
            const prereq = prereqs[i];
            if (progressList.includes(prereq) === false) {
                return false;
            } else {
                if (checkPrereqs(prereq, progressList) === false) {
                    return false;
                }
            }
        }
        return true;
    }
}

function completedKeysToList(dict) {
    let newList = [];
    for (const key in dict) {
        if (dict[key]['lessonComplete']) {
            newList.push(key);
        }
    }
    return newList;
}

function updateGridProgress(subLessonDict) {
    const lessonList = dictKeysToList(subLessonDict);
    const progressList = completedKeysToList(progressDict);
    for (let i = 0; i < lessonList.length; i++) {
        const lesson = lessonList[i];
        if ((checkPrereqs(lesson, progressList)) || overrideList.includes(lesson)) {
            const xPos = subLessonDict[lesson]['x-position'];
            const yPos = subLessonDict[lesson]['y-position'];
            const targetId = 'b' + xPos.toString() + yPos.toString() + 'b';
            const target = document.getElementById(targetId);
            target.disabled = false;
            let color = 'green';
            if (progressDict[lesson] !== undefined) {
                if (progressDict[lesson]['lessonComplete']) {
                     color = 'blue';
                     target.style.border = `2px solid ${colorDict['gray3']}`;
                     if (!target.title.includes('Complete')) {
                         target.title = target.title + ' (Complete)';
                     }
                } else if (!arraysEqual(progressDict[lesson]['solveLevel'], [0, 0])) {
                    target.style.border = '2px solid orange';
                }
            }
            target.style.backgroundImage = `linear-gradient(to bottom right, ${color} 0%, ${color} 40%, black 100%)`;
        }
    }
}

for (const unit of orderedUnitKeys) {
    const homeNavButton = document.createElement('button');
    homeNavButton.classList.add('sequence-nav-button');
    homeNavButton.classList.add('btn');
    homeNavButton.classList.add('btn-sm');
    homeNavButton.classList.add('btn-outline-secondary');
    homeNavButton.id = 'home-nav-button-' + unit;
    homeNavButton.innerHTML = unitDict[unit]['button_name'];
    const subLessonDict = unitDict[unit]['subLessonDict'];
    homeNavButton.onclick = function() {
        listToGrid(subLessonDict);
        updateGridProgress(subLessonDict);
        currentSubLessonDict = subLessonDict;
        for (const button of document.querySelectorAll('.sequence-nav-button')) {
            button.style.color = 'gray';
            button.style.borderColor = 'gray';
        }
        this.style.color = 'black';
        this.style.borderColor = 'black';
        addSequenceButtonFunctions();
    }
    document.querySelector('#home-nav-box').appendChild(homeNavButton);
}
