
function genQuestion1moa(progressInt) {
    let number1 = pickRandomNumber(0, 10);
    let number2 = pickRandomNumber(0, 10);
    let number3 = pickRandomNumber(0, 10);
    if (progressInt === 100) {
        number1 = pickRandomNumber(100, 1000);
        number2 = pickRandomNumber(100, 1000);
        number3 = pickRandomNumber(100, 1000);
    }
    const number4 = number1 + number2 + number3;
    let numberList = [number1, number2, number3, number4];
    const variableLocation = chooseFromList([0, 2, 3]);
    const answerNumber = numberList[variableLocation];
    const variable = chooseFromList(variableList2);
    numberList[variableLocation] = variable;
    const side1 = numberList[0] + ' + ' + numberList[1] + ' + ' + numberList[2];
    const side2 = numberList[3];
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
    return logCheckRep(answer, questionText, genQuestion1moa, progressInt);
}

function genQuestion2moa(progressInt) {
    return genQuestion1moa(10);
}

function genQuestion3moa() {
    return genQuestion1moa(100);
}
