
function genQuestion1aut() {
    const text = `Sometimes you'll add two colors together by counting.`;
    addCountColorQuestion(6, 4, [7, 5], topText=text);
    return '12';
}

function genQuestion2aut() {
    const text1 = `Sometimes you'll be given the number for each color.`;
    const text2 = '<span class="equation-in-text">9 + 5 = ?</span>';
    addCountColorQuestion(6, 4, [9, 5], topText=text1, bottomText=text2);
    return '14';
}

function genQuestion3aut(progressInt) {
    const number1 = pickRandomNumber(6, 10);
    const number2 = pickRandomNumber(6, 10);
    if (progressInt < 6) {
        addCountColorQuestion(6, 4, [number1, number2]);
    } else if (progressInt < 12) {
        const text = `<span class="equation-in-text">${number1} + ${number2} = ?</span>`;
        addCountColorQuestion(6, 4, [number1, number2], topText='', bottomText=text);
    } else if (progressInt < 18) {
        const questionText = `<span class="equation-solve-text">${number1} + ${number2} = ?</span>`;
        placeTextQuestion([questionText]);
    }
    return logCheckRep((number1 + number2).toString(), [number1, number2], genQuestion3aut, progressInt);
}

function genQuestion4aut() {
    makeCircleNumberBonds('?', '8', '9');
    const questionText = `With number bond circles, the bottom two numbers add together to equal the top number.`;
    addCanvasText(questionText);
    return '17';
}

function genQuestion5aut() {
    makeCircleNumberBonds('?', '6', '10');
    const questionText = `Sometimes you'll be given the equation as well.<br>
                 <span class="equation-in-text">6 + 10 = ?</span>`;
    addCanvasText(questionText);
    return '16';
}

function genQuestion6aut() {
    makeCircleNumberBonds('?', '10', '6');
    const questionText = `Sometimes the equation will be reversed, but the answer does not change.<br>
                      <span class="equation-in-text">? = 10 + 6</span>`;
    addCanvasText(questionText);
    return '16';
}

function genQuestion7aut(progressInt) {
    const number1 = pickRandomNumber(6, 10);
    const number2 = pickRandomNumber(6, 10);
    let questionText = '';
    if (progressInt < 5) {
    } else if (progressInt < 20) {
        const questionType = pickRandomNumber(0, 1);
        if ((progressInt < 10) || (questionType === 1)) {
            const equationOrder = pickRandomNumber(0, 1);
            questionText = `<span class="equation-in-text">${number1} + ${number2} = ?</span>`;
            if (equationOrder === 1) {
                questionText = `<span class="equation-in-text">? = ${number1} + ${number2}</span>`;
            }
        }
    }

    makeCircleNumberBonds('?', number1.toString(), number2.toString());
    addCanvasText(questionText);
    return logCheckRep((number1 + number2).toString(), questionText, genQuestion7aut, progressInt);
}

function genQuestion8aut(progressInt) {
    if (progressInt === 0) {
        const list1 = makeIterList(['0','1','2','3','4','5'], ['6','7','8','9','10'], reverse=false);
        const list2 = makeIterList(['6','7','8','9','10'], ['6','7','8','9','10'], reverse=false);
        sectionTracklist = ['pluck', '', list1.concat(list2)];
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

function genQuestion9aut() {
    return generateTriangleSums(8, 5);
}
