
const arrowLeftTour = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
    </svg>
`;

const arrowRightTour = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
    </svg>
`;

function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

function spotlightDiv(targetId, text, extraMargin=0, popDirection='below') {

    const target = document.getElementById(targetId);

    const coords = getCoords(target);
    const top = coords['top'];
    const left = coords['left'];
    const targetWidth = target.offsetWidth;
    const targetHeight = target.offsetHeight;
    const fullHeight = document.body.clientHeight;
    const fullWidth = document.body.clientWidth;

    const spotlightDiv = document.createElement('div');
    spotlightDiv.style.left = '0';
    spotlightDiv.style.top = '0';
    spotlightDiv.style.width = fullWidth.toString() + 'px';
    spotlightDiv.style.height = fullHeight.toString() + 'px';
    spotlightDiv.style.position = 'absolute';
    spotlightDiv.style.zIndex = '2';
    spotlightDiv.style.borderLeft = (left - extraMargin).toString() + 'px';;
    spotlightDiv.style.borderTop = (top - extraMargin).toString() + 'px';
    spotlightDiv.style.borderRight = (fullWidth - left - targetWidth - extraMargin).toString() + 'px';
    spotlightDiv.style.borderBottom = (fullHeight - top - targetHeight - extraMargin).toString() + 'px';
    spotlightDiv.style.borderColor = 'black';
    spotlightDiv.style.borderStyle = 'solid';
    spotlightDiv.style.opacity = 0.7;
    spotlightDiv.id = 'temp-spotlight-div';
    document.body.appendChild(spotlightDiv);

    const popupDiv = document.createElement('div');
    popupDiv.style.position = 'absolute';
    popupDiv.style.zIndex = '10';
    popupDiv.style.maxWidth = '300px';
    popupDiv.style.backgroundColor = 'white';
    popupDiv.style.marginRight = '3px';
    popupDiv.style.padding = '10px';
    popupDiv.style.borderRadius = '5px';
    popupDiv.innerHTML = text;
    popupDiv.id = 'temp-popup-div';
    popupDiv.classList.add('shadowed-med-dark');
    popupDiv.style.border = '1px solid gray';

    popupDivLeft = left - extraMargin;
    if (popupDivLeft <= 3) {
        popupDivLeft = 3;
    }

    if (popDirection === 'below') {
        popupDiv.style.top = (top + targetHeight + extraMargin + 5).toString() + 'px';
        popupDiv.style.left = popupDivLeft.toString() + 'px';
    } else if (popDirection === 'above') {
        popupDiv.style.bottom = (fullHeight - top + extraMargin + 5).toString() + 'px';
        popupDiv.style.left = popupDivLeft.toString() + 'px';
    } else if (popDirection === 'right') {
        popupDiv.style.left = (popupDivLeft + targetWidth + extraMargin * 2 + 5).toString() + 'px';
        popupDiv.style.top = (top - 30).toString() + 'px';
    } else if (popDirection === 'left') {
        popupDiv.style.left = (popupDivLeft - 300 - extraMargin + 5).toString() + 'px';
        popupDiv.style.top = top.toString() + 'px';
    } else {
        if (popDirection[0] !== '') {
            popupDiv.style.left = popDirection[0];
        }
        if (popDirection[1] !== '') {
            popupDiv.style.top = popDirection[1];
        }
        if (popDirection[2] !== '') {
            popupDiv.style.right = popDirection[2];
        }
        if (popDirection[3] !== '') {
            popupDiv.style.bottom = popDirection[3];
        }
    }

    document.body.appendChild(popupDiv);
    if (popupDiv.clientWidth < 140) {
        popupDiv.style.left = 'auto';
        popupDiv.style.right = '3px';
    }
}

function removeSpotlightDiv() {
    prevSpotlightDiv = document.querySelector('#temp-spotlight-div');
    prevPopupDiv = document.querySelector('#temp-popup-div');
    if (prevSpotlightDiv !== null) {
        prevSpotlightDiv.remove();
        prevPopupDiv.remove();
    }
}

function endTutorial() {
    removeSpotlightDiv();
    document.removeEventListener('keydown', navigateTutorial);
    window.onresize = {};
}

function navigateTutorial(event) {
    const forwardTarget = document.querySelector('#tutorial-clickforward');
    const backwardTarget = document.querySelector('#tutorial-clickback');
    if (event.keyCode === 37 && backwardTarget !== null) {
        backwardTarget.click();
    }
    else if (event.keyCode === 39 && forwardTarget !== null) {
        forwardTarget.click();
    }
}

function completeShowSpotlightDiv(tutorialCount, targetList, textList, directionList) {
    const popupNav = `
                        <div style='margin-bottom: 4px;'>
                            ${textList[tutorialCount]}
                        </div>
                        <div style='display: flex; justify-content: space-between;'>
                            <div>
                                <button class="btn btn-primary btn-sm standard-button" onclick="endTutorial();" style='margin-right: 4px;'>Exit</button>
                            </div>
                            <div>
                                <button class="btn btn-primary btn-sm standard-button" id="tutorial-clickback" onclick='showSpotlightDiv(${tutorialCount - 1}, targetList, textList, directionList=directionList);'>${arrowLeftTour}</button>
                                <button class="btn btn-primary btn-sm standard-button" id="tutorial-clickforward" onclick='showSpotlightDiv(${tutorialCount + 1}, targetList, textList, directionList=directionList);'>${arrowRightTour}</button>
                            </div>
                        </div>
                    `;
    let popDirection = 'below';
    if (directionList.length > 0) {
        popDirection = directionList[tutorialCount];
    }

    spotlightDiv(targetList[tutorialCount], popupNav, extraMargin=10, popDirection=popDirection);
    window.onresize = function() {
        removeSpotlightDiv();
        spotlightDiv(targetList[tutorialCount], popupNav, extraMargin=10, popDirection=popDirection);
    };
}

