
const renderMathjaxText = 'a99dff96cb69cde66c6d87c657c7984e';
const explainShowOnce = 'f8e0067978596e4c0b3a6495f3228f58';

const warmupTextlist0 = `
                          Let's warm up. Make sure you have paper and a pencil or pen ready.
                          Enter the first 6 digits of pi, as they appear here: 3.14159.
                        `;

const warmupTextlist1 = `
                          Without solving it, enter the following equation exactly:
                          4 + 7 = y + 6
                        `;

const warmupTextlist2 = `
                          The mathematician Carl F Gauss was born in 1777.
                          In what year was Carl F Gauss born?
                        `;

function matchWarmup0(inputValue, answer) {
    return stripclean(inputValue) === '3.14159';
}

function matchWarmup1(inputValue, answer) {
    return stripclean(inputValue) === '4+7=y+6';
}

function matchWarmup2(inputValue, answer) {
    return stripclean(inputValue) === '1777';
}

const unitWarmupTextlist0 = `
                            Welcome!
                            You will complete these lessons without using your mouse.
                            You will type your answers into the answer box, and submit by hitting enter.
                            If necessary, scroll up and down with the arrow keys.
                            Have a pencil and paper ready. You will need them for working out the answers.
                            When you are ready to begin, press enter.
                        `;

const unitWarmupTextlist1 = `
                            To complete these lessons, you will need to enter answers precisely.
                            Always read the question carefully before answering.
                            Now, enter your favorite food below, using only capital letters.
                        `;

const unitWarmupTextlist2 = `
                            Now enter the equation x + 4 = 13, starting with the x, and ending with the 13.
                        `;
const unitWarmupTextlist3 = `
                            Sometimes an answer will require units.
                            Always write the units in the same form as they appear in the question.
                            Always write numbers using digits. For instance, enter 8, not eight.
                            Enter the number of <strong>inches</strong> in a foot, remembering to label the units just as they appear in this question.
                        `;

function matchUnitWarmup1(inputValue, answer) {
    return inputValue !== '' && inputValue === inputValue.toUpperCase();
}

function matchUnitWarmup2(inputValue, answer) {
    inputValue = stripclean(inputValue);
    return inputValue === 'x+4=13';
}

function matchUnitWarmup3(inputValue, answer) {
    inputValue = stripclean(inputValue);
    return inputValue.includes('12inches');
}

function startSectionReset() {
    sectionTracklist = [];
    incorrectCount = 0;
    explainCount = 0;
    clearInterval(timerInterval);
    timerInterval = '';
    clearInterval(highlightInterval);
    highlightInterval = '';
    repeatTracklist = ['', []];
    resizeOn = true;
    currentMatchFunction = '';
    solveinput.value = '';
    solveinput.placeholder = '';
    incorrectWarnChange();
}

function standardSolveSetup() {
    solvebox.innerHTML = '';
    const baseSolveLevel = solveLevel[0];
    return baseSolveLevel;
}

function standardChoiceArraySetup(choiceArray) {
    setBasicBanner('Lesson Complete');
    setChooseScreen(choiceArray);
}

function standardTextQuestionSetup(bannerText, questionText, matchFunction, answer, exitSolveLevel, initLessonProgress, renderMathjax=false) {
    updateLessonProgress(initLessonProgress);
    setBasicBanner(bannerText);
    placeTextQuestion(questionText, renderMathjax);
    setSolveInput([matchFunction, answer], [followSolve, exitSolveLevel], [standardStay, '']);
}

function standardGenerateQuestionSetup(bannerText, genFunction, genArgList, matchFunction, exitSolveLevel, initLessonProgress) {
    updateLessonProgress(initLessonProgress);
    setBasicBanner(bannerText);
    let answer = '';
    if (genArgList.length > 0) {
        answer = genFunction(genArgList);
    } else {
        answer = genFunction();
    }
    setSolveInput([matchFunction, answer], [followSolve, exitSolveLevel], [standardStay, '']);
}

const genericImageBorder = '1px solid black';

