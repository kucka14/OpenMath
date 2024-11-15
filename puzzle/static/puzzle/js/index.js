
function sorter(a, b) {
    const a_isnum = /^\d+$/.test(a);
    const b_isnum = /^\d+$/.test(b);
    if (a_isnum && b_isnum) {
        return a - b;
    } else if (a_isnum == false && b_isnum == false) {
        return a.localeCompare(b);
    } else if (a_isnum) {
        return -1;
    } else if (b_isnum) {
        return 1;
    }
}

function setSelectedValue(selectObj, valueToSet) {
    for (let i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].text== valueToSet) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}

function showTab(tab) {

    if (tab.id === 'tab-standards') {
        document.querySelector('#slider-div').style.display = 'none';
    } else {
        document.querySelector('#slider-div').style.display = 'block';
    }

    const tabList = document.getElementsByClassName('nav-link');
    for (let i = 0; i < tabList.length; i++) {
        tabList[i].classList.remove('active');
        tabList[i].style.fontWeight = 'normal';
        tabList[i].style.color = 'black';
    }
    tab.classList.add('active');
    tab.style.fontWeight = 'bold';

    const paneList = document.getElementsByClassName('tab-pane');
    for (let i = 0; i < paneList.length; i++) {
        paneList[i].classList.remove('active');
        paneList[i].classList.remove('show');
    }
    const targetId = tab.id + '-content';
    const targetPane = document.getElementById(targetId);
    targetPane.classList.add('active');
    targetPane.classList.add('show');
}

function switchShow() {
    const switchItemList = document.getElementsByClassName('switch-show');
    for (let i = 0; i < switchItemList.length; i++) {
        const target = switchItemList[i];
        if (target.style.display === 'block') {
            target.style.display = 'none';
        } else {
            target.style.display = 'block';
        }
    }
}

function convertGrade(gradeInt) {
    let gradeString = gradeInt.toString();
    if (gradeInt === 0) {
        gradeString = 'K';
    }
    return gradeString;
}

function deconvertGrade(gradeString) {
    let gradeInt = 0;
    if (gradeString !== 'K') {
        gradeInt = parseInt(gradeString);
    }
    return gradeInt;
}

function standardFilter(selectValues, standardsDict) {

    const descriptionTarget = document.querySelector('#standard-description-div');
    descriptionTarget.style.display = 'none';
    if (selectValues[0] !== 'all' && selectValues[1] !== 'all' && selectValues[2] !== 'all' && selectValues[3] !== 'all') {
        const selectString = selectValues.join('.');
        const standardDescription = standardsDict[selectString];
        if (typeof(standardDescription) !== 'undefined') {
            descriptionTarget.style.display = 'block';
            document.querySelector('#standard-description-div').innerHTML = standardDescription;
        }
    }

    const boxList = document.getElementsByClassName('box-standards');
    for (let i = 0; i < boxList.length; i++) {
        const box = boxList[i];
        const standardsList = JSON.parse(box.getAttribute('data-standards'));
        let display = 'none';
        if (box.getAttribute('data-hidden') !== '1') {
            if (selectValues[0] === 'all' && selectValues[1] === 'all' && selectValues[2] === 'all' && selectValues[3] === 'all') {
                display = 'flex';
            } else {
                for (let j = 0; j < standardsList.length; j++) {
                    const standard = standardsList[j];
                    if (
                        (selectValues[0] === standard[0] || selectValues[0] === 'all') &&
                        (selectValues[1] === standard[1] || selectValues[1] === 'all') &&
                        (selectValues[2] === standard[2] || selectValues[2] === 'all') &&
                        (selectValues[3] === standard[3] || selectValues[3] === 'all')
                        ) {
                        display = 'flex';
                        break;
                    }
                }
            }
            box.style.display = display;
        }
    }
}

function hideExtraBoxes(lowGrade, highGrade) {
    const boxList = document.getElementsByClassName('box-sliders');
    for (let i = 0; i < boxList.length; i++) {
        const box = boxList[i];
        const lowMark = parseInt(box.getAttribute('data-glow'));
        const highMark = parseInt(box.getAttribute('data-ghigh'));

        if (box.getAttribute('data-hidden') !== '1') {
            if (lowMark > highGrade || highMark < lowGrade) {
                box.style.display = 'none';
            } else {
                box.style.display = 'flex';
            }
        }
    }
}