let previousTutorialCount = -1;
function showSpotlightDiv(tutorialCount, targetList, textList, directionList) {
    if (tutorialCount < 0) {
        tutorialCount = 0;
    } else if (tutorialCount >= targetList.length) {
        removeSpotlightDiv();
        setTimeout(function() {
            flashAlert('Thanks for taking the tour. Please email us if you have any questions.');
        });
        return;
    }
    if (tutorialCount !== previousTutorialCount) {
        removeSpotlightDiv();
        let clickList = [5, 7, 11, 13, 14];
        let direction = 'forwards';
        if (tutorialCount < previousTutorialCount) {
            clickList = [5, 6, 10, 12, 14];
            direction = 'backwards';
        }
        if ((clickList.includes(tutorialCount)) || (tutorialCount === 0 && document.querySelector('#home-panel').style.display === 'none')) {
            setTimeout(function() {
                if (tutorialCount === 0 && document.querySelector('#home-panel').style.display === 'none') {
                    document.querySelector('#sidebar-block-link-home').click();
                } else if (tutorialCount === clickList[0]) {
                    if (direction === 'forwards') {
                        document.querySelector('#profile-link').click();
                    } else {
                        document.querySelector('#profile-link').click();
                    }
                } else if (tutorialCount === clickList[1]) {
                    if (direction === 'forwards') {
                        document.querySelector('#sidebar-block-link-classroom').click();
                    } else {
                        document.querySelector('#sidebar-block-link-home').click();
                    }
                } else if (tutorialCount === clickList[2]) {
                    if (direction === 'forwards') {
                        document.querySelector('#sidebar-block-link-settings').click();
                    } else {
                        document.querySelector('#sidebar-block-link-classroom').click();
                    }
                } else if (tutorialCount === clickList[3]) {
                    if (direction === 'forwards') {
                        document.querySelector('#sidebar-block-link-home').click();
                    } else {
                        document.querySelector('#sidebar-block-link-settings').click();
                    }
                } else if (tutorialCount === clickList[4]) {
                    if (direction === 'forwards') {
                        document.querySelector('#profile-link').click();
                    } else {
                        document.querySelector('#profile-link').click();
                    }
                }
                setTimeout(function() {
                    completeShowSpotlightDiv(tutorialCount, targetList, textList, directionList);
                }, 200);
            });

        } else {
            completeShowSpotlightDiv(tutorialCount, targetList, textList, directionList);
        }
        previousTutorialCount = tutorialCount;
    }
}

function startTeacherTour(startCount=0) {

    document.addEventListener('keydown', navigateTutorial);

    targetList = [
        'sequence-container',
        'sidebar-block-home',
        'sidebar-block-classroom',
        'sidebar-block-settings',
        'sidebar-profile',
        'dropdown-collection-link',
        'sidebar-block-classroom',
        'name-classroom-trigger',
        'join-classroom-trigger',
        'classroom-display',
        'sidebar-block-settings',
        'display-name-edit-link',
        'sidebar-block-home',
        'sidebar-profile',
        'dropdown-tour-link',
    ];

    textList = [
        'These are the lessons. Your students will see the same thing. But unlike you, they will only be able to access the blue, unlocked lessons.',
        'This is the button you will click to navigate to the current page, where the lessons are.',
        'This is the button you will click to navigate to the classroom page, where you can create classes, add students, and view student progress.',
        'This is the button you will click to navigate to the settings page, where you can change your username, password, and set your preferences.',
        'This button opens a number of additional options.',
        'This button will take you to the OpenMath.US question collection, where you can find great math questions for any grade level.',
        'Continue the tour to see how to create and manage classrooms.',
        'Use this button to create new classes. Students will be able to join with a classcode, and then you can monitor their progress on lessons.',
        'Use this button to join a class yourself, either as a student or a co-teacher.',
        // 'Students will appear here once you have classes. Please watch the introductory video to learn more about classrooms.',
        'Students will appear here once you have classes.',
        'Continue the tour to see what options are available in Settings.',
        'Click here to change your display name. This name will appear throughout the site and to other teachers and students, but you will still login with your username.',
        'Continue the tour to find out how to contact us.',
        'Once again, this button will open up additional options.',
        // 'Last of all, come here to take the tour again, watch the introductory video, or reach out to us by email. Enjoy the site!'
        'Last of all, come here to take the tour again, or reach out to us by email. Enjoy the site!'
    ];

    directionList = [
        'below',
        'below',
        'right',
        'right',
        ['5px', '', '', '75px'],
        'right',
        'right',
        'above',
        'above',
        'left',
        'right',
        'below',
        'right',
        ['5px', '', '', '75px'],
        'right',
    ];

    showSpotlightDiv(startCount, targetList, textList, directionList);
}
