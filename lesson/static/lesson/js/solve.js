
document.querySelector('#solve-fullscreen-toggle').onclick = function() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
        this.innerHTML = 'Exit Full Screen';
        setTimeout(function() {
            document.addEventListener('fullscreenchange', function fullscreenEscape() {
                document.querySelector('#solve-fullscreen-toggle').innerHTML = 'Go To Full Screen';
                document.removeEventListener('fullscreenchange', fullscreenEscape);
            });
        }, 500);
    }
    else {
        cancelFullScreen.call(doc);
        this.innerHTML = 'Go To Full Screen';
    }
}

function logRep(questionInfo) {
    repeatTracklist[0] = questionInfo;
}

function checkRep(questionInfo) {
    for (const item of repeatTracklist[1]) {
        if (typeof(questionInfo) === 'object') {
            if (arraysEqual(item, questionInfo)) {
                return true;
            }
        } else {
            if (item === questionInfo) {
                return true;
            }
        }
    }
    return false;
}

function logCheckRep(returnAnswer, questionInfo, ownFunction, arg1='', arg2='') {
    logCheckCount += 1;
    if (checkRep(questionInfo) && logCheckCount < 10) {
        if (arg1 === '') {
            return ownFunction();
        } else if (arg2 === '') {
            return ownFunction(arg1);
        } else {
            return ownFunction(arg1, arg2);
        }
    } else {
        logCheckCount = 0;
        logRep(questionInfo);
        return returnAnswer;
    }
}

function addListener(eventType, actionFunction, target=document) {
    listenerList.push([target, eventType, actionFunction]);
    target.addEventListener(eventType, actionFunction);
}

function removeListeners() {
    for (const listenerTriplet of listenerList) {
        listenerTriplet[0].removeEventListener(listenerTriplet[1], listenerTriplet[2]);
    }
    listenerList = [];
}

function updateLessonProgress(newlessonProgressLevel) {
    if ((lessonProgressLevel !== 100) && (newlessonProgressLevel !== '')) {
        lessonProgressLevel = newlessonProgressLevel;
    }
}

//for grid positioning, treat as if it was width-px x height-px
function initSolveCanvas(width, height, renderMathjax=false) {
    solvebox.innerHTML = `
        <div id="standard-canvas-container" style="max-height: 100%;">
            <div id="standard-canvas-header"></div>
            <canvas id="standard-solve-canvas" width="${width}" height="${height}">
            </canvas>
        </div>
    `;
    const canvas = document.querySelector('#standard-solve-canvas');
    if (renderMathjax) {
        document.querySelector('#standard-canvas-container').classList.add('tex2jax_process');
    }
    return canvas;
}

function clearStartCanvas(width, height, styleHeight=[], renderMathjax=false) {
    let canvas = document.querySelector('#standard-solve-canvas');
    if (canvas === null || canvas.width !== width || canvas.height !== height) {
        canvas = initSolveCanvas(width, height, renderMathjax);
    } else {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!renderMathjax) {
            document.querySelector('#standard-canvas-container').classList.remove('tex2jax_process');
        }
    }
    if (styleHeight.length !== 0) {
        resizeOn = false;
        canvas.style.height = styleHeight[0];
        canvas.style.minHeight = styleHeight[1];
    } else {
        resizeOn = true;
    }
    canvas.style.border = 'none';
    return canvas;
}

function initSolveAnimation(renderMathjax=false) {
    let animationDiv = document.querySelector('#standard-solve-animation');
    if (animationDiv === null) {
        solvebox.innerHTML = `
            <div id="standard-animation-container" style="max-height: 100%;">
                <div id="standard-canvas-header"></div>
                <div id="standard-solve-animation"></div>
            </div>
        `;
        animationDiv = document.querySelector('#standard-solve-animation');
    } else {
        animationDiv.innerHTML = '';
    }
    if (renderMathjax) {
        document.querySelector('#standard-animation-container').classList.add('tex2jax_process');
    } else {
        document.querySelector('#standard-animation-container').classList.remove('tex2jax_process');
    }
    return animationDiv;
}

function addCanvasText(text, wide=false, small=false) {
    const target = document.querySelector('#standard-canvas-header');
    target.innerHTML = text;
    if (wide) {
        target.style.maxWidth = '750px';
    } else {
        target.style.maxWidth = '600px';
    }
    if (small) {
        target.style.fontSize = '1rem';
    } else {
        target.style.fontSize = '1.2rem';
    }
}

