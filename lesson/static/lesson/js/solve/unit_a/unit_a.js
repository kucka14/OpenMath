
//for grid positioning, treat as if it was 600px x 400px
function makeCountGrid(columns, rows, count, targetColor='black', otherColors=[''], countAlt=0, targetColorAlt='') {
    const canvas = clearStartCanvas(600, 400);
    const cellSize = 380 / rows;
    if (canvas.getContext) {
        const returnList = pickUniqueNumbers(0, (columns * rows) - 1, count, countAlt);
        const positionList = returnList[0];
        const positionListAlt = returnList[1];
        const ctx = canvas.getContext('2d');
        let counter = 0;
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                let color = '';
                if (positionList.includes(counter)) {
                    color = targetColor;
                } else if (positionListAlt.includes(counter)){
                    color = targetColorAlt;
                } else {
                    color = chooseFromList(otherColors);
                }
                if (color !== '') {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc((i * cellSize) + (cellSize / 2) + 10, (j * cellSize) + (cellSize / 2) + 10, (cellSize / 2) - 4, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.closePath();
                }
                counter += 1;
            }
        }
    }
}

function addCountColorQuestion(columns, rows, numberList, topText='', bottomText='') {
    let colorList = ['blue', 'red', 'yellow', 'black'];
    let colorChoices = [];
    for (let i = 0; i < numberList.length; i++) {
        const choiceIndex = pickRandomNumber(0, 3 - i);
        const colorChoice = colorList.splice(choiceIndex, 1);
        colorChoices.push(colorChoice);
    }
    colorList.push('');
    let countAlt = 0;
    let targetColorAlt = ''
    let questionText = `How many <strong>${colorChoices[0]}</strong> circles are there?`;
    if (numberList.length > 1) {
        countAlt = numberList[1];
        targetColorAlt = colorChoices[1];
        questionText = `What is the number of <strong>${colorChoices[0]}</strong> circles plus the number of <strong>${colorChoices[1]}</strong> circles?`;
    }
    if (topText !== '') {
        questionText = topText + '<br>' + questionText;
    }
    if (bottomText !== '') {
        questionText = questionText + '<br>' + bottomText;
    }
    makeCountGrid(columns, rows, numberList[0], targetColor=colorChoices[0], otherColors=colorList, countAlt=countAlt, targetColorAlt=targetColorAlt);
    addCanvasText(questionText);
}

function makeCircleNumberBonds(topNumber, leftNumber, rightNumber) {
    const canvas = clearStartCanvas(400, 400);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = '3';
        ctx.font = '50px Helvetica';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // paths of the three circles
        strokeCircle(ctx, 200, 100, 75, text=topNumber);
        strokeCircle(ctx, 100, 300, 75, text=leftNumber);
        strokeCircle(ctx, 300, 300, 75, text=rightNumber);

        // paths of the two connecting lines
        drawLine(ctx, [100, 225], [175, 100 + Math.sqrt(75**2 - 25**2)]);
        drawLine(ctx, [300, 225], [225, 100 + Math.sqrt(75**2 - 25**2)]);
    }
}

function makeSquareNumberBonds(topNumber, leftNumber, rightNumber, renderMathjax=false) {
    const canvas = clearStartCanvas(400, 400, styleHeight=[], renderMathjax);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = '3';
        ctx.font = '50px Helvetica';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // paths of the three squares
        strokeSquareByCenter(ctx, 200, 100, 75, topNumber);
        strokeSquareByCenter(ctx, 100, 300, 75, leftNumber);
        strokeSquareByCenter(ctx, 300, 300, 75, rightNumber);

        // paths of the two connecting lines
        drawLine(ctx, [100, 225], [175, 175]);
        drawLine(ctx, [300, 225], [225, 175]);
    }
    if (renderMathjax) {
        setTimeout(function() {MathJax.typeset();});
    }
}

function strikeThrough(ctx, shapeType, centerX, centerY, radius, doubleStrike=true) {
    let shift = Math.sqrt(radius**2 / 2);
    if (shapeType === 'square') {
        shift = radius;
    }
    const xLeft = centerX - shift;
    const xRight = centerX + shift;
    const yTop = centerY - shift;
    const yBottom = centerY + shift;
    drawLine(ctx, [xLeft, yTop], [xRight, yBottom]);
    if (doubleStrike) {
        drawLine(ctx, [xLeft, yBottom], [xRight, yTop]);
    }
}

