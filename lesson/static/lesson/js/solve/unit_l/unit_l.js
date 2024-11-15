
function drawScale(ctx) {
    ctx.lineWidth = '3';
    const pointList = [[350, 375], [400, 325], [450, 375], [350, 375]];
    drawPath(ctx, pointList);
    drawLine(ctx, [200, 325], [600, 325]);
    drawLine(ctx, [200, 325], [200, 275]);
    drawLine(ctx, [600, 325], [600, 275]);
    ctx.lineWidth = '5';
    drawLine(ctx, [25, 275], [375, 275]);
    drawLine(ctx, [425, 275], [775, 275]);
}

function makeDistanceList(count) {
    let remainder = count;
    let countLimit = 4;
    if (count > 10) {
        countLimit = 6;
    }
    let distanceList = [];
    while (true) {
        if (remainder > countLimit) {
            remainder -= countLimit;
            distanceList.push(countLimit);
            countLimit -= 1;
        } else {
            distanceList.push(remainder);
            break;
        }
    }
    return distanceList;
}

// small size is 4, large size is 6
function drawQuestionCupByBase(ctx, centerX, baseY, size, text) {
    const startX = centerX - (size * 3);
    const startY = baseY;
    const pointList = [
                        [startX, startY],
                        [startX - size, startY - (size * 10)],
                        [startX + (size * 7), startY - (size * 10)],
                        [startX + (size * 6), startY],
                        [startX, startY],
                    ];
    drawPath(ctx, pointList);
    ctx.fillStyle = 'orange';
    ctx.fill();
    const fontSize = size * 7;
    ctx.font = `${fontSize}px Helvetica`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(text, centerX, baseY - (size * 4));
}

function placeCupsSequenceByCenter(ctx, centerX, baseY, count, size, text='?') {
    distanceList = makeDistanceList(count);
    let yValue = baseY;
    let xValue = '';
    for (let distance of distanceList) {
        xValue = centerX - (distance * (size * 4)) + (size * 4);
        for (let i = 0; i < distance; i++) {
            drawQuestionCupByBase(ctx, xValue, yValue, size, text);
            const addValue = size * 8;
            xValue += addValue;
        }
        const subtractValue = (size * 10) + 2;
        yValue -= subtractValue;
    }
}

function drawTenBarByCenter(ctx, centerX, centerY) {
    const yValue = centerY;
    let xValue = centerX - 90;
    for (let i = 0; i < 10; i++) {
        strokeSquareByCenter(ctx, xValue, yValue, 10, '', 'blue', colorFill=true);
        xValue += 20;
    }
}

function stackTenBarsByCenter(ctx, centerX, centerY, count) {
    let yValue = centerY;
    let xValue = centerX;
    for (let i = 0; i < count; i++) {
        if (i % 2 === 0) {
            xValue = centerX;
        } else {
            xValue = centerX - 10;
        }
        drawTenBarByCenter(ctx, xValue, yValue);
        yValue -= 22;
    }
    return [xValue, yValue];
}

// small size is 10, large size is 20
function placeBlocksSequenceByCenter(ctx, centerX, centerY, count, size) {
    distanceList = makeDistanceList(count);
    let yValue = centerY;
    let xValue = '';
    for (let distance of distanceList) {
        xValue = centerX - (distance * size) + size;
        for (let i = 0; i < distance; i++) {
            strokeSquareByCenter(ctx, xValue, yValue, size, text='', fillStyle='blue', colorFill=true);
            const addValue = size * 2;
            xValue += addValue;
        }
        const subtractValue = (size * 2) + 2;
        yValue -= subtractValue;
    }
}

function placeTenBarsStack(ctx, centerX, centerY, count) {
    const tenBarCount = Math.floor(count / 10);
    const stackCount = count % 10;
    const centerCouplet = stackTenBarsByCenter(ctx, centerX, centerY, tenBarCount);
    placeBlocksSequenceByCenter(ctx, centerCouplet[0], centerCouplet[1], stackCount, 10);
}

