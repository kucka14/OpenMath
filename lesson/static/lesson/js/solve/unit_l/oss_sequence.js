
const ossSources = [

];

const ossSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:One-Step Subtraction Explained',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about solving one-step subtraction equations.
            When you are ready to begin, press enter.`,
        'text',
            `In the following problems, your job is to find the value of x. One way to find the value of x is to make the same change to both sides of the equation.
            After the change, you want to have x by itself on one side of the equation. Then you know that the number on the other side will be equal to x.
            When you are ready to continue, press enter.`,
        'explain',
            [
                [
                    `Consider the equation x ${subSymbol} 3 = 5.`,
                    'First, add 3 to the left side. This will leave x by itself. To keep both sides balanced, we must also add 3 to the right side.',
                    'Draw a horizontal line to break up the problem.',
                    'On the left side, we have only x remaining. On the right side, we have 8.',
                    'The solution is 8. We can write that x = 8.'
                ],
                [
                    'x - 3 =  5',
                    '  + 3  + 3',
                    '----------',
                    '    x =  8',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes the x will be on the other side, but the steps are similar.',
                    'First, add 3 to the right side. This will leave x by itself. To keep both sides balanced, we must also add 3 to the left side.',
                    'Draw a horizontal line to break up the problem.',
                    'On the right side, we have only x remaining. On the left side, we have 11.',
                    'The solution is 11. We typically place the variable first and write that x = 11.'
                ],
                [
                    '  7 = x - 3',
                    '+ 3     + 3',
                    '-----------',
                    ' 11 = x    ',
                    '  x = 11   ',
                ],
            ],
        'explain',
            [
                [
                    'Sometimes you can solve for the variable directly.',
                    'In this case, you would simply subtract 5 from 14 to determine the value of x.',
                    'Make sure to give your answer in the form x = 9.'
                ],
                [
                    '14 - 5 = x',
                    '     x = 9',
                ],
            ],
        'explain',
            [
                [
                    "Here's another one where you can solve for the variable directly. Also, the variable is a instead of x.",
                    'In this case, you would simply subtract 4 from 7 to determine the value of a.',
                    'Make sure to give your answer in the form a = 3.'
                ],
                [
                    'a = 7 - 4',
                    'a = 3    ',
                ],
            ],
    'section:One-Step Subtraction Intro',
        'text',
            `In the following questions, you will have to solve one-step subtraction equations.
            Use a piece of paper to work out the answers, just like in the previous explanations.
            <strong>Make sure to give your answer in the form x = 1.</strong>
            When you are ready to continue, press enter.`,
        'text',
            `Solve for z in the equation below. <strong>Make sure to give your answer in the form z = 1.</strong>
            <span class="equation-in-text">z ${subSymbol} 5 = 10</span>`,
            stringStringMatch, 'z=15',
        'text',
            `Solve for b in the equation below. <strong>Make sure to give your answer in the form b = 1.</strong>
            <span class="equation-in-text">5 = b ${subSymbol} 6</span>`,
            stringStringMatch, 'b=11',
        'text',
            `Solve for t in the equation below.
            <span class="equation-in-text">8 ${subSymbol} 2 = t</span>`,
            stringStringMatch, 't=6',
        'text',
            `Solve for c in the equation below.
            <span class="equation-in-text">c = 21 ${subSymbol} 9</span>`,
            stringStringMatch, 'c=12',
    'section:Up-Down Round',
        'updown',
            genQuestion1oss,
            stringStringMatch,
            20,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2oss,
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
            genQuestion3oss,
            stringStringMatch,
        'generate',
            genQuestion3oss,
            stringStringMatch,
        'generate',
            genQuestion3oss,
            stringStringMatch,
        'generate',
            genQuestion3oss,
            stringStringMatch,
        'generate',
            genQuestion3oss,
            stringStringMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `What number could x be? Explain.<br>
            <span class="equation-in-text">x ${subSymbol} x = 0</span>`,
        'endlongtext'

]

function setOSS(save) {
    actionFromSequence(ossSequence, save);
}
