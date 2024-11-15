
function passwordSuccessFunction(message) {
    document.querySelector('#id_old_password').value = '';
    document.querySelector('#id_new_password1').value = '';
    document.querySelector('#id_new_password2').value = '';
    if (message === 'invalid') {
        flashAlert('Try again. Make sure you entered everything correctly.');
    } else {
        flashAlert('Password successfully changed!');
    }
}

const changePasswordForm = document.querySelector('#change-password-form');
changePasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const postData = new FormData(changePasswordForm);
    flashAlert('Changing Password...', duration=0, maxWidth=300, clickDismiss=false);
    axiosPost(
        'd60c4277b86e9764f309326adc3044e2/',
        postData,
        sucessFunction = passwordSuccessFunction
    );
});

function addEmailSuccessFunction(message) {
    document.querySelector('#addemail-input').value = '';
    flashAlert(`The email ${message} was added to your account.`);
}

const addEmailForm = document.querySelector('#add-email-form');
if (addEmailForm !== null) {
    addEmailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const postData = new FormData(addEmailForm);
        flashAlert('Adding Email...', duration=0, maxWidth=300, clickDismiss=false);
        axiosPost(
            'b5713481d04749247899a1b26ea0dae9/',
            postData,
            sucessFunction = addEmailSuccessFunction
        );
    });
}
