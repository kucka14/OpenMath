
const variableList1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const variableList2 = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const divSymbol = '&#247;';
const subSymbol = '&#8722;';

// review to make sure all nuances have been addressed
function isNumber(string) {
    if (string === '' || string.includes('+')) {
        return false;
    } else {
        return !isNaN(string);
    }
}

// review to make sure all nuances have been addressed
function isInteger(string) {
    return isNumber(string) && (parseInt(string) === parseFloat(string));
}

function reduce(numerator, denominator){
    var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
    }
    return array;
}

function pickRandomNumber(lowNumber, highNumber) {
    const numberRange = (highNumber - lowNumber) + 1;
    const number = Math.floor(Math.random() * numberRange) + lowNumber;
    return number;
}

function pickUniqueNumbers(lowNumber, highNumber, numberOfNumbers, altNumberOfNumbers) {
    let numberList = [];
    let numberListAlt = [];
    while (numberList.length < numberOfNumbers) {
        const number = pickRandomNumber(lowNumber, highNumber);
        if (numberList.indexOf(number) === -1) {
            numberList.push(number);
        }
    }
    while (numberListAlt.length < altNumberOfNumbers) {
        const number = pickRandomNumber(lowNumber, highNumber);
        if ((numberList.indexOf(number) === -1) && (numberListAlt.indexOf(number) === -1)) {
            numberListAlt.push(number);
        }
    }
    return [numberList, numberListAlt]
}

function makeIterList(list1, list2, reverse=true) {
    let iterList = [];
    for (const part1 of list1) {
        for (const part2 of list2) {
            if (!reverse) {
                const markerA = part1 + ':' + part2;
                const markerB = part2 + ':' + part1;
                if (!iterList.includes(markerA) && !iterList.includes(markerB)) {
                    const marker = chooseFromList([markerA, markerB]);
                    iterList.push(marker);
                }
            } else {
                const marker = part1 + ':' + part2;
                iterList.push(marker);
            }
        }
    }
    return iterList;
}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}
