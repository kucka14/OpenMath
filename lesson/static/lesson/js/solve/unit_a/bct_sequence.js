
const bctSources = [
    'https://nrich.maths.org/8123',
];

const bctSequence = [
    'section:Welcome!',
        'unitwarmup',
    // 'section:Warm-Up',
    //     'warmup',
    'section:Counting Intro',
        'text',
            `Now that you're warmed up, let's get started!
            This lesson is about counting.
            When you are ready to begin, press enter.`,
    'section:Up-Down Round',
        'updown',
            genQuestion1bct,
            stringStringMatch,
            20,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2bct,
            stringStringMatch,
            8, 3,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'image',
            'How many circles are there?',
            'counting_bonus_1.png',
            stringStringMatch, '35',
        'image',
            'How many circles are there?',
            'counting_bonus_2.png',
            stringStringMatch, '67',
        'image',
            'How many circles are there?',
            'counting_bonus_3.png',
            stringStringMatch, '125',
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            'how_would_we_count.png',
            350,
        'endlongtext'
];

function setBCT(save) {
    actionFromSequence(bctSequence, save);
}