function standardImageQuestionSetup(bannerText, questionText, imageUrl, imageHeight, matchFunction, answer, exitSolveLevel, initLessonProgress, renderMathjax) {
    updateLessonProgress(initLessonProgress);
    setBasicBanner(bannerText);
    placeImageQuestion(imageUrl, imageHeight, questionText, genericImageBorder, renderMathjax);
    setSolveInput([matchFunction, answer], [followSolve, exitSolveLevel], [standardStay, '']);
}

// consider adding functionality for pictures to be part of the explain sequence
function standardExplainSequenceSetup(bannerText, explainText, exitSolveLevel, initLessonProgress, renderMathjax) {
    updateLessonProgress(initLessonProgress);
    setBasicBanner(bannerText);
    let explainList = '';
    if (typeof(explainText) === 'string') {
        const item2 = explainText.split('\n');
        let item1 = [];
        for (const line of item2) {
            item1.push('');
        }
        explainList = [item1, item2];
    } else {
        explainList = [explainText[0].slice(), explainText[1].slice()];
    }
    if (explainCount >= explainList[0].length) {
        solveLevel = exitSolveLevel;
        explainCount = 0;
        genSetFunction();
    } else {
        const upperText = '<div style="color: blue; font-size: 1rem;">' + explainList[0][explainCount] + '</div>' + '<hr style="margin-top: 3px; padding-top: 0px;">';
        let lowerList = [];
        for (let i = 0; i < explainCount + 1; i++) {
            if (i === explainList[1].length) {
                break;
            } else {
                let lineText = explainList[1][i];
                let onColor = 'black';
                if ((i === explainCount || i === explainList[1].length - 1)) {
                    onColor = 'red';
                }
                if (lineText.trim() === '') {
                } else if (lineText.replaceAll('-', '').trim() === '') {
                    let lineMarks = [0];
                    let count = 0;
                    let currentChar = ' ';
                    for (let j = 0; j < lineText.length; j++) {
                        const char = lineText[j];
                        if (char !== currentChar) {
                            lineMarks.push(j);
                            currentChar = char;
                        }
                    }
                    lineMarks.push(lineText.length);
                    let linesDiv = '';
                    let lineColor = 'white';
                    for (let j = 0; j < lineMarks.length - 1; j++) {
                        const width = ((lineMarks[j+1] - lineMarks[j]) / lineText.length) * 100;
                        const lineDiv = `
                            <div style="width: ${width}%; border-top: 1px solid ${lineColor}"></div>
                        `;
                        linesDiv += lineDiv;
                        if (lineColor === onColor) {
                            lineColor = 'white';
                        } else {
                            lineColor = onColor;
                        }
                    }
                    const fullWidth = (lineText.length) * 0.9;
                    const newLine = `
                        <div style="display: flex; height: 0px; width: ${fullWidth}rem; margin-right: auto; margin-left: auto;">
                            ${linesDiv}
                        </div>
                    `;
                    lowerList.push(newLine);
                } else {
                    let push = true;
                    let showOnce = false;
                    if (lineText.slice(lineText.length - 32) === explainShowOnce) {
                        showOnce = true;
                        lineText = lineText.slice(0, lineText.length - 32);
                    }
                    let newLine = lineText.replaceAll(' ', '<span style="display: inline-block; width: 1ch"></span>');
                    if (onColor === 'red') {
                        newLine = '<div style="color: red;">' + newLine + '</div>';
                    } else if (!showOnce) {
                        newLine = '<div>' + newLine + '</div>';
                    } else {
                        push = false;
                    }
                    if (push) {
                        lowerList.push(newLine);
                    }
                }
            }
        }
        const lowerText = '<div style="font-family: monospace;">' + lowerList.join('') + '</div>';
        const questionText = upperText + lowerText;
        placeTextQuestion([questionText], renderMathjax);
        let forwardClickArg = [explainJump, 1];
        let placeHolderText = 'Use left/right arrow keys.';
        if (explainCount + 1 === explainList[0].length) {
            placeHolderText = 'Press enter to move on.';
            forwardClickArg = '';
        }
        solveinput.placeholder = placeHolderText;
        setSolveInput([autoMatch, ''], [explainJump, 1], [standardStay, ''], {'backclickon': [explainJump, -1], 'forwardclickon': forwardClickArg});
    }
}

