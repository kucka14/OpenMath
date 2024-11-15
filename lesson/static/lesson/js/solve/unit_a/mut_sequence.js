
const mutSources = [

];

const mutSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Multiplication Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about mutliplying numbers up to ten.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1mut,
            matchEquationGiven,
    'section:Up-Down Round (Multiplication)',
        'updown',
            genQuestion2mut,
            matchEquationGiven,
            10,
    'section:Number Bonds Intro',
        'text',
            `There's many different ways to think about multiplication.
            Now we will do multiplication problems using number bonds.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion3mut,
            stringStringMatch,
        'generate',
            genQuestion4mut,
            stringStringMatch,
        'generate',
            genQuestion5mut,
            stringStringMatch,
    'section:Up-Down Round (Number Bonds)',
        'updown',
            genQuestion6mut,
            stringStringMatch,
            20,
    'section:Countdown Intro',
        'text',
            `In the next sequence of questions, you will be given only the equation.
            However, if it is helpful, draw number bonds for yourself, on a piece of paper.
            When you are ready to begin, press enter.`,
    'section:Countdown Challenge',
        'countdown',
            genQuestion7mut,
            stringStringMatch,
            55, 12,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'text',
            `<span class="equation-solve-text">4 * 2 * 6 = ?</span>`,
            stringStringMatch, '48',
        'text',
            `<span class="equation-solve-text">5 * 2 * 7 = ?</span>`,
            stringStringMatch, '70',
        'text',
            `<span class="equation-solve-text">3 * 6 * 2 = ?</span>`,
            stringStringMatch, '36',
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            'How many ways can you multiply numbers together to equal 48? Explain your answer.',
        'endlongtext'
];

function setMUT(save) {
    actionFromSequence(mutSequence, save);
}
