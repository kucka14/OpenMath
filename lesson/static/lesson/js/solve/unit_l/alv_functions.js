
function makeSequenceQuestion(variableCount, additionalText='') {
    const jumpNumber = pickRandomNumber(1, 5);
    const numberOfNumbers = pickRandomNumber(5, 12);
    const initNumber = pickRandomNumber(0, 20);
    sequenceList = [];
    for (let i = 0; i < numberOfNumbers; i++) {
        sequenceList.push(initNumber + jumpNumber * i)
    }
    if (pickRandomNumber(0, 1) === 1) {
        sequenceList.reverse();
    }
    const variables = chooseMultipleFromList(variableList2, variableCount, replace=false);
    const replaceIndices = pickUniqueNumbers(0, sequenceList.length - 1, variableCount, 0)[0];
    let questionLine = 'What is the missing number?';
    if (variableCount > 1) {
        questionLine = 'What are the missing numbers?';
    }
    questionLine += additionalText;
    let answerList = [];
    for (let i = 0; i < variables.length; i++) {
        const replaceIndex = replaceIndices[i];
        const variable = variables[i];
        answerList.push([variable, sequenceList[replaceIndex]]);
        sequenceList[replaceIndices[i]] = variable;
    }
    const sequenceString = sequenceList.join(', ');
    const questionText = `${questionLine}<br><span class="equation-in-text">${sequenceString}</span>`;
    return [questionText, answerList];
}

function genQuestion1alv(progressInt) {
    let sequenceCouplet = '';
    if (progressInt < 6) {
        sequenceCouplet = makeSequenceQuestion(1);
    } else if (progressInt < 7) {
        const additionalText = ' Make sure to account for <i>both</i> missing numbers.';
        sequenceCouplet = makeSequenceQuestion(2, additionalText);
    } else if (progressInt < 12) {
        sequenceCouplet = makeSequenceQuestion(2);
    }
    const questionText = sequenceCouplet[0];
    const answerList = sequenceCouplet[1];
    placeTextQuestion([questionText]);
    return logCheckRep(answerList, questionText, genQuestion1alv, progressInt);
}

function genQuestion2alv(progressInt) {
    let sequenceCouplet = '';
    if (progressInt < 4) {
        sequenceCouplet = makeSequenceQuestion(1);
    } else if (progressInt < 5) {
        const additionalText = ' Make sure to account for <i>both</i> missing numbers.';
        sequenceCouplet = makeSequenceQuestion(2, additionalText);
    } else if (progressInt < 9) {
        sequenceCouplet = makeSequenceQuestion(2);
    } else if (progressInt < 10) {
        const additionalText = ' Make sure to account for <i>all three</i> missing numbers.';
        sequenceCouplet = makeSequenceQuestion(3, additionalText);
    } else if (progressInt < 12) {
        sequenceCouplet = makeSequenceQuestion(3);
    }
    const questionText = sequenceCouplet[0];
    const answerList = sequenceCouplet[1];
    placeTextQuestion([questionText]);
    return logCheckRep(answerList, questionText, genQuestion2alv, progressInt);
}
