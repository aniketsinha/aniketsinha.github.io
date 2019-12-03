const taInputId = "ta-input";
const taUnescapeId = "unescape-output";
const taEscapeId = "escape-output";

const prettyJsonOutputElementId = "json-prettify-output";
const encodedOutputElementId = "encoded-output";
const decodedOutputElementId = "decoded-output";


const buttonCopyEscaped = "btn-copy-escaped";
const buttonCopyUnescaped = "btn-copy-unescaped";
const buttonCopyPrettyJson = "btn-copy-pretty-json";
const buttonCopyEncoded = "btn-copy-encoded";
const buttonCopyDecoded = "btn-copy-decoded";

const taInput = document.getElementById(taInputId);
const taEscapeEl = document.getElementById(taEscapeId);
const taUnescapeEl = document.getElementById(taUnescapeId);
const prettyJsonOutputElement = document.getElementById(prettyJsonOutputElementId);
const encodedOutputElement = document.getElementById(encodedOutputElementId);
const decodedOutputElement = document.getElementById(decodedOutputElementId);

const buttonCopyEscapedEl = document.getElementById(buttonCopyEscaped);
const buttonCopyUnescapedEl = document.getElementById(buttonCopyUnescaped);
const buttonCopyPrettyJsonEl = document.getElementById(buttonCopyPrettyJson);
const buttonCopyEncodedEl = document.getElementById(buttonCopyEncoded);
const buttonCopyDecodedEl = document.getElementById(buttonCopyDecoded);


function escapeString(taText) {
    return JSON.stringify(taText);
}


function unescapeString(taText) {
    let unescapedString = taText.replace(/\\"/g, '"');
    return unescapedString;
}


function stringifyJson(jsonString) {
    let jsonStringified;
    let parsedCorrectly = false;
    try {
        let jsonObj = JSON.parse(jsonString);
        jsonStringified =  JSON.stringify(jsonObj, undefined, 2);
        parsedCorrectly = true;
    }
    catch (e) {
        jsonStringified = e.message;
    }
    prettyJsonOutputElement.innerHTML = jsonStringified;
    return parsedCorrectly;
}

function base64EncodeString(toEncode) {
    return btoa(toEncode);
}
function base64DecodeString(toDecode) {
    return atob(toDecode);
}

function escapeInput(taText) {
      let escapedText = escapeString(taText);
      setTaContent(taEscapeEl, escapedText);
      showHideElement(true, buttonCopyEscapedEl);
}


function unescapeInput(taText) {
    let unescapedText = unescapeString(taText);
    setTaContent(taUnescapeEl, unescapedText);
    showHideElement(true, buttonCopyUnescapedEl)
}

function prettifyInput(taText) {
    let isParsed = stringifyJson(taText);
    if(isParsed) {
        showHideElement(true, buttonCopyPrettyJsonEl);
    }
    else  {
        showHideElement(false, buttonCopyPrettyJsonEl);
    }
}

function base64EncodeInput(taText) {
    let encodedStr = base64EncodeString(taText);
    encodedOutputElement.innerHTML = encodedStr;
    showHideElement(true, buttonCopyEncodedEl)
}

function base64DecodeInput(taText) {
    let decodedStr = base64DecodeString(taText);
    decodedOutputElement.innerHTML = decodedStr;
    showHideElement(true, buttonCopyDecodedEl)
}

function go() {
    if(taInput) {
        let taText = taInput.value;
        escapeInput(taText);
        unescapeInput(taText);
        prettifyInput(taText);
        base64EncodeInput(taText);
        base64DecodeInput(taText);
    }
}

function setTaContent(taElement, content) {
    taElement.innerText = content;
}

function showHideElement(toShow, elToAct) {
    let hideClass = "no-show";
    let showClass = "";
    let classToUse = hideClass;
    if (toShow) {
        classToUse = showClass;
    }
    elToAct.className = classToUse;
}

//copy button actions
function copyUnescapedString() {
    taUnescapeEl.select();
    executeCopy();

}

function copyEscapedString() {
    taEscapeEl.select();
    executeCopy();
}

function copyPrettyJson() {
    selectElementContents(prettyJsonOutputElement);
    executeCopy();
}


function copyEncoded() {
    selectElementContents(encodedOutputElement);
    executeCopy();
}

function copyDecoded() {
    selectElementContents(decodedOutputElement);
    executeCopy();
}

// helper for select and copy
function executeCopy(el) {
    document.execCommand("copy");
}

function selectElementContents(el) {
    if (window.getSelection && document.createRange) {
        // IE 9 and non-IE
        const range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.body.createTextRange) {
        // IE < 9
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.select();
    }
}
