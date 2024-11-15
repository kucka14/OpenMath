
function genQuestion1bae(progressInt) {
    const number1 = pickRandomNumber(0, 10);
    const number2 = pickRandomNumber(0, 10);
    const sum = number1 + number2;
    const variableLocation = pickRandomNumber(0, 2);
    const variable = chooseFromList(variableList2);
    let expressionDisplay = `${number1} + ${number2}`;
    let sumDisplay = sum.toString();
    let preAnswer = '';
    if (variableLocation === 0) {
        expressionDisplay = `${variable} + ${number2}`;
        preAnswer = number1.toString();
    } else if (variableLocation === 1) {
        expressionDisplay = `${number1} + ${variable}`;
        preAnswer = number2.toString();
    } else if (variableLocation === 2) {
        sumDisplay = variable;
        preAnswer = sum.toString();
    }
    const answer = `${variable}=${preAnswer}`;
    const equationOrder = pickRandomNumber(0, 1);
    let equation = '';
    if (equationOrder === 0) {
        equation = `${expressionDisplay} = ${sumDisplay}`;
    } else {
        equation = `${sumDisplay} = ${expressionDisplay}`;
    }
    const questionText = `What is the missing number?<br><span class="equation-in-text">${equation}</span>`;
    placeTextQuestion([questionText]);
    return logCheckRep(answer, questionText, genQuestion1bae, progressInt);
}

function baeEquationMatch(inputValue, matchAnswer) {
    const inputList = inputValue.split(',');
    if (inputList.length !== 2) {
        return false;
    } else {
        let xValue = '';
        let yValue = '';
        for (const input of inputList) {
            const stripInput = stripclean(input);
            if (stripInput.slice(0, 2) === 'x=') {
                xValue = stripInput.slice(2);
            } else if (stripInput.slice(0, 2) === 'y=') {
                yValue = stripInput.slice(2);
            }
        }
        if (!isInteger(xValue) || !isInteger(yValue)) {
            return false;
        } else {
            let bigTerm = '';
            let smallTerm = '';
            if (matchAnswer[0] === 'x') {
                bigTerm = xValue;
                smallTerm = yValue;
            } else {
                bigTerm = yValue;
                smallTerm = xValue;
            }
            return parseInt(bigTerm) - parseInt(smallTerm) === matchAnswer[1];
        }
    }
}

function genQuestion2bae() {
    const number = pickRandomNumber(1, 10);
    let variable1 = 'x';
    let variable2 = 'y';
    if (pickRandomNumber(0, 1) === 0) {
        variable1 = 'y';
        variable2 = 'x';
    }
    let doubleSide = variable1.toString() + ' + ' + number.toString();
    if (pickRandomNumber(0, 1) === 0) {
        doubleSide = number.toString() + ' + ' + variable1.toString();
    }
    let equation = doubleSide + ' = ' + variable2.toString();
    if (pickRandomNumber(0, 1) === 0) {
        equation = variable2.toString() + ' = ' + doubleSide;
    }
    const questionText = `What numbers could replace the variables in the equation below?<br>
                          Give your answer in the form x = 1, y = 2.<br>
                          <span class="equation-in-text">${equation}</span>`;
    placeTextQuestion([questionText]);
    return logCheckRep([variable2, number], questionText, genQuestion2bae);
}
