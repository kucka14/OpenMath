
function genQuestion1fbr() {
    makeFractionBar(0, 0, goalLine='', renderMathjax=true);
    addListener('keydown', setLiveFractionBarFill);
    addListener('input', setLiveFractionBarInput);
    const questionText = `
        Fraction bars are a good way to think about fractions.<br>
        The fraction bar below represents one whole, or the number 1.<br>
        Each little notch represents an increment of \\(\\frac{1}{12}\\). There are bigger notches for increments of \\(\\frac{1}{6}\\), \\(\\frac{1}{4}\\), and \\(\\frac{1}{2}\\)<br>
        When you are ready to begin, press enter.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion2fbr() {
    makeFractionBar(0, 0);
    addListener('keydown', setLiveFractionBarFill);
    addListener('input', setLiveFractionBarInput);
    const questionText = `
        You can fill up the fraction bar with the arrow keys.<br>
        Press the Control key to activate the fraction bar, then click left and right to fill in the fraction bar.<br>
        To fill in a different color, hold the space bar while you are clicking left and right.<br>
        Practice doing this, then deactivate the fraction bar and press enter to continue.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion3fbr() {
    makeFractionBar(0, 0, goalLine='', renderMathjax=true);
    addListener('keydown', setLiveFractionBarFill);
    addListener('input', setLiveFractionBarInput);
    const questionText = `
        Sometimes the fraction bar will represent the fraction you type.<br>
        Try typing 1/3, for the fraction \\(\\frac{1}{3}\\).<br>
        Now try typing 1/2 + 1/4, for the expression \\(\\frac{1}{2}\\) + \\(\\frac{1}{4}\\).<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText);
    return '';
}

function genQuestion4fbr() {
    makeFractionBar(0, 0, goalLine=6);
    const questionText = `
        In this next section, you will be shown a fraction target, represented by the red line below.<br>
        You must enter a fraction that matches the target line, using a forward slash (/).<br>
        The fraction bar will not be filled in until you submit your guess.
    `;
    addCanvasText(questionText);
    return reduce(6, 12);
}

function genQuestion5fbr(progressInt) {
    let number1 = '';
    if (progressInt === -1) {
        number1 = pickRandomNumber(0, 12);
        makeFractionBar(0, 0, number1);
        const questionText = `
            Enter a fraction that matches the target line.
        `;
        addCanvasText(questionText);
        // consider using an iter list and section tracklist
        return logCheckRep(reduce(number1, 12), number1, genQuestion5fbr, progressInt);
    } else {
        if (progressInt === 0) {
            sectionTracklist = ['pluck', '', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]];
        }
        number1 = chooseFromList(sectionTracklist[2]);
        sectionTracklist[1] = number1;
        makeFractionBar(0, 0, number1);
        const questionText = `
            Enter a fraction that matches the target line.
        `;
        addCanvasText(questionText);
        return reduce(number1, 12);
    }
}

function genQuestion6fbr() {
    makeFractionBar(0, 0, goalLine='', renderMathjax=true);
    addListener('keydown', setLiveFractionBarFill);
    const questionText = `
        Now you will be given a fraction, as below. Fill in the fraction bar until it matches the given fraction.<br>
        Press the Control key to activate the fraction bar. Deactivate the fraction bar when you are ready to submit your answer.<br>
        There is only one fraction, so you should only fill the fraction bar with one color (blue).<br>
        <span class="equation-in-text">Make the fraction \\(\\frac{1}{3}\\)</span>
    `;
    addCanvasText(questionText, wide=false, small=true);
    return reduce(1, 3);
}

function genQuestion7fbr(progressInt) {
    const denominator = chooseFromList([1, 2, 3, 4, 6, 12]);
    const numerator = pickRandomNumber(0, denominator);

    makeFractionBar(0, 0, goalLine='', renderMathjax=true);
    addListener('keydown', setLiveFractionBarFill);
    const questionText = `
        Fill in the fraction bar until it matches the given fraction.<br>
        Press the Control key to activate the fraction bar. Deactivate the fraction bar when you are ready to submit your answer.<br>
        <span class="equation-in-text">Make the fraction \\(\\frac{${numerator}}{${denominator}}\\)</span>
    `;
    addCanvasText(questionText);

    // consider using an iter list and section tracklist
    return logCheckRep(reduce(numerator, denominator), [numerator, denominator], genQuestion7fbr, progressInt);
}

function genQuestion8fbr(progressInt) {
    if (progressInt === 0) {
        sectionTracklist = ['pluck', '', ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']];
    }
    const questionType = chooseFromList(sectionTracklist[2]);
    sectionTracklist[1] = questionType;
    if (questionType === 'a') {
        currentMatchFunction = matchFractionBarInputDelay;
        return genQuestion5fbr(-1);
    } else if (questionType === 'b') {
        currentMatchFunction = matchFractionBarFill;
        return genQuestion7fbr(-1);
    }
}

function genQuestion9fbr() {
    makeFractionBar(0, 0, goalLine=6, renderMathjax=true);
    const questionText = `
        The red line below is your target: <span class="equation-in-text>"\\(\\frac{1}{2}\\)</span>.<br>
        Enter an <i>addition</i> expression (<span class="highlight">two non-zero fractions</span> added together) that equals the target.<br>
        The fraction bar will not be filled in until you submit your guess.
    `;
    addCanvasText(questionText);

    return reduce(6, 12);
}

function genQuestion10fbr() {
    makeFractionBar(0, 0, goalLine=4, renderMathjax=true);
    const questionText = `
        The red line below is your target: <span class="equation-in-text">\\(\\frac{1}{3}\\)</span>.<br>
        Enter an <i>addition</i> expression (<span class="highlight">two non-zero fractions</span> added together) that equals the target.<br>
        The fraction bar will not be filled in until you submit your guess.
    `;
    addCanvasText(questionText);

    return reduce(4, 12);
}

function genQuestion11fbr() {
    makeFractionBar(0, 0, goalLine=12, renderMathjax=true);
    const questionText = `
        The red line below is your target: <span class="equation-in-text">1</span>.<br>
        Enter an <i>addition</i> expression (<span class="highlight">two non-zero fractions</span> added together) that equals the target.<br>
        The fraction bar will not be filled in until you submit your guess.
    `;
    addCanvasText(questionText);

    return reduce(12, 12);
}
