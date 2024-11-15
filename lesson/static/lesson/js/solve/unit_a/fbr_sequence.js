
const fbrSources = [

];

const fbrSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Fraction Bars Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about using fraction bars.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1fbr,
            autoMatch,
        'generate',
            genQuestion2fbr,
            autoMatch,
        'generate',
            genQuestion3fbr,
            autoMatch,
    'section:Fraction Match Intro',
        'generate',
            genQuestion4fbr,
            matchFractionBarInputDelay,
    'section:Up-Down Round (Fraction Match)',
        'updown',
            genQuestion5fbr,
            matchFractionBarInputDelay,
            12,
    'section:Filling Fractions Intro',
        'generate',
            genQuestion6fbr,
            matchFractionBarFill,
    'section:Up-Down Round (Filling Fractions)',
        'updown',
            genQuestion7fbr,
            matchFractionBarFill,
            20,
    'section:Countdown Challenge',
        'countdown',
            genQuestion8fbr,
            currentMatch,
            20, 10,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'generate',
            genQuestion9fbr,
            matchFractionBarInputDelayDual,
        'generate',
            genQuestion10fbr,
            matchFractionBarInputDelayDual,
        'generate',
            genQuestion11fbr,
            matchFractionBarInputDelayDual,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `How many fraction combinations add up to 1? List as many as you can think of, then explain if there are others you haven't included.`,
        'endlongtext'
];

function setFBR(save) {
    actionFromSequence(fbrSequence, save);
}
