
const osdSources = [

];

const osdSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:One-Step Division Explained',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about solving one-step division equations.
            When you are ready to begin, press enter.`,
        'text',
            `In the following problems, your job is to find the value of x. One way to find the value of x is to make the same change to both sides of the equation.
            After the change, you want to have x by itself on one side of the equation. Then you know that the number on the other side will be equal to x.
            When you are ready to continue, press enter.`,
        'explain',
            [
                [
                    `Consider the equation x ${divSymbol} 3 = 5.`,
                    'First, multiply the left side by 3. This will leave x by itself. To keep both sides balanced, we must also multiply the right side by 3.',
                    'On the left side, we have only x remaining. On the right side, we have 15.',
                    'The solution is 15. We can write that x = 15.'
                ],
                [
                    `    x ${divSymbol} 3 = 5     `,
                    `x ${divSymbol} 3 * 3 = 5 * 3 `,
                    '        x = 15    ',
                ],
            ],
        'explain',
            [
                [
                    `Often division will be represented as a fraction, but the steps are similar.`,
                    'First, multiply the left side by 4. This will leave x by itself. To keep both sides balanced, we must also multiply the right side by 4.',
                    'On the left side, we have only x remaining. On the right side, we have 20.',
                    'The solution is 20. We can write that x = 20.'
                ],
                [
                    `    \\(\\frac{x}{4}\\) = 5    `,
                    `\\(\\frac{x}{4}\\) * 4 = 5 * 4`,
                    '    x = 20   ',
                ],
            ],
            renderMathjaxText,
        'explain',
            [
                [
                    'Sometimes the x will be on the other side, but the steps are similar.',
                    'First, multiply the right side by 3. This will leave x by itself. To keep both sides balanced, we must also multiply the left side by 3.',
                    'On the right side, we have only x remaining. On the left side, we have 21.',
                    'The solution is 21. We typically place the variable first and write that x = 21.'
                ],
                [
                    `    7 = \\(\\frac{x}{3}\\)    `,
                    `7 * 3 = \\(\\frac{x}{3}\\) * 3`,
                    '   21 = x    ',
                    '    x = 21   ',
                ],
            ],
            renderMathjaxText,
        'explain',
            [
                [
                    'Sometimes you can solve for the variable directly.',
                    'In this case, you would simply divide 30 by 5 to determine the value of x.',
                    'Make sure to give your answer in the form x = 6.'
                ],
                [
                    `30 ${divSymbol} 5 = x`,
                    '     x = 6',
                ],
            ],
        'explain',
            [
                [
                    "Here's another one where you can solve for the variable directly. Also, the variable is a instead of x.",
                    'In this case, you would simply divide 24 by 6 to determine the value of a.',
                    'Make sure to give your answer in the form a = 4.'
                ],
                [
                    'a = \\(\\frac{24}{6}\\)',
                    'a = 4 ',
                ],
            ],
            renderMathjaxText,
    'section:One-Step Division Intro',
        'text',
            `In the following questions, you will have to solve one-step division equations.
            Use a piece of paper to work out the answers, just like in the previous explanations.
            <strong>Make sure to give your answer in the form x = 1.</strong>
            When you are ready to continue, press enter.`,
        'text',
            `Solve for z in the equation below. <strong>Make sure to give your answer in the form z = 1.</strong>
            <span class="equation-in-text">\\(\\frac{z}{8}\\) = 4</span>`,
            renderMathjaxText,
            stringStringMatch, 'z=32',
        'text',
            `Solve for b in the equation below. <strong>Make sure to give your answer in the form b = 1.</strong>
            <span class="equation-in-text">4 = \\(\\frac{b}{7}\\)</span>`,
            renderMathjaxText,
            stringStringMatch, 'b=28',
        'text',
            `Solve for t in the equation below.
            <span class="equation-in-text">\\(\\frac{35}{7}\\) = t</span>`,
            renderMathjaxText,
            stringStringMatch, 't=5',
        'text',
            `Solve for c in the equation below.
            <span class="equation-in-text">c = \\(\\frac{18}{3}\\)</span>`,
            renderMathjaxText,
            stringStringMatch, 'c=6',
    'section:Up-Down Round',
        'updown',
            genQuestion1osd,
            stringStringMatch,
            20,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2osd,
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
            genQuestion3osd,
            stringStringMatch,
        'generate',
            genQuestion3osd,
            stringStringMatch,
        'generate',
            genQuestion3osd,
            stringStringMatch,
        'generate',
            genQuestion3osd,
            stringStringMatch,
        'generate',
            genQuestion3osd,
            stringStringMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `Which is bigger: x or y, or are they equal? Explain.<br>
            <span class="equation-in-text">\\(\\frac{x}{y}\\) = 2</span>`,
            renderMathjaxText,
        'endlongtext'

]

function setOSD(save) {
    actionFromSequence(osdSequence, save);
}
