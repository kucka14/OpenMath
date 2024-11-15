
function genQuestion1bal() {
    const canvas = clearStartCanvas(800, 400);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        drawScale(ctx);
    }
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Type an addition equation to have it represented on the scale below.<br>
        You can have up to two terms on each side of the equals sign.<br>
        Try out different addition equations, such as 2 + 5 = 7, or 3 + 15 = 9 + 9.<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText, wide=true, small=true);
    return '';
}

function genQuestion2bal() {
    const canvas = clearStartCanvas(800, 400);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        drawScale(ctx);
    }
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Let's try some equations that balance.<br>
        Show the equation 5 = 5, and then press enter.
    `;
    addCanvasText(questionText);
    return '5=5';
}

function genQuestion3bal() {
    const canvas = clearStartCanvas(800, 400);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        drawScale(ctx);
    }
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Let's try some other equations that balance.<br>
        Show the equation 5 = 3 + 2, and then press enter.
    `;
    addCanvasText(questionText);
    return '5=3+2';
}

function genQuestion4bal() {
    const canvas = clearStartCanvas(800, 400);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        drawScale(ctx);
    }
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Show the equation 3 + 2 = 5, and then press enter.
    `;
    addCanvasText(questionText);
    return '3+2=5';
}

function genQuestion5bal() {
    const canvas = clearStartCanvas(800, 400);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        drawScale(ctx);
    }
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Show the equation 3 + 2 = 4 + 1, and then press enter.
    `;
    addCanvasText(questionText);
    return '3+2=4+1';
}

function genQuestion6bal() {
    const canvas = clearStartCanvas(800, 400);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        drawScale(ctx);
    }
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Now enter any addition equation that balances.<br>
        That means you must have an equal sign, and the left and right sides of the equation must be equal.<br>
        You can count the blue blocks if it helps. There should be the same number on both sides.
    `;
    addCanvasText(questionText, wide=true, small=true);
    return '';
}

function matchEquationAllAddBal(inputValue, matchAnswer) {
    if (matchEquationAllAdd(inputValue, '')) {
        let matchAnswerList = [];
        for (const side of matchAnswer.split('=')) {
            sideList = side.split('+');
            matchAnswerList.push(sideList);
        }
        let inputValueList = [];
        for (const side of stripclean(inputValue).split('=')) {
            sideList = side.split('+');
            inputValueList.push(sideList);
        }
        if (matchAnswerList.length === inputValueList.length) {
            for (let i = 0; i < matchAnswerList.length; i++) {
                if (matchAnswerList[i].length === inputValueList[i].length) {
                    for (let j = 0; j < matchAnswerList[i].length; j++) {
                        if (matchAnswerList[i][j] !== '?' && !variableList2.includes(matchAnswerList[i][j]) && matchAnswerList[i][j] !== inputValueList[i][j]) {
                            setHighlightInterval();
                            return false;
                        }
                    }
                } else {
                    setHighlightInterval();
                    return false;
                }
            }
            return true;
        }
        setHighlightInterval();
    }
    return false;
}

function genQuestion7bal() {
    const displayEquation = '? + ? = 5';
    const equation = stripclean(displayEquation);
    makeAlgebraScale(equation);
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Type an equation that matches the equation below. Replace the question marks with numbers.<br>
        The equation must be balanced (both sides must be equal). Count the squares if it helps.<br>
        <span class="equation-in-text highlight">${displayEquation}</span>
    `;
    addCanvasText(questionText, wide=true, small=false);
    solveinput.value = displayEquation;
    return equation;
}

function genQuestion8bal() {
    const displayEquation = '? = 5';
    const equation = stripclean(displayEquation);
    makeAlgebraScale(equation);
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Type an equation that matches the equation below. Replace the question marks with numbers.<br>
        The equation must be balanced (both sides must be equal). Count the squares if it helps.<br>
        <span class="equation-in-text highlight">${displayEquation}</span>
    `;
    addCanvasText(questionText, wide=true, small=false);
    solveinput.value = displayEquation;
    return equation;
}

function genQuestion9bal() {
    const displayEquation = '5 = ? + 1';
    const equation = stripclean(displayEquation);
    makeAlgebraScale(equation);
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Type an equation that matches the equation below. Replace the question marks with numbers.<br>
        The equation must be balanced (both sides must be equal). Count the squares if it helps.<br>
        <span class="equation-in-text highlight">${displayEquation}</span>
    `;
    addCanvasText(questionText, wide=true, small=false);
    solveinput.value = displayEquation;
    return equation;
}

function genQuestion10bal() {
    const displayEquation = '3 + ? = 4 + ?';
    const equation = stripclean(displayEquation);
    makeAlgebraScale(equation);
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Type an equation that matches the equation below. Replace the question marks with numbers.<br>
        The equation must be balanced (both sides must be equal). Count the squares if it helps.<br>
        <span class="equation-in-text highlight">${displayEquation}</span>
    `;
    addCanvasText(questionText, wide=true, small=false);
    solveinput.value = displayEquation;
    return equation;
}

function genQuestion11bal() {
    const displayEquation = 'x + 2 = 5';
    const equation = stripclean(displayEquation);
    makeAlgebraScale(equation);
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Sometimes you will replace a letter variable instead of a question mark. Make sure to keep everything else the same.<br>
        The equation must be balanced (both sides must be equal). Count the squares if it helps.<br>
        <span class="equation-in-text highlight">${displayEquation}</span>
    `;
    addCanvasText(questionText, wide=true, small=false);
    solveinput.value = displayEquation;
    return equation;
}