function stackByGroups(locationClassName) {

    const resourceBoxList = document.getElementsByClassName(locationClassName);
    let groupingDict = {};
    let selectFillList = [[], [], [], []];
    for (let i = 0; i < resourceBoxList.length; i++) {
        const groupName = resourceBoxList[i].getAttribute('data-groupname');
        if (groupName !== '') {
            if (groupingDict[groupName] === undefined) {
                groupingDict[groupName] = [resourceBoxList[i].id];
            } else {
                groupingDict[groupName].push(resourceBoxList[i].id);
            }
        }
        resourceBoxList[i].ondblclick = function(event) {
            const originalElement = event.srcElement || event.originalTarget;
            if (!originalElement.classList.contains('click-arrow')) {
                const resourceId = this.getAttribute('data-rid');
                document.getElementById('resource-pop-button-' + resourceId).click();
            }
        }
        if (locationClassName === 'box-standards') {
            let standards = resourceBoxList[i].getAttribute('data-standards');
            standards = JSON.parse(standards);
            for (let j = 0; j < standards.length; j++) {
                const standard = standards[j];
                for (let k = 0; k < standard.length; k++) {
                    if (selectFillList[k].includes(standard[k])) {
                    } else {
                        selectFillList[k].push(standard[k]);
                    }
                }
            }
        }
    }

    function fillSelect(count, target) {
        for (let l = 0; l < selectFillList[count].length; l++) {
            const option = document.createElement('option');
            option.value = selectFillList[count][l];
            option.innerHTML = selectFillList[count][l];
            target.appendChild(option);
        }
    }
    selectFillList[0].sort(sorter);
    selectFillList[1].sort(sorter);
    selectFillList[2].sort(sorter);
    selectFillList[3].sort(sorter);
    fillSelect(0, document.querySelector('#grade-select'));
    fillSelect(1, document.querySelector('#category-select'));
    fillSelect(2, document.querySelector('#letter-select'));
    fillSelect(3, document.querySelector('#number-select'));

    function groupSlide(ownObject, slideType) {
        const target = ownObject.parentElement;
        const destinationId = target.getAttribute(slideType);
        if (destinationId !== '') {
            const destination = document.getElementById(destinationId);
            target.style.display = 'none';
            target.setAttribute('data-hidden', '1');
            destination.style.display = 'flex';
            destination.setAttribute('data-hidden', '0');
        }
    }

    for (const groupName in groupingDict) {
        const groupList = groupingDict[groupName];
        if (groupList.length > 1) {
            let deckTopTarget = sessionStorage.getItem('group' + groupName);
            if (deckTopTarget === null) {
                deckTopTarget = 0;
                sessionStorage.setItem('group' + groupName, 0);
            } else {
                deckTopTarget = JSON.parse(deckTopTarget);
                if (deckTopTarget >= groupList.length) {
                    deckTopTarget = 0;
                }
            }
            for (let i = 0; i < groupList.length; i++) {
                const target = document.getElementById(groupList[i]);
                const headerLine = target.querySelector('#resource-header-line');
                headerLine.innerHTML = '[' + (i + 1).toString() + '/' + groupList.length.toString() + '] ' + headerLine.innerHTML;
                headerLine.style.marginLeft = '32px';
                headerLine.style.marginRight = '32px';
                let previous = '';
                let next = '';
                if (i !== 0) {
                    previous = groupList[i-1];
                }
                if (i !== deckTopTarget) {
                    target.style.display = 'none';
                    target.setAttribute('data-hidden', '1');
                } else {
                    target.setAttribute('data-hidden', '0');
                }
                if (i !== groupList.length - 1) {
                    next = groupList[i+1];
                }
                target.setAttribute('data-previous', previous);
                target.setAttribute('data-next', next);

                const leftClick = document.createElement('button');
                leftClick.style.position = 'absolute';
                leftClick.style.left = '2px';
                leftClick.style.opacity = 0.4;
                leftClick.style.top = '3px';
                leftClick.innerHTML = `
                    <svg style="margin-bottom: 2px;" xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-arrow-left click-arrow" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                `;
                leftClick.onclick = function() {
                    groupSlide(this, 'data-previous');
                    sessionStorage.setItem('group' + groupName, i - 1);
                }
                target.appendChild(leftClick);

                const rightClick = document.createElement('button');
                rightClick.style.position = 'absolute';
                rightClick.style.right = '2px';
                rightClick.style.opacity = 0.4;
                rightClick.style.top = '3px';
                rightClick.innerHTML = `
                    <svg style="margin-bottom: 2px;" xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-arrow-right click-arrow" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                `;
                rightClick.onclick = function() {
                    groupSlide(this, 'data-next');
                    sessionStorage.setItem('group' + groupName, i + 1);
                }
                target.appendChild(rightClick);

            }
        }
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let standardsDict = '';
let loggedIn = false;

function setPageJS() {

    if (loggedIn) {

        const editResourceButtons = document.getElementsByClassName('edit-resource-button');
        for (let i = 0; i < editResourceButtons.length; i++) {
            const targetButton = editResourceButtons[i];
            targetButton.onclick = function() {

                let tabname = this.getAttribute('data-tname');
                let tabId = this.getAttribute('data-tid');
                if (tabname === '' || tabId === '') {
                    const currentTabId = sessionStorage.getItem('currentTabId');
                    if (currentTabId === null) {
                        currentTab = document.getElementsByClassName('nav-link')[0];
                        sessionStorage.setItem('currentTabId', currentTab.id);
                    } else {
                        currentTab = document.getElementById(currentTabId);
                    }
                    tabname = currentTab.getAttribute('data-name');
                    tabId = currentTab.getAttribute('data-tid');
                }
                const selectMenuEdit = document.querySelector('#select-menu-edit');
                setSelectedValue(selectMenuEdit, tabname);

                const resourceId = this.getAttribute('data-rid');
                const name = this.getAttribute('data-name');
                const description = this.getAttribute('data-description');
                const question = this.getAttribute('data-question');
                const link = this.getAttribute('data-link');
                const type = this.getAttribute('data-type');
                const gradeLow = this.getAttribute('data-glow');
                const gradeHigh = this.getAttribute('data-ghigh');
                const groupName = this.getAttribute('data-groupname');
                const length = this.getAttribute('data-length');
                const standards = this.getAttribute('data-standards-string');
                document.querySelector('#erhiddentid').value = tabId;
                document.querySelector('#erhiddenrid').value = resourceId;
                document.querySelector('#ername').value = name;
                document.querySelector('#erdescription').value = description;
                document.querySelector('#erlink').value = link;
                document.querySelector('#ergradelow').value = gradeLow;
                document.querySelector('#ergradehigh').value = gradeHigh;
                document.querySelector('#ergroupname').value = groupName;
                document.querySelector('#erstandards').value = standards;
                document.querySelector('#erlength').value = length;
                document.querySelector('#erquestion').value = question;
                if (question !== '') {
                    document.querySelector('#question-edit-div').style.display = 'block';
                } else {
                    document.querySelector('#question-edit-div').style.display = 'none';
                }
            }
        }

        const deleteResourceButtons = document.getElementsByClassName('delete-resource-button');
        for (let i = 0; i < deleteResourceButtons.length; i++) {
            const targetButton = deleteResourceButtons[i];
            targetButton.onclick = function() {
                const resourceId = this.getAttribute('data-rid');
                document.querySelector('#dhiddenrid').value = resourceId;
            }
        }

        const selectMenuEdit = document.querySelector('#select-menu-edit');
        selectMenuEdit.onchange = function() {
            const tabId = this.value;
            document.querySelector('#erhiddentid').value = tabId;
        }
    }

    const tabNavButtons = document.getElementsByClassName('nav-link');
    for (let i = 0; i < tabNavButtons.length; i++) {
        const targetButton = tabNavButtons[i];
        targetButton.onclick = function() {
            showTab(this);
            sessionStorage.setItem('currentTabId', this.id);
        }
    }

    const currentTabId = sessionStorage.getItem('currentTabId');
    const firstTab = document.getElementsByClassName('nav-link')[0];
    if (currentTabId === null) {
        if (firstTab !== null) {
            showTab(firstTab);
            sessionStorage.setItem('currentTabId', firstTab.id);
        }
    } else {
        let currentTab = document.getElementById(currentTabId);
        if (currentTab === null) {
            if (firstTab !== null) {
                showTab(firstTab);
                sessionStorage.setItem('currentTabId', firstTab.id);
            }
        } else {
            showTab(currentTab);
        }
    }

    if (loggedIn) {
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 76 && event.shiftKey && event.ctrlKey) {
                document.querySelector('#logout-button').click();
            } else if (event.keyCode === 85 && event.shiftKey && event.ctrlKey) {
                switchShow();
            }
        });
    } else {
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 76 && event.shiftKey && event.ctrlKey) {
                document.querySelector('#login-button').click();
            }
        });
    }

    let touchTally = 0;
    document.querySelector('#login-mark').addEventListener('touchstart', function() {
        touchTally += 1;
        if (touchTally === 3) {
            if (loggedIn) {
                document.querySelector('#logout-button').click();
            } else {
                document.querySelector('#login-button').click();
            }
        }
        setTimeout(function() {
            touchTally -= 1;
        }, 1500);
    });

    stackByGroups('box-sliders');
    stackByGroups('box-standards');

    document.querySelector('#upload-option-button').onclick = function() {
        if (this.innerHTML === 'Use Text') {
            this.innerHTML = 'Use Image';
            document.querySelector('#image-option-div').style.display = 'none';
            document.querySelector('#question-option-div').style.display = 'block';
        } else {
            this.innerHTML = 'Use Text';
            document.querySelector('#image-option-div').style.display = 'block';
            document.querySelector('#question-option-div').style.display = 'none';
        }
    }

