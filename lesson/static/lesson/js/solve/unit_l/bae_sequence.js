
const baeSources = [

];

const baeSequence = [
   // 'section:Warm-Up',
   //     'warmup',
   'section:Algebra Intro',
       'text',
           // `Now that you're warmed up, let's get started!
          `This lesson is about getting started with solving algebraic equations.
          When you are ready to begin, press enter.`,
      'text',
           `What is the missing number in the equation below.
           <span class="equation-in-text">5 + 3 = ?</span>`,
           stringStringMatch, '8',
       'text',
            `What is the missing number in the equation below.
            <span class="equation-in-text">? = 8</span>`,
            stringStringMatch, '8',
        'text',
           `We saw before that sometimes variable letters work better than question marks.
           What is the missing number in the equation below. Give your answer in the form x = 1.
           <span class="equation-in-text">5 + 3 = x</span>`,
           stringStringMatch, 'x=8',
       'text',
          `What about this one? Give your answer in the form y = 1.
          <span class="equation-in-text">14 = y</span>`,
          stringStringMatch, 'y=14',
      'text',
         `What about this one?
         <span class="equation-in-text">5 + z = 8</span>`,
         stringStringMatch, 'z=3',
     'text',
        `What about this one?
        <span class="equation-in-text">8 = a + 3</span>`,
        stringStringMatch, 'a=5',
  'section:Up-Down Round',
      'updown',
           genQuestion1bae,
           stringStringMatch,
           15,
   'section:Countdown Challenge',
       'countdown',
           genQuestion1bae,
           stringStringMatch,
           15, 7,
   'section:Deep Dive',
       'text',
           ddIntroText,
        'generate',
            genQuestion2bae,
            baeEquationMatch,
        'generate',
            genQuestion2bae,
            baeEquationMatch,
        'generate',
            genQuestion2bae,
            baeEquationMatch,
        'generate',
            genQuestion2bae,
            baeEquationMatch,
        'generate',
            genQuestion2bae,
            baeEquationMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `Is there a solution to the equation below? Explain.<br>
            <span class="equation-in-text">5 + x = x</span>`,
        'endlongtext'
];

function setBAE(save) {
    actionFromSequence(baeSequence, save);
}
