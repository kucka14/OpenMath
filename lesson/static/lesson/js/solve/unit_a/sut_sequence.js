
const sutSources = [
    'https://www.openmiddle.com/adding-and-subtracting-within-10/',
];

const sutSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Counting Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about subtracting numbers up to twenty.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1sut,
            autoMatch,
        'generate',
            genQuestion2sut,
            stringStringMatch,
        'generate',
            genQuestion3sut,
            stringStringMatch,
    'section:Up-Down Round (Counting)',
        'updown',
            genQuestion4sut,
            stringStringMatch,
            20,
    'section:Number Bonds Intro',
        'text',
            `There's many different ways to think about subtracting.
            Now we will do subtraction problems using number bonds.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion5sut,
            stringStringMatch,
        'generate',
            genQuestion6sut,
            stringStringMatch,
        'generate',
            genQuestion7sut,
            stringStringMatch,
        'generate',
            genQuestion8sut,
            stringStringMatch,
    'section:Up-Down Round (Number Bonds)',
        'updown',
            genQuestion9sut,
            stringStringMatch,
            20,
    'section:Countdown Intro',
        'text',
            `In the next sequence of questions, you will be given only the equation.
            However, if it is helpful, draw number bonds for yourself, on a piece of paper.
            When you are ready to begin, press enter.`,
    'section:Countdown Challenge',
        'countdown',
            genQuestion10sut,
            stringStringMatch,
            20, 8,
    'section:Deep Dive',
        'generate',
            genQuestion11sut,
            matchBlanksSut,
        'generate',
            genQuestion12sut,
            matchBlanksSut,
        'generate',
            genQuestion13sut,
            matchBlanksSut,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `When you have to solve a subtraction problem, such as 18 - 7, how do you think about it? What is your strategy for solving it?`,
        'endlongtext'
];

function setSUT(save) {
    actionFromSequence(sutSequence, save);
}
