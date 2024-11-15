
const annSources = [
    'https://mrsthienel.wordpress.com/2016/02/10/positive-negative-or-neither/',
];

const annSequence = [
    // 'section:Warm-Up',
    //     'warmup',
    'section:Negative Numbers Intro',
        'text',
            // `Now that you're warmed up, let's get started!
            `This lesson is about what happens when a negative number is subtracted from a positive number.
            When you are ready to begin, press enter.`,
        'generate',
            genQuestion1ann,
        'generate',
            genQuestion2ann,
        'generate',
            genQuestion3ann,
        'generate',
            genQuestion4ann,
            anyOfStringMatch,
        'generate',
            genQuestion5ann,
            anyOfStringMatch,
        'generate',
            genQuestion6ann,
            anyOfStringMatch,
    'section:Up-Down Round',
        'updown',
            genQuestion7ann,
            anyOfStringMatch,
            20,
    'section:Countdown Intro',
        'text',
            `In the next sequence of questions, you will be given only the equation.
            However, if it is helpful, draw number bonds for yourself, on a piece of paper.
            When you are ready to begin, press enter.`,
    'section:Countdown Challenge',
        'countdown',
            genQuestion8ann,
            stringStringMatch,
            20, 10,
    'section:Deep Dive',
        'text',
            ddIntroText,
        'image',
            `Look at the number line below. Would the following expression be positive or negative?<br>
            <span class="equation-in-text">a + 1</span>`,
            'number_line_compare.png',
            anyOfStringMatch, ['negative', 'neg', 'neg.', '-'],
        'image',
            `Look at the number line below. Would the following expression be positive or negative or neither?<br>
            <span class="equation-in-text">b ${subSymbol} b</span>`,
            'number_line_compare.png',
            anyOfStringMatch, ['neither', '0', 'zero'],
        'image',
            `Look at the number line below. Would the following expression be positive or negative?<br>
            <span class="equation-in-text">a + a</span>`,
            'number_line_compare.png',
            anyOfStringMatch, ['negative', 'neg', 'neg.', '-'],
        'image',
            `Look at the number line below. Would the following expression be positive or negative?<br>
            <span class="equation-in-text">a ${subSymbol} b</span>`,
            'number_line_compare.png',
            anyOfStringMatch, ['negative', 'neg', 'neg.', '-'],
        'image',
            `Look at the number line below. Would the following expression be positive or negative?<br>
            <span class="equation-in-text">b ${subSymbol} a</span>`,
            'number_line_compare.png',
            anyOfStringMatch, ['positive', 'pos', 'pos.', '+'],
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `Look at the number line below. Would the following expression be positive or negative? Make your best guess and explain your thinking.<br>
            <span class="equation-in-text">-a</span>`,
            'number_line_compare.png',
        'endlongtext'
];

function setANN(save) {
    actionFromSequence(annSequence, save);
}
