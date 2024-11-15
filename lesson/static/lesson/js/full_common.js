
function dismissFlashAlert() {
    const flashDiv = document.querySelector('#flash-div');
    const coverDiv = document.querySelector('#cover-div');
    const positionDiv = document.querySelector('#position-div');
    if (positionDiv !== null) {
        positionDiv.removeChild(flashDiv);
        document.body.removeChild(positionDiv);
    }
    if (coverDiv !== null) {
        document.body.removeChild(coverDiv);
    }
}

function flashAlert(message, duration=0, maxWidth=300, clickDismiss=true) {
    setTimeout(function() {

        const testDiv = document.createElement('div');
        testDiv.innerHTML = message;
        testDiv.style.display = 'inline-block';
        testDiv.style.wordBreak = 'break-word';
        document.body.appendChild(testDiv);
        let rawWidth = testDiv.clientWidth;
        if (rawWidth > maxWidth) {
            testDiv.style.width = maxWidth.toString() + 'px';
            rawWidth = maxWidth;
        }
        rawHeight = testDiv.clientHeight;
        width = rawWidth + 24;
        height = rawHeight + 24;
        document.body.removeChild(testDiv);

        const positionDiv = document.createElement('div');
        positionDiv.style.position = 'fixed';
        positionDiv.style.left = '0';
        positionDiv.style.top = '0';
        positionDiv.style.width = '100vw';
        positionDiv.style.height = '100vh';
        positionDiv.style.display = 'flex';
        positionDiv.style.justifyContent = 'center';
        positionDiv.style.alignItems = 'center';
        positionDiv.style.zIndex = '10001';
        positionDiv.id = 'position-div';
        document.body.appendChild(positionDiv);

        const flashDiv = document.createElement('div');
        let opacity = 1;
        flashDiv.style.width = width.toString() + 'px';
        flashDiv.style.height = height.toString() + 'px';
        flashDiv.style.backgroundColor = '#e9eff0';
        flashDiv.style.border = '1px solid gray';
        flashDiv.style.padding = '10px';
        flashDiv.style.opacity = opacity.toString();
        flashDiv.style.textAlign = 'center';
        flashDiv.style.borderRadius = '10px';
        flashDiv.style.overflowY = 'auto';
        flashDiv.style.wordBreak = 'break-word';
        flashDiv.classList.add('shadowed-med');
        flashDiv.id = 'flash-div';
        const messageBox = document.createElement('div');
        messageBox.style.margin = 'auto';
        messageBox.innerHTML = message;
        messageBox.id = 'flash-message-div';
        flashDiv.appendChild(messageBox);
        positionDiv.appendChild(flashDiv);

        const coverDiv = document.createElement('div');
        coverDiv.style.position = 'fixed';
        coverDiv.style.left = '0';
        coverDiv.style.top = '0';
        coverDiv.style.width = '100%';
        coverDiv.style.height = '100%';
        coverDiv.style.zIndex = '10000';
        coverDiv.style.opacity = 0.5;
        coverDiv.style.backgroundColor = 'gray';
        coverDiv.id = 'cover-div';
        document.body.appendChild(coverDiv);

        if (clickDismiss) {
            document.addEventListener('click', function clickOff(e) {
                if (e.target.id !== 'flash-div' && e.target.id !== 'flash-message-div') {
                    dismissFlashAlert();
                    document.removeEventListener('click', clickOff);
                }
            });
        }
        if (duration >= 1000) {
            setTimeout(function() {
                var removeAlert = setInterval(function() {
                    opacity -= 0.05;
                    flashDiv.style.opacity = opacity.toString();
                    if (opacity <= 0) {
                        clearInterval(removeAlert);
                        if (document.body.contains(flashDiv)) {
                            dismissFlashAlert();
                        }
                    }
                }, 50);
            }, duration - 1000);
        }
    });
}