function resizeSolvebox() {
    if (resizeOn) {
        setTimeout(function() {
            const canvasContainer = document.querySelector('#standard-canvas-container');
            if (canvasContainer !== null) {
                const canvas = document.querySelector('#standard-solve-canvas');
                const header = document.querySelector('#standard-canvas-header');
                canvas.style.height = (solvebox.clientHeight - header.clientHeight - 45) + 'px';
                canvas.style.minHeight = '200px';
            }
            const imageContainer = document.querySelector('#standard-image-container');
            if (imageContainer !== null) {
                const image = document.querySelector('#standard-solve-image');
                const header = document.querySelector('#standard-canvas-header');
                let headerHeight = 0;
                if (header !== null) {
                    headerHeight = header.clientHeight;
                }
                const newHeight = solvebox.clientHeight - headerHeight - 45;
                const imageMaxHeight = image.style.maxHeight;
                if (newHeight < parseInt(imageMaxHeight.slice(0, imageMaxHeight.length - 2)) || imageMaxHeight === 'auto' || imageMaxHeight === '') {
                    image.style.height = newHeight.toString() + 'px';
                } else {
                    image.style.height = imageMaxHeight;
                }
                image.style.minHeight = '50px';
            }
        });
    }
}

function textBlockToList(text) {
    const textList = text.split('\n');
    const newTextList = [];
    for (const line of textList) {
        cleanline = line.trim();
        if (cleanline !== '') {
            newTextList.push(cleanline);
        };
    }
    return newTextList;
}

function placeTextQuestion(questionText, renderMathjax=false, style='paragraph') {
    let textList = questionText;
    if (typeof(questionText) === 'string') {
        textList = textBlockToList(questionText);
    }
    let placeText = '<p>' + textList.join('</p><p>') + '</p>';
    if (style === 'break') {
        placeText = textList.join('<br>');
    }
    solvebox.innerHTML = `
        <div id="solvetext-container" style="max-height: 100%; max-width: 750px;">
            ${placeText}
        </div>
    `;
    if (renderMathjax) {
        document.querySelector('#solvetext-container').classList.add('tex2jax_process');
        setTimeout(function() {MathJax.typeset();});
    }
}

function placeImageQuestion(imageSrc, imageHeight='auto', headerText='', border='none', renderMathjax=false) {
    if (headerText !== '') {
        headerText = `<div id="standard-canvas-header">${headerText}</div>`
    }
    const imageHTML = `<img id="standard-solve-image" style="border: ${border}; max-height: ${imageHeight}" src="${imageSrc}">`;
    const placeText = headerText + imageHTML;
    solvebox.innerHTML = `
        <div id="standard-image-container" style="max-height: 100%;">
            ${placeText}
        </div>
    `;
    if (renderMathjax) {
        document.querySelector('#standard-image-container').classList.add('tex2jax_process');
        setTimeout(function() {MathJax.typeset();});
    }
}

function setBasicBanner(right, left=setRestartInstructions(), center=lessonDict[currentLesson]['full_name']) {
    document.querySelector('#solve-status-left').innerHTML = left;
    document.querySelector('#solve-status-center').innerHTML = center;
    document.querySelector('#solve-status-right').innerHTML = right;
    document.querySelector('#solve-status-right').style.fontStyle = 'italic';
}

function setPmBanner(rightText='Up-Down Round') {
    document.querySelector('#solve-status-left').innerHTML = setRestartInstructions();
    document.querySelector('#solve-status-center').innerHTML = `
        <div class="progress-holder">
            <div class="progress justify-content-end" id="pm-progressbar-left">
                <div id="pm-progress-left" class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%"></div>
            </div>
        </div>
        <div style="background-color: gray; width: 3px;"></div>
        <div class="progress-holder">
            <div class="progress" id="pm-progressbar-right">
                <div id="pm-progress-right" class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%"></div>
            </div>
        </div>
    `;
    document.querySelector('#solve-status-right').innerHTML = rightText;
}

function updatePmBanner(pmPercent) {
    if (pmPercent < 1 && pmPercent > -1) {
        pmPercent *= 100;
    }
    pmProgressLeft = document.querySelector('#pm-progress-left');
    pmProgressRight = document.querySelector('#pm-progress-right')
    if (pmPercent === 0) {
        pmProgressLeft.style.width = '0%';
        pmProgressRight.style.width = '0%';
    } else if (pmPercent > 0) {
        pmProgressLeft.style.width = '0%';
        pmProgressRight.style.width = pmPercent.toString() + '%';
    } else if (pmPercent < 0) {
        pmProgressLeft.style.width = (Math.abs(pmPercent)).toString() + '%';
        pmProgressRight.style.width = '0%';
    }
    document.querySelector('#solve-status-left').innerHTML = setRestartInstructions();
}

