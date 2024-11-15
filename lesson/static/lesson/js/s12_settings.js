
document.querySelector('#picpass-pass').onclick = function() {
    if (this.style.opacity !== '0') {
        this.style.opacity = '0';
    } else {
        this.style.opacity = '1';
    }
    return false;
}

document.querySelector('#pic-login-go').onclick = function() {
    const passwordGuess = gatherInputs();
    const password = document.querySelector('#picpass-pass').innerHTML.trim();
    if (passwordGuess === password) {
        flashAlert('Correct!', 5000);
    } else {
        flashAlert('Incorrect - check to see your mistake.', 5000);
    }
}

document.querySelector('#picpass-practice').onclick = function() {
    const picpassPanel = document.querySelector('#picpass-practice-panel');
    const picpassInstructions = document.querySelector('#picpass-instructions');
    if (this.innerHTML.trim() === 'Practice Password') {
        picpassPanel.style.display = 'flex';
        picpassInstructions.style.display = 'block';
        this.innerHTML = 'Close Practice';
        updateLayer(layerCount);
    } else {
        picpassPanel.style.display = 'none';
        picpassInstructions.style.display = 'none';
        this.innerHTML = 'Practice Password';
    }
}
