
let splashShow = sessionStorage.getItem('splashShow');
if (splashShow === null) {
    document.querySelector('#index-splashpage').style.display = 'flex';
    sessionStorage.setItem('splashShow', 'false');
} else {
    document.querySelector('#index-container').style.display = 'block';
    document.querySelector('#index-footer-container').style.display = 'block';
}
document.querySelector('#splashpage-button').onclick = function() {
    document.querySelector('#index-splashpage').style.display = 'none';
    document.querySelector('#index-container').style.display = 'block';
    document.querySelector('#index-footer-container').style.display = 'block';
}
document.querySelector('#splashpage-login').onclick = function() {
    document.querySelector('#index-splashpage').style.display = 'none';
    document.querySelector('#index-container').style.display = 'block';
    document.querySelector('#index-footer-container').style.display = 'block';
    document.querySelector('#login-open').click();
}

const proxySignupButtons = document.getElementsByClassName('proxy-signup-click');
for (let i = 0; i < proxySignupButtons.length; i++) {
    proxySignupButtons[i].onclick = function() {
        document.querySelector('#signup-open').click();
        setTimeout(function() {
            window.scrollTo(0, 0);
        });
        return false;
    }
}

function switchByClass(className, displayType) {
    const classList = document.getElementsByClassName(className);
    for (i = 0; i < classList.length; i++) {
        classList[i].style.display = displayType;
    }
}

function setHover(target, onBorder, onBackground, onColor, offBorder, offBackground, offColor, initialState) {
    target.onmouseenter = function() {
        this.style.borderColor = onBorder;
        this.style.backgroundColor = onBackground;
        this.style.color = onColor;
    }
    target.onmouseleave = function() {
        this.style.borderColor = offBorder;
        this.style.backgroundColor = offBackground;
        this.style.color = offColor;
    }
    if (initialState === 'on') {
        target.style.borderColor = onBorder;
        target.style.backgroundColor = onBackground;
        target.style.color = onColor;
    } else if (initialState === 'off') {
        target.style.borderColor = offBorder;
        target.style.backgroundColor = offBackground;
        target.style.color = offColor;
    }
}

const indexBannerButtons = document.getElementsByClassName('index-banner-buttons');
for (let i = 0; i < indexBannerButtons.length; i++) {
    target = indexBannerButtons[i];
    setHover(target, 'black', 'white', 'black', 'white', 'white', '#3e737d', 'off');
    target.onclick = function() {
        if (this.style.backgroundColor === 'white') {
            document.querySelector('#index-promotion').style.display = 'none';
            document.querySelector('#picture-password').style.display = 'none';
            document.querySelector('#index-signlog').style.display = 'flex';
            setHover(this, '#3e737d', '#3e737d', 'white', '#3e737d', '#3e737d', 'white', 'on');
            if (this.id === 'login-open') {
                document.querySelector('#signup-content').style.display = 'none';
                document.querySelector('#login-content').style.display = 'block';
                document.querySelector('#picture-password-link').innerHTML = 'I have a picture password.';
                otherTarget = document.querySelector('#signup-open');
            } else if (this.id === 'signup-open') {
                document.querySelector('#signup-content').style.display = 'block';
                document.querySelector('#login-content').style.display = 'none';
                document.querySelector('#picture-password-link').innerHTML = '';
                otherTarget = document.querySelector('#login-open');
            }
            setHover(otherTarget, 'black', 'white', 'black', 'white', 'white', '#3e737d', 'off');
        } else {
            document.querySelector('#index-promotion').style.display = 'block';
            document.querySelector('#picture-password').style.display = 'none';
            document.querySelector('#index-signlog').style.display = 'none';
            setHover(this, 'black', 'white', 'black', 'white', 'white', '#3e737d', 'on');
        }
    }
}

const centerLogoClicks = document.querySelectorAll('.center-logo-click');
for (const centerLogoClick of centerLogoClicks) {
    centerLogoClick.onclick = function() {
        for (let i = 0; i < indexBannerButtons.length; i++) {
            document.querySelector('#index-promotion').style.display = 'block';
            document.querySelector('#picture-password').style.display = 'none';
            document.querySelector('#index-signlog').style.display = 'none';
            setHover(document.querySelector('#signup-open'), 'black', 'white', 'black', 'white', 'white', '#3e737d', 'off');
            setHover(document.querySelector('#login-open'), 'black', 'white', 'black', 'white', 'white', '#3e737d', 'off');
        }
        return false;
    }
}

