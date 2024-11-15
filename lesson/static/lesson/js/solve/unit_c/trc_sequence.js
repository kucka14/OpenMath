
const trcSources = [

];

const trcSequence = [
    'section:Triangle Sums (Level 1)',
        'updown',
            genQuestion1trc,
            triangleSumsMatch,
            5,
    'section:Triangle Sums (Level 2)',
        'updown',
            genQuestion2trc,
            triangleSumsMatch,
            5,
    'section:Triangle Sums (Level 3)',
        'updown',
            genQuestion3trc,
            triangleSumsMatch,
            5,
    'section:Triangle Sums (Level 4)',
        'updown',
            genQuestion4trc,
            triangleSumsMatch,
            5,
    'section:Final Question',
        'longtext',
            `Congratulations on completing the triangle sums challenge!<br>
            Were these challenges easy, difficult, or somewhere in the middle? Explain.`,
        'endlongtext'

]

function setTRC(save) {
    actionFromSequence(trcSequence, save);
}
