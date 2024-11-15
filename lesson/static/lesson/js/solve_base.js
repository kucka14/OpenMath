
const solvebox = document.querySelector('#solvebox');
const solveinput = document.querySelector('#solveinput');
const activateRegion = document.querySelector('#solve-footer-center');

function setRestartInstructions() {
    let commandKey = 'Alt';
    if (isMac) {
        commandKey = 'Cmd';
    }
    let text = `Ctrl-${commandKey}-Y to<br>Restart Section`;
    if (solveLevel[1] === 0) {
        if (solveLevel[0] === 0) {
            text = "Let's go!";
        } else {
            text = `Ctrl-${commandKey}-Y to<br>Go Back Section`;
        }
    }
    const returnText = `
        <div style="width: 100%; text-align: left;">
            ${text}
        </div>
    `
    return returnText;
}

function restartSection(e) {
    function mainRestart() {
        if (solveLevel[0] !== 0 || solveLevel[1] !== 0) {
            e.preventDefault();
            e.stopPropagation();
            if (solveLevel[1] === 0) {
                solveLevel = [solveLevel[0] - 1, 0];
                restartCurrent = true;
            } else {
                solveLevel = [solveLevel[0], 0];
            }
            startSectionReset();
            document.querySelector('#solvebox-longtext-input').value = '';
            genSetFunction();
            setSolveRest();
            if (document.querySelector('#solve-preinstructions').style.display === 'none') {
                activateSolveScreen();
            } else {
                activateRestScreen()
            }
        }
    }
    if (isMac) {
        if (e.ctrlKey && e.metaKey && e.key === 'y') {
            mainRestart();
        }
    } else {
        if (e.ctrlKey && e.altKey && keyMap['y'] === -1) {
            mainRestart();
        }
    }
}

function solveAnimation() {
    let target = '';
    if (document.querySelector('#solvebox-container').style.display === 'flex') {
        target = solvebox;
    } else if (document.querySelector('#solvebox-longtext').style.display === 'flex') {
        target = document.querySelector('#solvebox-longtext-text');
    }
    if (target !== '') {
        target.innerHTML = `
            <div class="spinner-border" style="color: ${colorDict['primary-blue']};" role="status"></div>
        `;
    }
}

function solveScroll(e) {
    const scrollRegion = document.querySelector('#solvebox');
    if (e.key === 'ArrowUp') {
        scrollRegion.scrollBy({
            top: -20,
            bottom: 0,
            behavior: 'smooth'
        });
    }
    if (e.key === 'ArrowDown') {
        scrollRegion.scrollBy({
            top: 20,
            bottom: 0,
            behavior: 'smooth'
        });
    }
}

let latexLocked = false;
let latexTimeout = '';
function renderLatex() {
    const latexValue = '\\[' + solveinput.value + '\\]';
    setTimeout(function() {
        document.querySelector('#solvelatexbox').innerHTML = latexValue;
        setTimeout(function() {MathJax.typeset();});
    });
}

function renderLatexDelay() {
    if (latexTimeout === '') {
        renderLatex();
        latexTimeout = 'delay';
    } else {
        clearTimeout(latexTimeout);
        latexTimeout = setTimeout(function() {
            renderLatex();
            latexTimeout = '';
        }, 1000);
    }
}

function latexLock(e) {
    const normalInput = document.querySelector('#solveinputbox');
    const latexInput = document.querySelector('#solvelatexbox');
    if (keyMap['x'] === -1) {
        if (!e.repeat) {
            latexLocked = true;
            document.removeEventListener('keydown', displayLatex);
            document.removeEventListener('keyup', displayLatex);
            normalInput.style.display = 'flex';
            solveinput.addEventListener('input', renderLatexDelay);
            document.addEventListener('keydown', function unlockLatex(e) {
                if (e.ctrlKey && keyMap[' '] === -1 && keyMap['x'] === -1) {
                    if (!e.repeat) {
                        latexLocked = false;
                        latexInput.style.display = 'none';
                        solveinput.removeEventListener('input', renderLatexDelay);
                        document.removeEventListener('keydown', unlockLatex);
                        document.addEventListener('keydown', displayLatex);
                        document.addEventListener('keyup', displayLatex);
                    }
                }
            });
        }
    }
}

function displayLatex(e) {
    const normalInput = document.querySelector('#solveinputbox');
    const latexInput = document.querySelector('#solvelatexbox');
    if (e.ctrlKey && keyMap[' '] === -1) {
        if (!e.repeat) {
            normalInput.style.display = 'none';
            latexInput.style.display = 'flex';
            renderLatexDelay();
            document.addEventListener('keydown', latexLock);
        }
    } else {
        normalInput.style.display = 'flex';
        latexInput.style.display = 'none';
        document.removeEventListener('keydown', latexLock);
    }
}

// This function is not currently being used
function disableShortcuts() {
    if (document.body.getAttribute('keyshortcuts') === 'active') {
        document.removeEventListener('keydown', solveScroll);
        document.removeEventListener('keydown', restartSection);
        document.removeEventListener('keydown', displayLatex);
        document.removeEventListener('keyup', displayLatex);
    }
}

