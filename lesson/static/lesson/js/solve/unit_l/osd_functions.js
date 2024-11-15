
function genQuestion1osd(progressInt) {
    let number2 = pickRandomNumber(1, 10);
    let number3 = pickRandomNumber(1, 10);
    if (progressInt === 100) {
        number2 = pickRandomNumber(10, 30);
        number3 = pickRandomNumber(10, 30);
    }
    const number1 = number2 * number3;
    let numberList = [number1, number2, number3];
    const variableLocation = chooseFromList([0, 2]);
    const answerNumber = numberList[variableLocation];
    const variable = chooseFromList(variableList2);
    numberList[variableLocation] = variable;
    const side1 = `\\(\\frac{${numberList[0]}}{${numberList[1]}}\\)`;
    const side2 = numberList[2];
    const equationOrder = pickRandomNumber(0, 1);
    let equation = '';
    if (equationOrder === 0) {
        equation = side1 + ' = ' + side2;
    } else {
        equation = side2 + ' = ' + side1;
    }
    const answer = variable + '=' + answerNumber.toString();
    const questionText = `
                            Solve for ${variable} in the equation below.<br>
                            <span class="equation-in-text">${equation}</span>
                        `;
    placeTextQuestion([questionText], renderMathjax=true);
    return logCheckRep(answer, questionText, genQuestion1osd, progressInt);
}

function genQuestion2osd(progressInt) {
    return genQuestion1osd(10);
}

function genQuestion3osd() {
    return genQuestion1osd(100);
}
