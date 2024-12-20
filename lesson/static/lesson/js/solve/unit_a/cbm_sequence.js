
const cbmSources = [
    'https://nrich.maths.org/5612',
];

const cbmSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Addition Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about using multiplication and repeated addition count.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1cbm,
            autoMatch,
        'generate',
            genQuestion2cbm,
            matchEquationAllAdd,
        'generate',
            genQuestion3cbm,
            matchEquationGiven,
        'generate',
            genQuestion4cbm,
            matchEquationGiven,
    'section:Up-Down Round (Addition)',
        'updown',
            genQuestion5cbm,
            matchEquationGiven,
            20,
    'section:Repeated Addition Intro',
        'generate',
            genQuestion6cbm,
            matchEquationGiven,
        'generate',
            genQuestion7cbm,
            matchEquationGiven,
        'generate',
            genQuestion8cbm,
            matchEquationAllMultiply,
        'generate',
            genQuestion9cbm,
            matchEquationGiven,
    'section:Up-Down Round (Repeated Addition)',
        'updown',
            genQuestion10cbm,
            matchEquationGiven,
            15,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'generate',
            genQuestion11cbm,
            matchEquationAllAdd,
        'generate',
            genQuestion12cbm,
            matchEquationAllMultiply,
        'generate',
            genQuestion13cbm,
            match13cbm,
        'generate',
            genQuestion14cbm,
            matchEquationAllMultiply,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `If you had to work out 23 x 21, how would you do it? What if you need to work out 246 x 34?`,
        'endlongtext'
];

function setCBM(save) {
    actionFromSequence(cbmSequence, save);
}
