let layerCount = -1;
const layerList = ['bottom', 'top', 'medium', 'big', 'tree', 'small', 'bird', 'fish'];

function highlightOff() {
    const iconCells = document.getElementsByClassName('picpass-img');
    for (let i = 0; i < iconCells.length; i++) {
        const iconCell = iconCells[i];
        const iconLabel = iconCell.parentElement.querySelector('.picpass-number-label');
        iconCell.style.borderColor = 'black';
        iconLabel.style.backgroundColor = 'black';
        iconLabel.style.color = 'white';
    }
}

function highlightOn(iconCell) {
    const iconLabel = iconCell.parentElement.querySelector('.picpass-number-label');
    iconCell.style.borderColor = 'white';
    iconLabel.style.backgroundColor = 'white';
    iconLabel.style.color = 'black';
}

function setGrid(selectedImageNumber) {
    highlightOff();
    const layerName = layerList[layerCount];
    const iconCells = document.getElementsByClassName('picpass-img');
    for (let i = 0; i < 9; i++) {
        const iconCell = iconCells[i];
        const imageNumber = i + 1;
        const imageSource = '/static/lesson/images/picpass/' + layerName + imageNumber.toString() + 'icon.png';
        iconCell.src = imageSource;
        if (selectedImageNumber === imageNumber) {
            highlightOn(iconCell);
        }
    }
}

function changeImage(imageNumber) {
    const targetLayerId = 'picpass-display-image-' + layerCount.toString();
    const targetLayer = document.getElementById(targetLayerId);
    if (imageNumber === '') {
        targetLayer.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
    } else {
        const layerName = layerList[layerCount];
        const imageSource = '/static/lesson/images/picpass/' + layerName + imageNumber.toString() + '.png';
        targetLayer.src = imageSource;
    }
}

function updateLayer(layerNumber) {
    if (layerNumber === -1) {
        layerNumber = 0;
    }
    if (layerNumber !== layerCount) {
        layerCount = layerNumber;
        const targetInputId = 'picpassin-' + layerCount.toString();
        const targetInput = document.getElementById(targetInputId);
        setGrid(parseInt(targetInput.value));
        setTimeout(function() {
            targetInput.focus();
            targetInput.select();
        })
    }
}

const picpassInputs = document.getElementsByClassName('picture-password-input');
for (let i = 0; i < picpassInputs.length; i++) {
    const picpassInput = picpassInputs[i];
    picpassInput.onkeypress = function(e) {
        if (isFinite(e.key) && (e.key !== '0') && (this.value === '' | this.selectionEnd - this.selectionStart > 0)) {
            changeImage(e.key);
            if (layerCount < 7) {
                updateLayer(layerCount + 1);
            }
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    picpassInput.onkeydown = function(e) {
        if (e.key === 'Backspace') {
            if (this.value === '') {
                e.preventDefault();
                e.stopPropagation();
                if (layerCount > 0) {
                    updateLayer(layerCount - 1);
                }
            } else {
                changeImage('');
                highlightOff();
            }
        }
    }
    picpassInput.onfocus = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const focusLayer = parseInt(picpassInput.id.slice(-1));
        updateLayer(focusLayer);
    }
}

function gatherInputs() {
    let passwordString = '';
    for (let i = 0; i < picpassInputs.length; i++) {
        let inputValue = picpassInputs[i].value;
        if (inputValue === '') {
            inputValue = 'X';
        }
        passwordString = passwordString.concat(inputValue);
    }
    return(passwordString);
}

const picpassLinks = document.getElementsByClassName('picpass-link');
for (let i = 0; i < picpassLinks.length; i++) {
    picpassLinks[i].onclick = function() {
        const imageNumber = this.getAttribute('data-id');
        const targetInputId = 'picpassin-' + layerCount.toString();
        const targetInput = document.getElementById(targetInputId);
        if (targetInput.value === ''  | (targetInput.selectionEnd - targetInput.selectionStart > 0)) {
            targetInput.value = imageNumber;
        } else {
            targetInput.value = '';
        }
        changeImage(targetInput.value);
        if (layerCount < 7) {
            updateLayer(layerCount + 1);
        }
        return false;
    }
}
