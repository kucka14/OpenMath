
const lessonDictArithmetic = {
    'BCT': {
        'index': 0,
        'full_name': 'Basic Counting',
        'button_name': 'A1',
        'x-position': 0,
        'y-position': 2,
        'prereqs': [],
    },
    'NLN': {
        'index': 1,
        'full_name': 'Number Lines',
        'button_name': 'A2',
        'x-position': 1,
        'y-position': 4,
        'prereqs': ['BCT'],
    },
    'AUF': {
        'index': 2,
        'full_name': 'Adding Under Five',
        'button_name': 'A3',
        'x-position': 1,
        'y-position': 3,
        'prereqs': ['BCT'],
    },
    'AUT': {
        'index': 3,
        'full_name': 'Adding Under Ten',
        'button_name': 'A4',
        'x-position': 2,
        'y-position': 3,
        'prereqs': ['AUF'],
    },
    'SUT': {
        'index': 4,
        'full_name': 'Subtraction Under Twenty',
        'button_name': 'A5',
        'x-position': 3,
        'y-position': 3,
        'prereqs': ['AUT'],
    },
    'BNN': {
        'index': 5,
        'full_name': 'Basic Negative Numbers',
        'button_name': 'A6',
        'x-position': 4,
        'y-position': 3,
        'prereqs': ['SUT'],
    },
    'ANN': {
        'index': 6,
        'full_name': 'Advanced Negative Numbers',
        'button_name': 'A7',
        'x-position': 5,
        'y-position': 3,
        'prereqs': ['BNN'],
    },
    'CBM': {
        'index': 7,
        'full_name': 'Counting By Multiplying',
        'button_name': 'A8',
        'x-position': 1,
        'y-position': 1,
        'prereqs': ['BCT'],
    },
    'MUF': {
        'index': 8,
        'full_name': 'Multiplying Under Five',
        'button_name': 'A9',
        'x-position': 2,
        'y-position': 1,
        'prereqs': ['CBM'],
    },
    'MUT': {
        'index': 9,
        'full_name': 'Multiplying Under Ten',
        'button_name': 'A10',
        'x-position': 3,
        'y-position': 1,
        'prereqs': ['MUF'],
    },
    'BDV': {
        'index': 10,
        'full_name': 'Basic Division',
        'button_name': 'A11',
        'x-position': 4,
        'y-position': 1,
        'prereqs': ['MUT'],
    },
    'BFR': {
        'index': 11,
        'full_name': 'Basic Fractions',
        'button_name': 'A12',
        'x-position': 5,
        'y-position': 1,
        'prereqs': ['BDV'],
    },
    'FBR': {
        'index': 12,
        'full_name': 'Fraction Bars',
        'button_name': 'A13',
        'x-position': 6,
        'y-position': 2,
        'prereqs': ['ANN', 'BFR'],
    },
    'AFR': {
        'index': 13,
        'full_name': 'Advanced Fractions',
        'button_name': 'A14',
        'x-position': 7,
        'y-position': 2,
        'prereqs': ['FBR'],
    },
    'LAD': {
        'index': 14,
        'full_name': 'Large Addition',
        'button_name': 'A15',
        'x-position': 3,
        'y-position': 4,
        'prereqs': ['AUT'],
    },
    'LSB': {
        'index': 15,
        'full_name': 'Large Subtraction',
        'button_name': 'A16',
        'x-position': 4,
        'y-position': 4,
        'prereqs': ['SUT'],
    },
    'LMT': {
        'index': 16,
        'full_name': 'Large Multiplication',
        'button_name': 'A17',
        'x-position': 4,
        'y-position': 0,
        'prereqs': ['MUT'],
    },
}

