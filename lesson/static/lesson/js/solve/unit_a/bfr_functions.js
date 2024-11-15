
function genQuestion1bfr() {
    makeSquareNumberBonds('1', '6', '?', renderMathjax=true);
    const questionText = `
        Look at the number bond below. At first, this does not seem possible. How can you multiply a number by 6 and get 0?<br>
        Or, looking at it another way, how can you divide 1 by 6.
        The solution is a <i>fraction</i>. If we multiply <i>\\(\\frac{1}{6}\\)</i> by 6, we get 1. If we divide 1 by 6 we get \\(\\frac{1}{6}\\).<br>
        One way to represent fractions is with a forward slash; for example, 1/6. Enter the solution and press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return '1/6';
}

function genQuestion2bfr() {
    makeSquareNumberBonds('1', '8', '?');
    const questionText = `
        Every number has a number that can be multiplied by it to equal 1. For 6, it was 1/6.<br>
        What should be the missing number in this number bond?
    `;
    addCanvasText(questionText);
    return '1/8';
}

function genQuestion3bfr() {
    makeSquareNumberBonds('1', '?', '3');
    const questionText = `
        What about this one?
    `;
    addCanvasText(questionText);
    return '1/3';
}

function genQuestion4bfr() {
    makeSquareNumberBonds('?', '1/4', '4', renderMathjax=true);
    const questionText = `
        Sometimes the number bond might look like this.<br>
        Use your knowledge of fractions to figure it out.
    `;
    addCanvasText(questionText);
    return '1';
}

function genQuestion5bfr(progressInt) {
    let number1 = pickRandomNumber(2, 20);
    if (progressInt < 10) {
        number1 = pickRandomNumber(2, 10);
    }

    // if a different form would render as fraction, use that at index 0
    let number1pair = [number1.toString(), number1.toString()];
    let number2pair = [`1/${number1}`, `1/${number1}`];

    let leftNumber = number1pair;
    let rightNumber = number2pair;
    if (pickRandomNumber(0, 1) === 0) {
        leftNumber = number2pair;
        rightNumber = number1pair;
    }
    const arrangement = pickRandomNumber(0, 2);

    let returnAnswer = '';
    if (arrangement === 0) {
        makeSquareNumberBonds('?', leftNumber[0], rightNumber[0], renderMathjax=true);
        returnAnswer = '1';
    } else if (arrangement === 1) {
        makeSquareNumberBonds('1', leftNumber[0], '?', renderMathjax=true);
        returnAnswer = rightNumber[1];
    } else {
        makeSquareNumberBonds('1', '?', rightNumber[0], renderMathjax=true);
        returnAnswer = leftNumber[1];
    }
    return logCheckRep(returnAnswer, [arrangement, leftNumber, rightNumber], genQuestion5bfr, progressInt);
}

function genQuestion6bfr() {
    makeSquareNumberBonds('?', '3', '1/4', renderMathjax=true);
    const questionText = `
        What about number bonds like this?<br>
        This number bond matches the equation 3 * \\(\\frac{1}{4}\\) = ?<br>
        Think in your head what the answer is, and then press enter.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion7bfr() {
    makeSquareNumberBonds('3/4', '3', '1/4', renderMathjax=true);
    const questionText = `
        The solution is <strong>\\(\\frac{3}{4}\\)</strong>. 3 * \\(\\frac{1}{4}\\) = \\(\\frac{3}{4}\\).<br>
        Why is that the answer?<br>
        Press enter to solve this question using multi-tier number bonds.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion8bfr() {
    makeNumberTiers('square', 'b3/4', 'f3', 'f1/4', ['f3/4', 'f4'], [], renderMathjax=true);
    const questionText = `
        One way to solve this question is to make another number bond, for the 3.<br>
        In this new number bond, the 4 was picked to cancel with the fraction \\(\\frac{1}{4}\\) on the right. We complete the number bond by making the other number \\(\\frac{3}{4}\\).<br>
        We know that 4 * \\(\\frac{1}{4}\\) = 1. This means that the remaining number, <span style="color: blue;">\\(\\frac{3}{4}\\)</span>, is our solution.<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText, wide=true, small=true);
    return '';
}

