
const ladSources = [
    'https://nrich.maths.org/cryptarithms',
    'https://nrich.maths.org/2004',
];

const ladSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Large Addition Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about large addition.
            When you are ready to begin, press enter.`,
    'section:Up-Down Round',
        'updown',
            genQuestion1lad,
            stringStringMatch,
            15,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2lad,
            stringStringMatch,
            15, 8,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'image',
            'What digits should be substituted for A and B? Put your answer in the form A=1, B=2.',
            'addition_swap_1.png',
            200,
            variableListMatch, [['a', 6], ['b', 9]],
        'image',
            'What digit should be substituted for B? Put your answer in the form B=1.',
            'addition_swap_2.png',
            200,
            variableListMatch, [['b', 5]],
        'image',
            'What digits should be substituted for Z? Put your answer in the form Z=1.',
            'addition_swap_3.png',
            200,
            variableListMatch, [['z', 4]],
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `A) Is it possible for all of the digitst 1 to 9 to appear exactly once in the addition equation below?<br>
            B) Using each digit 1 to 9 once, what is the largest sum you can obtain in the addition equation below?`,
            'addition_swap_4.png',
            350,
        'endlongtext'
];

function setLAD(save) {
    actionFromSequence(ladSequence, save);
}
