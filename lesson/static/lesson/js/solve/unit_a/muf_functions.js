
function genQuestion1muf() {
    addListener('input', setLiveDualGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        In this section, you will be given a multiplication equation.<br>
        You may type the equation as multiplication or repeated addition, supplying the answer instead of a question mark. Or you may provide the answer directly.<br>
        <span class="equation-in-text">4 * 3 = ?</span>
    `;
    addCanvasText(questionText, wide=false, small=true);
    return [['4+4+4', '3+3+3+3', '4*3', '3*4', ''], '12'];
}

function genQuestion2muf(progressInt) {
    addListener('input', setLiveDualGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const number1 = pickRandomNumber(2, 5);
    const number2 = pickRandomNumber(2, 5);
    let addendList = [];
    for (let i = 0; i < number1; i++) {
        addendList.push(number2);
    }
    let altAddendList = [];
    for (let i = 0; i < number2; i++) {
        altAddendList.push(number1);
    }
    const equationList = [addendList.join('+'), altAddendList.join('+'), ''];
    const questionText = `<span class="equation-in-text">${number1} * ${number2} = ?</span>`;

    addCanvasText(questionText);
    return logCheckRep([equationList, (number1 * number2).toString()], questionText, genQuestion2muf, progressInt);
}

function genQuestion3muf() {
    makeSquareNumberBonds('?', '2', '4');
    const questionText = `With number bond squares, the bottom two numbers multiply together to equal the top number.`;
    addCanvasText(questionText);
    return '8';
}

function genQuestion4muf() {
    makeSquareNumberBonds('?', '3', '4');
    const questionText = `Sometimes you'll be given the equation as well.<br>
                     <span class="equation-in-text">3 * 4 = ?</span>`;
    addCanvasText(questionText);
    return '12';
}

function genQuestion5muf() {
    makeSquareNumberBonds('?', '3', '4');
    const questionText = `Sometimes the equation will be reversed, but the answer does not change.<br>
                     <span class="equation-in-text">? = 3 * 4</span>`;
    addCanvasText(questionText);
    return '12';
}

function genQuestion6muf(progressInt) {
    const number1 = pickRandomNumber(0, 5);
    const number2 = pickRandomNumber(0, 5);
    let questionText = '';
    if (progressInt < 5) {
    } else if (progressInt < 20) {
        const questionType = pickRandomNumber(0, 1);
        if ((progressInt < 10) || (questionType === 1)) {
            const equationOrder = pickRandomNumber(0, 1);
            questionText = `<span class="equation-in-text">${number1} * ${number2} = ?</span>`;
            if (equationOrder === 1) {
                questionText = `<span class="equation-in-text">? = ${number1} * ${number2}</span>`;
            }
        }
    }

    makeSquareNumberBonds('?', number1.toString(), number2.toString());
    addCanvasText(questionText);
    return logCheckRep((number1 * number2).toString(), questionText, genQuestion6muf, progressInt);
}

function genQuestion7muf(progressInt) {
    if (progressInt === 0) {
        sectionTracklist = ['pluck', '', makeIterList('012345', '012345')];
    }
    const questionString = chooseFromList(sectionTracklist[2]);
    sectionTracklist[1] = questionString;
    const numberCouplet = questionString.split(':');
    const number1 = parseInt(numberCouplet[0]);
    const number2 = parseInt(numberCouplet[1]);

    const equationOrder = pickRandomNumber(0, 1);
    questionText = `<span class="equation-solve-text">${number1} * ${number2} = ?</span>`;
    if (equationOrder === 1) {
        questionText = `<span class="equation-solve-text">? = ${number1} * ${number2}</span>`;
    }
    placeTextQuestion([questionText]);
    return (number1 * number2).toString();
}
