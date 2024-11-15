
function stripZeros(equation) {
    equation = equation.replaceAll('+0', '');
    equation = equation.replaceAll('0+', '');
    return equation;
}

function ueqStringStringMatch(inputValue, matchAnswer) {
    return stringStringMatch(stripZeros(inputValue), matchAnswer);
}

function ueqMakeSimpleEquation(balanced) {
    let leftRanges = [[1, 10], [1, 10]];
    if (pickRandomNumber(1, 2) === 1) {
        leftRanges = [[1, 10], []];
    }
    let rightRanges = [[1, 10], [1, 10]];
    if (pickRandomNumber(1, 2) === 1) {
        rightRanges = [[1, 10], []];
    }
    const ranges = leftRanges.concat(rightRanges);
    return makeSimpleEquation(
        ['add', 'add'],
        ranges,
        ['', '', '', ''],
        balanced
    );
}

function genQuestion1ueq() {
    makeAlgebraScale('5=5');
    const questionText = `
        Scales can help us understand equivalence.<br>
        When a scale is balanced (like the one below), we know that the left side is equal to the right side.<br>
        We could also say that the left and right sides of the scale are equivalent.<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText, wide=true, small=true);
    return '';
}

function genQuestion2ueq() {
    makeAlgebraScale('5=5');
    const questionText = `
        Just like the scale, mathematical equations have two sides.<br>
        It is called an <i>equation</i> because both sides are <i>equal</i>, just like a balanced scale.<br>
        Equations always have an equal sign (=) to separate the left and right sides.<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText, wide=true, small=true);
    return '';
}