function standardLongtextQuestionSetup(bannerText, questionText, imageUrl, imageHeight, questionId, exitSolveLevel, initLessonProgress, renderMathjax) {
    updateLessonProgress(initLessonProgress);
    setBasicBanner(bannerText);
    setLongtextRest();
    activateLongtextScreen();
    let html1 = '';
    let html2 = '';
    if (questionText !== '') {
        html1 = `
            <div style="margin-bottom: 5px;">${questionText}</div>
        `;
    }
    if (imageUrl !== '') {
        html2 = `
            <div>
                <img id="longtext-image" src="${imageUrl}" style="max-height: ${imageHeight}; border: ${genericImageBorder}">
            </div>
        `;
    }
    const htmlText = html1 + html2;
    setLongtextPage(questionId, htmlText, exitSolveLevel, renderMathjax);
}

function standardEndpageLongtext(continueLevel, save) {
    setBasicBanner('Congrats!');
    setLongtextRest(confetti=true);
    activateLongtextScreen();
    if (save) {
        solveLevel = continueLevel;
        lessonComplete = true;
        updateLessonProgress(100);
        solveSave(currentLesson);
    }
    const text = makeCompletionHTML();
    setLongtextPage(-1, text);
}

function comingSoonMatch(inputValue, matchAnswer) {
    interestBoolean = true;
    return true;
}

function standardComingSoon() {
    solveLevel = [0, 0];
    questionText = '';
    matchFunction = '';
    bannerText = '';
    if (interestBoolean === true) {
        questionText = comingSoonSubmitText;
        matchFunction = antiMatch;
        bannerText = 'Thanks!';
    } else {
        questionText = comingSoonText;
        matchFunction = comingSoonMatch;
        bannerText = 'Coming Soon!';
    }
    setBasicBanner(bannerText);
    placeTextQuestion(questionText);
    setSolveInput([matchFunction, ''], [staySolve, ''], [standardStay, '']);
}

function standardWarmup(baseSolveLevel, initLessonProgress, exitLessonProgress) {
    const progressIncrement = (exitLessonProgress - initLessonProgress) / 3;
    if (solveLevel[1] === 0) {
        standardTextQuestionSetup('Warm-Up', warmupTextlist0, matchWarmup0, '', [baseSolveLevel, 1], initLessonProgress);
    } else if (solveLevel[1] === 1) {
        standardTextQuestionSetup(getShortEncouragement(), warmupTextlist1, matchWarmup1, '', [baseSolveLevel, 2], initLessonProgress + progressIncrement);
    } else if (solveLevel[1] === 2) {
        standardTextQuestionSetup(getShortEncouragement(), warmupTextlist2, matchWarmup2, '', [baseSolveLevel + 1, 0], initLessonProgress + (progressIncrement * 2));
    } else {
        solveLevel = [baseSolveLevel, 0];
        standardWarmup(baseSolveLevel, initLessonProgress, exitLessonProgress);
    }
}

function standardUnitWarmup(baseSolveLevel, initLessonProgress, exitLessonProgress) {
    const progressIncrement = (exitLessonProgress - initLessonProgress) / 4;
    if (solveLevel[1] === 0) {
        standardTextQuestionSetup('Welcome!', unitWarmupTextlist0, autoMatch, '', [baseSolveLevel, 1], initLessonProgress);
    } else if (solveLevel[1] === 1) {
        standardTextQuestionSetup(getShortEncouragement(), unitWarmupTextlist1, matchUnitWarmup1, '', [baseSolveLevel, 2], initLessonProgress + progressIncrement);
    } else if (solveLevel[1] === 2) {
        standardTextQuestionSetup(getShortEncouragement(), unitWarmupTextlist2, matchUnitWarmup2, '', [baseSolveLevel, 3], initLessonProgress + (progressIncrement * 2));
    } else if (solveLevel[1] === 3) {
        standardTextQuestionSetup(getShortEncouragement(), unitWarmupTextlist3, matchUnitWarmup3, '', [baseSolveLevel + 1, 0], initLessonProgress + (progressIncrement * 3));
    } else {
        solveLevel = [baseSolveLevel, 0];
        standardUnitWarmup(baseSolveLevel, initLessonProgress, exitLessonProgress);
    }
}