// [blpair, brpair, ml, mr, t]
let currentTierNumbers = [[], [], '?', '?', '?'];
let currentShapeType = '';
let currentStrikethrough = true;
const neutralTextList = ['', '?'];
function parseFillColor(textWord) {
    let fillColor = 'black';
    if (textWord[0] === 'd') {
        fillColor = 'blue';
    } else if (textWord[0] === 'b') {
        fillColor = 'blue';
    }
    return fillColor;
}
function placeNumberTiers(renderMathjax=false) {
    const shapeType = currentShapeType;
    let shapeFunction = strokeCircle;
    let lineMeetOffset1 = Math.sqrt(75**2 - 25**2);
    let lineMeetOffset2 = Math.sqrt(75**2 - 50**2);
    if (shapeType === 'square') {
        shapeFunction = strokeSquareByCenter;
        lineMeetOffset1 = 75;
        lineMeetOffset2 = 75;
    }
    const tNumber = currentTierNumbers[4];
    const mlNumber = currentTierNumbers[2];
    const mrNumber = currentTierNumbers[3];
    const blPair = currentTierNumbers[0];
    const brPair = currentTierNumbers[1];
    const getCanvas = document.querySelector('#standard-solve-canvas');
    const canvas = clearStartCanvas(800, 600, styleHeight=[], renderMathjax);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = '3';
        ctx.font = '50px Helvetica';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // paths of the circles
        shapeFunction(ctx, 400, 100, 75, text=tNumber.slice(1), fillStyle=parseFillColor(tNumber));
        shapeFunction(ctx, 200, 300, 75, text=mlNumber.slice(1), fillStyle=parseFillColor(mlNumber));
        shapeFunction(ctx, 600, 300, 75, text=mrNumber.slice(1), fillStyle=parseFillColor(mrNumber));
        if (blPair.length !== 0) {
            bl1text = blPair[0];
            bl2text = blPair[1];
            shapeFunction(ctx, 100, 500, 75, text=bl1text.slice(1), fillStyle=parseFillColor(bl1text));
            shapeFunction(ctx, 300, 500, 75, text=bl2text.slice(1), fillStyle=parseFillColor(bl2text));
            drawLine(ctx, [100, 425], [175, 300 + lineMeetOffset1]);
            drawLine(ctx, [300, 425], [225, 300 + lineMeetOffset1]);
            if (!neutralTextList.includes(bl1text.slice(1)) && !neutralTextList.includes(bl2text.slice(1)) && currentStrikethrough) {
                strikeThrough(ctx, shapeType, 200, 300, 75);
            }
        }
        if (brPair.length !== 0) {
            br1text = brPair[0];
            br2text = brPair[1];
            shapeFunction(ctx, 500, 500, 75, text=br1text.slice(1), fillStyle=parseFillColor(br1text));
            shapeFunction(ctx, 700, 500, 75, text=br2text.slice(1), fillStyle=parseFillColor(br2text));
            drawLine(ctx, [500, 425], [575, 300 + lineMeetOffset1]);
            drawLine(ctx, [700, 425], [625, 300 + lineMeetOffset1]);
            if (!neutralTextList.includes(br1text.slice(1)) && !neutralTextList.includes(br2text.slice(1)) && currentStrikethrough) {
                strikeThrough(ctx, shapeType, 600, 300, 75);
            }
        }
        drawLine(ctx, [200, 225], [350, 100 + lineMeetOffset2]);
        drawLine(ctx, [600, 225], [450, 100 + lineMeetOffset2]);
    }
    if (renderMathjax && getCanvas === null) {
        setTimeout(function() {MathJax.typeset();});
    }
}

function makeNumberTiers(shapeType='circle', tNumber='f0', mlNumber='f0', mrNumber='f0', blPair=['f0', 'f0'], brPair=[], renderMathjax=false, strikethrough=true) {
    currentTierNumbers = [blPair, brPair, mlNumber, mrNumber, tNumber];
    currentShapeType = shapeType;
    currentStrikethrough = strikethrough;
    placeNumberTiers(renderMathjax);
}

