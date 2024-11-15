
function genQuestion1bct(progressInt) {
    let countNumber = '';
    let columns = '';
    let rows = '';
    if (progressInt < 5) {
        columns = 3;
        rows = 2;
        countNumber = pickRandomNumber(0,6);
    } else if (progressInt < 10) {
        columns = 6;
        rows = 4;
        if (progressInt < 6) {
            countNumber = pickRandomNumber(0, 5);
        } else if (progressInt < 8) {
            countNumber = pickRandomNumber(6, 10);
        } else if (progressInt < 10) {
            countNumber = pickRandomNumber(11, 24);
        }
    } else if (progressInt < 15) {
        columns = 9;
        rows = 6;
        if (progressInt < 12) {
            countNumber = pickRandomNumber(6, 10);
        } else if (progressInt < 14) {
            countNumber = pickRandomNumber(11, 24);
        } else if (progressInt < 15) {
            countNumber = pickRandomNumber(25, 54);
        }
    } else if (progressInt < 20) {
        columns = 12;
        rows = 8;
        if (progressInt < 19) {
            countNumber = pickRandomNumber(11, 24);
        } else if (progressInt < 20) {
            countNumber = pickRandomNumber(25, 54);
        }
    }
    makeCountGrid(columns, rows, countNumber);
    const questionText = 'How many circles are there?';
    addCanvasText(questionText);
    return countNumber.toString();
}

function genQuestion2bct(progressInt) {
    countNumber = '';
    columns = '';
    rows = '';
    if (progressInt < 2) {
        columns = 6;
        rows = 4;
        countNumber = pickRandomNumber(0, 10);
    } else if (progressInt < 5) {
        columns = 9;
        rows = 6;
        countNumber = pickRandomNumber(0, 22);
    } else if (progressInt < 8) {
        columns = 12;
        rows = 8;
        countNumber = pickRandomNumber(0, 34);
    }
    addCountColorQuestion(columns, rows, [countNumber]);
    return countNumber.toString();
}
