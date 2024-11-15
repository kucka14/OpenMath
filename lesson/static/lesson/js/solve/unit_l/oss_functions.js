
function genQuestion1oss(progressInt) {
    let number2 = pickRandomNumber(0, 12);
    let number3 = pickRandomNumber(0, 12);
    if (progressInt === 100) {
        number2 = pickRandomNumber(100, 1000);
        number3 = pickRandomNumber(100, 1000);
    }
    const number1 = number2 + number3;
    let numberList = [number1, number2, number3];
    const variableLocation = chooseFromList([0, 2]);
    const answerNumber = numberList[variableLocation];
    const variable = chooseFromList(variableList2);
    numberList[variableLocation] = variable;
    const side1 = numberList[0] + ` ${subSymbol} ` + numberList[1];
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
    placeTextQuestion([questionText]);
    return logCheckRep(answer, questionText, genQuestion1oss, progressInt);
}

function genQuestion2oss(progressInt) {
    return genQuestion1oss(10);
}

function genQuestion3oss() {
    return genQuestion1oss(100);
}
