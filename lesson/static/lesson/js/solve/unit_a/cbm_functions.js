
function genQuestion1cbm() {
    addListener('input', setLiveRepGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        On this page, addition expressions you type will be represented visually.<br>
        Try typing an addition expression (example: 2 + 2) or an addition equation (example: 2 + 2 = 4).<br>
        You must have 10 numbers or less, all numbers 10 or less.<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return '';
}

function genQuestion2cbm() {
    addListener('input', setLiveRepGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        Now do the same thing, but provide a full addition equation<br>(example: 3 + 4 + 9 = 16).<br>
        Count the circles if it helps.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return '';
}

function genQuestion3cbm() {
    addListener('input', setLiveRepGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        Sometimes there will be two addends.<br>
        Type the below equation fully, supplying the correct answer instead of a question mark.<br>
        <span class="equation-in-text">3 + 4 = ?</span>
    `;
    addCanvasText(questionText, wide=false, small=true);
    return [['3+4'], '7'];
}

function genQuestion4cbm() {
    addListener('input', setLiveRepGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        Sometimes there will be more than two addends.<br>
        Type the below equation, supplying the correct answer instead of a question mark.<br>
        <span class="equation-in-text">4 + 2 + 1 + 7 + 2 + 1 = ?</span>
    `;
    addCanvasText(questionText, wide=false, small=true);
    return [['4+2+1+7+2+1'], '17'];
}

function genQuestion5cbm(progressInt) {
    addListener('input', setLiveRepGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    let addendList = [];
    if (progressInt < 14) {
        if (progressInt < 7) {
            addendCount = 2;
        } else {
            addendCount = pickRandomNumber(3, 5);
        }
        for (let i = 0; i < addendCount; i++) {
            addendList.push(pickRandomNumber(2, 10));
        }
    } else if (progressInt < 20) {
        const addend = pickRandomNumber(2, 7);
        const reps = pickRandomNumber(3, 7);
        for (let i = 0; i < reps; i++) {
            addendList.push(addend);
        }
    }
    const displayLine = addendList.join(' + ') + ' = ?';

    const equationLine = addendList.join('+');
    const answer = sumArray(addendList);
    const questionText = `
        Type the below equation, supplying the correct answer instead of a question mark.<br>
        <span class="equation-in-text">${displayLine}</span>
    `;
    addCanvasText(questionText);
    return logCheckRep([[equationLine], answer.toString()], displayLine, genQuestion5cbm, progressInt);
}

function genQuestion6cbm() {
    addListener('input', setLiveRepGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        You probably noticed that those equations at the end used a repeating addend, like below.<br>
        Type the below equation, supplying the correct answer instead of a question mark.<br>
        <span class="equation-in-text">4 + 4 + 4 + 4 + 4 + 4 = ?</span>
    `;
    addCanvasText(questionText, wide=true, small=true);
    return [['4+4+4+4+4+4'], '24'];
}

function genQuestion7cbm() {
    addListener('input', setLiveMultiGrid, solveinput);
    addListener('keypress', setLiveHighlightTextAdd, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        Because 4 is repeated 6 times, we can also write 4 times 6, or 4 * 6.<br>
        For the addition equation below, type the equivalent <i class="highlight">multiplication equation</i>, supplying the answer instead of a question mark.<br>
        <span class="equation-in-text">4 + 4 + 4 + 4 + 4 + 4 = ?</span>
    `;
    addCanvasText(questionText, wide=true, small=true);
    return [['4*6', '6*4'], '24'];
}

function genQuestion8cbm() {
    addListener('input', setLiveMultiGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        Now try typing whatever multiplication expression you like.<br>
        When you are ready to continue, use an equal sign to complete the equation, and then press enter.<br>
        Count the circles if it helps.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return '';
}

function genQuestion9cbm() {
    addListener('input', setLiveRepGrid, solveinput);
    addListener('keypress', setLiveHighlightTextMultiply, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        You can also write multiplication equations as repeated addition.
        For instance, 4 * 3 could be written as 4 + 4 + 4. Or 3 + 3 + 3 + 3.<br>
        For the multiplication equation below, type the equivalent <i class="highlight">addition equation</i>, supplying the answer instead of a question mark.<br>
        <span class="equation-in-text">3 * 2 = ?</span>
    `;
    addCanvasText(questionText, wide=true, small=true);
    return [['3+3', '2+2+2'], '6'];
}

function genQuestion10cbm(progressInt) {
    const canvas = clearStartCanvas(400, 400);
    const questionType = pickRandomNumber(0, 1);
    const number1 = pickRandomNumber(2, 5);
    const number2 = pickRandomNumber(2, 10);
    let addendList = [];
    for (let i = 0; i < number1; i++) {
        addendList.push(number2);
    }
    let equationList = [];
    let questionText = '';
    if (questionType === 0) {
        addListener('input', setLiveMultiGrid, solveinput);
        addListener('keypress', setLiveHighlightTextAdd, solveinput);
        const displayLine = addendList.join(' + ') + ' = ?';
        equationList = [number1 + '*' + number2, number2 + '*' + number1];
        questionText = `
            For the addition equation below, type the equivalent <i class="highlight">multiplication equation</i>, supplying the answer instead of a question mark.<br>
            <span class="equation-in-text">${displayLine}</span>
        `;
    } else {
        addListener('input', setLiveRepGrid, solveinput);
        addListener('keypress', setLiveHighlightTextMultiply, solveinput);
        const displayLine = number1 + ' * ' + number2 + ' = ?';
        let altAddendList = [];
        for (let i = 0; i < number2; i++) {
            altAddendList.push(number1);
        }
        equationList = [addendList.join('+'), altAddendList.join('+')];
        questionText = `
            For the multiplication equation below, type the equivalent <i class="highlight">addition equation</i>, supplying the answer instead of a question mark.<br>
            <span class="equation-in-text">${displayLine}</span>
        `;
    }

    addCanvasText(questionText, wide=false, small=true);
    return logCheckRep([equationList, (number1 * number2).toString()], questionText, genQuestion10cbm, progressInt);
}

function genQuestion11cbm() {
    addListener('input', setLiveRepGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        Create an addition equation where the sum of the addends on the left equals 30.<br>
        Make sure to include the equal sign and sum in your equation.
    `;
    addCanvasText(questionText, wide=false, small=false);
    return '30';
}

function genQuestion12cbm() {
    addListener('input', setLiveMultiGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        Create a multiplication equation where the product of the terms on the left equals 30.<br>
        Make sure to include the equal sign and product in your equation.
    `;
    addCanvasText(questionText, wide=false, small=false);
    return '30';
}

function genQuestion13cbm() {
    addListener('input', setLiveRepGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        Create an addition equation where the sum of the addends on the left equals 42, and where all the addends are the same.<br>
        Make sure to include the equal sign and sum in your equation.
    `;
    addCanvasText(questionText, wide=false, small=false);
    return '42';
}

function match13cbm(inputValue, matchAnswer) {
    const inputList = stripclean(inputValue).split('=')[0].split('+');
    let lastInput = '';
    for (input of inputList) {
        if (input !== lastInput && lastInput !== '') {
            return false;
        }
        lastInput = input;
    }
    return matchEquationAllAdd(inputValue, matchAnswer);
}

function genQuestion14cbm() {
    addListener('input', setLiveMultiGrid, solveinput);
    const canvas = clearStartCanvas(400, 400);
    const questionText = `
        Create a multiplication equation where the product of the terms on the left equals 42.<br>
        Make sure to include the equal sign and product in your equation.
    `;
    addCanvasText(questionText, wide=false, small=false);
    return '42';
}
