
function genQuestion1nln() {
    makeNumberLine(5, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        Below is one version of a number line.<br>
        To activate the number line, press the Control key.<br>
        To deactivate the number line, press the Control key again.<br>
        When the number line is active, you can move left or right with the arrow keys.<br>
        Try it out. When you are ready to continue, deactivate the number line and press enter.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion2nln() {
    makeNumberLine(5, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        By default, this number line goes up and down by one at a time.<br>
        If you want to go up and down by twos, hold the number 2 on your keyboard while you are clicking left or right.<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion3nln() {
    makeNumberLine(5, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        If you want to go up and down by 3s or 7s, hold that number on your keyboard while you are clicking left or right.<br>
        If you want to go up and down by 10s, hold the 0 key on your keyboard.<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion4nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        To add two numbers with a number line, start by clicking to the first addend, in this case 7.<br>
        Then, starting at 7, click to the right 8 times (because the second addend is 8). The number you end up at is the solution.<br>
        <span class="equation-in-text">7 + 8 = ?</span>
    `;
    addCanvasText(questionText);
    return '15';
}

function genQuestion5nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        Try again, starting at the first number, and using the second number to determine how many clicks to the right.<br>
        <span class="equation-in-text">13 + 8 = ?</span>
    `;
    addCanvasText(questionText);
    return '21';
}

function genQuestion6nln(progressInt) {
    const number1 = pickRandomNumber(0, 10);
    const number2 = pickRandomNumber(0, 10);

    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        <span class="equation-solve-text">${number1} + ${number2} = ?</span>
    `;
    addCanvasText(questionText);
    return logCheckRep((number1 + number2).toString(), [number1, number2], genQuestion6nln, progressInt);
}

function genQuestion7nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        To subtract two numbers with a number line, start by clicking to the first number, in this case 16.<br>
        Then, starting at 16, click to the <i>left</i> 9 times (because the second number is 9). The number you end up at is the solution.<br>
        <span class="equation-in-text">16 ${subSymbol} 9 = ?</span>
    `;
    addCanvasText(questionText);
    return '7';
}

function genQuestion8nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        Try again, starting at the first number, and using the second number to determine how many clicks to the left.<br>
        <span class="equation-in-text">13 ${subSymbol} 4 = ?</span>
    `;
    addCanvasText(questionText);
    return '9';
}

function genQuestion9nln(progressInt) {
    const number1 = pickRandomNumber(0, 20);
    const number2 = pickRandomNumber(0, number1);

    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        <span class="equation-solve-text">${number1} ${subSymbol} ${number2} = ?</span>
    `;
    addCanvasText(questionText);
    return logCheckRep((number1 - number2).toString(), [number1, number2], genQuestion9nln, progressInt);
}

function genQuestion10nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        To multiply two numbers with a number line, start at <i>0</i>.<br>
        The first number is 3. To count by 3's, you will start at 0 and hold the 3 key while you count.<br>
        While holding the 3 key, click to the right 6 times (because the second number is 6). The number you end up at is the solution.<br>
        <span class="equation-in-text">3 * 6 = ?</span>
    `;
    addCanvasText(questionText);
    return '18';
}

function genQuestion11nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        You could also solve this problem by counting by 6's.<br>
        Start at 0, hold down the 6 key, and click to the right 3 times.<br>
        <span class="equation-in-text">3 * 6 = ?</span>
    `;
    addCanvasText(questionText);
    return '18';
}

function genQuestion12nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        Try again, with different numbers.<br>
        <span class="equation-in-text">4 * 7 = ?</span>
    `;
    addCanvasText(questionText);
    return '28';
}

function genQuestion13nln(progressInt) {
    const number1 = pickRandomNumber(1, 5);
    const number2 = pickRandomNumber(1, 10);

    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        <span class="equation-solve-text">${number1} * ${number2} = ?</span>
    `;
    addCanvasText(questionText);
    return logCheckRep((number1 * number2).toString(), [number1, number2], genQuestion13nln, progressInt);
}

function genQuestion14nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        To divide two numbers with a number line, start at the first number (dividend), which is 24.<br>
        The second number (divisor) is 4. To count by 4's, you will hold the 4 key while you count.<br>
        You are counting all the way down to 0. While holding the 4 key, click to the <i>left</i> until you get to 0.<br>
        How many clicks did it take?<br>
        <span class="equation-in-text">24 ${divSymbol} 4 = ?</span>
    `;
    addCanvasText(questionText);
    return '6';
}

function genQuestion15nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        Try again, with different numbers.<br>
        Start at 35, hold down the 7 key, and click to the left until you get to 0.<br>
        How many clicks did it take?<br>
        <span class="equation-in-text">35 ${divSymbol} 7 = ?</span>
    `;
    addCanvasText(questionText);
    return '5';
}

function genQuestion16nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        Try again, with different numbers.<br>
        <span class="equation-in-text">42 ${divSymbol} 6 = ?</span>
    `;
    addCanvasText(questionText);
    return '7';
}

function genQuestion17nln(progressInt) {
    const number1 = pickRandomNumber(1, 10);
    const number2 = pickRandomNumber(1, 10);
    const number3 = number1 * number2;

    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        <span class="equation-solve-text">${number3} ${divSymbol} ${number1} = ?</span>
    `;
    addCanvasText(questionText);
    return logCheckRep(number2.toString(), [number1, number2], genQuestion6nln, progressInt);
}

function genQuestion18nln(progressInt) {
    if (progressInt === 0) {
        sectionTracklist = ['pluck', '', ['a', 'a', 'a', 'a', 'a', 's', 's', 's', 's', 's', 'm', 'm', 'm', 'm', 'm', 'd', 'd', 'd', 'd', 'd']];
    }
    const questionType = chooseFromList(sectionTracklist[2]);
    sectionTracklist[1] = questionType;
    if (questionType === 'a') {
        return genQuestion6nln(9);
    } else if (questionType === 's') {
        return genQuestion9nln(9);
    } else if (questionType === 'm') {
        return genQuestion13nln(9);
    } else if (questionType === 'd') {
        return genQuestion17nln(9);
    }
}

function genQuestion19nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        What is the closest you can get to 100, if you start at 0 and count by 3s?<br>
        Use the number line if it helps.
    `;
    addCanvasText(questionText);
    return '99';
}

function genQuestion20nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        If you start at 98 and count down by 7s, will you land on 0 exactly?<br>
        Use the number line if it helps.
    `;
    addCanvasText(questionText);
    return ['yes', 'y'];
}

function genQuestion21nln() {
    makeNumberLine(0, 4);
    addListener('keydown', setLiveNumberLine);
    const questionText = `
        What is 8 * -6?<br>
        (Hint: start at 0 and count by 6s, but go to the left; you will click left 8 times).
    `;
    addCanvasText(questionText);
    return '-48';
}
