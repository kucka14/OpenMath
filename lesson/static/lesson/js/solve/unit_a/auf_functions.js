
function genQuestion1auf() {
    const text = `Sometimes you'll add two colors together by counting.`;
    addCountColorQuestion(6, 4, [3, 2], topText=text);
    return '5';
}

function genQuestion2auf() {
    const text1 = `Sometimes you'll be given the number for each color.`;
    const text2 = '<span class="equation-in-text">4 + 2 = ?</span>';
    addCountColorQuestion(6, 4, [4, 2], topText=text1, bottomText=text2);
    return '6';
}

function genQuestion3auf(progressInt) {
    const number1 = pickRandomNumber(0, 5);
    const number2 = pickRandomNumber(0, 5);
    if (progressInt < 6) {
        addCountColorQuestion(6, 4, [number1, number2]);
    } else if (progressInt < 12) {
        const text = `<span class="equation-in-text">${number1} + ${number2} = ?</span>`;
        addCountColorQuestion(6, 4, [number1, number2], topText='', bottomText=text);
    } else if (progressInt < 18) {
        const questionText = `<span class="equation-solve-text">${number1} + ${number2} = ?</span>`;
        placeTextQuestion([questionText]);
    }
    return logCheckRep((number1 + number2).toString(), [number1, number2], genQuestion3auf, progressInt);
}

function genQuestion4auf() {
    makeCircleNumberBonds('?', '1', '3');
    const questionText = `With number bond circles, the bottom two numbers add together to equal the top number.`;
    addCanvasText(questionText);
    return '4';
}

function genQuestion5auf() {
    makeCircleNumberBonds('?', '5', '1');
    const questionText = `Sometimes you'll be given the equation as well.<br>
                     <span class="equation-in-text">5 + 1 = ?</span>`;
    addCanvasText(questionText);
    return '6';
}

function genQuestion6auf() {
    makeCircleNumberBonds('?', '5', '1');
    const questionText = `Sometimes the equation will be reversed, but the answer does not change.<br>
                     <span class="equation-in-text">? = 5 + 1</span>`;
    addCanvasText(questionText);
    return '6';
}

function genQuestion7auf(progressInt) {
    const number1 = pickRandomNumber(0, 5);
    const number2 = pickRandomNumber(0, 5);
    let questionText = '';
    if (progressInt < 5) {
    } else if (progressInt < 20) {
        const questionType = pickRandomNumber(0, 1);
        if ((progressInt < 10) || (questionType === 1) || (questionType === 0)) {
            const equationOrder = pickRandomNumber(0, 1);
            questionText = `<span class="equation-in-text">${number1} + ${number2} = ?</span>`;
            if (equationOrder === 1) {
                questionText = `<span class="equation-in-text">? = ${number1} + ${number2}</span>`;
            }
        }
    }
    makeCircleNumberBonds('?', number1.toString(), number2.toString());
    addCanvasText(questionText);
    return logCheckRep((number1 + number2).toString(), questionText, genQuestion7auf, progressInt);
}

function genQuestion8auf(progressInt) {
    if (progressInt === 0) {
        sectionTracklist = ['pluck', '', makeIterList('012345', '012345')];
    }
    const questionString = chooseFromList(sectionTracklist[2]);
    sectionTracklist[1] = questionString;
    const numberCouplet = questionString.split(':');
    const number1 = parseInt(numberCouplet[0]);
    const number2 = parseInt(numberCouplet[1]);

    const equationOrder = pickRandomNumber(0, 1);
    questionText = `<span class="equation-solve-text">${number1} + ${number2} = ?</span>`;
    if (equationOrder === 1) {
        questionText = `<span class="equation-solve-text">? = ${number1} + ${number2}</span>`;
    }
    placeTextQuestion([questionText]);
    return (number1 + number2).toString();
}

function genQuestion9auf() {
    return generateTriangleSums(6, 3);
}