function placeScaleItem(ctx, term, xPosition, size='small') {
    if (term === '?') {
        return ['large', ''];
    }
    if (term.includes('*')) {
        const termList = term.split('*');
        if (termList.length === 2) {
            if (isInteger(termList[1])) {
                if (isInteger(termList[0])) {
                    term = (parseInt(termList[0]) * parseInt(termList[1])).toString();
                } else {
                    term = termList[1] + termList[0];
                }
            } else {
                term = termList[0] + termList[1];
            }
        }
    }
    let variable = '';
    for (const char of term) {
        const c = char.toLowerCase();
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c)) {
            if (variable !== '') {
                return ['invalid', ''];
            }
        } else if (variableList1.includes(c)) {
            if (variable !== '') {
                return ['invalid', ''];
            } else {
                variable = char;
            }
        } else {
            return ['invalid', ''];
        }
    }
    let number = 1;
    if (variable === '') {
        number = 0
    } else {
        term = removeFromStringByValue(term, variable);
    }
    if (term !== '') {
        number = parseInt(term);
    }
    if (variable === '') {
        if (number > 120) {
            return ['invalid', number];
        } else {
            if ((size === 'small') || (number > 21) || (number > 10 && xPosition >= 2)) {
                if (number > 21) {
                    const centerX = [200, 600, 130, 270, 530, 670][xPosition];
                    placeTenBarsStack(ctx, centerX, 262, number);
                    return ['small', number];
                } else {
                    const centerX = [200, 600, 110, 290, 510, 690][xPosition];
                    placeBlocksSequenceByCenter(ctx, centerX, 262, number, 10);
                    return ['small', number];
                }
            } else {
                const centerX = [200, 600, 110, 290, 510, 690][xPosition];
                placeBlocksSequenceByCenter(ctx, centerX, 252, number, 20);
                return ['large', number];
            }
        }
    } else if (variable.length === 1) {
        if (number > 21) {
            return ['invalid', number];
        } else {
            const centerX = [200, 600, 110, 290, 510, 690][xPosition];
            let cupSize = 5.5;
            let returnSize = 'large';
            if ((size === 'small') || (number > 10 && xPosition >= 2)) {
                cupSize = 4;
                returnSize = 'small';
            }
            placeCupsSequenceByCenter(ctx, centerX, 272, number, cupSize, text=variable);
            return [returnSize, number];
        }
    } else {
        return ['invalid', number];
    }
}

function makeAlgebraScale(equation, size='large') {
    const canvas = clearStartCanvas(800, 400);
    const equationList = stripclean(equation).split('=');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        drawScale(ctx);
        ctx.lineWidth = '3';
        if (equationList.length === 2) {
            let sizeTracker = '';
            loop1:
            for (let i = 0; i < 2; i++) {
                const sideList = equationList[i].split('+');
                if (sideList.length === 1) {
                    let xPosition = 0;
                    if (i === 1) {
                        xPosition = 1;
                    }
                    const newSize = placeScaleItem(ctx, sideList[0], xPosition, size)[0];
                    if (newSize === 'invalid') {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        drawScale(ctx);
                        break loop1;
                    } else {
                        if (sizeTracker === '') {
                            sizeTracker = newSize;
                        } else if (newSize !== sizeTracker) {
                            if (size === 'large') {
                                makeAlgebraScale(equation, size='small');
                                break loop1;
                            }
                        }
                    }
                } else if (sideList.length === 2) {
                    let prevTermNumber = 0;
                    loop2:
                    for (let j = 0; j < 2; j++) {
                        let xPosition = 2;
                        if (i === 0 && j === 1) {
                            xPosition = 3;
                        } else if (i === 1 && j === 0) {
                            xPosition = 4;
                        } else if (i === 1 && j === 1) {
                            xPosition = 5;
                        }
                        const placeCouplet = placeScaleItem(ctx, sideList[j], xPosition, size);
                        const newSize = placeCouplet[0];
                        const termNumber = placeCouplet[1];
                        if (newSize === 'invalid' || (prevTermNumber > 21 && termNumber > 21)) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            drawScale(ctx);
                            break loop1;
                        } else {
                            if (sizeTracker === '') {
                                sizeTracker = newSize;
                            } else if (newSize !== sizeTracker) {
                                if (size === 'large') {
                                    makeAlgebraScale(equation, size='small');
                                    break loop1;
                                }
                            }
                        }
                        prevTermNumber = termNumber;
                    }
                }
            }
        }
    }
}

