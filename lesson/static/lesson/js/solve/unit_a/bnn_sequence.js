
const bnnSources = [

];

const bnnSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Negative Numbers Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about negative numbers.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1bnn,
            stringStringMatch,
        'generate',
            genQuestion2bnn,
            stringStringMatch,
        'generate',
            genQuestion3bnn,
            stringStringMatch,
        'generate',
            genQuestion4bnn,
            stringStringMatch,
    'section:Up-Down Round (Negative Numbers)',
        'updown',
            genQuestion5bnn,
            stringStringMatch,
            25,
    'section:Number Bonds Intro',
        'generate',
            genQuestion6bnn,
        'generate',
            genQuestion7bnn,
        'generate',
            genQuestion8bnn,
        'generate',
            genQuestion9bnn,
            anyOfStringMatch,
        'generate',
            genQuestion10bnn,
            anyOfStringMatch,
        'generate',
            genQuestion11bnn,
            anyOfStringMatch,
    'section:Up-Down Round (Number Bonds)',
        'updown',
            genQuestion12bnn,
            anyOfStringMatch,
            20,
    'section:Countdown Intro',
        'text',
            `In the next sequence of questions, you will be given only the equation.
            However, if it is helpful, draw number bonds for yourself, on a piece of paper.
            When you are ready to begin, press enter.`,
    'section:Countdown Challenge',
        'countdown',
            genQuestion13bnn,
            stringStringMatch,
            20, 8,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'text',
            `Use what you know about negative numbers.<br>
            <span class="equation-in-text">? + 374 = 0</span>`,
            stringStringMatch, '-374',
        'text',
            `Use what you know about negative numbers.<br>
            <span class="equation-in-text">9467 + ? = 0</span>`,
            stringStringMatch, '-9467',
        'text',
            `Use what you know about negative numbers.<br>
            <span class="equation-in-text">0 = ? + 82683</span>`,
            stringStringMatch, '-82683',
        'text',
            `Use what you know about negative numbers.<br>
            <span class="equation-in-text">0 = 947392 + ?</span>`,
            stringStringMatch, '-947392',
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `Why do you think negative numbers exist, such as -1, -2, -3, etc? Why can't we use only positive numbers (1, 2, 3, 4, 5...)?`,
        'endlongtext'
];

function setBNN(save) {
    actionFromSequence(bnnSequence, save);
}
