
const osaSources = [

];

const osaSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:One-Step Addition Explained',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about solving one-step addition equations.
            When you are ready to begin, press enter.`,
        'text',
            `In the following problems, your job is to find the value of x. One way to find the value of x is to make the same change to both sides of the equation.
            After the change, you want to have x by itself on one side of the equation. Then you know that the number on the other side will be equal to x.
            When you are ready to continue, press enter.`,
        'explain',
            [
                [
                    'Consider the equation x + 3 = 5.',
                    'First, subtract 3 from the left side. This will leave x by itself. To keep both sides balanced, we must also subtract 3 from the right side.',
                    'Draw a horizontal line to break up the problem.',
                    'On the left side, we have only x remaining. On the right side, we have 2.',
                    'The solution is 2. We can write that x = 2.'
                ],
                [
                    'x + 3 =  5',
                    '  - 3  - 3',
                    '----------',
                    '    x =  2',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes the x will be on the other side, but the steps are similar.',
                    'First, subtract 3 from the right side. This will leave x by itself. To keep both sides balanced, we must also subtract 3 from the left side.',
                    'Draw a horizontal line to break up the problem.',
                    'On the right side, we have only x remaining. On the left side, we have 4.',
                    'The solution is 4. We typically place the variable first and write that x = 4.'
                ],
                [
                    '  7 = x + 3',
                    '- 3     - 3',
                    '-----------',
                    '  4 = x    ',
                    '  x = 4    ',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes the equation will look like this.',
                    'First, subtract 6 from the left side. This will leave x by itself. To keep both sides balanced, we must also subtract 6 from the right side.',
                    'Draw a horizontal line to break up the problem.',
                    'On the left side, we have only x remaining. On the right side, we have 4.',
                    'The solution is 4. We can write that x = 4.'
                ],
                [
                    '  6 + x = 10',
                    '- 6      - 6',
                    '------------',
                    '      x =  4',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes the equation will look like this, and the variable may not be x.',
                    'First, subtract 3 from the right side. This will leave y by itself. To keep both sides balanced, we must also subtract 3 from the left side.',
                    'Draw a horizontal line to break up the problem.',
                    'On the right side, we have only y remaining. On the left side, we have 5.',
                    'The solution is 5. We typically place the variable first and write that y = 5.'
                ],
                [
                    '  8 =  3 + y',
                    '- 3  - 3    ',
                    '------------',
                    '  5 =  y    ',
                    '  y =  5    ',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes you can solve for the variable directly.',
                    'In this case, you would simply add 3 and 5 to determine the value of x.',
                    'Make sure to give your answer in the form x = 8.'
                ],
                [
                    '3 + 5 = x',
                    '    x = 8',
                ],
            ],
        'explain',
            [
                [
                    "Here's another one where you can solve for the variable directly.",
                    'In this case, you would simply add 4 and 7 to determine the value of a.',
                    'Make sure to give your answer in the form a = 11.'
                ],
                [
                    'a = 4 + 7',
                    'a = 11   ',
                ],
            ],
    'section:One-Step Addition Intro',
        'text',
            `In the following questions, you will have to solve one-step addition equations.
            Use a piece of paper to work out the answers, just like in the previous explanations.
            <strong>Make sure to give your answer in the form x = 1.</strong>
            When you are ready to continue, press enter.`,
        'text',
            `Solve for z in the equation below. <strong>Make sure to give your answer in the form z = 1.</strong>
            <span class="equation-in-text">z + 5 = 9</span>`,
            stringStringMatch, 'z=4',
        'text',
            `Solve for b in the equation below. <strong>Make sure to give your answer in the form b = 1.</strong>
            <span class="equation-in-text">8 = b + 3</span>`,
            stringStringMatch, 'b=5',
        'text',
            `Solve for x in the equation below.
            <span class="equation-in-text">9 + x = 15</span>`,
            stringStringMatch, 'x=6',
        'text',
            `Solve for w in the equation below.
            <span class="equation-in-text">10 = 1 + w</span>`,
            stringStringMatch, 'w=9',
        'text',
            `Solve for t in the equation below.
            <span class="equation-in-text">8 + 8 = t</span>`,
            stringStringMatch, 't=16',
        'text',
            `Solve for c in the equation below.
            <span class="equation-in-text">c = 9 + 2</span>`,
            stringStringMatch, 'c=11',
    'section:Up-Down Round',
        'updown',
            genQuestion1osa,
            stringStringMatch,
            20,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2osa,
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
            genQuestion3osa,
            stringStringMatch,
        'generate',
            genQuestion3osa,
            stringStringMatch,
        'generate',
            genQuestion3osa,
            stringStringMatch,
        'generate',
            genQuestion3osa,
            stringStringMatch,
        'generate',
            genQuestion3osa,
            stringStringMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `Does the following equation make sense? Explain.<br>
            <span class="equation-in-text">x + 5 = x + 4</span>`,
        'endlongtext'



]

function setOSA(save) {
    actionFromSequence(osaSequence, save);
}