function genQuestion3ueq() {
    makeAlgebraScale('5=5');
    const questionText = `
        The balanced scale below would be represented by the equation <span class="equation-in-text">5 = 5</span>.<br>
        Enter the equation for this scale, and then press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return '5=5';
}

function genQuestion4ueq() {
    makeAlgebraScale('8=8');
    const questionText = `
        Enter the equation for the scale below, and then press enter.
    `;
    addCanvasText(questionText, wide=false, small=true);
    return '8=8';
}

function genQuestion5ueq() {
    makeAlgebraScale('2+3=5');
    const questionText = `
        To show two numbers being added, we can place two groups of blocks on one side of the scale.<br>
        The equation for this scale would be <span class="equation-in-text">2 + 3 = 5</span>.<br>
        It's still an equation because both sides are equivalent (just like both sides of the scale have the same number of blocks).<br>
        Enter the equation for the scale below, and then press enter.
    `;
    addCanvasText(questionText, wide=true, small=true);
    return '2+3=5';
}

function genQuestion6ueq() {
    makeAlgebraScale('5=2+3');
    const questionText = `
        Sometimes the numbers being added will be on the right.<br>
        Enter the equation for the scale below, and then press enter.
    `;
    addCanvasText(questionText, wide=true, small=false);
    return '5=2+3';
}

function genQuestion7ueq() {
    makeAlgebraScale('4+1=2+3');
    const questionText = `
        Sometimes the numbers being added will be on both sides.<br>
        The scale is still balanced because both sides have the same number of blocks, even though they are grouped differently.<br>
        Enter the equation for the scale below, and then press enter.
    `;
    addCanvasText(questionText, wide=true, small=false);
    return '4+1=2+3';
}

function genQuestion8ueq(progressInt) {
    const equationList = ueqMakeSimpleEquation();
    const equation = equationList[0].join('+') + '=' + equationList[1].join('+');
    makeAlgebraScale(equation);
    const questionText = `
        Enter the equation for the scale below.
    `;
    addCanvasText(questionText);
    return logCheckRep(equation, questionText, genQuestion8ueq, progressInt);
}

function genQuestion9ueq() {
    makeAlgebraScale('2=5');
    const questionText = `
        Now the scale is stuck. It always <i>looks</i> balanced, even if the sides are not equal.<br>
        Are the two sides of the scale below actually equal?
    `;
    addCanvasText(questionText);
    return ['no', 'n'];
}

function genQuestion10ueq() {
    makeAlgebraScale('7=7');
    const questionText = `
        Sometimes the two sides <i>will</i> be equal.<br>
        Are the two sides of the scale below equal?
    `;
    addCanvasText(questionText);
    return ['yes', 'y'];
}

function genQuestion11ueq(progressInt) {
    const equal = pickRandomNumber(0, 1);
    let equation = '';
    let matchAnswer = '';
    if (equal === 0) {
        const equationList = ueqMakeSimpleEquation(balanced=true);
        equation = equationList[0].join('+') + '=' + equationList[1].join('+');
        matchAnswer = ['yes', 'y'];
    } else {
        const equationList = ueqMakeSimpleEquation(balanced=false);
        equation = equationList[0].join('+') + '=' + equationList[1].join('+');
        matchAnswer = ['no', 'n'];
    }
    makeAlgebraScale(equation);
    const questionText = `
        Are the two sides of the scale below equal?
    `;
    addCanvasText(questionText);
    return logCheckRep(matchAnswer, questionText, genQuestion11ueq, progressInt);
}

function genQuestion12ueq() {
    makeAlgebraScale('7=4');
    const questionText = `
        The equation <strong>7 = 4</strong> matches the scale below.<br>
        But because the scale is broken, the sides are not actually equal.<br>
        Therefore, the equation <strong>7 = 4</strong> is a broken equation.<br>
        When you are ready to continue, press enter.
    `;
    addCanvasText(questionText, wide=true, small=true);
    return '';
}

function genQuestion13ueq() {
    makeAlgebraScale('7=4');
    const questionText = `
        When an equation is broken, we say that it is false.<br>
        Is the equation below true or false? Look at the matching scale if it helps.<br>
        <span class="equation-in-text">7 = 4</span>
    `;
    addCanvasText(questionText, wide=false, small=true);
    return ['false', 'f'];
}

function genQuestion14ueq() {
    makeAlgebraScale('8=8');
    const questionText = `
        Of course, sometimes the equation will not be broken.<br>
        Is the equation below true or false? Look at the matching scale if it helps.<br>
        <span class="equation-in-text">8 = 8</span>
    `;
    addCanvasText(questionText, wide=false, small=true);
    return ['true', 't'];
}

function genQuestion15ueq() {
    const questionText = `
        Sometimes, only the equation will be given.<br>
        Is the equation below true or false?<br>
        <span class="equation-in-text">3 = 3</span>
    `;
    placeTextQuestion([questionText]);
    return ['true', 't'];
}

function genQuestion16ueq() {
    const questionText = `
        What about this one?<br>
        Is the equation below true or false?<br>
        <span class="equation-in-text">1 = 5</span>
    `;
    placeTextQuestion([questionText]);
    return ['false', 'f'];
}

function genQuestion17ueq() {
    const questionText = `
        What about this one?<br>
        Is the equation below true or false?<br>
        <span class="equation-in-text">5 = 1 + 3</span>
    `;
    placeTextQuestion([questionText]);
    return ['false', 'f'];
}

function genQuestion18ueq(progressInt) {
    const equal = pickRandomNumber(0, 1);
    let equationList = '';
    if (equal === 0) {
        equationList = ueqMakeSimpleEquation(balanced=true);
        matchAnswer = ['true', 't'];
    } else {
        equationList = ueqMakeSimpleEquation(balanced=false);
        matchAnswer = ['false', 'f'];
    }
    const equationShort = equationList[0].join('+') + '=' + equationList[1].join('+');
    const equationLong = equationList[0].join(' + ') + ' = ' + equationList[1].join(' + ');
    const questionText = `
        Is the equation below true or false?<br>
        <span class="equation-in-text">${equationLong}</span>
    `;
    if (progressInt < 10) {
        makeAlgebraScale(equationShort);
        addCanvasText(questionText);
    } else if (progressInt < 20) {
        placeTextQuestion([questionText]);
    }
    return logCheckRep(matchAnswer, questionText, genQuestion18ueq, progressInt);
}

function genQuestion19ueq(progressInt) {
    if (progressInt === 0) {
        sectionTracklist = ['custom', 0];
    }
    let falseCount = sectionTracklist[1];
    const variableTypeIndex = [
        [[[1, 5], [1, 5], [2, 10], []], ['', '', '', '']],
        [[[2, 10], [], [1, 5], [1, 5]], ['', '', '', '']],
        [[[1, 10], [], [1, 10], []], ['', '', '', '']],
        [[[1, 5], [1, 5], [1, 5], [1, 5]], ['a', 'b', 'a', 'b']],
        [[[1, 5], [1, 5], [1, 5], [1, 5]], ['a', 'b', 'b', 'a']],
        [[[1, 5], [1, 5], [1, 5], [1, 5]], ['a', 'b', 'c', 'c']],
        [[[1, 10], [1, 10], [2, 20], []], ['', '', '', '']],
        [[[1, 10], [1, 10], [2, 20], [0]], ['', '', '', '']],
        [[[1, 10], [1, 10], [0], [2, 20]], ['', '', '', '']],
        [[[1, 10], [1, 10], [1, 10], [1, 10]], ['', '', '', '']],
    ];
    let equationList = '';
    let matchAnswer = ['true', 't'];
    if (progressInt < 15) {
        if ((progressInt - falseCount < 10) && (pickRandomNumber(0, 1) === 0 || falseCount === 5)) {
            const ranges = variableTypeIndex[progressInt - falseCount][0];
            const variables = variableTypeIndex[progressInt - falseCount][1];
            equationList = makeSimpleEquation(['add', 'add'], ranges, variables);
        } else {
            matchAnswer = ['false', 'f'];
            equationList = ueqMakeSimpleEquation(balanced=false);
            falseCount += 1;
            sectionTracklist[1] = falseCount;
        }
    } else if (progressInt < 30) {
        let balancedValue = true;
        if (pickRandomNumber(0, 1) === 0) {
            balancedValue = false;
            matchAnswer = ['false', 'f'];
        }
        equationList = ueqMakeSimpleEquation(balanced=balancedValue);
    }

    const equationShort = equationList[0].join('+') + '=' + equationList[1].join('+');
    const equationLong = equationList[0].join(' + ') + ' = ' + equationList[1].join(' + ');
    const questionText = `
        Is the equation below true or false?<br>
        <span class="equation-in-text">${equationLong}</span>
    `;
    placeTextQuestion([questionText]);
    return logCheckRep(matchAnswer, questionText, genQuestion19ueq, progressInt);
}
