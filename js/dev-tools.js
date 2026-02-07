const taInputId = "ta-input";
const taUnescapeId = "unescape-output";
const taEscapeId = "escape-output";

const prettyJsonOutputElementId = "json-prettify-output";
const encodedOutputElementId = "encoded-output";
const decodedOutputElementId = "decoded-output";

const urlEncodedOutputElementId = "url-encoded-output";
const urlDecodedOutputElementId = "url-decoded-output";
const htmlEntityEncodedOutputElementId = "html-entity-encoded-output";
const htmlEntityDecodedOutputElementId = "html-entity-decoded-output";
const timestampDateOutputElementId = "timestamp-date-output";
const timestampUnixOutputElementId = "timestamp-unix-output";
const timestampIsoOutputElementId = "timestamp-iso-output";
const textCaseOutputElementId = "text-case-output";
const queryStringParsedOutputElementId = "query-string-parsed-output";
const queryStringFormattedOutputElementId = "query-string-formatted-output";
const uuidOutputElementId = "uuid-output";


const buttonCopyEscaped = "btn-copy-escaped";
const buttonCopyUnescaped = "btn-copy-unescaped";
const buttonCopyPrettyJson = "btn-copy-pretty-json";
const buttonCopyEncoded = "btn-copy-encoded";
const buttonCopyDecoded = "btn-copy-decoded";
const buttonCopyUrlEncoded = "btn-copy-url-encoded";
const buttonCopyUrlDecoded = "btn-copy-url-decoded";
const buttonCopyHtmlEntityEncoded = "btn-copy-html-entity-encoded";
const buttonCopyHtmlEntityDecoded = "btn-copy-html-entity-decoded";
const buttonCopyTimestampDate = "btn-copy-timestamp-date";
const buttonCopyTimestampUnix = "btn-copy-timestamp-unix";
const buttonCopyTimestampIso = "btn-copy-timestamp-iso";
const buttonCopyTextCase = "btn-copy-text-case";
const buttonCopyQueryStringParsed = "btn-copy-query-string-parsed";
const buttonCopyQueryStringFormatted = "btn-copy-query-string-formatted";
const buttonCopyUuid = "btn-copy-uuid";

const taInput = document.getElementById(taInputId);
const taEscapeEl = document.getElementById(taEscapeId);
const taUnescapeEl = document.getElementById(taUnescapeId);
const prettyJsonOutputElement = document.getElementById(prettyJsonOutputElementId);
const encodedOutputElement = document.getElementById(encodedOutputElementId);
const decodedOutputElement = document.getElementById(decodedOutputElementId);
const urlEncodedOutputElement = document.getElementById(urlEncodedOutputElementId);
const urlDecodedOutputElement = document.getElementById(urlDecodedOutputElementId);
const htmlEntityEncodedOutputElement = document.getElementById(htmlEntityEncodedOutputElementId);
const htmlEntityDecodedOutputElement = document.getElementById(htmlEntityDecodedOutputElementId);
const timestampDateOutputElement = document.getElementById(timestampDateOutputElementId);
const timestampUnixOutputElement = document.getElementById(timestampUnixOutputElementId);
const timestampIsoOutputElement = document.getElementById(timestampIsoOutputElementId);
const textCaseOutputElement = document.getElementById(textCaseOutputElementId);
const queryStringParsedOutputElement = document.getElementById(queryStringParsedOutputElementId);
const queryStringFormattedOutputElement = document.getElementById(queryStringFormattedOutputElementId);
const uuidOutputElement = document.getElementById(uuidOutputElementId);

