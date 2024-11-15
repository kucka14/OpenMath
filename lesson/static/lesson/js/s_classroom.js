
function displayClasses(enrolledDictionary) {
    const displayTarget = document.querySelector('#s-classroom-show');
    if (Object.keys(enrolledDictionary).length === 0) {
        displayTarget.innerHTML = `
            <div>
                You are not currently enrolled in any classes.
                <br>
                Submit a six-character classcode to join a new class.
            </div>
        `
    } else {
        displayTarget.innerHTML = `
            <div style="margin-bottom: 10px; font-size: 20px; font-weight: bold;">
                Classes
            </div>
        `
    }
    for (const classkey in enrolledDictionary) {
        const classcode = classkey;
        const classname = enrolledDictionary[classkey]['name'];
        const teachers = enrolledDictionary[classkey]['teachers'];

        const classlink = document.createElement('a');
        classlink.href = '#hidden-' + classcode;
        classlink.onclick = function() {return false};
        classlink.setAttribute('data-bs-toggle', 'collapse');
        classlink.innerHTML = `
            <div class="class-display-div shadowed-sm">
                <div class="ellipsis-line">
                    ${classname}
                </div>
                <div>
                    ${classcode}
                </div>
            </div>
        `

        const hiddendiv = document.createElement('div');
        hiddendiv.classList.add('collapse');
        hiddendiv.id = 'hidden-' + classcode;
        hiddendiv.style.marginLeft = '5px';

        let teachersDiv = '';
        for (const teacher of teachers) {
            const content = `
                <div style="width: 100%; text-align: left;">
                    Teacher: ${teacher[1]}
                </div>
            `
            teachersDiv += content;
        }

        hiddendiv.innerHTML = `
            <div class="card card-body">
                ${teachersDiv}
            </div>
        `

        displayTarget.appendChild(classlink);
        displayTarget.appendChild(hiddendiv);
    }
}

function addStudentSuccessFunction(message) {
    if (message[0] === 'redundant') {
        flashAlert('You are already enrolled in that class.');
    } else if (message[0] === 'invalid') {
        flashAlert('That is not a valid classcode.');
    } else {
        const classcode = message[0];
        const classinfo_dict = message[1];
        enrolledDict[classcode] = classinfo_dict;
        displayClasses(enrolledDict);
        window.scrollTo(0, document.body.scrollHeight);
    }
}

document.querySelector('#s-joinclass-submit').onclick = function() {
    const inputTarget = document.querySelector('#s-joinclass-input')
    const classcode = inputTarget.value.trim().toUpperCase();
    inputTarget.value = '';
    flashAlert('Joining Class...', duration=0, maxWidth=300, clickDismiss=false);
    axiosPost('a34855817d7232825b3305dd9b74269e/',
        JSON.stringify({save_type: 'add_student', classcode: classcode, user_id: userId}),
        successFunction=addStudentSuccessFunction,
    );
}

displayClasses(enrolledDict);

document.querySelector('#s-joinclass-input').addEventListener('input', autoCapitalize);
document.querySelector('#s-joinclass-input').onkeypress = function(e) {
    if (e.key === 'Enter') {
        document.querySelector('#s-joinclass-submit').click();
    }
}
