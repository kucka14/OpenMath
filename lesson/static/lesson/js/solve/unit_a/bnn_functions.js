
function genQuestion1bnn() {
    makeCircleNumberBonds('0', '6', '?');
    const questionText = `
        Look at the number bond below. At first, this does not seem possible. How can you add a number to 6 and get 0?<br>
        Or, looking at it another way, how can you subtract 6 from 0?
        The solution is a <i>negative number</i>. If we add <i>-6</i> to 6, we get 0. If we subtract 6 from 0 we get -6.<br>
        We represent negative numbers with a small dash before the number. Enter the solution and press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return '-6';
}

function genQuestion2bnn() {
    makeCircleNumberBonds('0', '8', '?');
    const questionText = `
        Every positive number has a negative number that can be added to it to equal zero. For 6, it was -6.<br>
        What should be the missing number in this number bond?
    `;
    addCanvasText(questionText);
    return '-8';
}

function genQuestion3bnn() {
    makeCircleNumberBonds('0', '?', '3');
    const questionText = `
        What about this one?
    `;
    addCanvasText(questionText);
    return '-3';
}

function genQuestion4bnn() {
    makeCircleNumberBonds('?', '-4', '4');
    const questionText = `
        Sometimes the number bond might look like this.<br>
        Use your knowledge of negative numbers to figure it out what number should replace the question mark.
    `;
    addCanvasText(questionText);
    return '0';
}

function genQuestion5bnn(progressInt) {
    let number1 = pickRandomNumber(1, 20);
    if (progressInt < 10) {
        number1 = pickRandomNumber(1, 10);
    }
    let number2 = 0 - number1;
    let leftNumber = number1;
    let rightNumber = number2;
    if (pickRandomNumber(0, 1) === 0) {
        leftNumber = number2;
        rightNumber = number1;
    }
    const arrangement = pickRandomNumber(0, 2);

    let returnAnswer = '';
    if (arrangement === 0) {
        makeCircleNumberBonds('?', leftNumber.toString(), rightNumber.toString());
        returnAnswer = '0';
    } else if (arrangement === 1) {
        makeCircleNumberBonds('0', leftNumber.toString(), '?');
        returnAnswer = rightNumber.toString();
    } else {
        makeCircleNumberBonds('0', '?', rightNumber.toString());
        returnAnswer = leftNumber.toString();
    }
    return logCheckRep(returnAnswer, [arrangement, leftNumber, rightNumber], genQuestion5bnn, progressInt);
}

function genQuestion6bnn() {
    makeCircleNumberBonds('?', '7', '-4');
    const questionText = `
        What about number bonds like this?<br>
        This number bond matches the equation 7 + -4 = ?<br>
        Think in your head what the answer is, and then press enter.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion7bnn() {
    makeCircleNumberBonds('3', '7', '-4');
    const questionText = `
        The solution is <strong>3</strong>. 7 + -4 = 3.<br>
        Why is that the answer?<br>
        Press enter to solve this question using multi-tier number bonds.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion8bnn() {
    makeNumberTiers('circle', 'b3', 'f7', 'f-4', ['f3', 'f4'], []);
    const questionText = `
        One way to solve this question is to make another number bond, for the 7.<br>
        Now, instead of worrying about the 7, we can worry about the 3 and the 4.<br>
        We know that 4 + -4 = 0. This means that the remaining number, <span style="color: blue;">3</span>, is our solution.<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return '';
}

function genQuestion9bnn() {
    makeNumberTiers('circle', 'd?', 'f8', 'f-3', ['d?', 'd?'], []);
    addListener('input', setLiveTiers, solveinput);
    const questionText = `
        Now try to solve this one.<br>
        First, type the numbers that should replace the bottom two question marks. Make sure that they add up to 8, and that one of them cancels with -3.<br>
        Then type the number that should replace the top question mark.<br>
        Separate all your numbers with commas, then press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return ['3,5,5', '5,3,5'];
}

function genQuestion10bnn() {
    makeNumberTiers('circle', 'd?', 'f-8', 'f12', [], ['d?', 'd?']);
    addListener('input', setLiveTiers, solveinput);
    const questionText = `
        Now try to solve this one.<br>
        Remember that one number on the very bottom should cancel with the negative number (they should add up to 0).<br>
        Separate all your numbers with commas, then press enter.
    `;
    addCanvasText(questionText);
    return ['8,4,4', '4,8,4'];
}

function genQuestion11bnn() {
    makeNumberTiers('circle', 'd?', 'f-8', 'f12', [], ['d?', 'd?']);
    addListener('input', setLiveTiers, solveinput);
    const questionText = `
        Sometimes the equation will be given as well.<br>
        If you want to provide the answer directly, without using the number tiers, put an equal sign before your answer (for instance, =7).<br>
        <span class="equation-in-text">-8 + 12 = ?</span>
    `;
    addCanvasText(questionText, wide=false, small=true);
    return ['8,4,4', '4,8,4', '=4'];
}

function genQuestion12bnn(progressInt) {
    let number1 = pickRandomNumber(2, 20);
    if (progressInt < 10) {
        number1 = pickRandomNumber(2, 10);
    }
    const number2positive = pickRandomNumber(1, number1 - 1);
    let number2 = 0 - number2positive;
    const arrangement = pickRandomNumber(0, 1);

    if (arrangement === 0) {
        makeNumberTiers('circle', 'd?', `f${number1}`, `f${number2}`, ['d?', 'd?'], []);
    } else {
        makeNumberTiers('circle', 'd?', `f${number2}`, `f${number1}`, [], ['d?', 'd?']);
    }
    addListener('input', setLiveTiers, solveinput);
    let equationLine = `${number1} + ${number2}`;
    if (arrangement === 1) {
        equationLine = `${number2} + ${number1}`;
    }
    const questionText = `
        <span class="equation-in-text">${equationLine} = ?</span>
    `;
    addCanvasText(questionText);
    const answer = (number1 + number2).toString();
    const string1 = number2positive.toString() + ',' + answer + ',' + answer;
    const string2 = answer + ',' + number2positive.toString() + ',' + answer;
    const string3 = '=' + answer;
    const returnAnswer = [string1, string2, string3];
    return logCheckRep(returnAnswer, [arrangement, number1, number2], genQuestion12bnn, progressInt);
}

function genQuestion13bnn(progressInt) {
    let topLimit = 5;
    let bottomLimit = 1;
    if (progressInt < 5) {
    } else if (progressInt < 10) {
        topLimit = 10
    } else if (progressInt < 15) {
        topLimit = 15;
        bottomLimit = 5
    } else if (progressInt < 10) {
        topLimit = 20;
        bottomLimit = 10;
    }
    let number1 = pickRandomNumber(bottomLimit, topLimit);
    const number2positive = pickRandomNumber(bottomLimit, number1);
    let number2 = 0 - number2positive;
    let leftNumber = number1;
    let rightNumber = number2;
    if (pickRandomNumber(0, 1) === 0) {
        leftNumber = number2;
        rightNumber = number1;
    }
    const questionText = `
        <span class="equation-solve-text">${leftNumber} + ${rightNumber} = ?</span>
    `;

    placeTextQuestion([questionText]);
    return logCheckRep((leftNumber + rightNumber).toString(), questionText, genQuestion13bnn, progressInt);
}
