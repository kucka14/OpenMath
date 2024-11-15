
const bdvSources = [
    'https://www.openmiddle.com/multiply-and-divide-within-a-hundred-1/',
];

const bdvSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Number Bonds Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about division of whole numbers.
            When you are ready to begin, press enter.`,
        'text',
            `There's many different ways to think about division.
            One way to solve division equations is using number bonds.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1bdv,
            stringStringMatch,
        'generate',
            genQuestion2bdv,
            stringStringMatch,
        'generate',
            genQuestion3bdv,
            stringStringMatch,
        'generate',
            genQuestion4bdv,
            stringStringMatch,
    'section:Up-Down Round',
        'updown',
            genQuestion5bdv,
            stringStringMatch,
            20,
    'section:Countdown Intro',
        'text',
            `In the next sequence of questions, you will be given only the equation.
            However, if it is helpful, draw number bonds for yourself, on a piece of paper.
            This sequence contains every possible division problem under one hundred: 100 problems total!
            When you are ready to begin, press enter.`,
    'section:Countdown Challenge',
        'countdown',
            genQuestion6bdv,
            stringStringMatch,
            100, 15,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'text',
            `Alison chose a two-digit number, divided it by 2, multiplied the answer by 9, and then reversed the digits.
            Her answer was the same as her original number!
            Can you find the number she chose?`,
            stringStringMatch, '18',
        'text',
            `Alison chose another two-digit number, added 1, divided the answer by 2, and then reversed the digits.
            Again, her answer was the same as her original number!
            Can you find the number she chose this time?`,
            stringStringMatch, '74',
        'text',
            `Charlie chose a two-digit number, subtracted 2, divided the answer by 2, and then reversed the digits.
            His answer was the same as his original number!
            What was Charlie's number?`,
            stringStringMatch, '52',
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `Type out an equation that matches the boxes below.<br>
            You may use the digits 2 through 9, and you may not use a digit twice.`,
            'equation_match.png',
        'endlongtext'
];

function setBDV(save) {
    actionFromSequence(bdvSequence, save);
}
