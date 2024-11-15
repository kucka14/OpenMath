
function genQuestion1mut() {
    addListener('input', setLiveDualGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        In this section, you will be given a multiplication equation.<br>
        You may type the equation as multiplication or repeated addition, supplying the answer instead of a question mark. Or you may provide the answer directly.<br>
        <span class="equation-in-text">7 * 3 = ?</span>
    `;
    addCanvasText(questionText, wide=false, small=true);
    return [['7+7+7', '3+3+3+3+3+3+3', '7*3', '3*7', ''], '21'];
}

function genQuestion2mut(progressInt) {
    addListener('input', setLiveDualGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const number1 = pickRandomNumber(2, 10);
    const number2 = pickRandomNumber(6, 10);
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
    return logCheckRep([equationList, (number1 * number2).toString()], questionText, genQuestion2mut, progressInt);
}

function genQuestion3mut() {
    makeSquareNumberBonds('?', '6', '7');
    const questionText = `With number bond squares, the bottom two numbers multiply together to equal the top number.`;
    addCanvasText(questionText);
    return '42';
}

function genQuestion4mut() {
    makeSquareNumberBonds('?', '8', '5');
    const questionText = `Sometimes you'll be given the equation as well.<br>
                     <span class="equation-in-text">8 * 5 = ?</span>`;
    addCanvasText(questionText);
    return '40';
}

function genQuestion5mut() {
    makeSquareNumberBonds('?', '8', '5');
    const questionText = `Sometimes the equation will be reversed, but the answer does not change.<br>
                     <span class="equation-in-text">? = 8 * 5</span>`;
    addCanvasText(questionText);
    return '40';
}

function genQuestion6mut(progressInt) {
    const number1 = pickRandomNumber(0, 10);
    const number2 = pickRandomNumber(6, 10);
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
    return logCheckRep((number1 * number2).toString(), questionText, genQuestion6mut, progressInt);
}

function genQuestion7mut(progressInt) {
    if (progressInt === 0) {
        sectionTracklist = ['pluck', '', makeIterList(['0','1','2','3','4','5','6','7','8','9','10'], ['6','7','8','9','10'])];
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
