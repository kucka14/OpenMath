
const moaSources = [

];

const moaSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:More Algebra Addition Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about solving additional kinds of addition equations.
            When you are ready to begin, press enter.`,
        'explain',
            [
                [
                    'Consider the equation x + 5 + 3 = 12.',
                    'First, add together the two numbers on the left side: 5 and 3. The equation has now been simplified to x + 8 = 12.',
                    'Then, subtract 8 from the left side. This will leave x by itself. To keep both sides balanced, we must also subtract 8 from the right side.',
                    'Draw a horizontal line to break up the problem.',
                    'On the left side, we have only x remaining. On the right side, we have 8.',
                    'The solution is 4. We can write that x = 4.'
                ],
                [
                    'x + 5 + 3 =  12',
                    '    x + 8 =  12',
                    '      - 8   - 8',
                    '---------------',
                    '        x =   4',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes the x will be on the other side, but the steps are similar.',
                    'First, add together the two numbers on the right side: 3 and 8. The equation has now been simplified to 17 = x + 11.',
                    'Then, subtract 11 from the right side. This will leave x by itself. To keep both sides balanced, we must also subtract 11 from the left side.',
                    'Draw a horizontal line to break up the problem.',
                    'On the right side, we have only x remaining. On the left side, we have 6.',
                    'The solution is 6. We typically place the variable first and write that x = 6.'
                ],
                [
                    '  17 = x + 3 + 8',
                    '  17 = x + 11   ',
                    '- 11     - 11   ',
                    '----------------',
                    '   6 = x        ',
                    '   x = 6        ',
                ],
            ],
        'text',
            `For the following questions, use a piece of paper to work out the answers, just like in the previous explanations.
            <strong>Make sure to give your answer in the form x = 1.</strong>
            When you are ready to continue, press enter.`,
        'text',
            `Solve for z in the equation below. <strong>Make sure to give your answer in the form z = 1.</strong>
            <span class="equation-in-text">z + 4 + 4 = 15</span>`,
            stringStringMatch, 'z=7',
        'text',
            `Solve for b in the equation below.
            <span class="equation-in-text">16 = b + 3 + 9</span>`,
            stringStringMatch, 'b=4',
        'text',
            `Solve for x in the equation below.
            <span class="equation-in-text">9 + 2 + x = 15</span>`,
            stringStringMatch, 'x=4',
        'text',
            `Solve for w in the equation below.
            <span class="equation-in-text">10 = 1 + 8 + w</span>`,
            stringStringMatch, 'w=1',
        'text',
            `Solve for a in the equation below.
            <span class="equation-in-text">a = 3 + 2 + 7</span>`,
            stringStringMatch, 'a=12',
        'text',
            `Solve for y in the equation below.
            <span class="equation-in-text">5 + 5 + 3 = y</span>`,
            stringStringMatch, 'y=13',
    'section:Up-Down Round',
        'updown',
            genQuestion1moa,
            stringStringMatch,
            20,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2moa,
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
            genQuestion3moa,
            stringStringMatch,
        'generate',
            genQuestion3moa,
            stringStringMatch,
        'generate',
            genQuestion3moa,
            stringStringMatch,
        'generate',
            genQuestion3moa,
            stringStringMatch,
        'generate',
            genQuestion3moa,
            stringStringMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `What number could x be? Explain.<br>
            <span class="equation-in-text">5 + 8 + x = 12</span>`,
        'endlongtext'

]

function setMOA(save) {
    actionFromSequence(moaSequence, save);
}
