
function genQuestion1lad(progressInt) {
    let number1 = pickRandomNumber(0, 50);
    let number2 = pickRandomNumber(0, 50);
    if (progressInt < 5) {
    } else if (progressInt < 10) {
        number1 = pickRandomNumber(50, 200);
        number2 = pickRandomNumber(50, 200);
    } else if (progressInt < 15) {
        number1 = pickRandomNumber(200, 1000);
        number2 = pickRandomNumber(200, 1000);
    }
    const questionText = `
        <span class="equation-solve-text">${number1} + ${number2} = ?</span>
    `;
    placeTextQuestion([questionText]);
    return (number1 + number2).toString();
}

function genQuestion2lad(progressInt) {
    let number1 = pickRandomNumber(0, 50);
    let number2 = pickRandomNumber(0, 50);
    if (progressInt < 5) {
    } else if (progressInt < 10) {
        number1 = pickRandomNumber(50, 200);
        number2 = pickRandomNumber(50, 200);
    } else if (progressInt < 15) {
        number1 = pickRandomNumber(200, 1000);
        number2 = pickRandomNumber(200, 1000);
    }
    const questionText = `
        <span class="equation-solve-text">${number1} + ${number2} = ?</span>
    `;
    placeTextQuestion([questionText]);
    return (number1 + number2).toString();
}