function setLiveTiers() {
    setTimeout(function() {
        if (!solveinput.value.includes('=')) {
            const preInputList = solveinput.value.split(',');
            const inputList = preInputList;

            // add this back in if there is a way for mathjax to render on canvas
            // let inputList = [];
            // for (const input of preInputList) {
            //     if (input.includes('/')) {
            //         const inputSplit = input.split('/');
            //         const newInput = '\\(' + `\\frac{${inputSplit[0]}}{${inputSplit[1]}}` + '\\)';
            //         inputList.push(newInput);
            //     } else {
            //         inputList.push(input);
            //     }
            // }

            let inputListIndex = 0;
            if (currentTierNumbers[0].length > 0) {
                if (currentTierNumbers[0][0][0] === 'd' && inputListIndex < inputList.length) {
                    currentTierNumbers[0][0] = 'd' + stripclean(inputList[inputListIndex]);
                    inputListIndex += 1;
                }
                if (currentTierNumbers[0][1][0] === 'd' && inputListIndex < inputList.length) {
                    currentTierNumbers[0][1] = 'd' + stripclean(inputList[inputListIndex]);
                    inputListIndex += 1;
                }
            }
            if (currentTierNumbers[1].length > 0) {
                if (currentTierNumbers[1][0][0] === 'd' && inputListIndex < inputList.length) {
                    currentTierNumbers[1][0] = 'd' + stripclean(inputList[inputListIndex]);
                    inputListIndex += 1;
                }
                if (currentTierNumbers[1][1][0] === 'd' && inputListIndex < inputList.length) {
                    currentTierNumbers[1][1] = 'd' + stripclean(inputList[inputListIndex]);
                    inputListIndex += 1;
                }
            }
            if (currentTierNumbers[2][0] === 'd' && inputListIndex < inputList.length) {
                currentTierNumbers[2] = 'd' + stripclean(inputList[inputListIndex]);
                inputListIndex += 1;
            }
            if (currentTierNumbers[3][0] === 'd' && inputListIndex < inputList.length) {
                currentTierNumbers[3] = 'd' + stripclean(inputList[inputListIndex]);
                inputListIndex += 1;
            }
            if (currentTierNumbers[4][0] === 'd' && inputListIndex < inputList.length) {
                currentTierNumbers[4] = 'd' + stripclean(inputList[inputListIndex]);
                inputListIndex += 1;
            }
            placeNumberTiers(renderMathjax=true);
        }
    }, 100);
}

function cornerSolve(n, side, countMax) {
    let count = 0;
    const x = side * 3 - ((n**2 + n) / 2);
    let corners = [];
    while ((sumArray(corners) !== x || corners.length !== 3) && (count < countMax)) {
        fulllist = [];
        for (let i = 1; i < n+1; i++) {
            fulllist.push(i);
        }
        fulllist = shuffle(fulllist);
        corners = [];
        for (const i of fulllist) {
            if (i <= x - sumArray(corners)) {
                corners.push(i);
                removeByValue(fulllist, i);
            }
        }
        count += 1
    }
    if (corners.length !== 3) {
        corners = [0,0,0];
    }
    const sideA = [corners[0], corners[1]];
    const sideB = [corners[1], corners[2]];
    const sideC = [corners[2], corners[0]];
    return [sideA, sideB, sideC, fulllist, count];
}

function sideFill(sideX, remainder, side, countMax) {
    let count = 0
    let sideTest = [];
    let remainderTest = [];

    while ((sumArray(sideTest) !== side) && (count < countMax)) {
        sideTest = [];
        for (const i of sideX) {
            sideTest.push(i);
        }
        remainderTest = [];
        for (const i of remainder) {
            remainderTest.push(i);
        }
        remainderTest = shuffle(remainderTest);

        for (const i of remainderTest) {
            if (i <= side - sumArray(sideTest)) {
                sideTest.push(i);
                removeByValue(remainderTest, i);
            }
        }
        count += 1;
    }
    return [sideTest, remainderTest, count];
}

function triangleSolve(n, side, countMax) {
    let sideA = [];
    let sideB = [];
    for (let i = 0; i < countMax; i++) {
        const initialSides = cornerSolve(n, side, countMax);
        sideA = initialSides[0];
        sideB = initialSides[1];
        const remainder = initialSides[3];
        const round0 = initialSides[4];
        if (round0 < countMax) {
            round1 = sideFill(sideA, remainder, side, countMax);
            if (round1[2] < countMax) {
                round2 = sideFill(sideB, round1[1], side, countMax);
                if (round2[2] < countMax) {
                    sideA = round1[0];
                    sideB = round2[0];
                    return [sideA, sideB];
                }
            }
        }
    }
}