//    function toggleOptionButton(ownObject) {
//        if (ownObject.value !== '') {
//            document.querySelector('#upload-option-button').disabled = true;
//        } else {
//            document.querySelector('#upload-option-button').disabled = false;
//        }
//    }

//    document.querySelector('#arquestion').oninput = function() {
//        toggleOptionButton(this);
//    }

    standardSelectHold = ['all', 'all', 'all', 'all'];
    const standardSelectList = document.getElementsByClassName('standard-select');
    for (let i = 0; i < standardSelectList.length; i++) {
        standardSelectList[i].onchange = function() {
            standardSelectHold[i] = this.value;
            standardFilter(standardSelectHold, standardsDict);
        }
    }

    function getValue(type) {
        const queryWord = type + 'Grade';
        let value = sessionStorage.getItem(queryWord);
        if (value === null || isNaN(value)) {
            if (type === 'low') {
                value = '0';
            } else {
                value = '12';
            }
        }
        return parseInt(value);
    }

    $(function() {
        $('#slider-range').slider({
            range: true,
            min: 0,
            max: 12,
            values: [getValue('low'), getValue('high')],
            slide: function(event, ui) {
                hideExtraBoxes(ui.values[0], ui.values[1]);
                let lowGrade = convertGrade(ui.values[0]);
                sessionStorage.setItem('lowGrade', lowGrade);
                let highGrade = convertGrade(ui.values[1]);
                sessionStorage.setItem('highGrade', highGrade);
                $('#grade').val(lowGrade + ' - ' + highGrade);
            }
        });

        const initLowValue = convertGrade($('#slider-range').slider('values', 0));
        const initHighValue = convertGrade($('#slider-range').slider('values', 1));
        $('#grade').val(initLowValue + ' - ' + initHighValue);
        hideExtraBoxes(initLowValue, initHighValue);
    });

    const standardForms = document.getElementsByClassName('standard-form');
    for (let i = 0; i < standardForms.length; i++) {
        const form = standardForms[i];
        form.addEventListener('submit', function(e) {

            e.preventDefault();

            postOn = true;
            if (form.id === 'add-form') {
                const questionText = document.querySelector('#arquestion');
                const questionImage = document.querySelector('#arimage');
                if (questionText.value === '' && questionImage.value === '') {
                    postOn = false;
                    flashAlert('You must include a math question - either text or image.');
                } else {
                    document.querySelector('#add-resource-dismiss').click();
                    flashAlert('Submitting your resource...', duration=0, maxWidth=300, clickDismiss=false);
                }
            }
            if (postOn) {
                let postData = new FormData(form);

                axios.post(
                    'd268b0410d0c22c33609a1bc7dcfaf44/',
                    postData,
                    {
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken'),
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        }
                    }
                )
                .then(response => {
                    dismissFlashAlert();
                    const rdata = response.data;
                    const status = rdata['status'];
                    if (status === 'login_succeed') {
                        location.reload();
                    } else if (status === 'login_fail') {
                        flashAlert('Login was not successful.');
                    } else if (status === 'logout') {
                        location.reload();
                    } else if (status === 'resource_added') {
                        if (loggedIn) {
                            flashAlert('Resource added. Refresh page to see updates.');
                        } else {
                            flashAlert('Your resource has been submitted. You will get an email before it is added to the site. Thanks!');
                        }
                    } else if (status === 'resource_edited') {
                        document.querySelector('#edit-resource-dismiss').click();
                        flashAlert('Resource edited. Refresh page to see updates.');
                    } else if (status === 'resource_deleted') {
                        document.querySelector('#resource-delete-dismiss').click();
                        flashAlert('Resource deleted. Refresh page to see updates.');
                    }
                    form.reset();
                })
                .catch(error => {
                    dismissFlashAlert();
                    flashAlert('An error occurred - sorry! Email openmath.us@gmail.com if this problem persists.');
                })
            }
        });
    }
}