document.querySelector('#signup-backclick').onclick = function() {
    document.querySelector('#signup-type').style.display = 'flex';
    document.querySelector('#signup-back').style.display = 'none';
    document.querySelector('#signup-signup').style.display = 'none';
    return false;
}

document.querySelector('#picture-password-link').onclick = function() {
    document.querySelector('#index-promotion').style.display = 'none';
    document.querySelector('#picture-password').style.display = 'flex';
    document.querySelector('#index-signlog').style.display = 'none';
    updateLayer(layerCount);
    return false;
}

function goToPage(pageId) {
    const pageSplit = pageId.split('-');
    const page1 = pageSplit[0];
    const page2 = pageSplit[1];
    if (page1 === 'login') {
        setTimeout(function() {
            document.querySelector('#login-open').click();
            if (page2 === 'picture') {
                setTimeout(function() {
                    document.querySelector('#picture-password-link').click();
                });
            }
        });
    } else if (page1 === 'signup') {
        setTimeout(function() {
            document.querySelector('#signup-open').click();
            if (page2 === 't') {
                setTimeout(function() {
                    signupTypeButtons[0].click();
                });
            } else if (page2 === 's13') {
                setTimeout(function() {
                    signupTypeButtons[1].click();
                });
            } else if (page2 === 's12') {
                setTimeout(function() {
                    signupTypeButtons[2].click();
                });
            }
        });
    }
}

const recentSignlog = sessionStorage.getItem('recentSignlog');
if (recentSignlog !== null) {
    goToPage(recentSignlog);
    sessionStorage.removeItem('recentSignlog');
}

function preFormSubmit(form) {
    formId = form.id;
    let pageId = '';
    if (formId === 'login-form') {
        pageId = 'login';
    } else if (formId === 'picture-login-form') {
        pageId = 'login-picture';
    } else {
        const page1 = 'signup';
        const page2 = formId.split('-')[2];
        pageId = page1 + '-' + page2;
    }
    sessionStorage.setItem('recentSignlog', pageId);
}

const forms = document.getElementsByClassName('standard-form');
for (let i = 0; i < forms.length; i++) {
    form = forms[i];
    form.onsubmit = function() {
        preFormSubmit(this);
    }
}

const signupTypeButtons = document.getElementsByClassName('signup-type-button');
for (let i = 0; i < signupTypeButtons.length; i++) {
    const target = signupTypeButtons[i];
    const targetType = target.getAttribute('data-type');
    target.onclick = function() {
        document.querySelector('#signup-type').style.display = 'none';
        document.querySelector('#signup-back').style.display = 'block';
        document.querySelector('#signup-signup').style.display = 'block';
        switchByClass('signup-form', 'none');
        document.getElementById('signup-form-' + targetType).style.display = 'block';
    }
}

document.querySelector('#pic-login-go').onclick = function() {
    const passwordGuess = gatherInputs();
    document.querySelector('#picpass-form-password').value = passwordGuess;
    const form = document.querySelector('#picture-login-form');
    preFormSubmit(form);
    form.submit();
}

document.querySelector('#s12-classcode-input').addEventListener('input', autoCapitalize);
document.querySelector('#s13-classcode-input').addEventListener('input', autoCapitalize);

const logAgreeChecks = document.getElementsByClassName('form-check-input');
for (const logAgreeCheck of logAgreeChecks) {
    logAgreeCheck.onchange = function() {
        const target = this.parentElement.parentElement.parentElement.querySelector('#bottom-row-button');
        if (this.checked === true) {
            target.disabled = false;
        } else {
            target.disabled = true;
        }
    }
}

document.querySelector('#scroll-more-indicator-scroll').onclick = function() {
    const height1 = document.querySelector('#index-header').clientHeight;
    const height2 = document.querySelector('#panel-container-top').clientHeight;
    const height3 = document.querySelector('.panel-division-toblue-1').clientHeight * 2;
    const totalHeight = height1 + height2 + height3;
    window.scrollBy(0, totalHeight);
    return false;
}

window.onscroll = function() {
    const scrollMoreIndicator = document.querySelector('#scroll-more-indicator');
    if (this.scrollY === 0) {
        scrollMoreIndicator.style.display = 'flex';
    } else {
        scrollMoreIndicator.style.display = 'none';
    }
}
