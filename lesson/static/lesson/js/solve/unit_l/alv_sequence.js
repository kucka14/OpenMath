
const alvSources = [

];

const alvSequence = [
    'section:Welcome!',
        'unitwarmup',
    // 'section:Warm-Up',
    //     'warmup',
    'section:Variables Intro',
        'text',
            `Now that you're warmed up, let's get started!
            This lesson is about using variables.
            When you are ready to begin, press enter.`,
        'text',
            `What is the missing number?
            <span class="equation-in-text">1, 2, 3, ?, 5</span>`,
            anyOfStringMatch, ['4', '?=4', '4=?'],
        'text',
            `What is the missing number?
            <span class="equation-in-text">1, 3, 5, 7, ?, 11, 13</span>`,
            anyOfStringMatch, ['9', '?=9', '9=?'],
        'text',
            `What is the missing number?
            <span class="equation-in-text">10, 8, ?, 4, 2</span>`,
            anyOfStringMatch, ['6', '?=6', '6=?'],
        'text',
            `What are the missing numbers? Separate your answers with a comma.
            <span class="equation-in-text">5, 8, ?, 14, 17, 14, 11, ?, 5</span>`,
            anyOfStringMatch, ['11,8'],
        'text',
            `Using question marks can be confusing, especially when there are multiple unknown numbers.
            This time, letters have been used: x and y.
            What are the missing numbers? Give your answer in the form x = 1, y = 2. Because we're using letters, you could also give your answer in the form y = 2, x = 1.
            <span class="equation-in-text">5, 8, x, 14, 17, 14, 11, y, 5</span>`,
            anyOfStringMatch, ['x=11,y=8', 'y=8,x=11'],
        'text',
            `What is the missing number? Give your answer in the form x = 1.
            <span class="equation-in-text">1, 2, 3, x, 5</span>`,
            stringStringMatch, 'x=4',
        'text',
            `What is the missing number? Give your answer in the form y = 1.
            <span class="equation-in-text">1, 3, 5, 7, y, 11, 13</span>`,
            stringStringMatch, 'y=9',
        'text',
            `What is the missing number? Give your answer in the form z = 1.
            <span class="equation-in-text">10, 8, z, 4, 2</span>`,
            stringStringMatch, 'z=6',
        'text',
            `What are the missing numbers? Give your answer in the form a = 1, b = 2 (or b = 2, a = 1).
            <span class="equation-in-text">1, 4, 7, b, 13, 16, 19, a, 25</span>`,
            anyOfStringMatch, ['b=10,a=22', 'a=22,b=10'],
    'section:Up-Down Round',
        'updown',
            genQuestion1alv,
            variableListMatch,
            12,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2alv,
            variableListMatch,
            12, 8,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'text',
            `Sometimes a variable will appear more than once.
            What is the missing number? Give your answer in the form x = 1.
            <span class="equation-in-text">1, 3, 5, x, 9, 11, 13, 11, 9, x, 5, 3, 1</span>`,
            stringStringMatch, 'x=7',
        'text',
            `Sometimes multiple variables will appear more than once.
            What are the missing numbers?<br>Give your answer in the form x = 1, y = 2 (or y = 2, x = 1).
            <span class="equation-in-text">5, 10, y, x, 25, 30, 25, 20, x, y, 10, 5</span>`,
            anyOfStringMatch, ['x=20,y=15', 'y=15,x=20'],
        'text',
            `What value is x in the equation below? Give your answer in the form x = 1.
            <span class="equation-in-text">x + x = 10</span>`,
            stringStringMatch, 'x=5',
        'text',
            `What are x and y in the equations below?<br>Give your answer in the form x = 1, y = 2 (or y = 2, x = 1).
            <span class="equation-in-text">x + x = 8</span>
            <span class="equation-in-text">x + y = 7</span>`,
            anyOfStringMatch, ['x=4,y=3', 'y=3,x=4'],
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `Is it possible to figure out what x and y are in the equation below. Explain.<br>
            <span class="equation-in-text">x + y = 10</span>`,
        'endlongtext'
];

function setALV(save) {
    actionFromSequence(alvSequence, save);
}
