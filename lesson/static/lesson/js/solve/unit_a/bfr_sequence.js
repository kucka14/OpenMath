
const bfrSources = [

];

const bfrSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Fractions Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about fractions.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1bfr,
            stringStringMatch,
        'generate',
            genQuestion2bfr,
            stringStringMatch,
        'generate',
            genQuestion3bfr,
            stringStringMatch,
        'generate',
            genQuestion4bfr,
            stringStringMatch,
    'section:Up-Down Round (Fractions)',
        'updown',
            genQuestion5bfr,
            stringStringMatch,
            25,
    'section:Number Bonds Intro',
        'generate',
            genQuestion6bfr,
        'generate',
            genQuestion7bfr,
        'generate',
            genQuestion8bfr,
        'generate',
            genQuestion9bfr,
            anyOfStringMatch,
        'generate',
            genQuestion10bfr,
            anyOfStringMatch,
        'generate',
            genQuestion11bnn,
            anyOfStringMatch,
    'section:Up-Down Round (Number Bonds)',
        'updown',
            genQuestion12bfr,
            anyOfStringMatch,
            20,
    'section:Countdown Intro',
        'text',
            `In the next sequence of questions, you will be given only the equation.
            However, if it is helpful, draw number bonds for yourself, on a piece of paper.
            When you are ready to begin, press enter.`,
    'section:Countdown Challenge',
        'countdown',
            genQuestion13bfr,
            anyOfStringMatch,
            20, 10,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'text',
            `<span class="equation-solve-text">5 * \\(\\frac{1}{5}\\) = ?</span>`,
            renderMathjaxText,
            stringStringMatch, '1',
        'text',
            `<span class="equation-solve-text">7 * ? = 1</span>`,
            renderMathjaxText,
            stringStringMatch, '1/7',
        'text',
            `<span class="equation-solve-text">? * \\(\\frac{1}{3}\\) = 1</span>`,
            renderMathjaxText,
            stringStringMatch, '3',
        'text',
            `<span class="equation-solve-text">1 ${divSymbol} 8 = ?</span>`,
            renderMathjaxText,
            stringStringMatch, '1/8',
        'text',
            `<span class="equation-solve-text">1 ${divSymbol} ? = \\(\\frac{1}{4}\\)</span>`,
            renderMathjaxText,
            stringStringMatch, '4',
        'text',
            `<span class="equation-solve-text">? ${divSymbol} 9 = \\(\\frac{1}{9}\\)</span>`,
            renderMathjaxText,
            stringStringMatch, '1',
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `What would be the solution of this equation? Make your best guess and explain your thinking.<br>
            <span class="equation-in-text">1 ${divSymbol} \\(\\frac{1}{2}\\) = ?</span>`,
            renderMathjaxText,
        'endlongtext'
];

function setBFR(save) {
    actionFromSequence(bfrSequence, save);
}