function startTimer(duration, target, endArray) {
    var timer = duration, minutes, seconds;
    let firstRound = true;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (!target.innerHTML.includes('af1eaae39224360f99e67f371925f645') && !firstRound) {
            clearInterval(timerInterval);
            timerInterval = '';
        } else {
            target.innerHTML = '<div data-id="af1eaae39224360f99e67f371925f645" style="text-align: right; font-size: 16px;">' + minutes + ":" + seconds + '</div>';

            if (--timer < 0) {
                clearInterval(timerInterval);
                startSectionReset();
                endArray[0](endArray[1], endArray[2]);
            }
        }
        firstRound = false;
    }, 1000);
}

function makeProgressLevelsA(correctMax, lessonProgressMin, lessonProgressMax, baseSolveLevel) {
    const maxSolveLevel = 50 + correctMax;
    const minSolveLevel = 50 - correctMax;
    const progress = Math.round(((solveLevel[1] - 50) / correctMax) * 100);
    if (progress > 100 || progress < -100) {
        return 'reset';
    } else {
        let progressInt = solveLevel[1] - 50;
        let lessonProgressUpdate = ((progress * (lessonProgressMax - lessonProgressMin)) / 100) + lessonProgressMin;
        if (lessonProgressUpdate < lessonProgressMin) {
            lessonProgressUpdate = lessonProgressMin;
        }
        return [minSolveLevel, maxSolveLevel, progress, progressInt, lessonProgressUpdate];
    }
}

function makeProgressLevelsB(correctMax, lessonProgressMin, lessonProgressMax, solveLevelFloor) {
    const maxSolveLevel = solveLevelFloor + correctMax;
    const progress = Math.round(((solveLevel[1] - solveLevelFloor) / correctMax) * 100);
    if (progress > 100) {
        return 'reset';
    } else {
        const progressInt = solveLevel[1] - solveLevelFloor;
        const lessonProgressUpdate = ((progress * (lessonProgressMax - lessonProgressMin)) / 100) + lessonProgressMin;
        return [maxSolveLevel, progress, progressInt, lessonProgressUpdate];
    }
}

function setCountdownBanner(countdownTime, endArray) {
    document.querySelector('#solve-status-left').innerHTML = setRestartInstructions();
    document.querySelector('#solve-status-center').innerHTML = `
        <div class="progress-holder">
            <div class="progress">
                <div id="cd-progress" class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%"></div>
            </div>
        </div>
    `;
    const timerTarget = document.querySelector('#solve-status-right');
    startTimer(countdownTime * 60, timerTarget, endArray);
}

function updateCountdownBanner(progress) {
    document.querySelector('#cd-progress').style.width = progress.toString() + '%';
    document.querySelector('#solve-status-left').innerHTML = setRestartInstructions();
}

function standardStay(option, inputValue) {
    solveinput.select();
}

function followInput(choiceArray, inputValue) {
    const selection = parseInt(inputValue);
    if (selection !== 0) {
        solveLevel = [parseInt(inputValue) - 1, 0];
    }
    lessonRetry.push(currentLesson);
    genSetFunction();
}

function followSolve(newLevel, inputValue) {
    solveLevel = newLevel;
    genSetFunction();
}

function explainJump(newLevel, inputValue) {
    explainCount += newLevel;
    if (explainCount < 0) {
        explainCount = 0;
    }
    solveinput.placeholder = '';
    genSetFunction(save=false, animation=false);
}

function staySolve(newLevel, inputValue) {
    genSetFunction();
}

function exitLesson(option, inputValue) {
    document.querySelector('#exit-solve').click();
}

function incorrectWarnChange() {
    let backgroundColor = 'white';
    if (incorrectCount === 1) {
        backgroundColor = '#fcf883';
    } else if (incorrectCount === 2) {
        backgroundColor = '#fca183';
    }
    solveinput.style.backgroundColor = backgroundColor;
}

function upIncrement(upArray, inputValue) {
    solveLevel[1] = solveLevel[1] + upArray[0];
    solveinput.style.backgroundColor = 'white';
    incorrectCount = 0;
    genSetFunction();
}

function downIncrement(downArray, inputValue) {
    incorrectCount += 1;
    if (incorrectCount < 3) {
        incorrectWarnChange();
        solveinput.select();
    } else {
        if (downArray[0] !== '') {
            solveLevel[1] = solveLevel[1] - downArray[0];
            if (solveLevel[1] < downArray[1]) {
                solveLevel[1] = downArray[1];
            }
        }
        incorrectCount = 0;
        solveinput.value = '';
        solveinput.style.backgroundColor = 'white';
        genSetFunction();
    }
}

