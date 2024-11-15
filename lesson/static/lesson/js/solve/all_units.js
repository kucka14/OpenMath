
function clean(text) {
    if ((text.slice(0, 1) === ',') || (text.slice(0, 1) === '.')) {
        text = text.slice(1);
    }
    if ((text.slice(text.length - 1) === ',') || (text.slice(text.length - 1) === '.')) {
        text = text.slice(0, text.length - 1);
    }
    return text.trim().toLowerCase();
}

function stripclean(text) {
    return clean(text).replaceAll(' ', '');
}

function antiMatch(inputValue, matchAnswer) {
    return false;
}

function autoMatch(inputValue, matchAnswer) {
    return true;
}

function currentMatch(inputValue, matchAnswer) {
    if (currentMatchFunction(inputValue, matchAnswer)) {
        currentMatchFunction = '';
        return true;
    } else {
        return false;
    }
}

function stringStringMatch(inputValue, matchAnswer) {
    inputValue = stripclean(inputValue);
    return inputValue === matchAnswer;
}

function anyOfStringMatch(inputValue, matchAnswer) {
    inputValue = stripclean(inputValue);
    return matchAnswer.includes(inputValue);
}

// matchAnswer should be in the form [['a', 3], ['b', 4], ['c', 2]]
function variableListMatch(inputValue, matchAnswer) {
    const inputList = inputValue.split(',');
    let cleanedInputList = [];
    for (const input of inputList) {
        cleanedInputList.push(stripclean(input));
    }
    let cleanedVariableList = [];
    for (const couplet of matchAnswer) {
        cleanedVariableList.push(couplet[0] + '=' + couplet[1].toString());
    }
    return arrayValuesMatch(cleanedInputList, cleanedVariableList);
}

function variableListGroupSumMatch(inputValue, matchAnswer) {
    const inputList = inputValue.split(',');
    let variableDict = {};
    for (const input of inputList) {
        const coupletEquation = stripclean(input);
        const coupletList = coupletEquation.split('=');
        variableDict[coupletList[0]] = parseInt(coupletList[1]);
    }
    for (const side of matchAnswer) {
        let inputSideSum = 0;
        for (const variable of side[0]) {
            if (variable in variableDict) {
                inputSideSum += variableDict[variable];
            } else {
                return false;
            }
        }
        if (inputSideSum !== side[1]) {
            return false;
        }
    }
    return true;
}

function matchEquationAllAdd(inputValue, matchAnswer) {
    const inputList = stripclean(inputValue).split('=');
    if (inputList.length === 2) {
        const leftSide = sumArray(inputList[0].split('+')).toString();
        const rightSide = sumArray(inputList[1].split('+')).toString();
        if (leftSide === rightSide && !isNaN(leftSide)) {
            if (matchAnswer === '' || matchAnswer === leftSide) {
                return true;
            }
        }
    }
    return false;
}

function matchEquationAllMultiply(inputValue, matchAnswer) {
    const inputList = stripclean(inputValue).split('=');
    if (inputList.length === 2) {
        const leftSide = multiplyArray(inputList[0].split('*')).toString();
        const rightSide = multiplyArray(inputList[1].split('*')).toString();
        if (leftSide === rightSide) {
            if (matchAnswer === '' || matchAnswer === leftSide) {
                return true;
            }
        }
    }
    return false;
}

// matchAnswer must be a list of valid expressions at index 0, and a single valid solution at index 1
function matchEquationGiven(inputValue, matchAnswer) {
    let inputExpression = '';
    let inputAnswer = '';
    const inputList = stripclean(inputValue).split('=');
    if (inputList.length === 2) {
        inputExpression = inputList[0];
        inputAnswer = inputList[1];
    } else if (inputList.length === 1) {
        inputAnswer = inputList[0];
    }
    if (matchAnswer[0].includes(inputExpression) && inputAnswer === matchAnswer[1]) {
        return true;
    } else {
        return false;
    }
}

function parseFraction(fraction) {
    let verdict = ['invalid'];
    if (fraction === '1') {
        verdict = ['valid', [1, 1]];
    } else if (fraction === '0') {
        verdict = ['valid', [0, 1]];
    } else {
        fractionParts = fraction.split('/');
        if (fractionParts.length === 2) {
            if (!fractionParts.includes('')) {
                let numerator = fractionParts[0];
                let denominator = fractionParts[1];
                if (isInteger(numerator) && isInteger(denominator)) {
                    verdict = ['valid', [parseInt(numerator), parseInt(denominator)]];
                }
            }
        }
    }
    return verdict;
}

let highlightInterval = '';
function setHighlightInterval(targetNumberList=['']) {
    let targetList = [];
    for (const targetNumber of targetNumberList) {
        for (const target of document.getElementsByClassName('highlight' + targetNumber.toString())) {
            targetList.push(target);
        }
    }
    count = 0;
    highlightInterval = setInterval(function() {
        for (const target of targetList) {
            if (target === null) {
                clearInterval(highlightInterval);
                highlightInterval = '';
            }
            if (target.style.color !== 'red') {
                target.setAttribute('data-oldcolor', target.style.color);
                target.style.color = 'red';
            } else {
                target.style.color = target.getAttribute('data-oldcolor');
            }
            count += 1;
            if (count > 10 * targetList.length) {
                target.style.color = target.getAttribute('data-oldcolor');
                target.removeAttribute('data-oldcolor');
                clearInterval(highlightInterval);
                highlightInterval = '';
            }
        }
    }, 200);
}

function setLiveHighlightTextAdd(e) {
    if (highlightInterval === '') {
        if (e.key === '+') {
            setHighlightInterval();
        }
    }
}

function setLiveHighlightTextMultiply(e) {
    if (highlightInterval === '') {
        if (e.key === '*') {
            setHighlightInterval();
        }
    }
}
