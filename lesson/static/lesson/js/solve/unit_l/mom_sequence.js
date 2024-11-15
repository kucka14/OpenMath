
const momSources = [

];

const momSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:More Algebra Multiplication Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about solving additional kinds of multiplication equations.
            When you are ready to begin, press enter.`,
        'explain',
            [
                [
                    'Often a multiplication problem will look like this. This is the same as 6 * x = 30.',
                    'First, draw division lines to prepare for the next step.',
                    'Then, divide the left side by 6. This will leave x by itself. To keep both sides balanced, we must also divide the right side by 6.',
                    'Draw a horizontal line to break up the problem.',
                    'On the left side, we have only x remaining. On the right side, we have 5.',
                    'The solution is 5. We can write that x = 5.'
                ],
                [
                    '  6x =  30 ',
                    '-----  ----',
                    '  6      6 ',
                    '-----------',
                    '   x =  5  ',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes the equation will look like this, and the variable may not be x.',
                    'First, draw division lines to prepare for the next step.',
                    'Then, divide the right side by 3. This will leave y by itself. To keep both sides balanced, we must also divide the left side by 3.',
                    'Draw a horizontal line to break up the problem.',
                    'On the right side, we have only y remaining. On the left side, we have 7.',
                    'The solution is 7. We typically place the variable first and write that y = 7.'
                ],
                [
                    ' 21  =  3y ',
                    '----   ----',
                    '  3     3  ',
                    '-----------',
                    '  7  = y   ',
                    '  y  = 7   ',
                ],
            ],
        'text',
            `For the following questions, use a piece of paper to work out the answers, just like in the previous explanations.
            <strong>Make sure to give your answer in the form x = 1.</strong>
            When you are ready to continue, press enter.`,
        'text',
            `Solve for z in the equation below. <strong>Make sure to give your answer in the form z = 1.</strong>
            <span class="equation-in-text">9z = 27</span>`,
            stringStringMatch, 'z=3',
        'text',
            `Solve for w in the equation below.
            <span class="equation-in-text">63 = 9w</span>`,
            stringStringMatch, 'w=7',
    'section:Up-Down Round',
        'updown',
            genQuestion1mom,
            stringStringMatch,
            20,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2mom,
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
            genQuestion3mom,
            stringStringMatch,
        'generate',
            genQuestion3mom,
            stringStringMatch,
        'generate',
            genQuestion3mom,
            stringStringMatch,
        'generate',
            genQuestion3mom,
            stringStringMatch,
        'generate',
            genQuestion3mom,
            stringStringMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `What is x in the equation below. If necessary, give an approximate answer. Explain.<br>
            <span class="equation-in-text">10x = 25</span>`,
        'endlongtext'

]

function setMOM(save) {
    actionFromSequence(momSequence, save);
}
