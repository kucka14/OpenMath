
function genQuestion1osm(progressInt) {
    let number1 = pickRandomNumber(1, 10);
    let number2 = pickRandomNumber(1, 10);
    if (progressInt === 100) {
        number1 = pickRandomNumber(10, 30);
        number2 = pickRandomNumber(10, 30);
    }
    const number3 = number1 * number2;
    let numberList = [number1, number2, number3];
    const variableLocation = pickRandomNumber(0, 2);
    const answerNumber = numberList[variableLocation];
    const variable = chooseFromList(variableList2);
    numberList[variableLocation] = variable;
    const side1 = numberList[0] + ' * ' + numberList[1];
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
    return logCheckRep(answer, questionText, genQuestion1osm, progressInt);
}

function genQuestion2osm(progressInt) {
    return genQuestion1osm(10);
}

function genQuestion3osm() {
    return genQuestion1osm(100);
}
