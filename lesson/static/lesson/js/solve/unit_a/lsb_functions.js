
function genQuestion1lsb(progressInt) {
    let number1 = pickRandomNumber(0, 50);
    if (progressInt < 5) {
    } else if (progressInt < 10) {
        number1 = pickRandomNumber(50, 200);
    } else if (progressInt < 15) {
        number1 = pickRandomNumber(200, 1000);
    }
    const number2 = pickRandomNumber(0, number1);
    const questionText = `
        <span class="equation-solve-text">${number1} ${subSymbol} ${number2} = ?</span>
    `;
    placeTextQuestion([questionText]);
    return (number1 - number2).toString();
}

function genQuestion2lsb(progressInt) {
    let number1 = pickRandomNumber(0, 50);
    if (progressInt < 5) {
    } else if (progressInt < 10) {
        number1 = pickRandomNumber(50, 200);
    } else if (progressInt < 15) {
        number1 = pickRandomNumber(200, 1000);
    }
    const number2 = pickRandomNumber(0, number1);
    const questionText = `
        <span class="equation-solve-text">${number1} ${subSymbol} ${number2} = ?</span>
    `;
    placeTextQuestion([questionText]);
    return (number1 - number2).toString();
}
