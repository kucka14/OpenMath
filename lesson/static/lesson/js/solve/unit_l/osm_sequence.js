
const osmSources = [

];

const osmSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:One-Step Multiplication Explained',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about solving one-step multiplication equations.
            When you are ready to begin, press enter.`,
        'text',
            `In the following problems, your job is to find the value of x. One way to find the value of x is to make the same change to both sides of the equation.
            After the change, you want to have x by itself on one side of the equation. Then you know that the number on the other side will be equal to x.
            When you are ready to continue, press enter.`,
        'explain',
            [
                [
                    'Consider the equation x * 3 = 15.',
                    'First, draw division lines to prepare for the next step.',
                    'Next, divide the left side by 3. This will leave x by itself. To keep both sides balanced, we must also divide the right side by 3.',
                    'Draw a horizontal line to break up the problem.',
                    'On the left side, we have only x remaining. On the right side, we have 5.',
                    'The solution is 5. We can write that x = 5.'
                ],
                [
                    'x * 3 =  15 ',
                    '-----   ----',
                    '  3       3 ',
                    '------------',
                    '    x =   5 ',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes the x will be on the other side, but the steps are similar.',
                    'First, draw division lines to prepare for the next step.',
                    'Next, divide the right side by 4. This will leave x by itself. To keep both sides balanced, we must also divide the letf side by 4.',
                    'Draw a horizontal line to break up the problem.',
                    'On the right side, we have only x remaining. On the left side, we have 3.',
                    'The solution is 3. We typically place the variable first and write that x = 3.'
                ],
                [
                    ' 12  = x * 4',
                    '----   -----',
                    '  4      4  ',
                    '------------',
                    '  3  = x    ',
                    '  x  = 3    ',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes the equation will look like this.',
                    'First, draw division lines to prepare for the next step.',
                    'Then, divide the left side by 6. This will leave x by itself. To keep both sides balanced, we must also divide the right side by 6.',
                    'Draw a horizontal line to break up the problem.',
                    'On the left side, we have only x remaining. On the right side, we have 5.',
                    'The solution is 5. We can write that x = 5.'
                ],
                [
                    '6 * x =  30 ',
                    '-----   ----',
                    '  6       6 ',
                    '------------',
                    '    x =   5 ',
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
                    ' 21 = 3 * y',
                    '---   -----',
                    ' 3      3  ',
                    '-----------',
                    ' 7  = y    ',
                    ' y  = 7    ',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes you can solve for the variable directly.',
                    'In this case, you would simply multiply 3 and 5 to determine the value of x.',
                    'Make sure to give your answer in the form x = 15.'
                ],
                [
                    '3 * 5 = x ',
                    '    x = 15',
                ],
            ],
        'explain',
            [
                [
                    "Here's another one where you can solve for the variable directly.",
                    'In this case, you would simply multiply 4 and 7 to determine the value of a.',
                    'Make sure to give your answer in the form a = 28.'
                ],
                [
                    'a = 4 * 7',
                    'a = 28   ',
                ],
            ],
    'section:One-Step Multiplication Intro',
        'text',
            `In the following questions, you will have to solve one-step multiplication equations.
            Use a piece of paper to work out the answers, just like in the previous explanations.
            <strong>Make sure to give your answer in the form x = 1.</strong>
            When you are ready to continue, press enter.`,
        'text',
            `Solve for z in the equation below. <strong>Make sure to give your answer in the form z = 1.</strong>
            <span class="equation-in-text">z * 5 = 45</span>`,
            stringStringMatch, 'z=9',
        'text',
            `Solve for b in the equation below. <strong>Make sure to give your answer in the form b = 1.</strong>
            <span class="equation-in-text">18 = b * 3</span>`,
            stringStringMatch, 'b=6',
        'text',
            `Solve for x in the equation below.
            <span class="equation-in-text">9 * x = 27</span>`,
            stringStringMatch, 'x=3',
        'text',
            `Solve for w in the equation below.
            <span class="equation-in-text">63 = 9 * w</span>`,
            stringStringMatch, 'w=7',
        'text',
            `Solve for t in the equation below.
            <span class="equation-in-text">8 * 8 = t</span>`,
            stringStringMatch, 't=64',
        'text',
            `Solve for c in the equation below.
            <span class="equation-in-text">c = 9 * 2</span>`,
            stringStringMatch, 'c=18',
    'section:Up-Down Round',
        'updown',
            genQuestion1osm,
            stringStringMatch,
            20,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2osm,
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
            genQuestion3osm,
            stringStringMatch,
        'generate',
            genQuestion3osm,
            stringStringMatch,
        'generate',
            genQuestion3osm,
            stringStringMatch,
        'generate',
            genQuestion3osm,
            stringStringMatch,
        'generate',
            genQuestion3osm,
            stringStringMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `What is x? How do you know?<br>
            <span class="equation-in-text">9432785 * x = 9432785</span>`,
        'endlongtext'
]

function setOSM(save) {
    actionFromSequence(osmSequence, save);
}
