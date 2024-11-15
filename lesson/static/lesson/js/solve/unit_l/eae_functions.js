
function makeNumberSentence(type, numberLow=1, numberHigh=100) {
    const operation = chooseFromList(['add', 'subtract', 'multiply', 'divide']);
    const variable = chooseFromList(['x', 'y', 'z', 'a', 'b']);
    const number = pickRandomNumber(numberLow, numberHigh);
    let term1 = variable;
    let term2 = number;
    if (pickRandomNumber(0, 1) === 1) {
        term1 = number;
        term2 = variable;
    }
    let expression = '';
    let expressionAnswer = '';
    if (operation === 'add') {
        const addType = pickRandomNumber(0, 2);
        if (addType === 0) {
            expression = `${term1} plus ${term2}`;
        } else if (addType === 1) {
            expression = `${term1} larger than ${term2}`;
        } else if (addType === 2) {
            expression = `the sum of ${term1} and ${term2}`;
        }
        expressionAnswer = [`${term1}+${term2}`, `${term2}+${term1}`];
    } else if (operation === 'subtract') {
        const subtractType = pickRandomNumber(0, 2);
        expressionAnswer = [`${term1}-${term2}`];
        if (subtractType === 0) {
            expression = `${term1} minus ${term2}`;
        } else if (subtractType === 1) {
            expression = `${term2} less than ${term1}`;
        } else if (subtractType === 2) {
            expression = `the difference of ${term1} and ${term2}`;
            expressionAnswer.push(`${term2}-${term1}`);
        }
    } else if (operation === 'multiply') {
        const multiplyType = pickRandomNumber(0, 1);
        if (multiplyType === 0) {
            expression = `${term1} times ${term2}`;
        } else if (multiplyType === 1) {
            expression = `the product of ${term1} and ${term2}`;
        }
        expressionAnswer = [`${term1}*${term2}`, `${term2}*${term1}`, `${term1}${term2}`, `${term2}${term1}`];
    } else if (operation === 'divide') {
        const divideType = pickRandomNumber(0, 1);
        expressionAnswer = [`${term1}/${term2}`];
        if (divideType === 0) {
            expression = `${term1} divided by ${term2}`;
        } else if (divideType === 1) {
            expression = `the quotient of ${term1} and ${term2}`;
            expressionAnswer.push(`${term2}/${term1}`);
        }
    }
    if (type === 'expression') {
        if (expression.slice(1, 2) !== ' ') {
            expression = capitalizeFirstLetter(expression);
        }
        return [expression, expressionAnswer];
    } else if (type === 'equation') {
        const equalsNumber = pickRandomNumber(numberLow, numberHigh);
        const equalsType = pickRandomNumber(0, 2);
        let equalsSide = '';
        if (equalsType === 0) {
            equalsSide = `is`;
        } else if (equalsType === 1) {
            equalsSide = `is equal to`;
        } else if (equalsType === 2) {
            equalsSide = `equals`;
        }
        let equation = '';
        let equationAnswer = [];
        const equationOrder = pickRandomNumber(0, 1);
        if (equationOrder === 0) {
            equation = expression + ' ' + equalsSide + ' ' + equalsNumber + '.';
            for (const exp of expressionAnswer) {
                equationAnswer.push(`${exp}=${equalsNumber}`);
            }
        } else if (equationOrder === 1){
            equation = equalsNumber + ' ' + equalsSide + ' ' + expression + '.';
            for (const exp of expressionAnswer) {
                equationAnswer.push(`${equalsNumber}=${exp}`);
            }
        }
        if (equation.slice(1, 2) !== ' ') {
            equation = capitalizeFirstLetter(equation);
        }
        return [equation, equationAnswer];
    }
}

function genQuestion1eae(progressInt) {
    const expressionCouplet = makeNumberSentence('expression');
    const expression = expressionCouplet[0];
    const answer = expressionCouplet[1];
    const questionText = `Enter an expression that matches the following sentence:<br>
                          <i>${expression}</i>`;
    placeTextQuestion([questionText]);
    return logCheckRep(answer, questionText, genQuestion1eae, progressInt);
}

function genQuestion2eae(progressInt) {
    const equationCouplet = makeNumberSentence('equation');
    const equation = equationCouplet[0];
    const answer = equationCouplet[1];
    const questionText = `Enter an equation that matches the following sentence:<br>
                          <i>${equation}</i>`;
    placeTextQuestion([questionText]);
    return logCheckRep(answer, questionText, genQuestion2eae, progressInt);
}

function genQuestion3eae(progressInt) {
    if (progressInt === 0) {
        sectionTracklist = ['pluck', '', ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']];
    }
    const questionType = chooseFromList(sectionTracklist[2]);
    sectionTracklist[1] = questionType;
    if (questionType === 'a') {
        return genQuestion1eae(9);
    } else if (questionType === 'b') {
        return genQuestion2eae(9);
    }
}

function genQuestion4eae() {
    const type = chooseFromList(['expression', 'equation']);
    const etypeCouplet = makeNumberSentence(type, 1000, 10000);
    const etype = etypeCouplet[0];
    const answer = etypeCouplet[1];
    const questionText = `Enter an ${type} that matches the following sentence:<br>
                          <i>${etype}</i>`;
    placeTextQuestion([questionText]);
    return logCheckRep(answer, questionText, genQuestion4eae);
}