function correctAction(correctArray, inputValue) {
    solveinput.style.color = 'green';
    solveinput.style.border = '3px solid green';
    solveinput.disabled = true;
    setTimeout(function() {
        solveinput.value = '';
        solveinput.style.color = 'black';
        solveinput.style.border = 'none';
        solveinput.disabled = false;
        correctArray[0](correctArray[1], inputValue);
    }, 300);
    if (repeatTracklist[0] !== '') {
        repeatTracklist[1].push(repeatTracklist[0]);
        repeatTracklist[0] = '';
    }
    if (sectionTracklist[0] === 'pluck') {
        removeByValue(sectionTracklist[2], sectionTracklist[1]);
    }
}

function incorrectAction(incorrectArray, inputValue) {
    solveinput.style.color = 'red';
    solveinput.style.border = '3px solid red';
    solveinput.disabled = true;
    setTimeout(function() {
        solveinput.style.color = 'black';
        solveinput.style.border = 'none';
        solveinput.disabled = false;
        incorrectArray[0](incorrectArray[1], inputValue);
    }, 2000);
}

function setSolveInput(
                        matchArray,
                        correctArray,
                        incorrectArray,
                        additionalArgsDict={},
                        ) {
    solveinput.onkeydown = function(e) {
        if (e.key === 'Enter') {
            this.style.color = 'blue';
        }
    };
    solveinput.onkeyup = function(e) {
        if (e.key === 'Enter') {
            if (matchArray[0](this.value, matchArray[1])) {
                correctAction(correctArray, this.value);
            } else {
                incorrectAction(incorrectArray, this.value);
            }
        }
        if (Object.keys(additionalArgsDict).includes('backclickon')) {
            if (additionalArgsDict['backclickon'] !== '') {
                if (e.key === 'ArrowLeft') {
                    correctAction(additionalArgsDict['backclickon'], this.value);
                }
            }
        }
        if (Object.keys(additionalArgsDict).includes('forwardclickon')) {
            if (additionalArgsDict['forwardclickon'] !== '') {
                if (e.key === 'ArrowRight') {
                    correctAction(additionalArgsDict['forwardclickon'], this.value);
                }
            }
        }
    };
    solveinput.focus();
}

function setLongtextPage(questionId, questionText, nextLevel='', renderMathjax=false) {
    const textArea = document.querySelector('#solvebox-longtext-text');
    const inputContainer = document.querySelector('#solvebox-longtext-input-container');
    const inputTarget = document.querySelector('#solvebox-longtext-input');
    const submitButton = document.querySelector('#longtext-submit');

    textArea.innerHTML = questionText;
    if (questionId === -1) {
        inputContainer.style.display = 'none';
        submitButton.innerHTML = 'Exit Lesson';
        submitButton.onclick = function() {
            inputContainer.style.display = 'block';
            exitLesson('', '', '');
        }
    } else {
        let questionList = longtextDict[questionId];
        if (questionList === undefined) {
            longtextDict[questionId] = [questionText];
            questionList = longtextDict[questionId];
        }
        if (questionList.length > 1) {
            inputTarget.value = questionList.slice(-1);
        } else {
            inputTarget.value = '';
        }
        submitButton.innerHTML = 'Save and Continue';
        submitButton.onclick = function() {
            questionList.push(inputTarget.value);
            inputTarget.value = '';
            textArea.innerHTML = '';
            solveLevel = nextLevel;
            genSetFunction(save=true, animation=false);
        }
    }
    if (renderMathjax) {
        textArea.classList.add('tex2jax_process');
        setTimeout(function() {MathJax.typeset();});
    } else {
        textArea.classList.remove('tex2jax_process');
    }
}

function choiceArrayMatch(inputValue, matchAnswer) {
    inputValue = clean(inputValue);
    matchNumbers = ['0'];
    for (inarray of matchAnswer) {
        matchNumbers.push((inarray[0]).toString());
    }
    return matchNumbers.includes(inputValue);
}

function setChooseScreen(choiceArray) {
    let choiceText = '<div><strong>Enter the number that matches your choice.</strong></div>'
    choiceText += '<div>0: Pick up where you left off.</div>';
    for (const choice of choiceArray) {
        choiceText += `<div>${choice[0]}: ${choice[1]}</div>`
    }
    solvebox.innerHTML = `
        <div style="max-height: 100%;">
            ${choiceText}
            <div style="height: 15px;"></div>
        </div>
    `
    setSolveInput([choiceArrayMatch, choiceArray], [followInput, choiceArray], [standardStay, '']);
}