function setLiveAlgebraScale() {
    setTimeout(function() {
        let equation = stripclean(solveinput.value);
        if (!equation.includes('=') && equation !== '') {
            equation += '=';
        } else if (equation.includes('+=')) {
            equation = '';
        }
        if (equation.includes('==') || equation.includes('++') || equation.includes('=+')) {
            equation = '';
        }
        makeAlgebraScale(equation);
    }, 100);
}

function simpleEquationCheckVariables(recurringDict, valueList) {
    let prevValues = [];
    for (const variable in recurringDict) {
        let tempValues = [];
        let firstValue = valueList[recurringDict[variable][0]];
        for (const index of recurringDict[variable].slice(1)) {
            const value = valueList[index];
            if (value !== firstValue || prevValues.includes(value)) {
                return false;
            } else {
                tempValues.push(value);
            }
        }
        prevValues += tempValues;
    }
    return true;
}

//(range * range * range * range) should be less than about 30^4
function makeSimpleEquationA(operations, ranges, variables, balanced=true) {

    let recurringDict = {};
    for (let i = 0; i < 4; i++) {
        const variable = variables[i];
        if (variable !== '') {
            if (variable in recurringDict) {
                recurringDict[variable] = recurringDict[variable].concat([i]);
            } else {
                recurringDict[variable] = [i];
            }
        }
    }

    let termOptions = [[], [], [], []];
    for (let i = 0; i < 4; i++) {
        const range = ranges[i];
        let operation = operations[0];
        if (i > 1) {
            operation = operations[1];
        }
        if (range.length === 0) {
            if (operation === 'add' || operation === 'subtract') {
                termOptions[i].push('0');
            } else if (operation === 'multiply' || operation === 'divide') {
                termOptions[i].push('1');
            }
        } else if (range.length === 1) {
            termOptions[i].push(range[0]);
        } else {
            for (let j = range[0]; j <= range[1]; j++) {
                termOptions[i].push(j);
            }
        }
    }

    let balancedOptions = [];
    let unbalancedOptions = [];

    for (const l1 of termOptions[0]) {
        for (const l2 of termOptions[1]) {
            for (const r1 of termOptions[2]) {
                for (const r2 of termOptions[3]) {
                    let leftTotal = '';
                    if (operations[0] === 'add') {
                        leftTotal = parseInt(l1) + parseInt(l2);
                    } else if (operations[0] === 'subtract') {
                        leftTotal = parseInt(l1) - parseInt(l2);
                    } else if (operations[0] === 'multiply') {
                        leftTotal = parseInt(l1) * parseInt(l2);
                    } else if (operations[0] === 'divide') {
                        leftTotal = parseInt(l1) / parseInt(l2);
                    }
                    let rightTotal = '';
                    if (operations[1] === 'add') {
                        rightTotal = parseInt(r1) + parseInt(r2);
                    } else if (operations[1] === 'subtract') {
                        rightTotal = parseInt(r1) - parseInt(r2);
                    } else if (operations[1] === 'multiply') {
                        rightTotal = parseInt(r1) * parseInt(r2);
                    } else if (operations[1] === 'divide') {
                        rightTotal = parseInt(r1) / parseInt(r2);
                    }
                    if (leftTotal === rightTotal && simpleEquationCheckVariables(recurringDict, [l1, l2, r1, r2])) {
                        balancedOptions.push([l1, l2, r1, r2]);
                    } else {
                        unbalancedOptions.push([l1, l2, r1, r2]);
                    }
                }
            }
        }
    }
    let equationChoice = '';
    if (balanced) {
        equationChoice = chooseFromList(balancedOptions);
    } else {
        equationChoice = chooseFromList(unbalancedOptions);
    }
    const sides = [equationChoice.slice(0, 2), equationChoice.slice(2, 4)];
    const returnEquation = [[], []];
    for (let i = 0; i < 2; i++) {
        for (const term of sides[i]) {
            if (typeof(term) === 'number') {
                returnEquation[i].push(term);
            }
        }
    }
    return returnEquation;
}

