
const editDisplaynameTrigger = document.querySelector('#edit-displayname-trigger');

editDisplaynameTrigger.onclick = function() {
    const inputTarget = document.querySelector('#edit-displayname-input');
    inputTarget.value = displayname;
    setTimeout(function() {
        inputTarget.focus();
    }, 750);
    return false;
}
setYellowHover(editDisplaynameTrigger);

document.querySelector('#edit-displayname-cancel').onclick = function() {
    document.querySelector('#edit-displayname-input').value = '';
}

document.querySelector('#edit-displayname-input').onkeypress = function(e) {
    if (e.key === 'Enter') {
        document.querySelector('#edit-displayname-submit').click();
    }
}

document.querySelector('#edit-displayname-submit').onclick = function() {
    displayname = document.querySelector('#edit-displayname-input').value;
    if (displayname.trim() === '') {
        flashAlert('Your display name cannot be blank.');
    } else {
        document.querySelector('#edit-displayname-cancel').click();
        const displaySections = document.getElementsByClassName('display-name-section');
        for (const displaySection of displaySections) {
            displaySection.innerHTML = displayname;
        }
        axiosPost('a34855817d7232825b3305dd9b74269e/',
                  JSON.stringify({save_type: 'edit_student_display', user_id: userId, display_name: displayname}),
        );
    }
}

function usernameSuccessFunction(message) {
    document.querySelector('#ucf-newusername').value = '';
    document.querySelector('#ucf-password').value = '';
    if (message === 'incorrect') {
        flashAlert('That password is incorrect.');
    } else if (message === 'taken') {
        flashAlert('That username is taken.');
    } else if (message === 'invalid') {
        flashAlert('Something went wrong. Make sure you entered everything correctly.');
    } else {
        const alert = `Username successfully changed to ${message}. Your display name will stay the same until you change it. For security reasons, we are now refreshing the page.`;
        flashAlert(alert, duration=0, maxWidth=300, clickDismiss=false);
        setTimeout(function() {
            window.location.reload();
        }, 4000);
    }
}

const changeUsernameForm = document.querySelector('#change-username-form');
changeUsernameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const postData = new FormData(changeUsernameForm);
    flashAlert('Changing Username...', duration=0, maxWidth=300, clickDismiss=false);
    axiosPost(
        'badbe9100bde4316def8e778a61446c2/',
        postData,
        successFunction=usernameSuccessFunction
    );
});