function standardPmSetup(rightText, baseSolveLevel, genFunction, matchFunction, questionCount, initLessonProgress, exitLessonProgress) {
    if (solveLevel[1] === 0) {
        updateLessonProgress(initLessonProgress);
        setPmBanner(rightText);
        setTimeout(function() {
            updatePmBanner(0);
        });
        placeTextQuestion(pmTextlistIntro);
        setSolveInput([autoMatch, ''], [followSolve, [baseSolveLevel, 50]], [standardStay, '']);
    } else if (solveLevel[1] > 0 && solveLevel[0] < baseSolveLevel + 1) {
        const firstProgressJump = (exitLessonProgress - initLessonProgress) / (questionCount + 1);
        if (document.querySelector('#pm-progress-left') === null) {
            setPmBanner(rightText);
        }
        const progressArray = makeProgressLevelsA(questionCount, initLessonProgress + firstProgressJump, exitLessonProgress, baseSolveLevel);
        if (progressArray === 'reset') {
            solveLevel[1] = 0;
            standardPmSetup(rightText, baseSolveLevel, genFunction, matchFunction, questionCount, initLessonProgress, exitLessonProgress);
        } else {
            const minSolveLevel = progressArray[0];
            const maxSolveLevel = progressArray[1];
            const progress = progressArray[2];
            const progressInt = progressArray[3];
            const lessonProgressUpdate = progressArray[4];
            updateLessonProgress(lessonProgressUpdate);
            setTimeout(function() {
                updatePmBanner(progress);
            });
            if (solveLevel[1] >= maxSolveLevel) {
                setTimeout(function() {
                    solveLevel = [baseSolveLevel + 1, 0];
                    genSetFunction();
                }, 1000);
            } else {
                const answer = genFunction(progressInt);
                setSolveInput([matchFunction, answer], [upIncrement, [1]], [downIncrement, [2, minSolveLevel]]);
            }
        }
    }
}

function standardCdSetup(rightText, baseSolveLevel, genFunction, matchFunction, questionCount, time, initLessonProgress, exitLessonProgress, save) {
    if (!save) {
        solveLevel[1] = 0;
        startSectionReset();
    }
    if (solveLevel[1] === 0) {
        standardTextQuestionSetup(rightText, makeCdTextlistIntro(time.toString(), questionCount.toString()), autoMatch, '', [baseSolveLevel, 2], initLessonProgress, bannerDelay=true);
    } else if (solveLevel[1] === 1) {
        standardTextQuestionSetup(rightText, cdTextlistRetry, autoMatch, '', [baseSolveLevel, 2], initLessonProgress);
    } else if (solveLevel[1] > 1 && solveLevel[0] < baseSolveLevel + 1) {
        const firstProgressJump = (exitLessonProgress - initLessonProgress) / (questionCount + 1);
        if (document.querySelector('#cd-progress') === null && timerInterval === '') {
            setCountdownBanner(time, [followSolve, [baseSolveLevel, 1]], '');
        }
        const progressArray = makeProgressLevelsB(questionCount, initLessonProgress + firstProgressJump, exitLessonProgress, 2);
        if (progressArray === 'reset') {
            solveLevel[1] = 0;
            standardCdSetup(rightText, baseSolveLevel, genFunction, matchFunction, questionCount, time, initLessonProgress, exitLessonProgress, save);
        } else {
            const maxSolveLevel = progressArray[0];
            const progress = progressArray[1];
            const progressInt = progressArray[2];
            const lessonProgressUpdate = progressArray[3];
            updateLessonProgress(lessonProgressUpdate);
            setTimeout(function() {
                updateCountdownBanner(progress);
            });
            if (solveLevel[1] >= maxSolveLevel) {
                clearInterval(timerInterval);
                timerInterval = '';
                setTimeout(function() {
                    solveLevel = [baseSolveLevel + 1, 0];
                    genSetFunction();
                }, 1000);
            } else {
                const answer = genFunction(progressInt);
                setSolveInput([matchFunction, answer], [upIncrement, [1]], [downIncrement, ['', '']]);
            }
        }
    }
}

