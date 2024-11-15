
const displayTarget = document.querySelector('#classroom-display');
let currentClasscode = '';
let activeStudentDict = {};
let progressSocket = '';
let idCount = 1;
const classnavTarget = document.querySelector('#classnav-classlist');
const simpleClasslist = JSON.parse(document.getElementById('simple_classlist').textContent);
let selfinfo = '';

function placeDisplayBorder() {
    const displayBorder = document.querySelector('#classroom-display-border');
    if (displayTarget.scrollHeight > displayTarget.clientHeight) {
        displayBorder.style.display = 'block';
    } else {
        displayBorder.style.display = 'none';
    }
}

function messageMake(mType, variables=[]) {
    let message = '';
    if (mType === 'remove_student_noaccess') {
        message = 'You do not have permission to remove students/teachers. To remove students/teachers, an owner of the class must first make you an owner.';
    } else if (mType === 'remove_ownership_warning') {
        message = `Are you sure you want to remove the owner status of ${variables[0]} (username: ${variables[1]})?`;
    } else if (mType === 'add_owner_warning') {
        message = `Are you sure you want to give owner status to ${variables[0]} (username: ${variables[1]})? They will be able to remove students and teachers, or delete the class?`;
    } else if (mType === 'delete_class_noaccess') {
        message = 'You do not have permission to delete this class. To delete this class, an owner of the class must first make you an owner.';
    } else if (mType === 'change_classcode_noaccess') {
        message = 'You do not have permission to change the classcode. To do so, an owner of the class must first make you an owner.';
    } else if (mType === 'delete_class_warning') {
        message = `Are you sure you want to delete the class ${variables[0]} (classcode: ${variables[1]})?`;
    } else if (mType === 'change_classcode_warning') {
        message = 'Are you sure you want to generate a new classcode for this class?';
    } else if (mType === 'edit_classname_noaccess') {
        message = "You do not have permission to change this class's name. Any changes you see are temporary and on your account only. To make actual changes, an owner of the class must make you an owner.";
    } else if (mType === 'edit_studentname_noaccess') {
        message = "You do not have permission to change this student's display name. Any changes you see are temporary and on your account only. To make actual changes, an owner of the class must make you an owner.";
    } else if (mType === 'open_lessons_noaccess') {
        message = 'You do not have permissions to open and close student lessons. To do so, an owner of the class must first make you an owner.';
    } else if (mType === 'new_classcode_alert') {
        message = 'Note that the classcode was recently changed by you or another classroom owner. The current classcode is now being displayed.';
    } else if (mType === 'new_classcode_alert_stop') {
        message = 'Note that the classcode was recently changed by you or another classroom owner. Note the change before continuing with this action.';
    } else if (mType === 'new_classcode_alert_redundant') {
        message = 'The classcode was recently changed by you or another classroom owner. The current classcode is now being displayed. Note the change before continuing with this action.';
    } else if (mType === 'gone_class_alert') {
        message = 'This class was recently deleted by you or another classroom owner. The change will now be reflected.';
    } else if (mType === 'gone_class_alert_redundant') {
        message = 'This class was already deleted by you or another classroom owner. The change will now be reflected.';
    }
    return message;
}

const editRowLinkOn = `
    <svg style="color: red;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
    </svg>
`;
const editRowLinkOff = `
    <svg data-type="edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
    </svg>
`;
const editPencilNeutral = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
    </svg>
`;
const trashcanNeutral = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg>
`
const refreshArrow = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
    </svg>
`