function genQuestion12bal() {
    const displayEquation = '3 + x = 4 + 1';
    const equation = stripclean(displayEquation);
    makeAlgebraScale(equation);
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Type an equation that matches the equation below. Replace the variable with a number.<br>
        The equation must be balanced (both sides must be equal). Count the squares if it helps.<br>
        <span class="equation-in-text highlight">${displayEquation}</span>
    `;
    addCanvasText(questionText, wide=true, small=false);
    solveinput.value = displayEquation;
    return equation;
}

function genQuestion13bal(progressInt) {
    let ranges = [];
    for (let i = 0; i < 2; i++) {
        const sideLength = pickRandomNumber(1, 2);
        if (sideLength === 1) {
            ranges.push([0, 10]);
            ranges.push([]);
        } else {
            ranges.push([0, 10]);
            ranges.push([0, 10]);
        }
    }
    let equationList = '';
    let leftOperation = ' + ';
    let rightOperation = ' + ';
    if (progressInt === 100) {
        const deepDiveOrder = pickRandomNumber(0, 1);
        if (deepDiveOrder === 0) {
            ranges = [[1, 50], [1, 50], [1, 10], [1, 10]];
            equationList = makeSimpleEquation(['add', 'multiply'], ranges);
            rightOperation = ' * ';
        } else {
            ranges = [[1, 10], [1, 10], [1, 50], [1, 50]];
            equationList = makeSimpleEquation(['multiply', 'add'], ranges);
            leftOperation = ' * ';
        }
    } else {
        equationList = makeSimpleEquation(['add', 'add'], ranges);
    }
    let variable = '';
    let variableType = '';
    if (progressInt < 12) {
        variable = '?';
        variableType = 'question mark';
    } else if (progressInt < 24) {
        variable = chooseFromList(variableList2);
        variableType = 'variable';
    } else if (progressInt === 100) {
        variable = 'x';
        variableType = 'variable';
    }
    let variableLocations = [[], []];
    if (variable === '?' && (equationList[0].length + equationList[1].length === 4)) {
        variableLocations[0].push(pickRandomNumber(0, 1));
        variableLocations[1].push(pickRandomNumber(0, 1));
    } else {
        const side = pickRandomNumber(0, 1);
        variableLocations[side].push(pickRandomNumber(0, equationList[side].length - 1));
    }
    const newEquationList = addEquationVariables(equationList, variableLocations, [variable]);
    const leftSideDisplay = newEquationList[0].join(leftOperation);
    const rightSideDisplay = newEquationList[1].join(rightOperation);
    const displayEquation = leftSideDisplay + ' = ' + rightSideDisplay;
    const equation = stripclean(displayEquation);
    makeAlgebraScale(equation);
    addListener('input', setLiveAlgebraScale, solveinput);
    const questionText = `
        Type an equation that matches the equation below. Replace the ${variableType} with a number.<br>
        <span class="equation-in-text highlight">${displayEquation}</span>
    `;
    addCanvasText(questionText);
    solveinput.value = displayEquation;
    return logCheckRep(equation, questionText, genQuestion13bal, progressInt);
}

function genQuestion14bal(progressInt) {
    return genQuestion13bal(18);
}

function matchEquationDualBal(inputValue, matchAnswer) {
    const sides = stripclean(matchAnswer).split('=');
    let answer = '';
    let operationSides = [];
    let termsList = [];
    for (const side of sides) {
        let operation = '+';
        if (!side.includes('+')) {
            operation = '*';
        }
        operationSides.push(operation);
        const terms = side.split(operation);
        termsList.push(terms);
        if (!side.includes('x')) {
            if (operation === '+') {
                answer = parseInt(terms[0]) + parseInt(terms[1]);
            } else {
                answer = parseInt(terms[0]) * parseInt(terms[1]);
            }
        }
    }
    const inputSides = stripclean(inputValue).split('=');
    if (inputSides.length === 2) {
        for (let i = 0; i < 2; i++) {
            const side = inputSides[i];
            const terms = side.split(operationSides[i]);
            if (terms.length !== 2) {
                setHighlightInterval();
                return false;
            } else {
                for (let j = 0; j < 2; j++) {
                    if (termsList[i][j] !== 'x' && termsList[i][j] !== terms[j]) {
                        setHighlightInterval();
                        return false
                    }
                }
                let inputAnswer = '';
                if (operationSides[i] === '+') {
                    inputAnswer = parseInt(terms[0]) + parseInt(terms[1]);
                } else {
                    inputAnswer = parseInt(terms[0]) * parseInt(terms[1]);
                }
                if (inputAnswer !== answer) {
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }
}

function genQuestion15bal() {
    return genQuestion13bal(100);
}