const lessonDictAlgebra = {
    'ALV': {
        'index': 0,
        'full_name': 'Algebraic Variables',
        'button_name': 'L1',
        'x-position': 0,
        'y-position': 3,
        'prereqs': [],
    },
    'UEQ': {
        'index': 1,
        'full_name': 'Understanding Equivalence',
        'button_name': 'L2',
        'x-position': 0,
        'y-position': 1,
        'prereqs': [],
    },
    'EAE': {
        'index': 2,
        'full_name': 'Expressions and Equations',
        'button_name': 'L3',
        'x-position': 1,
        'y-position': 2,
        'prereqs': ['ALV', 'UEQ'],
    },
    'BAL': {
        'index': 3,
        'full_name': 'Balancing Algebraic Equations',
        'button_name': 'L4',
        'x-position': 2,
        'y-position': 2,
        'prereqs': ['EAE'],
    },
    'BAE': {
        'index': 4,
        'full_name': 'Basic Algebraic Equations',
        'button_name': 'L5',
        'x-position': 3,
        'y-position': 2,
        'prereqs': ['BAL'],
    },
    'OSA': {
        'index': 5,
        'full_name': 'One-Step Addition',
        'button_name': 'L6',
        'x-position': 4,
        'y-position': 4,
        'prereqs': ['BAE'],
    },
    'OSS': {
        'index': 6,
        'full_name': 'One-Step Subtraction',
        'button_name': 'L7',
        'x-position': 4,
        'y-position': 3,
        'prereqs': ['BAE'],
    },
    'OSM': {
        'index': 7,
        'full_name': 'One-Step Multiplication',
        'button_name': 'L8',
        'x-position': 4,
        'y-position': 2,
        'prereqs': ['BAE'],
    },
    'OSD': {
        'index': 8,
        'full_name': 'One-Step Division',
        'button_name': 'L9',
        'x-position': 4,
        'y-position': 1,
        'prereqs': ['BAE'],
    },
    'MOA': {
        'index': 9,
        'full_name': 'More Algebra Addition',
        'button_name': 'L10',
        'x-position': 5,
        'y-position': 4,
        'prereqs': ['OSA'],
    },
    'MOS': {
        'index': 10,
        'full_name': 'More Algebra Subtraction',
        'button_name': 'L11',
        'x-position': 5,
        'y-position': 3,
        'prereqs': ['OSS'],
    },
    'MOM': {
        'index': 11,
        'full_name': 'More Algebra Multiplication',
        'button_name': 'L12',
        'x-position': 5,
        'y-position': 2,
        'prereqs': ['OSM'],
    },
    'MOD': {
        'index': 12,
        'full_name': 'More Algebra Division',
        'button_name': 'L13',
        'x-position': 5,
        'y-position': 1,
        'prereqs': ['OSD'],
    },
    'BTE': {
        'index': 13,
        'full_name': 'Basic Two-Step Equations',
        'button_name': 'L14',
        'x-position': 6,
        'y-position': 2,
        'prereqs': ['MOA', 'MOS', 'MOM', 'MOD'],
    },
    'ITE': {
        'index': 14,
        'full_name': 'Intermediate Two-Step Equations',
        'button_name': 'L15',
        'x-position': 7,
        'y-position': 2,
        'prereqs': ['BTE'],
    },
    'ATE': {
        'index': 15,
        'full_name': 'Advanced Two-Step Equations',
        'button_name': 'L16',
        'x-position': 8,
        'y-position': 2,
        'prereqs': ['ITE'],
    },
    'PAO': {
        'index': 16,
        'full_name': 'Picture Algebra I',
        'button_name': 'L17',
        'x-position': 1,
        'y-position': 0,
        'prereqs': ['ALV', 'UEQ'],
    },
    'PAT': {
        'index': 17,
        'full_name': 'Picture Algebra II',
        'button_name': 'L18',
        'x-position': 2,
        'y-position': 0,
        'prereqs': ['PAO'],
    },
    'PAW': {
        'index': 18,
        'full_name': 'Picture Algebra III',
        'button_name': 'L19',
        'x-position': 3,
        'y-position': 0,
        'prereqs': ['PAT'],
    },
}

const lessonDictChallenges = {
    'TRC': {
        'index': 0,
        'full_name': 'Triangle Sums Challenge',
        'button_name': 'C1',
        'x-position': 0,
        'y-position': 2,
        'prereqs': [],
    },
}

const unitDict = {
    'arithmetic': {
        'index': 0,
        'button_name': 'Arithmetic',
        'subLessonDict': lessonDictArithmetic,
    },
    'algebra': {
        'index': 1,
        'button_name': 'Algebra',
        'subLessonDict': lessonDictAlgebra,
    },
    'challenges': {
        'index': 2,
        'button_name': 'Challenges',
        'subLessonDict': lessonDictChallenges,
    }
};

const orderedUnitKeys = orderKeysByIndex(unitDict);
let lessonDict = {};
function makeLessonDict() {
    let startIndex = 0;
    for (const unit of orderedUnitKeys) {
        const subLessonDict = unitDict[unit]['subLessonDict'];
        const orderedSubLessonKeys = orderKeysByIndex(subLessonDict);
        for (const lesson of orderedSubLessonKeys) {
            // const lessonInfo = structuredClone(subLessonDict[lesson]);
            const lessonInfo = JSON.parse(JSON.stringify(subLessonDict[lesson]));
            lessonInfo['index'] = lessonInfo['index'] + startIndex;
            lessonDict[lesson] = lessonInfo;
        }
        startIndex += Object.keys(subLessonDict).length;
    }
}
makeLessonDict();