let loadingPercent = 0;
const loadingInterval = setInterval(function() {
    loadingPercent += 1;
    document.querySelector('#loading-bar').style.width = loadingPercent.toString() + '%';
    if (loadingPercent === 90) {
        clearInterval(loadingInterval);
    }
}, 100);

axios.post(
    'e874f08ed6bf9fcf08dd82eb7bad8806/',
    JSON.stringify({command: 'get_resources'}),
    {
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }
)
.then(response => {
    const rdata = response.data;
    const status = rdata['status'];
    if (status === 'success') {
        clearInterval(loadingInterval);
        document.querySelector('#loading-bar').style.width = '100%';
        setTimeout(function() {
            let datalist = rdata['datalist'];
            loggedIn = datalist[0];
            standardsDict = datalist[1];
            const tablist = datalist[2];
            const personaltablist = datalist[3];
            const fulllist = datalist[4];
            const untablist = datalist[5];
            document.querySelector('#content-container').innerHTML = makeContentHtml(loggedIn, tablist, personaltablist, fulllist);
            document.querySelector('#lower-container').innerHTML = makeLowerHtml(loggedIn, tablist, personaltablist, untablist);
            document.querySelector('#scroll-down-indicator').style.display = 'block';
            setTimeout(function() {
                setPageJS();
            });
        }, 1000);
    } else if (status === 'error') {
        flashAlert('An error occurred. Refreshing your browser window may help. Email openmath.us@gmail.com if this problem persists.');
    }
})
.catch(error => {
    flashAlert('An error occurred. Refreshing your browser window may help. Email openmath.us@gmail.com if this problem persists.');
})

window.onscroll = function() {
    const scrollUpButtonDiv = document.querySelector('#scroll-up-button-div');
    const scrollDownIndicator = document.querySelector('#scroll-down-indicator');
    if (this.scrollY === 0) {
        scrollDownIndicator.style.display = 'block';
    } else {
        scrollDownIndicator.style.display = 'none';
    }
    if (this.scrollY > 250) {
        scrollUpButtonDiv.style.display = 'flex';
    } else {
        scrollUpButtonDiv.style.display = 'none';
    }
}

document.querySelector('#scroll-up-button').onclick = function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return false;
}