const buttonCopyEscapedEl = document.getElementById(buttonCopyEscaped);
const buttonCopyUnescapedEl = document.getElementById(buttonCopyUnescaped);
const buttonCopyPrettyJsonEl = document.getElementById(buttonCopyPrettyJson);
const buttonCopyEncodedEl = document.getElementById(buttonCopyEncoded);
const buttonCopyDecodedEl = document.getElementById(buttonCopyDecoded);
const buttonCopyUrlEncodedEl = document.getElementById(buttonCopyUrlEncoded);
const buttonCopyUrlDecodedEl = document.getElementById(buttonCopyUrlDecoded);
const buttonCopyHtmlEntityEncodedEl = document.getElementById(buttonCopyHtmlEntityEncoded);
const buttonCopyHtmlEntityDecodedEl = document.getElementById(buttonCopyHtmlEntityDecoded);
const buttonCopyTimestampDateEl = document.getElementById(buttonCopyTimestampDate);
const buttonCopyTimestampUnixEl = document.getElementById(buttonCopyTimestampUnix);
const buttonCopyTimestampIsoEl = document.getElementById(buttonCopyTimestampIso);
const buttonCopyTextCaseEl = document.getElementById(buttonCopyTextCase);
const buttonCopyQueryStringParsedEl = document.getElementById(buttonCopyQueryStringParsed);
const buttonCopyQueryStringFormattedEl = document.getElementById(buttonCopyQueryStringFormatted);
const buttonCopyUuidEl = document.getElementById(buttonCopyUuid);


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
    try {
        return btoa(toEncode);
    } catch (e) {
        return "Error: " + e.message;
    }
}
function base64DecodeString(toDecode) {
    try {
        return atob(toDecode);
    } catch (e) {
        return "Error: " + e.message;
    }
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
    if (!taText || taText.trim() === "") {
        encodedOutputElement.innerHTML = "";
        showHideElement(false, buttonCopyEncodedEl);
        return;
    }
    let encodedStr = base64EncodeString(taText);
    encodedOutputElement.innerHTML = encodedStr;
    if (encodedStr.startsWith("Error:")) {
        showHideElement(false, buttonCopyEncodedEl);
    } else {
        showHideElement(true, buttonCopyEncodedEl);
    }
}

function base64DecodeInput(taText) {
    if (!taText || taText.trim() === "") {
        decodedOutputElement.innerHTML = "";
        showHideElement(false, buttonCopyDecodedEl);
        return;
    }
    let decodedStr = base64DecodeString(taText);
    decodedOutputElement.innerHTML = decodedStr;
    if (decodedStr.startsWith("Error:")) {
        showHideElement(false, buttonCopyDecodedEl);
    } else {
        showHideElement(true, buttonCopyDecodedEl);
    }
}

// URL Encode/Decode functions
function urlEncodeString(toEncode) {
    return encodeURIComponent(toEncode);
}

function urlDecodeString(toDecode) {
    try {
        return decodeURIComponent(toDecode);
    } catch (e) {
        return "Error: " + e.message;
    }
}

function urlEncodeInput(taText) {
    if (!taText || taText.trim() === "") {
        urlEncodedOutputElement.innerHTML = "";
        showHideElement(false, buttonCopyUrlEncodedEl);
        return;
    }
    try {
        let encodedStr = urlEncodeString(taText);
        urlEncodedOutputElement.innerHTML = encodedStr;
        showHideElement(true, buttonCopyUrlEncodedEl);
    } catch (e) {
        urlEncodedOutputElement.innerHTML = "Error: " + e.message;
        showHideElement(false, buttonCopyUrlEncodedEl);
    }
}

function urlDecodeInput(taText) {
    if (!taText || taText.trim() === "") {
        urlDecodedOutputElement.innerHTML = "";
        showHideElement(false, buttonCopyUrlDecodedEl);
        return;
    }
    let decodedStr = urlDecodeString(taText);
    urlDecodedOutputElement.innerHTML = decodedStr;
    if (decodedStr.startsWith("Error:")) {
        showHideElement(false, buttonCopyUrlDecodedEl);
    } else {
        showHideElement(true, buttonCopyUrlDecodedEl);
    }
}

// HTML Entity Encode/Decode functions
function htmlEntityEncodeString(toEncode) {
    const div = document.createElement('div');
    div.textContent = toEncode;
    return div.innerHTML;
}

function htmlEntityDecodeString(toDecode) {
    const div = document.createElement('div');
    div.innerHTML = toDecode;
    return div.textContent || div.innerText;
}