function getDuoSideArray(number) {
    const tryLevel = 1000;
    const x = number;
    const a = parseInt(((x**2 + x) / 2) + 3 * x - 3);
    const b = parseInt(((x**2 + x) / 2) + 6);
    let options = [];
    for (let i = b; i < a + 1; i++) {
        if (i % 3 === 0) {
            options.push(i);
        }
    }
    const c = chooseFromList(options);
    const w = c / 3;
    const duoSideArray = triangleSolve(x, w, tryLevel);
    return [duoSideArray, w];
}

function triangleMake(number) {
    let returnList = getDuoSideArray(number);
    let duoSideArray = returnList[0];
    let w = returnList[1];
    count = 0;
    while ((duoSideArray === undefined || duoSideArray[0] === undefined || duoSideArray[1] === undefined) && (count < 100)) {
        returnList = getDuoSideArray(number);
        duoSideArray = returnList[0];
        w = returnList[1];
        count += 1;
    }
    const sideA = duoSideArray[0];
    const sideB = duoSideArray[1];

    let allNumbers = [];
    for (let i = 1; i < number + 1; i++) {
        allNumbers.push(i);
    }
    let triangleAnswer = [[]];
    for (const side of [sideA, sideB]) {
        if (side === sideA) {
            triangleAnswer[triangleAnswer.length - 1].push(side[0]);
            removeByValue(allNumbers, side[0]);
        }
        for (let i = 2; i < side.length; i++) {
            triangleAnswer[triangleAnswer.length - 1].push(side[i]);
            removeByValue(allNumbers, side[i]);
        }
        triangleAnswer.push([]);
        triangleAnswer[triangleAnswer.length - 1].push(side[1]);
        removeByValue(allNumbers, side[1]);
    }
    for (const i of allNumbers) {
        triangleAnswer[triangleAnswer.length - 1].push(i);
    }
    return [w, triangleAnswer];
}

function makeTriangleSums(digitCount, unknownCount) {

    const makeTriangleArray = triangleMake(digitCount);
    const sideSum = makeTriangleArray[0];
    const sides = makeTriangleArray[1];
    const sideApre = [sides[0], []];
    const sideBpre = [sides[1], []];
    const sideCpre = [sides[2], []];

    for (let i = 0; i < unknownCount; i ++) {
        let target = '';
        if (sideApre[0].length > 0) {
            target = sideApre;
        }
        if (sideBpre[0].length > target[0].length) {
            target = sideBpre;
        }
        if (sideCpre[0].length > target[0].length) {
            target = sideCpre;
        }
        target[1].push(target[0].splice(target[0].length - 1, 1)[0]);
    }

    let answerList = [[[], []], [[], []], [[], []]];
    let variableCount = 0;
    let sideA = sideApre[0];
    for (let i = sideApre[1].length - 1; i >= 0; i--) {
        const variable = variableList1[variableCount];
        sideA.push(variable);
        variableCount += 1;
        answerList[0][0].push(variable);
        answerList[0][1].push(sideApre[1][i]);
    }
    answerList[0][1] = sumArray(answerList[0][1]);
    let sideB = sideBpre[0];
    for (let i = sideBpre[1].length - 1; i >= 0; i--) {
        const variable = variableList1[variableCount];
        sideB.push(variable);
        variableCount += 1;
        answerList[1][0].push(variable);
        answerList[1][1].push(sideBpre[1][i]);
    }
    answerList[1][1] = sumArray(answerList[1][1]);
    let sideC = sideCpre[0];
    for (let i = sideCpre[1].length - 1; i >= 0; i--) {
        const variable = variableList1[variableCount];
        sideC.push(variable);
        variableCount += 1;
        answerList[2][0].push(variable);
        answerList[2][1].push(sideCpre[1][i]);
    }
    answerList[2][1] = sumArray(answerList[2][1]);

    const canvas = clearStartCanvas(400, 400);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = '3';
        ctx.font = '40px Helvetica';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.beginPath();
        ctx.moveTo(50, 325);
        ctx.lineTo(200, 65);
        ctx.lineTo(350, 325);
        ctx.lineTo(50, 325);
        ctx.stroke();
        ctx.closePath();

        ctx.fillText(sideA[0].toString(), 50 - 20, 325 + 15);
        for (let i = 1; i < sideA.length; i++) {
            const number = sideA[i].toString();
            const xPosition = 50 + ((150 / sideA.length) * i) - 30;
            const yPosition = 400 - (75 + ((260 / sideA.length) * i));
            ctx.fillText(number, xPosition, yPosition);
        }
        ctx.fillText(sideB[0].toString(), 200, 65 - 20);
        for (let i = 1; i < sideB.length; i++) {
            const number = sideB[i].toString();
            const xPosition = 200 + ((150 / sideB.length) * i) + 30;
            const yPosition = 75 + ((260 / sideB.length) * i);
            ctx.fillText(number, xPosition, yPosition);
        }
        ctx.fillText(sideC[0].toString(), 350 + 20, 325 + 15);
        for (let i = 1; i < sideC.length; i++) {
            const number = sideC[i].toString();
            const xPosition = 400 - (50 + ((300 / sideC.length) * i));
            const yPosition = 325 + 30;
            ctx.fillText(number, xPosition, yPosition);
        }
    }
    const fixedList = [];
    for (const item of sideA.concat(sideB).concat(sideC)) {
        if (isInteger(item.toString())) {
            fixedList.push(item.toString());
        }
    }
    return logCheckRep([sideSum, answerList, fixedList], [sideA, sideB, sideC], makeTriangleSums, digitCount, unknownCount);
}