function startSessionTime() {
    if (sessionInterval === '') {
        sessionInterval = setInterval(function() {
            totalWorkTime += 1;
            sessionWorkTime += 1;
        }, 1000);
        updateActivity('active');
    }
}

function pauseSessionTime() {
    clearInterval(sessionInterval);
    sessionInterval = '';
    updateActivity('inactive');
}

function updateSessionTime() {
    const totalWorktimeDisplay = secondsToClock(totalWorkTime);
    const sessionWorktimeDisplay = secondsToClock(sessionWorkTime);
    document.querySelector('#total-worktime-div').innerHTML = totalWorktimeDisplay;
    document.querySelector('#session-worktime-div').innerHTML = sessionWorktimeDisplay;
}

function activateSolveScreen() {
    document.querySelector('#solve-preinstructions').style.display = 'none';
    document.querySelector('#solvebox-container').style.display = 'flex';
    document.querySelector('#solvebox-longtext').style.display = 'none';
    document.querySelector('#solve-header').style.display = 'none';
    document.querySelector('#solve-header-active').style.display = 'flex';
    solveinput.focus();
    activateRegion.style.display = 'flex';
    activateRegion.style.backgroundColor = colorDict['off-black-1'];
    activateRegion.style.color = colorDict['off-black-1'];
    document.addEventListener('keydown', solveScroll);
    document.addEventListener('keydown', restartSection);
    if (!latexLocked) {
        document.addEventListener('keydown', displayLatex);
        document.addEventListener('keyup', displayLatex);
    }
    document.body.setAttribute('keyshortcuts', 'active');
    resizeSolvebox();
    startSessionTime();
    if (setFunctionWaiting) {
        genSetFunction(save=false);
        setFunctionWaiting = false;
    }
}

function activateRestScreen() {
    document.querySelector('#solve-preinstructions').style.display = 'flex';
    document.querySelector('#solvebox-container').style.display = 'none';
    document.querySelector('#solvebox-longtext').style.display = 'none';
    document.querySelector('#solve-header').style.display = 'flex';
    document.querySelector('#solve-header-active').style.display = 'none';
    activateRegion.style.display = 'flex';
    activateRegion.style.backgroundColor = colorDict['primary-blue'];
    activateRegion.style.color = colorDict['off-black-1'];
    document.removeEventListener('keydown', solveScroll);
    document.removeEventListener('keydown', restartSection);
    if (!latexLocked) {
        document.removeEventListener('keydown', displayLatex);
        document.removeEventListener('keyup', displayLatex);
    }
    document.body.setAttribute('keyshortcuts', 'inactive');
    pauseSessionTime();
    updateSessionTime();
}

function activateLongtextScreen() {
    document.querySelector('#solve-preinstructions').style.display = 'none';
    document.querySelector('#solvebox-container').style.display = 'none';
    document.querySelector('#solvebox-longtext').style.display = 'flex';
    startSessionTime();
    if (setFunctionWaiting) {
        genSetFunction(save=false);
        setFunctionWaiting = false;
    }
}

function setSolveRest() {
    document.querySelector('#solvebox-longtext').onmouseleave = function() {};
    document.querySelector('#solvebox-longtext').onmouseenter = function() {};
    activateRegion.onclick = function() {
        activateSolveScreen();
    }
    activateRegion.onmouseleave = function() {
        activateRestScreen();
    }
}

function setLongtextRest(confetti=false) {

    activateRegion.onmouseleave = function() {};
    activateRegion.onclick = function() {};
    activateRegion.style.display = 'none';

    const longtextBox = document.querySelector('#solvebox-longtext');

    function focus() {
        document.querySelector('#solve-header').style.display = 'none';
        document.querySelector('#solve-header-active').style.display = 'flex';
        longtextBox.style.opacity = '1';
    }
    function unfocus() {
        document.querySelector('#solve-header').style.display = 'flex';
        document.querySelector('#solve-header-active').style.display = 'none';
        longtextBox.style.opacity = '0.5';
    }
    function mainSet() {
        unfocus();
        longtextBox.addEventListener('mouseover', function moveFocus() {
            focus();
            this.removeEventListener('mouseover', moveFocus);
        });
        longtextBox.onmouseenter = focus;
        longtextBox.onmouseleave = unfocus;
    }
    function unSet() {
        longtextBox.onmouseenter = function() {};
        longtextBox.onmouseleave = function() {};
    }
    if (confetti) {
        unSet();
        focus();
        setTimeout(function() {
            startConfetti();
            const tempInt = setInterval(function() {
                const scd = document.querySelector('#solve-confetti-div');
                scd.style.opacity -= 0.01;
                if (scd.style.opacity <= 0) {
                    clearTimeout(tempInt);
                    endConfetti();
                    mainSet();
                }
            }, 50);
            document.body.addEventListener('click', function clickClear() {
                clearInterval(tempInt);
                endConfetti();
                mainSet();
                document.body.removeEventListener('click', clickClear);
            });
        }, 1000);
    } else {
        mainSet();
    }

}