function htmlEntityEncodeInput(taText) {
    if (!taText || taText.trim() === "") {
        htmlEntityEncodedOutputElement.textContent = "";
        showHideElement(false, buttonCopyHtmlEntityEncodedEl);
        return;
    }
    try {
        let encodedStr = htmlEntityEncodeString(taText);
        htmlEntityEncodedOutputElement.textContent = encodedStr;
        showHideElement(true, buttonCopyHtmlEntityEncodedEl);
    } catch (e) {
        htmlEntityEncodedOutputElement.textContent = "Error: " + e.message;
        showHideElement(false, buttonCopyHtmlEntityEncodedEl);
    }
}

function htmlEntityDecodeInput(taText) {
    if (!taText || taText.trim() === "") {
        htmlEntityDecodedOutputElement.textContent = "";
        showHideElement(false, buttonCopyHtmlEntityDecodedEl);
        return;
    }
    try {
        let decodedStr = htmlEntityDecodeString(taText);
        htmlEntityDecodedOutputElement.textContent = decodedStr;
        showHideElement(true, buttonCopyHtmlEntityDecodedEl);
    } catch (e) {
        htmlEntityDecodedOutputElement.textContent = "Error: " + e.message;
        showHideElement(false, buttonCopyHtmlEntityDecodedEl);
    }
}

// Timestamp Converter functions
function timestampToDate(timestamp) {
    try {
        let ts = parseInt(timestamp);
        if (isNaN(ts)) {
            return "Error: Invalid timestamp";
        }
        // Handle both seconds and milliseconds
        if (ts < 10000000000) {
            ts = ts * 1000; // Convert seconds to milliseconds
        }
        return new Date(ts).toISOString();
    } catch (e) {
        return "Error: " + e.message;
    }
}

function dateToTimestamp(dateStr) {
    try {
        let date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return "Error: Invalid date";
        }
        return Math.floor(date.getTime() / 1000).toString();
    } catch (e) {
        return "Error: " + e.message;
    }
}

function timestampConverterInput(taText) {
    if (!taText || taText.trim() === "") {
        timestampDateOutputElement.innerHTML = "";
        timestampUnixOutputElement.innerHTML = "";
        timestampIsoOutputElement.innerHTML = "";
        showHideElement(false, buttonCopyTimestampDateEl);
        showHideElement(false, buttonCopyTimestampUnixEl);
        showHideElement(false, buttonCopyTimestampIsoEl);
        return;
    }
    
    // Try to parse as timestamp first
    let timestamp = taText.trim();
    if (/^\d+$/.test(timestamp)) {
        // It's a number, treat as timestamp
        let ts = parseInt(timestamp);
        if (ts < 10000000000) {
            ts = ts * 1000; // Convert seconds to milliseconds
        }
        let date = new Date(ts);
        
        if (isNaN(date.getTime())) {
            timestampDateOutputElement.innerHTML = "Error: Invalid timestamp";
            timestampUnixOutputElement.innerHTML = "Error: Invalid timestamp";
            timestampIsoOutputElement.innerHTML = "Error: Invalid timestamp";
            showHideElement(false, buttonCopyTimestampDateEl);
            showHideElement(false, buttonCopyTimestampUnixEl);
            showHideElement(false, buttonCopyTimestampIsoEl);
            return;
        }
        
        timestampIsoOutputElement.innerHTML = date.toISOString();
        timestampDateOutputElement.innerHTML = date.toLocaleString();
        timestampUnixOutputElement.innerHTML = timestamp;
        
        showHideElement(true, buttonCopyTimestampDateEl);
        showHideElement(true, buttonCopyTimestampUnixEl);
        showHideElement(true, buttonCopyTimestampIsoEl);
    } else {
        // Try to parse as date
        let date = new Date(taText);
        if (!isNaN(date.getTime())) {
            timestampIsoOutputElement.innerHTML = date.toISOString();
            timestampDateOutputElement.innerHTML = date.toLocaleString();
            let unixTs = dateToTimestamp(taText);
            timestampUnixOutputElement.innerHTML = unixTs;
            
            if (unixTs.startsWith("Error:")) {
                showHideElement(false, buttonCopyTimestampDateEl);
                showHideElement(false, buttonCopyTimestampUnixEl);
                showHideElement(false, buttonCopyTimestampIsoEl);
            } else {
                showHideElement(true, buttonCopyTimestampDateEl);
                showHideElement(true, buttonCopyTimestampUnixEl);
                showHideElement(true, buttonCopyTimestampIsoEl);
            }
        } else {
            timestampDateOutputElement.innerHTML = "Error: Invalid input. Enter a Unix timestamp (numbers) or a valid date string.";
            timestampUnixOutputElement.innerHTML = "Error: Invalid input";
            timestampIsoOutputElement.innerHTML = "Error: Invalid input";
            showHideElement(false, buttonCopyTimestampDateEl);
            showHideElement(false, buttonCopyTimestampUnixEl);
            showHideElement(false, buttonCopyTimestampIsoEl);
        }
    }
}