function simpleEquationGetStartSide(sides) {
    let priorityList = [[], [], [], []];
    for (let i = 0; i < 2; i++) {
        const side = sides[i];
        let numberCount = 0;
        let blankCount = 0;
        for (const term of side) {
            if (typeof(term) === 'number') {
                numberCount += 1;
            } else {
                blankCount += 1;
            }
        }
        if (blankCount === 0) {
            priorityList[0].push(i);
        } else if (numberCount === 1) {
            priorityList[1].push(i);
        } else if (blankCount === 2) {
            priorityList[2].push(i);
        } else {
            priorityList[3].push(i);
        }
    }
    for (const list of priorityList) {
        if (list.length > 0) {
            return chooseFromList(list);
        }
    }
}

function makeSimpleEquationB(operations, ranges, sides) {
    let sideTotalOptions = [];
    const startSide = simpleEquationGetStartSide(sides);
    let operation = operations[startSide];
    let range = ranges[startSide];
    let side = sides[startSide];
    if (side.length === 1) {
        const term = side[0];
        const termRange = range[0];
        if (typeof(term) === 'number') {
            sideTotalOptions = [term];
        } else {
            for (let i = termRange[0]; i < termRange[1]; i++) {
                sideTotalOptions.push(i);
            }
        }
    } else if (typeof(side[0]) === 'number' && typeof(side[1]) === 'number') {
        if (operation === 'add') {
            sideTotalOptions = [side[0] + side[1]];
        } else if (operation === 'subtract') {
            sideTotalOptions = [side[0] - side[1]];
        } else if (operation === 'multiply') {
            sideTotalOptions = [side[0] * side[1]];
        } else if (operation === 'divide') {
            sideTotalOptions = [side[0] / side[1]];
        }
    } else {
        if (typeof(side[0]) !== 'number' && typeof(side[1]) !== 'number') {
            let newTermLocation = 1;
            if (operation !== 'divide') {
                if (side[0] === '' && side[1] !== '') {
                    newTermLocation = 1;
                } else if (side[1] === '' && side[0] !== '') {
                    newTermLocation = 0;
                } else {
                    newTermLocation = pickRandomNumber(0, 1);
                }
            }
            const newTerm = pickRandomNumber(range[newTermLocation][0], range[newTermLocation][1]);
            side[newTermLocation] = newTerm;
        }
        let numberLocation = 0;
        let termRange = range[1];
        if (typeof(sides[startSide][0]) !== 'number') {
            numberLocation = 1;
            termRange = range[0];
        }
        const number = side[numberLocation];
        if (operation === 'add') {
            for (let i = number + termRange[0]; i <= number + termRange[1]; i++) {
                sideTotalOptions.push(i);
            }
        } else if (operation === 'subtract') {
            if (numberLocation === 0) {
                for (let i = number - termRange[1]; i <= number - termRange[0]; i++) {
                    sideTotalOptions.push(i);
                }
            } else {
                for (let i = termRange[0] - number; i <= termRange[1] - number; i++) {
                    sideTotalOptions.push(i);
                }
            }
        } else if (operation === 'multiply') {
            for (let i = termRange[0]; i <= termRange[1]; i++) {
                sideTotalOptions.push(i * number);
            }
        } else if (operation === 'divide') {
            if (numberLocation === 0) {
                for (let i = termRange[1]; i >= termRange[0]; i--) {
                    if (number % i === 0) {
                        sideTotalOptions.push(number / i);
                    }
                }
            } else {
                for (let i = termRange[0]; i <= termRange[1]; i++) {
                    if (i % number === 0) {
                        sideTotalOptions.push(i / number);
                    }
                }
            }
        }
    }

    let cycleOrder = [0, 1];
    if (startSide === 0) {
        cycleOrder = [1, 0];
    }

    for (const i of cycleOrder) {
        operation = operations[i];
        range = ranges[i];
        side = sides[i];
        if (side.length === 1) {
            let options = [];
            for (const total of sideTotalOptions) {
                if (total >= range[0][0] && total <= range[0][1]) {
                    options.push(total);
                }
            }
            const total = chooseFromList(options);
            side[0] = total;
            sideTotalOptions = [total];
        } else if (typeof(side[0]) !== 'number' || typeof(side[1]) !== 'number') {
            let termOptions = [[], []];
            for (let j = 0; j < 2; j++) {
                const term = side[j];
                let otherTerm = side[0];
                if (j === 0) {
                    otherTerm = side[1];
                }
                if (typeof(term) === 'number') {
                    termOptions[j].push(term);
                } else {
                    for (let k = range[j][0]; k <= range[j][1]; k++) {
                        termOptions[j].push(k);
                    }
                }
            }
            const leftTermOptions = termOptions[0];
            const rightTermOptions = termOptions[1];

            let finalOptions = [];
            for (const leftTerm of leftTermOptions) {
                for (const rightTerm of rightTermOptions) {
                    for (const total of sideTotalOptions) {
                        if (operation === 'add') {
                            if (leftTerm + rightTerm === total) {
                                finalOptions.push([leftTerm, rightTerm, total]);
                            }
                        } else if (operation === 'subtract') {
                            if (leftTerm - rightTerm === total) {
                                finalOptions.push([leftTerm, rightTerm, total]);
                            }
                        } else if (operation === 'multiply') {
                            if (leftTerm * rightTerm === total) {
                                finalOptions.push([leftTerm, rightTerm, total]);
                            }
                        } else if (operation === 'divide') {
                            if (leftTerm / rightTerm === total) {
                                finalOptions.push([leftTerm, rightTerm, total]);
                            }
                        }
                    }
                }
            }
            const final = chooseFromList(finalOptions);
            for (let j = 0; j < 2; j++) {
                side[j] = final[j];
            }
            sideTotalOptions = [final[2]];
        }
    }
    return sides;
}

