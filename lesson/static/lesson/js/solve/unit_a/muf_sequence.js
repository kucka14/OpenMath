
const mufSources = [

];

const mufSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Multiplication Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about mutliplying numbers up to five.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1muf,
            matchEquationGiven,
    'section:Up-Down Round (Multiplication)',
        'updown',
            genQuestion2muf,
            matchEquationGiven,
            10,
    'section:Number Bonds Intro',
        'text',
            `There's many different ways to think about multiplication.
            Now we will do multiplication problems using number bonds.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion3muf,
            stringStringMatch,
        'generate',
            genQuestion4muf,
            stringStringMatch,
        'generate',
            genQuestion5muf,
            stringStringMatch,
    'section:Up-Down Round (Number Bonds)',
        'updown',
            genQuestion6muf,
            stringStringMatch,
            20,
    'section:Countdown Intro',
        'text',
            `In the next sequence of questions, you will be given only the equation.
            However, if it is helpful, draw number bonds for yourself, on a piece of paper.
            When you are ready to begin, press enter.`,
    'section:Countdown Challenge',
        'countdown',
            genQuestion7muf,
            stringStringMatch,
            36, 6,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'text',
            `<span class="equation-solve-text">2 * 3 * 3 = ?</span>`,
            stringStringMatch, '18',
        'text',
            `<span class="equation-solve-text">1 * 3 * 4 = ?</span>`,
            stringStringMatch, '12',
        'text',
            `<span class="equation-solve-text">3 * 2 * 4 = ?</span>`,
            stringStringMatch, '24',
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            'How many ways can you multiply numbers together to equal 12? Explain your answer.',
        'endlongtext'
];

function setMUF(save) {
    actionFromSequence(mufSequence, save);
}