// Text Case Converter functions
// First, normalize the input by splitting camelCase/PascalCase/snake_case/kebab-case into words
function normalizeToWords(text) {
    if (!text) return { words: [], trailingPunctuation: '' };
    
    // Extract trailing punctuation (?, !, ., etc.)
    const punctuationMatch = text.match(/[^\w\s\-_]+$/);
    const trailingPunctuation = punctuationMatch ? punctuationMatch[0] : '';
    const textWithoutTrailingPunct = trailingPunctuation ? text.slice(0, -trailingPunctuation.length) : text;
    
    // Handle camelCase/PascalCase: split on capital letters
    // Handle snake_case: split on underscores
    // Handle kebab-case: split on hyphens
    // Handle spaces: split on spaces
    // Preserve punctuation within words (like apostrophes in "don't")
    let words = textWithoutTrailingPunct
        // Split camelCase/PascalCase (insert space before capital letters)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // Split on underscores, hyphens, and spaces, but preserve punctuation within words
        .split(/[\s_\-]+/)
        .map(word => word.trim())
        .filter(word => word.length > 0);
    
    return { words, trailingPunctuation };
}

function convertTextCase(text, caseType) {
    if (!text) return "";
    
    const { words, trailingPunctuation } = normalizeToWords(text);
    
    if (words.length === 0) return text;
    
    let result = '';
    switch(caseType) {
        case 'uppercase':
            result = words.join(' ').toUpperCase();
            break;
        case 'lowercase':
            result = words.join(' ').toLowerCase();
            break;
        case 'camelCase':
            result = words.map((word, index) => {
                // Remove punctuation from word for casing, but we'll add it back
                const cleanWord = word.replace(/[^\w]/g, '');
                if (index === 0) {
                    return cleanWord.toLowerCase();
                }
                return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase();
            }).join('');
            break;
        case 'kebab-case':
            result = words.map(word => {
                // Remove punctuation for kebab-case
                return word.replace(/[^\w]/g, '').toLowerCase();
            }).join('-');
            break;
        case 'snake_case':
            result = words.map(word => {
                // Remove punctuation for snake_case
                return word.replace(/[^\w]/g, '').toLowerCase();
            }).join('_');
            break;
        case 'PascalCase':
            result = words.map(word => {
                // Remove punctuation from word for casing
                const cleanWord = word.replace(/[^\w]/g, '');
                return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase();
            }).join('');
            break;
        case 'Title Case':
            result = words.map(word => {
                // Preserve punctuation in Title Case
                const cleanWord = word.replace(/[^\w]/g, '');
                const punct = word.replace(/[\w]/g, '');
                return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase() + punct;
            }).join(' ');
            break;
        default:
            return text;
    }
    
    // Add trailing punctuation back
    return result + trailingPunctuation;
}

function textCaseConverterInput(taText) {
    if (!taText) {
        textCaseOutputElement.innerHTML = "";
        showHideElement(false, buttonCopyTextCaseEl);
        return;
    }
    
    let results = [];
    results.push("UPPERCASE: " + convertTextCase(taText, 'uppercase'));
    results.push("lowercase: " + convertTextCase(taText, 'lowercase'));
    results.push("camelCase: " + convertTextCase(taText, 'camelCase'));
    results.push("kebab-case: " + convertTextCase(taText, 'kebab-case'));
    results.push("snake_case: " + convertTextCase(taText, 'snake_case'));
    results.push("PascalCase: " + convertTextCase(taText, 'PascalCase'));
    results.push("Title Case: " + convertTextCase(taText, 'Title Case'));
    
    textCaseOutputElement.innerHTML = results.join('\n');
    showHideElement(true, buttonCopyTextCaseEl);
}