//form of ['add', 'add'], [[0, 10], [10], [3, 7], []], ['', 'a', 'a', 'b']
function makeSimpleEquation(operations, ranges, variables=['', '', '', ''], balanced=true) {
    let iterAmount = 1;
    for (const range of ranges) {
        const span = range[1] - range[0];
        if (span > 0) {
            iterAmount *= span;
        }
    }
    let areVariables = false;
    for (const variable of variables) {
        if (variable !== '' && typeof(variable) !== 'number') {
            areVariables = true;
        }
    }
    if (iterAmount > 30**4 && !areVariables && balanced) {
        let newRanges  = [[], []];
        let sides = [[], []];
        for (let i = 0; i < 4; i++) {
            let target = 0;
            if (i > 1) {
                target = 1;
            }
            if (ranges[i].length === 1) {
                sides[target].push(ranges[i][0]);
                newRanges[target].push(ranges[i]);
            } else if (ranges[i].length > 1) {
                sides[target].push('');
                newRanges[target].push(ranges[i]);
            }
        }
        return makeSimpleEquationB(operations, newRanges, sides);
    } else {
        return makeSimpleEquationA(operations, ranges, variables, balanced);
    }
}

function addEquationVariables(equationList, variableLocations, variableList) {
     let returnList = [[], []];
     for (let i = 0; i < 2; i++) {
         for (let j = 0; j < equationList[i].length; j++) {
             if (variableLocations[i].includes(j)) {
                 returnList[i].push(variableList[0]);
             } else {
                 returnList[i].push(equationList[i][j]);
             }
         }
     }
     return returnList;
}
