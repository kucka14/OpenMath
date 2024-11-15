
const isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

function detectBrowser() {

    let browser = '';

    // Opera 8.0+
    if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
        if (browser == '') {
            browser = 'Opera';
        }
    }

    // Firefox 1.0+
    if (typeof InstallTrigger !== 'undefined') {
        if (browser == '') {
            browser = 'Firefox';
        } else {
            return ''
        }
    }

    // Safari 3.0+ "[object HTMLElementConstructor]"
    if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification))) {
        if (browser == '') {
            browser = 'Safari';
        } else {
            return ''
        }
    }

    // Internet Explorer 6-11
    if (/*@cc_on!@*/false || !!document.documentMode) {
        if (browser == '') {
            browser = 'Internet Explorer';
            var isIE = true;
        } else {
            return ''
        }
    }

    // Edge 20+
    if (!isIE && !!window.StyleMedia) {
        if (browser == '') {
            browser = 'Edge';
        } else {
            return ''
        }
    }

    // Chrome 1 - 79
    if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) {
        if (browser == '') {
            browser = 'Chrome';
            var isChrome = true;
        } else {
            return ''
        }
    }

    // Edge (based on chromium) detection
    if (isChrome && (navigator.userAgent.indexOf("Edg") != -1)) {
        if (browser == '') {
            browser = 'Edge Chromium';
        } else {
            return ''
        }
    }
    return browser;
}

const colorDict = JSON.parse(document.getElementById('color_dict').textContent);

function dictKeysToList(dict) {
    let newList = [];
    for (const key in dict) {
        newList.push(key);
    }
    return newList;
}

function orderKeysByIndex(indexedDict) {
    const dictCount = Object.keys(indexedDict).length;
    let orderList = [];
    for (let i = 0; i < dictCount; i++) {
        orderList.push('');
    }
    for (const key in indexedDict) {
        const index = indexedDict[key]['index'];
        orderList[index] = key;
    }
    return orderList;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function arrayValuesMatch(array1, array2) {
    testArray1 = array1.slice();
    testArray2 = array2.slice();
    return testArray1.sort().join(',') === testArray2.sort().join(',');
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function truncate(number) {
    const truncatedNumber = parseFloat(number.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    return truncatedNumber;
}

function secondsToClock(number) {
    function addZero(numberString) {
        if (numberString.length === 1) {
            return '0' + numberString;
        } else {
            return numberString;
        }
    }
    return Math.floor(number / 60).toString() + ':' + addZero((number % 60).toString());
}

function sumArray(array) {
    for (const item of array) {
        if (!isNumber(item.toString())) {
            return NaN;
        }
    }
    const sum = array.reduce((partialSum, a) => partialSum + parseFloat(a), 0);
    return sum;
}

function multiplyArray(array) {
    const product = array.reduce((partialProduct, a) => partialProduct * parseFloat(a), 1);
    return product;
}

function getFirstChild(el){
  var firstChild = el.firstChild;
  while(firstChild != null && firstChild.nodeType == 3){ // skip TextNodes
    firstChild = firstChild.nextSibling;
  }
  return firstChild;
}

function chooseFromList(choiceList) {
    const index = Math.floor(Math.random() * choiceList.length);
    return choiceList[index];
}

function chooseMultipleFromList(choiceList, choiceCount, replace) {
    let workList = choiceList.slice();
    let returnList = [];
    for (let i = 0; i < choiceCount; i++) {
        let choice = '';
        if (replace) {
            choice = workList[pickRandomNumber(0, workList.length - 1)];
        } else {
            choice = workList.splice(pickRandomNumber(0, workList.length - 1), 1)[0];
        }
        returnList.push(choice);
    }
    return returnList;
}

function removeByValue(array, value) {
    const index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function removeFromStringByValue(string, value) {
    const stringArray = string.split('');
    removeByValue(stringArray, value);
    return stringArray.join('');
}

function setYellowHover(linkObject) {
    linkObject.onmouseover = function() {
        this.style.color = 'orange';
    }
    linkObject.onmouseleave = function() {
        this.style.color = 'black';
    }
}

function autoCapitalize() {
    this.value = this.value.toUpperCase();
}

function resizeText(targetDiv) {
    const text = targetDiv.innerHTML;
    const testDiv = document.createElement('div');
    testDiv.style.position = 'absolute';
    testDiv.style.left = 0;
    testDiv.style.top = 0;
    testDiv.style.visibility = 'hidden';
    testDiv.style.width = targetDiv.clientWidth.toString() + 'px';
    testDiv.innerHTML = text;
    document.body.appendChild(testDiv);
    textSize = 18;
    testDiv.style.fontSize = textSize.toString() + 'px';
    if (testDiv.clientHeight > targetDiv.clientHeight) {
        textSize = 14;
        testDiv.style.fontSize = textSize.toString() + 'px';
    } else if (testDiv.clientHeight + 70 > targetDiv.clientHeight) {
        textSize = 16;
        testDiv.style.fontSize = textSize.toString() + 'px';
    }
    document.body.removeChild(testDiv);
    targetDiv.style.fontSize = textSize.toString() + 'px';
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

function axiosPost(postUrl, postData, successFunction='') {
    axios.post(
        postUrl,
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
        const rdata = response.data;
        const status = rdata['status'];
        if (status === 'success') {
            dismissFlashAlert();
            if (successFunction !== '') {
                successFunction(rdata['message']);
            }
        } else if (status === 'error') {
            dismissFlashAlert();
            flashAlert('An error occurred. Refreshing your browser window may help. Email openmath.us@gmail.com if this problem persists.');
        }
    })
    .catch(error => {
        dismissFlashAlert();
        flashAlert('An error occurred. Refreshing your browser window may help. Email openmath.us@gmail.com if this problem persists.');
    })
}

function dataSend(dataType, sendData, sendTarget, socket) {
    (function() {
    	socket.send(JSON.stringify({
    		'allData': {
    		    'dataType': dataType,
    		    'sendData': sendData,
    		},
    		'sendTarget': sendTarget,
		}));
	})();
}