// Query String Parser/Formatter functions
function parseQueryString(queryString) {
    try {
        // Remove leading ? if present
        if (queryString.startsWith('?')) {
            queryString = queryString.substring(1);
        }
        const params = new URLSearchParams(queryString);
        const obj = {};
        for (const [key, value] of params.entries()) {
            obj[key] = value;
        }
        return JSON.stringify(obj, null, 2);
    } catch (e) {
        return "Error: " + e.message;
    }
}

function formatQueryString(text) {
    try {
        // Try to parse as JSON first
        let obj;
        if (text.trim().startsWith('{')) {
            obj = JSON.parse(text);
        } else {
            // Try to parse as key=value pairs
            obj = {};
            const lines = text.split('\n');
            for (const line of lines) {
                const [key, ...valueParts] = line.split('=');
                if (key && valueParts.length > 0) {
                    obj[key.trim()] = valueParts.join('=').trim();
                }
            }
        }
        const params = new URLSearchParams(obj);
        return params.toString();
    } catch (e) {
        return "Error: " + e.message;
    }
}

function queryStringInput(taText) {
    if (!taText.trim()) {
        queryStringParsedOutputElement.innerHTML = "";
        queryStringFormattedOutputElement.innerHTML = "";
        showHideElement(false, buttonCopyQueryStringParsedEl);
        showHideElement(false, buttonCopyQueryStringFormattedEl);
        return;
    }
    
    let parsed = parseQueryString(taText);
    let formatted = formatQueryString(taText);
    
    queryStringParsedOutputElement.innerHTML = parsed;
    queryStringFormattedOutputElement.innerHTML = formatted;
    
    if (!parsed.startsWith("Error:")) {
        showHideElement(true, buttonCopyQueryStringParsedEl);
    } else {
        showHideElement(false, buttonCopyQueryStringParsedEl);
    }
    
    if (!formatted.startsWith("Error:")) {
        showHideElement(true, buttonCopyQueryStringFormattedEl);
    } else {
        showHideElement(false, buttonCopyQueryStringFormattedEl);
    }
}

// UUID Generator function
function generateUuid() {
    let uuid;
    if (crypto && crypto.randomUUID) {
        uuid = crypto.randomUUID();
    } else {
        // Fallback for older browsers
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    uuidOutputElement.innerHTML = uuid;
    showHideElement(true, buttonCopyUuidEl);
}

function go() {
    if(taInput) {
        let taText = taInput.value;
        escapeInput(taText);
        unescapeInput(taText);
        prettifyInput(taText);
        base64EncodeInput(taText);
        base64DecodeInput(taText);
        urlEncodeInput(taText);
        urlDecodeInput(taText);
        htmlEntityEncodeInput(taText);
        htmlEntityDecodeInput(taText);
        timestampConverterInput(taText);
        textCaseConverterInput(taText);
        queryStringInput(taText);
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

function copyUrlEncoded() {
    selectElementContents(urlEncodedOutputElement);
    executeCopy();
}

function copyUrlDecoded() {
    selectElementContents(urlDecodedOutputElement);
    executeCopy();
}

function copyHtmlEntityEncoded() {
    selectElementContents(htmlEntityEncodedOutputElement);
    executeCopy();
}

function copyHtmlEntityDecoded() {
    selectElementContents(htmlEntityDecodedOutputElement);
    executeCopy();
}

function copyTimestampDate() {
    selectElementContents(timestampDateOutputElement);
    executeCopy();
}

function copyTimestampUnix() {
    selectElementContents(timestampUnixOutputElement);
    executeCopy();
}

function copyTimestampIso() {
    selectElementContents(timestampIsoOutputElement);
    executeCopy();
}

function copyTextCase() {
    selectElementContents(textCaseOutputElement);
    executeCopy();
}

function copyQueryStringParsed() {
    selectElementContents(queryStringParsedOutputElement);
    executeCopy();
}

function copyQueryStringFormatted() {
    selectElementContents(queryStringFormattedOutputElement);
    executeCopy();
}

function copyUuid() {
    selectElementContents(uuidOutputElement);
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
