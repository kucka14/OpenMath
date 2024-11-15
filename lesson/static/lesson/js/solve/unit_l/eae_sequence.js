
const eaeSources = [

];

const eaeSequence = [
   // 'section:Warm-Up',
   //     'warmup',
   'section:Expressions/Equations Intro',
       'text',
           // `Now that you're warmed up, let's get started!
          `This lesson is about writing expressions and equations.
          When you are ready to begin, press enter.`,
        'text',
           `An expression is a number sentence without an equal sign.
           Below are examples of expressions.
           <span class="equation-in-text">x + 4</span>
           <span class="equation-in-text">15 + 7 ${subSymbol} 2</span>
           <span class="equation-in-text">x(y ${subSymbol} 8)</span>
           When you are ready to continue, press enter.`,
       'text',
           `Mathematicians often need to turn word sentences into number sentences.
           <i>x plus 4</i> can be turned into the expression x + 4.
           <i>x less than 4</i> can be turned into the expression 4 ${subSymbol} x.
           When you are ready to continue, press enter.`,
       'text',
           `Enter an expression that matches the following sentence.
           <i>x minus 7</i>`,
           stringStringMatch, 'x-7',
   'section:Expressions Intro',
       'text',
           `Before you begin, you need to know a few clue words.
           A <strong>sum</strong> is the result of adding two numbers together.
           A <strong>difference</strong> is the result of subtracting one number from another.
           A <strong>product</strong> is the result of multiplying two numbers together.
           A <strong>quotient</strong> is the result of dividing one number by another.
           When you are ready to continue, press enter.`,
       'text',
           `For the following questions represent number sentences in the order they are given.
           For instance, if the word sentence is <i>x plus 4</i>, then the exact number expression would be x + 4, not 4 + x.
           Whenever you show multiplication, use an asterisk (*).
           Whenever you need to show division, use a forward slash (/).
           When you are ready to continue, press enter.`,
   'section:Up-Down Round (Expressions)',
       'updown',
           genQuestion1eae,
           anyOfStringMatch,
           15,
   'section:Equations Intro',
       'text',
          `An equation is a number sentence <i>with</i> an equal sign.
          Below are examples of expressions.
          <span class="equation-in-text">x + 4 = 15</span>
          <span class="equation-in-text">20 = 15 + 7 ${subSymbol} 2</span>
          <span class="equation-in-text">x(y ${subSymbol} 8) = 16</span>
          When you are ready to continue, press enter.`,
      'text',
          `Mathematicians often need to turn word sentences into number sentences.
          <i>x plus 4 equals 15</i> can be turned into the expression x + 4 = 15.
          <i>Fifteen is equal to x less than 4</i> can be turned into the expression 15 = 4 ${subSymbol} x.
          Don't worry about actually trying to solve the equation.
          When you are ready to continue, press enter.`,
      'text',
          `Type an expression that matches the following sentence.
          <i>45 is equal to the quotient of 15 and x.</i>`,
          anyOfStringMatch, ['45=15/x', '45=x/15'],
      'text',
          `For the following questions represent number sentences in the order they are given.
          For instance, if the word sentence is <i>7 equals x plus 4</i>, then the exact number equation would be 7 = x + 4, not x + 4 = 7 or 7 = 4 + x.
          Whenever you show multiplication, use an asterisk (*).
          Whenever you need to show division, use a forward slash (/).
          When you are ready to continue, press enter.`,
  'section:Up-Down Round (Equations)',
       'updown',
           genQuestion2eae,
           anyOfStringMatch,
           15,
   'section:Countdown Challenge',
       'countdown',
           genQuestion3eae,
           anyOfStringMatch,
           20, 12,
   'section:Deep Dive',
       'text',
           ddIntroText,
        'generate',
            genQuestion4eae,
            anyOfStringMatch,
        'generate',
            genQuestion4eae,
            anyOfStringMatch,
        'generate',
            genQuestion4eae,
            anyOfStringMatch,
        'generate',
            genQuestion4eae,
            anyOfStringMatch,
    'section:Final Question',
        'text',
            fqIntroText,
        'longtext',
            `What equation would represent the following number sentence? Explain.<br>
            <i>x added to itself is equal to y.</i>`,
        'endlongtext'

]

function setEAE(save) {
    actionFromSequence(eaeSequence, save);
}
