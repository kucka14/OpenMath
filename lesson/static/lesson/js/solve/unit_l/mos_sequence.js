
const mosSources = [

];

const mosSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:More Algebra Subtraction Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about solving additional kinds of subtraction equations.
            When you are ready to begin, press enter.`,
        'explain',
            [
                [
                    `Consider the equation 8 ${subSymbol} x = 5. We cannot solve this like in previous subtraction equations.`,
                    'First, we add x to both sides. On the left side we are left with 8. On the right side we now have 5 + x.',
                    'Draw a horizontal line to break up the problem.',
                    'Now we have a simple addition equation.',
                    'First, subtract 5 from the right side. This will leave x by itself. To keep both sides balanced, we must also subtract 5 from the left side.',
                    'Draw a horizontal line to break up the problem.',
                    'On the right side, we have only x remaining. On the left side, we have 3.',
                    'The solution is 3. We typically place the variable first and write that x = 3.'
                ],
                [
                    '8 - x =   5   ',
                    '  + x   + x   ',
                    '--------------',
                    '    8 =  5 + x',
                    '  - 5  - 5    ',
                    '--------------',
                    '    3 = x     ',
                    '    x = 3     ',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes the x will be on the other side, but the steps are similar.',
                    'First, we add x to both sides. On the right side we are left with 11. On the left side we now have 6 + x.',
                    'Draw a horizontal line to break up the problem.',
                    'Now we have a simple addition equation.',
                    'First, subtract 6 from the left side. This will leave x by itself. To keep both sides balanced, we must also subtract 6 from the right side.',
                    'Draw a horizontal line to break up the problem.',
                    'On the left side, we have only x remaining. On the right side, we have 5.',
                    'The solution is 5. We can write that x = 5.'
                ],
                [
                    '      6 = 11 - x',
                    '    + x      + x',
                    '----------------',
                    '  6 + x = 11    ',
                    '- 6      - 6    ',
                    '----------------',
                    '      x = 5     ',
                ],
            ],
        'text',
            `For the following questions, use a piece of paper to work out the answers, just like in the previous explanations.
            <strong>Make sure to give your answer in the form x = 1.</strong>
            When you are ready to continue, press enter.`,
        'text',
            `Solve for z in the equation below. <strong>Make sure to give your answer in the form z = 1.</strong>
            <span class="equation-in-text">10 ${subSymbol} z = 4</span>`,
            stringStringMatch, 'z=6',
        'text',
            `Solve for b in the equation below.
            <span class="equation-in-text">16 = 23 ${subSymbol} b</span>`,
            stringStringMatch, 'b=7',
    'section:Up-Down Round',
        'updown',
            genQuestion1mos,
            stringStringMatch,
            20,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2mos,
            stringStringMatch,
            20, 10,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'text',
            `In the following questions, the numbers are larger.
            To solve these questions you will likely need to use the strategies from the previous section.
            Take your time, and use pencil and paper to help you.`,
        'generate',
            genQuestion3mos,
            stringStringMatch,
        'generate',
            genQuestion3mos,
            stringStringMatch,
        'generate',
            genQuestion3mos,
            stringStringMatch,
        'generate',
            genQuestion3mos,
            stringStringMatch,
        'generate',
            genQuestion3mos,
            stringStringMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `What number could x be? Explain.<br>
            <span class="equation-in-text">10 ${subSymbol} x = 10 + x</span>`,
        'endlongtext'
]

function setMOS(save) {
    actionFromSequence(mosSequence, save);
}