function generateTriangleSums(digitCount, unknownCount, sumGiven=true) {
    let attemptCount = 0;
    let keepTrying = true;
    while (keepTrying || attemptCount < 10) {
        try {
            const triangleAnswer = makeTriangleSums(digitCount, unknownCount);
            const sideSum = triangleAnswer[0];
            const answerList = triangleAnswer[1];
            const fixedList = triangleAnswer[2];
            let sumText = `add up to <strong>${sideSum}</strong>`;
            if (!sumGiven) {
                sumText = 'add up to the same amount';
            }
            const questionText = `
                Every side of the triangle below must ${sumText}. Each digit from 1 to ${digitCount} should appear once. Corners count for both sides. Work your answer out on paper first.<br>
                Your answer should be in the form a = 27, b = 35, c = 15.
            `;
            addCanvasText(questionText);
            keepTrying = false;
            return [answerList, fixedList];
        } catch {
            
        } finally {
            attemptCount += 1;
        }
    }
}

function triangleSumsMatch(inputValue, matchAnswer) {
    const answerList = matchAnswer[0];
    if (variableListGroupSumMatch(inputValue, answerList)) {
        let fixedList = matchAnswer[1];
        for (const couplet of inputValue.split(',')) {
            fixedList.push(stripclean(couplet.split('=')[1]));
        }
        if (!hasDuplicates(fixedList)) {
            return true;
        }
    }
    return false;
}

