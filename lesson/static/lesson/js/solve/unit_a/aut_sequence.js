
const autSources = [
    'https://nrich.maths.org/14312',
];

const autSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Adding Circles Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about adding numbers up to ten.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1aut,
            stringStringMatch,
        'generate',
            genQuestion2aut,
            stringStringMatch,
        'text',
            `Sometimes you'll be given just the numbers.
            <span class="equation-in-text">4 + 7 = ?</span>`,
            stringStringMatch, '11',
    'section:Up-Down Round (Adding Circles)',
        'updown',
            genQuestion3aut,
            stringStringMatch,
            18,
    'section:Number Bonds Intro',
        'text',
            `There's many different ways to think about adding.
            Now we will do addition problems using number bonds.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion4aut,
            stringStringMatch,
        'generate',
            genQuestion5aut,
            stringStringMatch,
        'generate',
            genQuestion6aut,
            stringStringMatch,
    'section:Up-Down Round (Number Bonds)',
        'updown',
            genQuestion7aut,
            stringStringMatch,
            20,
    'section:Countdown Intro',
        'text',
            `In the next sequence of questions, you will be given only the equation.
            However, if it is helpful, draw number bonds for yourself, on a piece of paper.
            When you are ready to begin, press enter.`,
    'section:Coundown Challenge',
        'countdown',
            genQuestion8aut,
            stringStringMatch,
            45, 9,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'generate',
            genQuestion9aut,
            triangleSumsMatch,
        'generate',
            genQuestion9aut,
            triangleSumsMatch,
        'generate',
            genQuestion9aut,
            triangleSumsMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            'Work out this problem on a piece of paper. Then explain what you noticed.',
            'digit_addition.png',
        'endlongtext'
];

function setAUT(save) {
    actionFromSequence(autSequence, save);
}