function genQuestion9bfr() {
    makeNumberTiers('square', 'd?', 'f8', 'f1/3', ['d?', 'd?'], [], renderMathjax=true);
    addListener('input', setLiveTiers, solveinput);
    const questionText = `
        Now try to solve this one.<br>
        First, type the numbers that should replace the bottom two question marks. Make sure that they multiply to 8, and that one of them cancels with \\(\\frac{1}{3}\\).<br>
        Then type the number that should replace the top question mark.<br>
        Separate all your numbers with commas, then press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return ['8/3,3,8/3', '3,8/3,8/3'];
}

function genQuestion10bfr() {
    makeNumberTiers('square', 'd?', 'f1/5', 'f3', [], ['d?', 'd?'], renderMathjax=true);
    addListener('input', setLiveTiers, solveinput);
    const questionText = `
        Now try to solve this one.<br>
        Remember one number on the very bottom should cancel with the fraction (they should multiply to 1).<br>
        Separate all your numbers with commas, then press enter.
    `;
    addCanvasText(questionText);
    return ['5,3/5,3/5', '3/5,5,3/5'];
}

function genQuestion11bnn() {
    makeNumberTiers('square', 'd?', 'f1/5', 'f3', [], ['d?', 'd?'], renderMathjax=true);
    addListener('input', setLiveTiers, solveinput);
    const questionText = `
        Sometimes the equation will be given as well.<br>
        If you want to provide the answer directly, without using the number tiers, put an equal sign before your answer (for instance, =2/7).<br>
        <span class="equation-in-text">\\(\\frac{1}{5}\\) * 3 = ?</span>
    `;
    addCanvasText(questionText, wide=false, small=true);
    return ['5,3/5,3/5', '3/5,5,3/5', '=3/5'];
}

function genQuestion12bfr(progressInt) {
    let number1 = pickRandomNumber(1, 10);
    number1 = number1.toString();
    const denominator = pickRandomNumber(2, 10);
    const number2 = `\\(\\frac{1}{${denominator}}\\)`;
    const number2tiers = `1/${denominator}`;
    const number3 = `${number1}/${denominator}`;
    const simplifiedList = reduce(number1, denominator);
    let number3simplified = `${simplifiedList[0]}/${simplifiedList[1]}`;
    if (simplifiedList[0] % simplifiedList[1] === 0) {
        number3simplified = (simplifiedList[0] / simplifiedList[1]).toString();
    }
    const arrangement = pickRandomNumber(0, 1);

    if (arrangement === 0) {
        makeNumberTiers('square', 'd?', `f${number1}`, `f${number2tiers}`, ['d?', 'd?'], [], renderMathjax=true);
    } else {
        makeNumberTiers('square', 'd?', `f${number2tiers}`, `f${number1}`, [], ['d?', 'd?'], renderMathjax=true);
    }
    addListener('input', setLiveTiers, solveinput);
    let equationLine = `${number1} * ${number2}`;
    if (arrangement === 1) {
        equationLine = `${number2} * ${number1}`;
    }
    const questionText = `
        <span class="equation-in-text">${equationLine} = ?</span>
    `;
    addCanvasText(questionText);
    const string1 = denominator + ',' + number3 + ',' + number3;
    const string2 = number3 + ',' + denominator + ',' + number3;
    const string3 = denominator + ',' + number3simplified + ',' + number3;
    const string4 = number3 + ',' + denominator + ',' + number3simplified;
    const string5 = denominator + ',' + number3simplified + ',' + number3simplified;
    const string6 = number3simplified + ',' + denominator + ',' + number3simplified;
    const string7 = denominator + ',' + number3 + ',' + number3simplified;
    const string8 = number3simplified + ',' + denominator + ',' + number3;
    const string9 = '=' + number3;
    const string10 = '=' + number3simplified;
    const returnAnswer = [string1, string2, string3, string4, string5, string6, string7, string8, string9, string10];
    return logCheckRep(returnAnswer, [arrangement, number1, number2tiers], genQuestion12bfr, progressInt);
}

function genQuestion13bfr(progressInt) {
    let number1 = pickRandomNumber(1, 10);
    number1 = number1.toString();
    const denominator = pickRandomNumber(2, 10);
    const number2 = `\\(\\frac{1}{${denominator}}\\)`;
    const number3 = `${number1}/${denominator}`;
    const simplifiedList = reduce(number1, denominator);
    let number3simplified = `${simplifiedList[0]}/${simplifiedList[1]}`;
    if (simplifiedList[0] % simplifiedList[1] === 0) {
        number3simplified = (simplifiedList[0] / simplifiedList[1]).toString();
    }
    let leftNumber = number1;
    let rightNumber = number2;
    if (pickRandomNumber(0, 1) === 0) {
        leftNumber = number2;
        rightNumber = number1;
    }
    const questionText = `
        <span class="equation-solve-text tex2jax_process">${leftNumber} * ${rightNumber} = ?</span>
    `;

    placeTextQuestion([questionText]);

    setTimeout(function() {MathJax.typeset();});

    return logCheckRep([number3, number3simplified], questionText, genQuestion13bfr, progressInt);
}
