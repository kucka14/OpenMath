
const lsbSources = [

];

const lsbSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Large Subtraction Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about large subtraction.
            When you are ready to begin, press enter.`,
    'section:Up-Down Round',
        'updown',
            genQuestion1lsb,
            stringStringMatch,
            15,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2lsb,
            stringStringMatch,
            15, 8,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'text',
            `What is 198 - 108? Try to solve in your head.`,
            stringStringMatch, '90',
        'text',
            `What is 1004 - 997? Try to solve in your head.`,
            stringStringMatch, '7',
        'text',
            `What is 1597 - 250? Try to solve in your head.`,
            stringStringMatch, '1347',
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `What is 1000 - 497? Try to solve in your head. What strategies did you use to figure out the solution?`,
        'endlongtext'
];

function setLSB(save) {
    actionFromSequence(lsbSequence, save);
}
