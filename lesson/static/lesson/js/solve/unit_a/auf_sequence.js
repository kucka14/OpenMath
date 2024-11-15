
const aufSources = [
    'https://nrich.maths.org/144',
];

const aufSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Adding Circles Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about adding numbers up to five.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1auf,
            stringStringMatch,
        'generate',
            genQuestion2auf,
            stringStringMatch,
        'text',
            `Sometimes you'll be given just the numbers.
            <span class="equation-in-text">1 + 3 = ?</span>`,
            stringStringMatch, '4',
    'section:Up-Down Round (Adding Circles)',
        'updown',
            genQuestion3auf,
            stringStringMatch,
            18,
    'section:Number Bonds Intro',
        'text',
            `There's many different ways to think about adding.
            Now we will do addition problems using number bonds.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion4auf,
            stringStringMatch,
        'generate',
            genQuestion5auf,
            stringStringMatch,
        'generate',
            genQuestion6auf,
            stringStringMatch,
    'section:Up-Down Round (Number Bonds)',
        'updown',
            genQuestion7auf,
            stringStringMatch,
            20,
    'section:Countdown Intro',
        'text',
            `In the next sequence of questions, you will be given only the equation.
            However, if it is helpful, draw number bonds for yourself, on a piece of paper.
            When you are ready to begin, press enter.`,
    'section:Coundown Challenge',
        'countdown',
            genQuestion8auf,
            stringStringMatch,
            36, 5,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'generate',
            genQuestion9auf,
            triangleSumsMatch,
        'generate',
            genQuestion9auf,
            triangleSumsMatch,
        'generate',
            genQuestion9auf,
            triangleSumsMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            'Solve this problem on a piece of paper. Then explain how you figured it out.',
            'ladybird_box.png',
            350,
        'endlongtext'
];

function setAUF(save) {
    actionFromSequence(aufSequence, save);
}
