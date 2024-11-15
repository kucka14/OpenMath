
sessionStorage.removeItem('recentSignlog');

document.querySelector('#logout-button').onclick = function() {
    sessionStorage.clear();
}

const sideNavs = document.getElementsByClassName('sidebar-nav');

function setSideNavs() {
    for (let i = 0; i < sideNavs.length; i++) {
        const target = sideNavs[i];
        target.style.color = 'black';
        target.onmouseover = function() {
            this.style.color = 'white';
        }
        target.onmouseleave = function() {
            this.style.color = 'black';
        }
        target.setAttribute('data-active', 'false');
    }
}

function activatePanel(panelId) {
    const dashPanels = document.getElementsByClassName('dash-panel');
    for (let i = 0; i < dashPanels.length; i++) {
        dashPanels[i].style.display = 'none';
    }
    document.getElementById(panelId).style.display = 'flex';
}

function activateSideNav(sideNavIndex) {
    const sideNav = sideNavs[sideNavIndex];
    setSideNavs();
    sideNav.style.color = 'white';
    sideNav.onmouseleave = function() {
        this.style.color = 'white';
    }
    sideNav.setAttribute('data-active', 'true');
    const panelId = sideNav.getAttribute('data-target');
    activatePanel(panelId);
    if (panelId === 'classroom-panel' && usertype === 't') {
        window.onresize = placeDisplayBorder;
    } else if (panelId === 'home-panel') {
        const containerDiv = document.querySelector('#home-bottom-left');
        window.onresize = function() {
            resizeText(containerDiv);
        }
        resizeText(containerDiv);
    }
}

for (let i = 0; i < sideNavs.length; i++) {
    const sideNav = sideNavs[i];
    sideNav.onclick = function() {
        if (this.getAttribute('data-active') === 'false') {
            activateSideNav(i);
        }
        return false;
    }
}

if (isNewUser && (usertype === 's12')) {
    setTimeout(function() {
        activateSideNav(2);
        document.querySelector('#s12-welcome-password').innerHTML = picturePassword;
        setTimeout(function() {
            document.querySelector('#s12-welcome-modal-trigger').click();
        }, 500);
    });
} else {
    setTimeout(function() {
        activateSideNav(0);
        if (isNewUser && (usertype === 't')) {
            setTimeout(function() {
                document.querySelector('#welcome-modal-trigger').click();
            }, 500);
        }
    });
}

if (usertype === 't') {
    document.querySelector('#dropdown-tour-link').onclick = function() {
        document.querySelector('#welcome-modal-trigger').click();
        return false;
    }
    document.querySelector('#start-tour-button').onclick = function() {
        startTeacherTour();
    }
}

document.querySelector('#username-button').onclick = function() {
    activateSideNav(2);
    return false;
}

function addSequenceButtonFunctions() {
    const sequenceButtons = document.getElementsByClassName('sequence-button');
    for (let i = 0; i < sequenceButtons.length; i++) {
        const button = sequenceButtons[i];
        button.onclick = function() {
            document.querySelector('#non-solve-container').style.display = 'none';
            document.querySelector('#solve-container').style.display = 'block';
            const lessonName = this.getAttribute('data-nickname');
            startLesson(lessonName, setFunctions[lessonName][0]);
            if (usertype === 't') {
                if (progressSocket !== '') {
                    currentClass = '';
                    displayTarget.innerHTML = '';
                    if (progressSocket.readyState !== WebSocket.CLOSING) {
                        progressSocket.close();
                    }
                }
            }
        }
    }
}

document.querySelector('#exit-solve').onclick = function() {
    document.querySelector('#non-solve-container').style.display = 'block';
    document.querySelector('#solve-container').style.display = 'none';
    solveSave(currentLesson, sendLiveUpdate=false);
    if (currentSubLessonDict !== '') {
        updateGridProgress(currentSubLessonDict);
    }
    classroomDisconnect();
    return false;
}

function confirmAction(message, confirmFunction) {
    document.querySelector('#confirm-action-trigger').click();
    document.querySelector('#confirm-action-message').innerHTML = message;
    function confirmSubmit() {
        document.querySelector('#confirm-action-dismiss').click();
        confirmFunction();
    }
    const dismissButton = document.querySelector('#confirm-action-dismiss');
    dismissButton.onclick = function() {
        confirmButton.removeEventListener('click', confirmSubmit);
    }
    const confirmButton = document.querySelector('#confirm-action-submit');
    confirmButton.addEventListener('click', confirmSubmit);
}

const dashImageDiv = document.querySelector('#home-top');
const dashImageList = [
                       ['road2.jpg', colorDict['blue-black']],
                       ['mountains.jpg', 'white'],
                       ['space.jpg', 'white'],
                       ['cubes.jpg', 'white'],
                       ['fractal.jpg', 'white'],
                       ['sunset.jpg', 'white'],
                       ['trees.jpg', 'white']
                    ]
let imageCounter = 0;
function dashImageFlip() {
    sideNavs[0].click();
    if (imageCounter >= dashImageList.length) {
        imageCounter = 0;
    }
    dashImageDiv.style.backgroundImage = `url("static/lesson/images/dash/${dashImageList[imageCounter][0]}")`;
    const sequenceLines = document.getElementsByClassName('sequence-lines');
    for (const sL of sequenceLines) {
        sL.style.borderColor = dashImageList[imageCounter][1];
    }
    imageCounter += 1;
}

document.querySelector('#dash-image-flip').onclick = function() {
    dashImageFlip();
    return false;
}
dashImageFlip();

setTimeout(function() {document.getElementById('home-nav-button-' + 'arithmetic').click();});
