
function genQuestion1bdv() {
    makeSquareNumberBonds('15', '?', '3');
    const questionText = `
        With number bond squares, the bottom two numbers multiply together to equal the top number.<br>
        What number should replace the question mark below?
    `;
    addCanvasText(questionText);
    return '5';
}

function genQuestion2bdv() {
    makeSquareNumberBonds('15', '?', '3');
    const questionText = `Number bonds like this one can be represented as division problems.<br>
                The top number is divided by the bottom number.<br>
                 <span class="equation-in-text">15 ${divSymbol} 3 = ?</span>`;
    addCanvasText(questionText);
    return '5';
}

function genQuestion3bdv() {
    makeSquareNumberBonds('15', '3', '?');
    const questionText = `Sometimes the number bond will be reversed, but the answer does not change.<br>
                      <span class="equation-in-text">15 ${divSymbol} 3 = ?</span>`;
    addCanvasText(questionText);
    return '5';
}

function genQuestion4bdv() {
    makeSquareNumberBonds('15', '?', '3');
    const questionText = `Sometimes the equation will be reversed, but the answer still does not change.<br>
                      <span class="equation-in-text">? = 15 ${divSymbol} 3</span>`;
    addCanvasText(questionText);
    return '5';
}

function genQuestion5bdv(progressInt) {
    const number1 = pickRandomNumber(1, 10);
    const number2 = pickRandomNumber(1, 10);
    const number3 = number1 * number2;
    let questionText = '';
    if (progressInt < 5) {
    } else if (progressInt < 20) {
        const questionType = pickRandomNumber(0, 1);
        if ((progressInt < 10) || (questionType === 1)) {
            const equationOrder = pickRandomNumber(0, 1);
            questionText = `<span class="equation-in-text">${number3} ${divSymbol} ${number1} = ?</span>`;
            if (equationOrder === 1) {
                questionText = `<span class="equation-in-text">? = ${number3} ${divSymbol} ${number1}</span>`;
            }
        }
    }

    const arrangement = pickRandomNumber(0, 1);
    if (arrangement === 0) {
        makeSquareNumberBonds(number3.toString(), '?', number1.toString());
    } else {
        makeSquareNumberBonds(number3.toString(), number1.toString(), '?');
    }
    addCanvasText(questionText);
    return logCheckRep(number2.toString(), questionText, genQuestion5bdv, progressInt);
}

function genQuestion6bdv(progressInt) {
    if (progressInt === 0) {
        sectionTracklist = ['pluck', '', makeIterList(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])];
    }
    const questionString = chooseFromList(sectionTracklist[2]);
    sectionTracklist[1] = questionString;
    const numberCouplet = questionString.split(':');
    const number1 = parseInt(numberCouplet[0]);
    const number2 = parseInt(numberCouplet[1]);
    const number3 = number1 * number2;

    const equationOrder = pickRandomNumber(0, 1);
    questionText = `<span class="equation-solve-text">${number3} ${divSymbol} ${number1} = ?</span>`;
    if (equationOrder === 1) {
        questionText = `<span class="equation-solve-text">? = ${number3} ${divSymbol} ${number1}</span>`;
    }
    placeTextQuestion([questionText]);
    return number2.toString();
}