function completeActionFromSequence(sequence, save) {
    let saveNow = true;
    const rootUrl = '/static/lesson/images/solve_images/';
    const questionKeywords = ['comingsoon', 'unitwarmup', 'warmup', 'updown', 'countdown', 'text', 'image', 'generate', 'explain', 'longtext', 'endlongtext', 'custom'];
    const fullSectionKeywords = ['comingsoon', 'unitwarmup', 'warmup', 'updown', 'countdown'];
    const baseUrl = rootUrl + currentLesson.toLowerCase() + '/';
    let choiceArray = [];
    let sequenceList = [];
    let sectionCount = 0;
    let sectionTitle = '';
    for (const item of sequence) {
        let section = false
        if (typeof(item) === 'string') {
            if (item.slice(0, 7) === 'section') {
                sectionTitle = item.split(':')[1];
                sequenceList.push([sectionTitle]);
                section = true;
                choiceArray.push([sectionCount + 1, sectionTitle]);
                sectionCount += 1;
            }
        }
        if (!section) {
            const mostRecentSection = sequenceList[sequenceList.length - 1];
            if (questionKeywords.includes(item)) {
                mostRecentSection.push([item]);
            } else {
                const mostRecentQuestion = mostRecentSection[mostRecentSection.length - 1];
                mostRecentQuestion.push(item);
            }
        }
    }
    const progressPerSection = 100 / sequenceList.length;
    const baseSolveLevel = standardSolveSetup();
    if (solveLevel[1] === 0) {
        startSectionReset();
    }
    if (lessonComplete && !lessonRetry.includes(currentLesson)) {
        standardChoiceArraySetup(choiceArray);
    } else {
        const sectionContent = sequenceList[baseSolveLevel];
        if (sectionContent === undefined) {
            solveLevel = [solveLevel[0] - 1, 0];
            restartCurrent = true;
            actionFromSequence(sequence, save);
            saveNow = false;
        } else {
            const questionNumber = solveLevel[1];
            let bannerText = getShortEncouragement();
            if (questionNumber === 0) {
                bannerText = sectionContent[0];
            }
            let matchFunction = autoMatch;

            const firstQuestionKeyword = sectionContent[1][0];
            if (fullSectionKeywords.includes(firstQuestionKeyword)) {
                const questionArgs = sectionContent[1].slice(1);
                let initLessonProgress = progressPerSection * baseSolveLevel;
                let exitLessonProgress = progressPerSection * (baseSolveLevel + 1);
                let genFunction = '';
                let questionCount = 0;
                if (firstQuestionKeyword === 'comingsoon') {
                   standardComingSoon();
                } else if (firstQuestionKeyword === 'unitwarmup') {
                   standardUnitWarmup(baseSolveLevel, initLessonProgress, exitLessonProgress);
                } else if (firstQuestionKeyword === 'warmup') {
                    standardWarmup(baseSolveLevel, initLessonProgress, exitLessonProgress);
                } else if (firstQuestionKeyword === 'updown') {
                    let next = 0;
                    if (typeof(questionArgs[next]) === 'string') {
                        rightText = questionArgs[next];
                        next += 1;
                    }
                    if (questionArgs[next] !== undefined) {
                        genFunction = questionArgs[next];
                        next += 1;
                        if (typeof(questionArgs[next] === 'function')) {
                            matchFunction = questionArgs[next];
                            next += 1;
                        }
                        if (questionArgs[next] !== undefined) {
                            questionCount = questionArgs[next];
                        }
                    }
                    standardPmSetup(bannerText, baseSolveLevel, genFunction, matchFunction, questionCount, initLessonProgress, exitLessonProgress);
                } else if (firstQuestionKeyword === 'countdown') {
                    let next = 0;
                    let time = 3;
                    if (typeof(questionArgs[next]) === 'string') {
                        rightText = questionArgs[next];
                        next += 1;
                    }
                    if (questionArgs[next] !== undefined) {
                        genFunction = questionArgs[next];
                        next += 1;
                        if (typeof(questionArgs[next] === 'function')) {
                            matchFunction = questionArgs[next];
                            next += 1;
                        }
                        if (questionArgs[next] !== undefined) {
                            questionCount = questionArgs[next];
                            next += 1;
                            if (questionArgs[next] !== undefined) {
                                time = questionArgs[next];
                            }
                        }
                    }
                    standardCdSetup(bannerText, baseSolveLevel, genFunction, matchFunction, questionCount, time, initLessonProgress, exitLessonProgress, save);
                }
            } else {
                const questionIndex = questionNumber + 1;
                const questionContent = sectionContent[questionIndex];
                if (questionContent === undefined) {
                    solveLevel = [baseSolveLevel, 0];
                    actionFromSequence(sequence, save);
                } else {
                    const questionKeyword = questionContent[0];
                    const questionArgs = questionContent.slice(1);
                    const questionCount = sectionContent.length - 1;
                    const progressPerQuestion = progressPerSection / questionCount;
                    let questionText = '';
                    let imageUrl = '';
                    let answer = '';
                    let renderMathjax = false;
                    let exitSolveLevel = [solveLevel[0], solveLevel[1] + 1];
                    if (questionIndex === questionCount) {
                        exitSolveLevel = [baseSolveLevel + 1, 0];
                    }
                    let initLessonProgress = (progressPerSection * baseSolveLevel) + (progressPerQuestion * questionNumber);
                    if (questionKeyword === 'text') {
                        questionText = 'Something went wrong. Try refreshing the page.';
                        let next = 0;
                        if (typeof(questionArgs[next]) === 'string') {
                            if (typeof(questionArgs[next + 1]) === 'string' && questionArgs[next + 1] !== renderMathjaxText) {
                                bannerText = questionArgs[next];
                                questionText = questionArgs[next + 1];
                                next += 2;
                            } else {
                                questionText = questionArgs[next];
                                next += 1;
                            }
                            if (questionArgs[next] === renderMathjaxText) {
                                renderMathjax = true;
                                next += 1;
                            }
                            if (questionArgs[next] !== undefined) {
                                matchFunction = questionArgs[next];
                                next += 1;
                                if (questionArgs[next] !== undefined) {
                                    answer = questionArgs[next];
                                }
                            }
                        }
                        standardTextQuestionSetup(bannerText, questionText, matchFunction, answer, exitSolveLevel, initLessonProgress, renderMathjax);
                    } else if (questionKeyword === 'image') {
                        let imageHeight = 'auto';
                        let next = 0;
                        if (typeof(questionArgs[next]) === 'string') {
                            if (typeof(questionArgs[next + 1]) === 'string' && questionArgs[next + 1] !== renderMathjaxText) {
                                if (typeof(questionArgs[next + 2]) === 'string' && questionArgs[next + 2] !== renderMathjaxText) {
                                    bannerText = questionArgs[next];
                                    questionText = questionArgs[next + 1];
                                    imageUrl = baseUrl + questionArgs[next + 2];
                                    next += 3;
                                } else {
                                    questionText = questionArgs[next];
                                    imageUrl = baseUrl + questionArgs[next + 1];
                                    next += 2;
                                }
                            } else {
                                imageUrl = baseUrl + questionArgs[next];
                                next += 1;
                            }
                            if (questionArgs[next] === renderMathjaxText) {
                                renderMathjax = true;
                                next += 1;
                            }
                            if (typeof(questionArgs[next]) === 'number') {
                                imageHeight = questionArgs[next].toString() + 'px';
                                next += 1;
                            }
                            if (questionArgs[next] !== undefined) {
                                matchFunction = questionArgs[next];
                                next += 1;
                                if (questionArgs[next] !== undefined) {
                                    answer = questionArgs[next];
                                }
                            }
                        }
                        standardImageQuestionSetup(bannerText, questionText, imageUrl, imageHeight, matchFunction, answer, exitSolveLevel, initLessonProgress, renderMathjax);
                    } else if (questionKeyword === 'generate') {
                        let genFunction = '';
                        let genArgList = [];
                        let next = 0;
                        if (typeof(questionArgs[next]) === 'string') {
                            bannerText = questionArgs[next];
                            next += 1;
                        }
                        if (questionArgs[next] !== undefined) {
                            genFunction = questionArgs[next];
                            next += 1;
                            if (typeof(questionArgs[next]) === 'object') {
                                genArgList = questionArgs[next];
                                next += 1;
                            }
                            if (questionArgs[next] !== undefined) {
                                matchFunction = questionArgs[next];
                            }
                        }
                        standardGenerateQuestionSetup(bannerText, genFunction, genArgList, matchFunction, exitSolveLevel, initLessonProgress);
                    } else if (questionKeyword === 'explain') {
                        bannerText = 'Concentrate!';
                        questionText = 'Something went wrong. Try refreshing the page.';
                        let next = 0;
                        if (typeof(questionArgs[next]) === 'object') {
                            questionText = questionArgs[next];
                            next += 1;
                        } else if (typeof(questionArgs[next]) === 'string') {
                            if (typeof(questionArgs[next + 1]) === 'string' && questionArgs[next + 1] !== renderMathjaxText) {
                                bannerText = questionArgs[next];
                                questionText = questionArgs[next + 1];
                                next += 2;
                            } else {
                                questionText = questionArgs[next];
                                next += 1;
                            }
                        }
                        if (questionArgs[next] === renderMathjaxText) {
                            renderMathjax = true;
                            next += 1;
                        }
                        standardExplainSequenceSetup(bannerText, questionText, exitSolveLevel, initLessonProgress, renderMathjax);
                    } else if (questionKeyword === 'longtext') {
                        let questionId = 'qqq';
                        let imageHeight = 'auto';
                        let next = 0;
                        if (typeof(questionArgs[next]) === 'string') {
                            if (typeof(questionArgs[next + 1]) === 'string' && questionArgs[next + 1] !== renderMathjaxText) {
                                if (typeof(questionArgs[next + 2]) === 'string' && questionArgs[next + 2] !== renderMathjaxText) {
                                    bannerText = questionArgs[next];
                                    questionText = questionArgs[next + 1];
                                    imageUrl = baseUrl + questionArgs[next + 2];
                                    next += 3;
                                } else {
                                    questionText = questionArgs[next];
                                    imageUrl = baseUrl + questionArgs[next + 1];
                                    next += 2;
                                }
                            } else {
                                if (questionArgs[next].includes('.png') || questionArgs[next].includes('.jpg') || questionArgs[next].includes('.jpeg')) {
                                    imageUrl = baseUrl + questionArgs[next];
                                } else {
                                    questionText = questionArgs[next];
                                }
                                next += 1;
                            }
                            if (questionArgs[next] === renderMathjaxText) {
                                renderMathjax = true;
                                next += 1;
                            }
                            if (questionArgs[next] !== undefined) {
                                if (questionArgs[next] !== 'string') {
                                    imageHeight = questionArgs[next].toString() + 'px';
                                    next += 1;
                                }
                                if (questionArgs[next] !== undefined) {
                                    questionId = questionArgs[next];
                                }
                            }
                        }
                        standardLongtextQuestionSetup(bannerText, questionText, imageUrl, imageHeight, questionId, exitSolveLevel, initLessonProgress, renderMathjax);
                    } else if (questionKeyword === 'endlongtext') {
                        standardEndpageLongtext([baseSolveLevel, 0], save);
                    } else if (questionKeyword === 'custom') {
                        let customFunction = '';
                        let customArgList = [];
                        let next = 0;
                        if (questionArgs[next] === 'function') {
                            customFunction = questionArgs[next];
                            next += 1;
                            if (typeof(questionArgs[next]) === 'object') {
                                customArgList = questionArgs[next];
                                customFunction(customArgList);
                            } else {
                                customFunction();
                            }
                        }
                    }
                }
            }
            resizeSolvebox();
        }
    }
    if (save && saveNow) {
        solveSave(currentLesson);
    }
}

function actionFromSequence(sequence, save) {
    const canvasHeader = document.querySelector('#standard-canvas-header');
    if (canvasHeader !== null) {
        canvasHeader.innerHTML = '';
    }
    removeListeners();
    solveinput.disabled = false;
    solveinput.focus();
    setTimeout(function() {
        completeActionFromSequence(sequence, save);
    });
}
