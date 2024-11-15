
const modSources = [

];

const modSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:More Algebra Division Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about solving additional kinds of division equations.
            When you are ready to begin, press enter.`,
        'explain',
            [
                [
                    'Consider the equation \\(\\frac{40}{x}\\) = 5. We cannot solve this like in previous division equations.',
                    'First, we multiply both sides by x. On the left side we are left with 40. On the right side we now have 5 * x.',
                    'Now we have a simple multiplication equation.',
                    'First, divide the right side by 5. This will leave x by itself. To keep both sides balanced, we must also divide the left side by 5.',
                    'Draw a horizontal line to break up the problem.',
                    'On the right side, we have only x remaining. On the left side, we have 8.',
                    'The solution is 8. We typically place the variable first and write that x = 8.'
                ],
                [
                    '    \\(\\frac{40}{x}\\) = 5    ',
                    '\\(\\frac{40}{x}\\) * x = 5 * x',
                    ' 40  =  5 * x',
                    '----    -----',
                    '  5       5  ',
                    '-------------',
                    '  8  = x     ',
                    '  x  = 8     ',
                ],
            ],
            renderMathjaxText,
        'explain',
            [
                [
                    'Sometimes the x will be on the other side, but the steps are similar.',
                    'First, we multiply both sides by x. On the right side we are left with 42. On the right side we now have 7 * x.',
                    'Now we have a simple multiplication equation.',
                    'First, divide the left side by 7. This will leave x by itself. To keep both sides balanced, we must also divide the right side by 7.',
                    'Draw a horizontal line to break up the problem.',
                    'On the left side, we have only x remaining. On the right side, we have 6.',
                    'The solution is 6. We can write that x = 6.'
                ],
                [
                    '    7 = \\(\\frac{42}{x}\\)    ',
                    '7 * x = \\(\\frac{42}{x}\\) * x',
                    '7 * x =  42 ',
                    '-----   ----',
                    '  7       7  ',
                    '-------------',
                    '    x = 6     ',
                ],
            ],
            renderMathjaxText,
        'text',
            `For the following questions, use a piece of paper to work out the answers, just like in the previous explanations.
            <strong>Make sure to give your answer in the form x = 1.</strong>
            When you are ready to continue, press enter.`,
        'text',
            `Solve for z in the equation below. <strong>Make sure to give your answer in the form z = 1.</strong>
            <span class="equation-in-text">\\(\\frac{45}{z}\\) = 5</span>`,
            renderMathjaxText,
            stringStringMatch, 'z=9',
        'text',
            `Solve for b in the equation below.
            <span class="equation-in-text">7 = \\(\\frac{56}{b}\\)</span>`,
            renderMathjaxText,
            stringStringMatch, 'b=8',
    'section:Up-Down Round',
        'updown',
            genQuestion1mod,
            stringStringMatch,
            20,
    'section:Countdown Challenge',
        'countdown',
            genQuestion2mod,
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
            genQuestion3mod,
            stringStringMatch,
        'generate',
            genQuestion3mod,
            stringStringMatch,
        'generate',
            genQuestion3mod,
            stringStringMatch,
        'generate',
            genQuestion3mod,
            stringStringMatch,
        'generate',
            genQuestion3mod,
            stringStringMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `List all the numbers that y could be. If there are none, or too many to list, explain.<br>
            <span class="equation-in-text">\\(\\frac{12}{x}\\) = y</span>`,
            renderMathjaxText,
        'endlongtext'

]

function setMOD(save) {
    actionFromSequence(modSequence, save);
}
