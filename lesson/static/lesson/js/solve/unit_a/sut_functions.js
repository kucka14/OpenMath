
function genQuestion1sut() {
    makeCountCircles(0);
    addListener('keydown', setLiveCountCircles);
    const questionText = `
        To subtract numbers, it's helpful to be really good at counting up and counting down.<br>
        Press the Control key to activate the counting bar.<br>
        Then, use the left and right arrow keys to count up to twenty and back down to zero.<br>
        When you are ready to continue, deactivate the counting bar, and press enter.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion2sut() {
    makeCountCircles(14);
    addListener('keydown', setLiveCountCircles);
    const questionText = `
        One way to subtract numbers is to count down, from the first number to the second number.<br>
        Click down from the first number (14), to the second number (5). How many clicks is it?<br>
        <span class="equation-in-text">14 ${subSymbol} 5 = ?</span>
    `;
    addCanvasText(questionText);
    return '9';
}

function genQuestion3sut() {
    makeCountCircles(13);
    addListener('keydown', setLiveCountCircles);
    const questionText = `
        Subtraction is about finding the <i>difference</i> between two numbers.<br>
        So you can also solve subtraction problems by counting up, from the second number to the first number.<br>
        Click up from the second number number (13), to the first number (18). How many clicks is it?<br>
        <span class="equation-in-text">18 ${subSymbol} 13 = ?</span>
    `;
    addCanvasText(questionText);
    return '5';
}

function genQuestion4sut(progressInt) {
    const number1 = pickRandomNumber(0, 20);
    const number2 = pickRandomNumber(0, number1);

    let circleCount = 0;
    let explainLine = '';
    let startNumber = 0;
    if (progressInt < 10) {
        explainLine = 'Click down from the <span style="color: blue;">first number</span>, to the <span style="color: red;">second number</span>. What is the difference?';
        circleCount = number1;
    } else if (progressInt < 20) {
        explainLine = 'Click up from the <span style="color: red;">second number</span> to the <span style="color: blue;">first number</span>. What is the difference?';
        circleCount = number2;
    }
    makeCountCircles(circleCount);
    addListener('keydown', setLiveCountCircles);
    const questionText = `
        ${explainLine}<br>
        <span class="equation-in-text"><span style="color: blue;">${number1}</span> ${subSymbol} <span style="color: red;">${number2}</span> = ?</span>
    `;
    addCanvasText(questionText);
    return logCheckRep((number1 - number2).toString(), [number1, number2], genQuestion4sut, progressInt);
}

function genQuestion5sut() {
    makeCircleNumberBonds('17', '?', '9');
    const questionText = `
        With number bond circles, the bottom two numbers add together to equal the top number.<br>
        What number should replace the question mark below?
    `;
    addCanvasText(questionText);
    return '8';
}

function genQuestion6sut() {
    makeCircleNumberBonds('17', '?', '9');
    const questionText = `Number bonds like this one can be represented as subtraction problems.<br>
                The bottom number is subtracted from the top number.<br>
                <span class="equation-in-text">17 ${subSymbol} 9 = ?</span>`;
    addCanvasText(questionText);
    return '8';
}

function genQuestion7sut() {
    makeCircleNumberBonds('17', '9', '?');
    const questionText = `Sometimes the number bond will be reversed, but the answer does not change.<br>
                      <span class="equation-in-text">17 ${subSymbol} 9 = ?</span>`;
    addCanvasText(questionText);
    return '8';
}

function genQuestion8sut() {
    makeCircleNumberBonds('17', '?', '9');
    const questionText = `Sometimes the equation will be reversed, but the answer still does not change.<br>
                      <span class="equation-in-text">? = 17 ${subSymbol} 9</span>`;
    addCanvasText(questionText);
    return '8';
}

function genQuestion9sut(progressInt) {
    const number1 = pickRandomNumber(0, 20);
    const number2 = pickRandomNumber(0, number1);
    let questionText = '';
    if (progressInt < 5) {
    } else if (progressInt < 20) {
        const questionType = pickRandomNumber(0, 1);
        if ((progressInt < 10) || (questionType === 1)) {
            const equationOrder = pickRandomNumber(0, 1);
            questionText = `<span class="equation-in-text">${number1} ${subSymbol} ${number2} = ?</span>`;
            if (equationOrder === 1) {
                questionText = `<span class="equation-in-text">? = ${number1} ${subSymbol} ${number2}</span>`;
            }
        }
    }

    const arrangement = pickRandomNumber(0, 1);
    if (arrangement === 0) {
        makeCircleNumberBonds(number1.toString(), '?', number2.toString());
    } else {
        makeCircleNumberBonds(number1.toString(), number2.toString(), '?');
    }
    addCanvasText(questionText);
    return logCheckRep((number1 - number2).toString(), questionText, genQuestion9sut, progressInt);
}

function genQuestion10sut(progressInt) {
    let topLimit = 5;
    let bottomLimit = 0;
    let addSpace = false;
    if (progressInt < 5) {
    } else if (progressInt < 10) {
        topLimit = 10
    } else if (progressInt < 15) {
        topLimit = 20;
        bottomLimit = 5;
    } else if (progressInt < 20) {
        topLimit = 20;
        bottomLimit = 5;
        addSpace = true;
    }
    const number1 = pickRandomNumber(bottomLimit, topLimit);
    let number2 = pickRandomNumber(bottomLimit, number1);
    if (addSpace) {
        number2 -= 5;
    }
    const equationOrder = pickRandomNumber(0, 1);
    questionText = `<span class="equation-solve-text">${number1} ${subSymbol} ${number2} = ?</span>`;
    if (equationOrder === 1) {
        questionText = `<span class="equation-solve-text">? = ${number1} ${subSymbol} ${number2}</span>`;
    }

    placeTextQuestion([questionText]);
    return logCheckRep((number1 - number2).toString(), questionText, genQuestion10sut, progressInt);
}

function genQuestion11sut() {
    const imageUrl = '/static/lesson/images/solve_images/sut/subtraction_blanks.png';
    const questionText = 'Using the digits 1 to 9 at most one time each, place a digit in each box to make a true statement.';
    placeImageQuestion(imageUrl, '100px', questionText, genericImageBorder);
    return '';
}

function makePreviousDisplay() {
    let returnText = '';
    for (let i = 0; i < sectionTracklist.length; i++) {
        const answer = sectionTracklist[i];
        let countText = '1st';
        if (i === 1) {
            countText = '2nd';
        }
        const correctDisplay = `<div class="alt-solve-text highlight${i}">${countText} ${answer}</div>`;
        returnText += correctDisplay;
    }
    return returnText;
}

function genQuestion12sut() {
    const imageUrl = '/static/lesson/images/solve_images/sut/subtraction_blanks.png';
    let questionText = 'Now find a <i class="highlight">different</i> solution. Using the digits 1 to 9 at most one time each, place a digit in each box to make a true statement.';
    questionText += makePreviousDisplay();
    placeImageQuestion(imageUrl, '100px', questionText, genericImageBorder);
    return '';
}

function genQuestion13sut() {
    const imageUrl = '/static/lesson/images/solve_images/sut/subtraction_blanks.png';
    let questionText = 'Find another <i class="highlight">different</i> solution. Using the digits 1 to 9 at most one time each, place a digit in each box to make a true statement.';
    questionText += makePreviousDisplay();
    placeImageQuestion(imageUrl, '100px', questionText, genericImageBorder);
    return '';
}

function matchBlanksSut(inputValue, matchAnswer) {
    const inputSplit = stripclean(inputValue).split('=');
    const initInputList = inputSplit[0].split('+').concat(inputSplit[1].split('-'));
    const term1 = parseInt(initInputList[0]);
    const term2 = parseInt(initInputList[1]);
    const term3 = parseInt(initInputList[2]);
    const term4 = parseInt(initInputList[3]);
    const inputList = [term1, term2, term3, term4];
    for (const term of inputList) {
        if (![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(term)) {
            return false;
        }
    }
    const correctLine = `Answer: ${inputList[0]} + ${inputList[1]} = ${inputList[2]} - ${inputList[3]}`;
    if (sectionTracklist.includes(correctLine)) {
        const index = sectionTracklist.indexOf(correctLine);
        setHighlightInterval(['', index]);
        return false;
    }
    if ((term1 + term2 === term3 - term4) && (!hasDuplicates(inputList))) {
        sectionTracklist.push(correctLine);
        return true;
    } else {
        return false;
    }
}