let currentAddendList = [];
function placeRepGrid(addendList) {
    const canvas = clearStartCanvas(400, 400);
    const cellSize = 380 / 10;
    const colorList = ['blue', 'red', 'yellow', 'purple', 'green', 'pink', 'black', 'orange', 'gray', 'brown'];
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        let counter = 0;
        for (let i = 0; i < addendList.length; i++) {
            const circleCount = addendList[i];
            for (let j = 0; j < circleCount; j++) {
                ctx.fillStyle = colorList[i];
                ctx.beginPath();
                ctx.arc((i * cellSize) + (cellSize / 2) + 10, (j * cellSize) + (cellSize / 2) + 10, (cellSize / 2) - 4, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function completeRepSet(addendList) {
    let cleanedAddendList = [];
    for (let i = 0; i < addendList.length; i++) {
        const addend = addendList[i];
        if (isInteger(addend) === false || addend > 10 || addend < 0) {
            if (addend === '' && i === addendList.length - 1) {
            } else {
                clearStartCanvas(400, 400);
                return;
            }
        } else {
            cleanedAddendList.push(parseInt(addend));
        }
    }
    if (cleanedAddendList.length > 10) {
        clearStartCanvas(400, 400);
    } else if (!arraysEqual(cleanedAddendList, currentAddendList)) {
        currentAddendList = cleanedAddendList;
        placeRepGrid(cleanedAddendList);
    }
}

function setLiveRepGrid() {
    setTimeout(function() {
        const addendList = stripclean(solveinput.value).split('=')[0].split('+');
        completeRepSet(addendList);
    }, 100);
}

function setLiveMultiGrid() {
    setTimeout(function() {
        const multis = stripclean(solveinput.value).split('=')[0].split('*');
        let cleanedMultis = [];
        if (multis.length === 1 || multis.length === 2) {
            for (let i = 0; i < multis.length; i++) {
                let multi = multis[i];
                if (isInteger(multi) === false || parseInt(multi) > 10 || parseInt(multi) < 0) {
                    if (i === 0 || multi !== '') {
                        clearStartCanvas(400, 400);
                        return;
                    }
                }
                if (multi !== '') {
                    multi = parseInt(multi);
                }
                cleanedMultis.push(multi);
            }
        }
        let addendList = [];
        if (cleanedMultis.length === 1 || (cleanedMultis.length === 2 && cleanedMultis[1] === '')) {
            addendList.push(cleanedMultis[0].toString());
        } else if (cleanedMultis.length === 2) {
            for (let i = 0; i < cleanedMultis[1]; i++) {
                addendList.push(cleanedMultis[0].toString());
            }
        }
        completeRepSet(addendList);
    }, 100);
}

function setLiveDualGrid() {
    setTimeout(function() {
        if (solveinput.value.includes('+')) {
            setLiveRepGrid();
        } else {
            setLiveMultiGrid();
        }
    }, 100);
}

let currentCircleCount = 0;
let circleCountActive = false;
function placeCountCircles() {
    const canvas = clearStartCanvas(600, 40, ['auto', '25px']);
    const cellWidth = 590 / 20;
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.font = '15px Helvetica';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 1; i <= currentCircleCount; i++) {
            ctx.fillStyle = colorDict['primary-blue'];
            ctx.beginPath();
            ctx.arc((i * cellWidth) - (cellWidth / 2) + 5, 20, (cellWidth / 2) - 1, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.fillText(i.toString(), (i * cellWidth) - (cellWidth / 2) + 5, 20);
        }
    }
    if (circleCountActive) {
        canvas.style.border = '2px solid green';
    } else {
        canvas.style.border = 'none';
    }
    return canvas;
}

function makeCountCircles(circleCount=0, activateCircleCount=false) {
    currentCircleCount = circleCount;
    circleCountActive = activateCircleCount;
    placeCountCircles();
}

function setLiveCountCircles(e) {
    let place = false;
    if (e.key === 'Control') {
        if (circleCountActive === false) {
            circleCountActive = true;
            solveinput.disabled = true;
            solveinput.blur();
        } else {
            circleCountActive = false;
            solveinput.disabled = false;
            solveinput.focus();
        }
        place = true;
    }
    if (circleCountActive) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            e.stopPropagation();
            currentCircleCount -= 1;
            if (currentCircleCount < 0) {
                currentCircleCount = 0;
            }
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            e.stopPropagation();
            currentCircleCount += 1;
            if (currentCircleCount > 20) {
                currentCircleCount = 20;
            }
        }
        place = true;
    }
    if (place) {
        placeCountCircles();
    }
}

let currentFocusNumber = 5;
let currentHalfRange = 5;
let numberLineActive = false;
function placeNumberline() {
    const animationDiv = initSolveAnimation();
    animationDiv.style.display = 'flex';
    animationDiv.style.justifyContent = 'space-between';
    animationDiv.style.alignItems = 'center';
    animationDiv.style.height = '40px';
    if (numberLineActive) {
        animationDiv.style.border = '2px solid green';
    } else {
        animationDiv.style.border = 'none';
    }

    const lowNumber = currentFocusNumber - currentHalfRange;
    const highNumber = currentFocusNumber + currentHalfRange;
    const numberCount = highNumber - lowNumber + 1;

    for (let i = lowNumber; i <= highNumber; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.innerHTML = i.toString();
        let fontSize = '20px';
        let divWidth = (animationDiv.clientWidth / numberCount).toString() + 'px';
        if (i === currentFocusNumber) {
            fontSize = '30px';
        }
        numberDiv.style.fontSize = fontSize;
        numberDiv.style.width = divWidth;
        animationDiv.appendChild(numberDiv);
    }
}

function makeNumberLine(focusNumber=5, halfRange=5, activateNumberLine=false) {
    currentFocusNumber = focusNumber;
    currentHalfRange = halfRange;
    numberLineActive = activateNumberLine;
    placeNumberline();
}

function setLiveNumberLine(e) {
    let place = false;
    if (e.key === 'Control') {
        if (numberLineActive === false) {
            numberLineActive = true;
            solveinput.disabled = true;
            solveinput.blur();
        } else {
            numberLineActive = false;
            solveinput.disabled = false;
            solveinput.focus();
        }
        place = true;
    }
    if (numberLineActive) {
        let jumpCount = 1;
        for (const char of '0987654321') {
            if (keyMap[char] === -1) {
                jumpCount = parseInt(char);
                if (jumpCount === 0) {
                    jumpCount = 10;
                }
            }
        }
        if (e.key === 'ArrowLeft') {
            currentFocusNumber = currentFocusNumber - jumpCount;
        } else if (e.key === 'ArrowRight') {
            currentFocusNumber = currentFocusNumber + jumpCount;
        }
        place = true;
    }
    if (place) {
        placeNumberline();
    }
}

let currentFractionFill1 = 0;
let currentFractionFill2 = 0;
let fractionBarActive = false;
let currentFractionList = [];
let currentGoalLine = '';
function placeFractionBar(renderMathjax=false) {
    let placeFractionFill1 = currentFractionFill1;
    let placeFractionFill2 = currentFractionFill2;
    if (placeFractionFill1 + placeFractionFill2 < 0 || placeFractionFill1 + placeFractionFill2 > 12) {
        placeFractionFill1 = 0;
        placeFractionFill2 = 0;
    }
    const animationDiv = initSolveAnimation(renderMathjax);
    animationDiv.style.display = 'flex';
    animationDiv.style.height = '100px';
    animationDiv.style.width = '90%';
    animationDiv.style.maxWidth = '450px';
    animationDiv.style.position = 'relative';
    if (fractionBarActive) {
        animationDiv.style.border = '2px solid green';
    } else {
        animationDiv.style.border = '2px solid black';
    }
    const fillDiv1 = document.createElement('div');
    fillDiv1.style.height = '100%';
    fillDiv1.style.width = ((placeFractionFill1 / 12) * 100).toString() + '%';
    fillDiv1.style.backgroundColor = 'blue';
    const fillDiv2 = document.createElement('div');
    fillDiv2.style.height = '100%';
    fillDiv2.style.width = ((placeFractionFill2 / 12) * 100).toString() + '%';
    fillDiv2.style.backgroundColor = 'orange';
    animationDiv.appendChild(fillDiv1);
    animationDiv.appendChild(fillDiv2);

    const measureDiv = document.createElement('div');
    measureDiv.style.position = 'absolute';
    measureDiv.style.height = '30px';
    measureDiv.style.bottom = '0px';
    measureDiv.style.left = '0px';
    measureDiv.style.width = '100%';
    measureDiv.style.display = 'flex';
    for (let i = 0; i < 11; i++) {
        const innerMeasureDiv = document.createElement('div');
        innerMeasureDiv.style.borderRight = '2px solid black';
        let height = '25%';
        if (i === 1 || i === 3 || i === 7 || i === 9) {
            height = '50%';
        } else if (i === 2 || i === 8) {
            height = '75%';
        } else if (i === 5) {
            height = '100%';
        }
        innerMeasureDiv.style.height = height;
        innerMeasureDiv.style.width = ((1 / 12) * 100).toString() + '%';
        innerMeasureDiv.style.marginTop = 'auto';
        measureDiv.appendChild(innerMeasureDiv);
    }
    animationDiv.appendChild(measureDiv);

    if (currentGoalLine !== '') {
        const goalDiv = document.createElement('div');
        goalDiv.style.position = 'absolute';
        goalDiv.style.height = '100%';
        goalDiv.style.bottom = '0px';
        goalDiv.style.left = '0px';
        goalDiv.style.width = ((currentGoalLine / 12) * 100).toString() + '%';
        goalDiv.style.borderRight = '2px solid red';
        animationDiv.appendChild(goalDiv);
    }
    if (renderMathjax) {
        setTimeout(function() {MathJax.typeset();});
    }
}

function makeFractionBar(fractionFill1=0, fractionFill2=0, goalLine='', renderMathjax=false, activateFractionBar=false) {
    currentFractionFill1 = fractionFill1;
    currentFractionFill2 = fractionFill2;
    currentGoalLine = goalLine;
    fractionBarActive = activateFractionBar;
    currentFractionList = [];
    placeFractionBar(renderMathjax);
}

function setLiveFractionBarFill(e) {
    let place = false;
    if (e.key === 'Control') {
        if (fractionBarActive === false) {
            fractionBarActive = true;
            solveinput.disabled = true;
            solveinput.blur();
        } else {
            fractionBarActive = false;
            solveinput.disabled = false;
            solveinput.focus();
        }
        place = true;
    }
    if (fractionBarActive) {
        let targetFill = 'blue';
        if (keyMap[' '] === -1) {
            targetFill = 'orange';
        }
        if (e.key === 'ArrowLeft') {
            if (targetFill === 'blue') {
                currentFractionFill1 = Math.round(currentFractionFill1 - 1);
                if (currentFractionFill1 < 0) {
                    currentFractionFill1 = 0;
                }
            } else {
                currentFractionFill2 = Math.round(currentFractionFill2 - 1);
                if (currentFractionFill2 < 0) {
                    currentFractionFill2 = 0;
                }
            }
        } else if (e.key === 'ArrowRight') {
            if (targetFill === 'blue') {
                currentFractionFill1 = Math.round(currentFractionFill1 + 1);
                if (currentFractionFill1 > 12) {
                    currentFractionFill1 = 12;
                }
            } else {
                currentFractionFill2 = Math.round(currentFractionFill2 + 1);
                if (currentFractionFill2 > 12) {
                    currentFractionFill2 = 12;
                }
            }
        }
        place = true;
    }
    if (place) {
        placeFractionBar();
    }
}

function fractionBarFromText(text) {
    const fractionList = stripclean(text).split('=')[0].split('+');
    let cleanedFractionList = [];
    for (const fraction of fractionList) {
        const cleanedFraction = parseFraction(fraction);
        if (cleanedFraction[0] === 'invalid') {
            if (currentFractionFill1 !== 0 || currentFractionFill2 !== 0) {
                currentFractionFill1 = 0;
                currentFractionFill2 = 0;
                placeFractionBar();
            }
            return;
        } else if (cleanedFraction[0] === 'valid') {
            cleanedFractionList.push(cleanedFraction[1][0] / cleanedFraction[1][1]);
        }
    }
    let newFractionFill1 = '';
    let newFractionFill2 = '';
    if (cleanedFractionList.length === 1) {
        newFractionFill1 = cleanedFractionList[0] * 12;
        newFractionFill2 = 0;
    } else if (cleanedFractionList.length === 2) {
        newFractionFill1 = cleanedFractionList[0] * 12;
        newFractionFill2 = cleanedFractionList[1] * 12;
    } else {
        if (currentFractionFill1 !== 0 || currentFractionFill2 !== 0) {
            currentFractionFill1 = 0;
            currentFractionFill2 = 0;
            placeFractionBar();
        }
        return;
    }
    if (currentFractionFill1 !== newFractionFill1 || currentFractionFill2 !== newFractionFill2) {
        currentFractionFill1 = newFractionFill1;
        currentFractionFill2 = newFractionFill2;
        placeFractionBar();
    }
}

function setLiveFractionBarInput() {
    setTimeout(function() {
        fractionBarFromText(solveinput.value);
    }, 100);
}

function matchFractionBarInputDelay(inputValue, matchAnswer) {
    fractionBarFromText(inputValue);
    const fractionQuery = parseFraction(inputValue);
    if (fractionQuery[0] === 'valid') {
        const reducedInput = reduce(fractionQuery[1][0], fractionQuery[1][1]);
        if (reducedInput[0] === matchAnswer[0] && reducedInput[1] === matchAnswer[1]) {
            return true;
        }
    }
    return false;
}

function matchFractionBarInputDelayDual(inputValue, matchAnswer) {
    fractionBarFromText(inputValue);
    if (currentFractionFill1 !== 0 && currentFractionFill2 !== 0) {
        const currentFraction = reduce(currentFractionFill1 + currentFractionFill2, 12);
        if (currentFraction[0] === matchAnswer[0] && currentFraction[1] === matchAnswer[1]) {
            return true;
        }
    } else {
        setHighlightInterval();
    }
    return false;
}

function matchFractionBarFill(inputValue, matchAnswer) {
    const currentFraction = reduce(currentFractionFill1, 12);
    if (currentFraction[0] === matchAnswer[0] && currentFraction[1] === matchAnswer[1] && currentFractionFill2 === 0) {
        return true;
    } else {
        return false;
    }
}

function matchFractionBarFillDual(inputValue, matchAnswer) {
    const currentFraction = reduce(currentFractionFill1 + currentFractionFill2, 12);
    if (currentFraction[0] === matchAnswer[0] && currentFraction[1] === matchAnswer[1]) {
        return true;
    } else {
        return false;
    }
}
