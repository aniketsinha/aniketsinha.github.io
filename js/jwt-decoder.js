const jwtInputId = "jwt-input";
const jwtHeaderOutputId = "jwt-header-output";
const jwtPayloadOutputId = "jwt-payload-output";
const jwtSignatureOutputId = "jwt-signature-output";

const buttonCopyJwtHeader = "btn-copy-jwt-header";
const buttonCopyJwtPayload = "btn-copy-jwt-payload";
const buttonCopyJwtSignature = "btn-copy-jwt-signature";

const jwtInput = document.getElementById(jwtInputId);
const jwtHeaderOutputElement = document.getElementById(jwtHeaderOutputId);
const jwtPayloadOutputElement = document.getElementById(jwtPayloadOutputId);
const jwtSignatureOutputElement = document.getElementById(jwtSignatureOutputId);

const buttonCopyJwtHeaderEl = document.getElementById(buttonCopyJwtHeader);
const buttonCopyJwtPayloadEl = document.getElementById(buttonCopyJwtPayload);
const buttonCopyJwtSignatureEl = document.getElementById(buttonCopyJwtSignature);

function base64UrlDecode(str) {
    // Replace URL-safe characters
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    
    // Add padding if needed
    while (str.length % 4) {
        str += '=';
    }
    
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch (e) {
        throw new Error('Invalid base64url encoding: ' + e.message);
    }
}

function decodeJwt() {
    if (!jwtInput) {
        return;
    }
    
    const jwtToken = jwtInput.value.trim();
    
    if (!jwtToken) {
        jwtHeaderOutputElement.innerHTML = "";
        jwtPayloadOutputElement.innerHTML = "";
        jwtSignatureOutputElement.innerHTML = "";
        showHideElement(false, buttonCopyJwtHeaderEl);
        showHideElement(false, buttonCopyJwtPayloadEl);
        showHideElement(false, buttonCopyJwtSignatureEl);
        return;
    }
    
    try {
        // Split JWT into parts
        const parts = jwtToken.split('.');
        
        if (parts.length !== 3) {
            throw new Error('Invalid JWT format. JWT should have 3 parts separated by dots.');
        }
        
        const [headerPart, payloadPart, signaturePart] = parts;
        
        // Decode header
        let headerJson;
        try {
            const headerDecoded = base64UrlDecode(headerPart);
            headerJson = JSON.parse(headerDecoded);
            jwtHeaderOutputElement.innerHTML = JSON.stringify(headerJson, null, 2);
            showHideElement(true, buttonCopyJwtHeaderEl);
        } catch (e) {
            jwtHeaderOutputElement.innerHTML = "Error decoding header: " + e.message;
            showHideElement(false, buttonCopyJwtHeaderEl);
        }
        
        // Decode payload
        let payloadJson;
        try {
            const payloadDecoded = base64UrlDecode(payloadPart);
            payloadJson = JSON.parse(payloadDecoded);
            jwtPayloadOutputElement.innerHTML = JSON.stringify(payloadJson, null, 2);
            showHideElement(true, buttonCopyJwtPayloadEl);
        } catch (e) {
            jwtPayloadOutputElement.innerHTML = "Error decoding payload: " + e.message;
            showHideElement(false, buttonCopyJwtPayloadEl);
        }
        
        // Display signature (no decoding, just show it)
        jwtSignatureOutputElement.innerHTML = signaturePart;
        showHideElement(true, buttonCopyJwtSignatureEl);
        
    } catch (e) {
        jwtHeaderOutputElement.innerHTML = "Error: " + e.message;
        jwtPayloadOutputElement.innerHTML = "";
        jwtSignatureOutputElement.innerHTML = "";
        showHideElement(false, buttonCopyJwtHeaderEl);
        showHideElement(false, buttonCopyJwtPayloadEl);
        showHideElement(false, buttonCopyJwtSignatureEl);
    }
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

// Copy functions
function copyJwtHeader() {
    selectElementContents(jwtHeaderOutputElement);
    executeCopy();
}

function copyJwtPayload() {
    selectElementContents(jwtPayloadOutputElement);
    executeCopy();
}

function copyJwtSignature() {
    selectElementContents(jwtSignatureOutputElement);
    executeCopy();
}

// Helper functions
function executeCopy() {
    document.execCommand("copy");
}

function selectElementContents(el) {
    if (window.getSelection && document.createRange) {
        const range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.body.createTextRange) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.select();
    }
}
