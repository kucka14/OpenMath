
const lmtSources = [
    'https://nrich.maths.org/2004',
];

const lmtSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Large Multiplication Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about large multiplication.
            When you are ready to begin, press enter.`,
    'section:Up-Down Round',
        'updown',
            genQuestion1lmt,
            stringStringMatch,
            15,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2lmt,
            stringStringMatch,
            15, 8,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'image',
            'What digits should be substituted for X and Y? Put your answer in the form X=1, Y=2.',
            'multiplication_swap_1.png',
            200,
            variableListMatch, [['x', 2], ['y', 4]],
        'image',
            'What digit should be substituted for D and T? Put your answer in the form D=1, T=2.',
            'multiplication_swap_2.png',
            200,
            variableListMatch, [['d', 4], ['t', 9]],
        'image',
            'What digits should be substituted for E? Put your answer in the form E=1.',
            'multiplication_swap_3.png',
            200,
            variableListMatch, [['e', 6]],
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            'What is the product for each multiplication equation? Is there only one possible solution? Explain.',
            'multiplication_swap_4.png',
            350,
        'endlongtext'
];

function setLMT(save) {
    actionFromSequence(lmtSequence, save);
}
