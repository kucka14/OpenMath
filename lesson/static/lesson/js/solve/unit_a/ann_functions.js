
function genQuestion1ann() {
    makeCircleNumberBonds('5', '-2', '?');
    const questionText = `
        How would you solve a number bond like this?<br>
        This number bond matches the equation <i>5 ${subSymbol} -2 = ?</i><br>Or it could be the equation <i>-2 + ? = 5</i><br>
        Think in your head what the answer is, and then press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return '';
}

function genQuestion2ann() {
    makeCircleNumberBonds('5', '-2', '7');
    const questionText = `
        The solution is <strong>7</strong>. <i>5 ${subSymbol} -2 = 7</i><br>
        Why is that the answer?<br>
        Press enter to solve this question using multi-tier number bonds.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion3ann() {
    makeNumberTiers('circle', 'f5', 'f-2', 'f?', [], ['f2', 'f5'], renderMathjax=false, strikethrough=false);
    const questionText = `
        One way to solve this question is to make another number bond, for the unknown number.
        This new number bond will include the number 2, to cancel the -2 on the left.<br>
        It will also include the number 5, because the top answer is 5.<br>
        We know that 2 + 5 = 7. This means that missing number is 7.<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText, wide=true, small=true);
    return '';
}

function genQuestion4ann() {
    makeNumberTiers('circle', 'f8', 'f-3', 'd?', [], ['d?', 'd?'], renderMathjax=false, strikethrough=false);
    addListener('input', setLiveTiers, solveinput);
    const questionText = `
        Now try to solve this one.<br>
        First, type the numbers that should replace the bottom two question marks. Make sure one of them cancels with -3.<br>
        Then type the number that should replace the remaining question mark. That number is the solution.<br>
        Separate all your numbers with commas, then press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return ['3,8,11', '8,3,11'];
}

function genQuestion5ann() {
    makeNumberTiers('circle', 'f4', 'f-8', 'd?', [], ['d?', 'd?'], renderMathjax=false, strikethrough=false);
    addListener('input', setLiveTiers, solveinput);
    const questionText = `
        Now try to solve this one.<br>
        Remember that one number on the very bottom should cancel with the negative number (they should add up to 0).<br>
        The other number on the very bottom should match the very top number.<br>
        Separate all your numbers with commas, then press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return ['8,4,12', '4,8,12'];
}

function genQuestion6ann() {
    makeNumberTiers('circle', 'f4', 'f-8', 'd?', [], ['d?', 'd?'], renderMathjax=false, strikethrough=false);
    addListener('input', setLiveTiers, solveinput);
    const questionText = `
    Sometimes the equation will be given as well.<br>
    If you want to provide the answer directly, without using the number tiers, put an equal sign before your answer (for instance, =7).<br>
    <span class="equation-in-text">4 ${subSymbol} -8 = ?</span>
    `;
    addCanvasText(questionText, wide=false, small=true);
    return ['8,4,12', '4,8,12', '=12'];
}

function genQuestion7ann(progressInt) {
    const number1positive = pickRandomNumber(1, 10);
    const number2 = pickRandomNumber(number1positive + 1, 20);
    const number1 = 0 - number1positive;
    const topNumber = number1 + number2;

    makeNumberTiers('circle', `f${topNumber}`, `f${number1}`, 'd?', [], ['d?', 'd?'], renderMathjax=false, strikethrough=false);
    addListener('input', setLiveTiers, solveinput);
    const questionText = `
        <span class="equation-in-text">${topNumber} ${subSymbol} ${number1} = ?</span>
    `;
    addCanvasText(questionText);
    const string1 = number1positive.toString() + ',' + topNumber.toString() + ',' + number2.toString();
    const string2 = topNumber.toString() + ',' + number1positive.toString() + ',' + number2.toString();
    const string3 = '=' + number2.toString();
    return logCheckRep([string1, string2, string3], [number1, number2], genQuestion7ann, progressInt);
}

function genQuestion8ann(progressInt) {
    let number1positive = pickRandomNumber(1, 10);
    const number2 = pickRandomNumber(number1positive + 1, 20);
    number1 = 0 - number1positive;
    const topNumber = number1 + number2;
    const questionText = `
        <span class="equation-solve-text">${topNumber} ${subSymbol} ${number1} = ?</span>
    `;
    placeTextQuestion([questionText]);
    return logCheckRep(number2.toString(), questionText, genQuestion8ann, progressInt);
}
