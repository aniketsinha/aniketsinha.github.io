// Conversion constants
const CONVERSIONS = {
    // Weight
    POUNDS_TO_KG: 0.453592,
    KG_TO_POUNDS: 1 / 0.453592,
    OUNCES_TO_GRAMS: 28.3495,
    GRAMS_TO_OUNCES: 1 / 28.3495,
    
    // Length
    INCHES_TO_CM: 2.54,
    CM_TO_INCHES: 1 / 2.54,
    FEET_TO_METERS: 0.3048,
    METERS_TO_FEET: 1 / 0.3048,
    MILES_TO_KM: 1.60934,
    KM_TO_MILES: 1 / 1.60934,
    
    // Volume
    FLOZ_TO_ML: 29.5735,
    ML_TO_FLOZ: 1 / 29.5735,
    CUPS_TO_ML: 236.588,
    ML_TO_CUPS: 1 / 236.588,
    GALLONS_TO_LITERS: 3.78541,
    LITERS_TO_GALLONS: 1 / 3.78541
};

// Track which input is being edited to prevent circular updates
let activeInput = null;

// Initialize all conversion pairs
document.addEventListener('DOMContentLoaded', function() {
    setupConversionPair('pounds-input', 'kilograms-input', CONVERSIONS.POUNDS_TO_KG, CONVERSIONS.KG_TO_POUNDS);
    setupConversionPair('ounces-input', 'grams-input', CONVERSIONS.OUNCES_TO_GRAMS, CONVERSIONS.GRAMS_TO_OUNCES);
    setupConversionPair('inches-input', 'centimeters-input', CONVERSIONS.INCHES_TO_CM, CONVERSIONS.CM_TO_INCHES);
    setupConversionPair('feet-input', 'meters-input', CONVERSIONS.FEET_TO_METERS, CONVERSIONS.METERS_TO_FEET);
    setupConversionPair('miles-input', 'kilometers-input', CONVERSIONS.MILES_TO_KM, CONVERSIONS.KM_TO_MILES);
    setupConversionPair('floz-input', 'milliliters-input', CONVERSIONS.FLOZ_TO_ML, CONVERSIONS.ML_TO_FLOZ);
    setupConversionPair('cups-input', 'cups-ml-input', CONVERSIONS.CUPS_TO_ML, CONVERSIONS.ML_TO_CUPS);
    setupConversionPair('gallons-input', 'liters-input', CONVERSIONS.GALLONS_TO_LITERS, CONVERSIONS.LITERS_TO_GALLONS);
    
    // Setup copy buttons to show when inputs have values
    setupCopyButtons();
});

function setupConversionPair(input1Id, input2Id, conversion1to2, conversion2to1) {
    const input1 = document.getElementById(input1Id);
    const input2 = document.getElementById(input2Id);
    
    if (!input1 || !input2) return;
    
    input1.addEventListener('input', function() {
        if (activeInput === input1Id) return;
        activeInput = input1Id;
        const value = parseFloat(input1.value);
        if (!isNaN(value) && value !== '') {
            input2.value = (value * conversion1to2).toFixed(6).replace(/\.?0+$/, '');
        } else {
            input2.value = '';
        }
        activeInput = null;
        updateCopyButton(input1Id);
        updateCopyButton(input2Id);
    });
    
    input2.addEventListener('input', function() {
        if (activeInput === input2Id) return;
        activeInput = input2Id;
        const value = parseFloat(input2.value);
        if (!isNaN(value) && value !== '') {
            input1.value = (value * conversion2to1).toFixed(6).replace(/\.?0+$/, '');
        } else {
            input1.value = '';
        }
        activeInput = null;
        updateCopyButton(input1Id);
        updateCopyButton(input2Id);
    });
    
    // Clear both when one is cleared
    input1.addEventListener('focus', function() {
        if (input1.value === '' && input2.value !== '') {
            input2.value = '';
            updateCopyButton(input2Id);
        }
    });
    
    input2.addEventListener('focus', function() {
        if (input2.value === '' && input1.value !== '') {
            input1.value = '';
            updateCopyButton(input1Id);
        }
    });
}

function setupCopyButtons() {
    const inputs = document.querySelectorAll('.conversion-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            updateCopyButton(this.id);
        });
    });
}

function updateCopyButton(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const copyButton = input.nextElementSibling;
    if (copyButton && copyButton.classList.contains('copy-button')) {
        if (input.value && input.value !== '') {
            copyButton.classList.add('show');
        } else {
            copyButton.classList.remove('show');
        }
    }
}

async function copyValue(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const valueToCopy = input.value;
    if (!valueToCopy) return;
    
    try {
        // Use modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(valueToCopy);
        } else {
            // Fallback for older browsers
            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand('copy');
        }
        
        // Visual feedback
        const copyButton = input.nextElementSibling;
        if (copyButton && copyButton.classList.contains('copy-button')) {
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Copied!';
            copyButton.style.background = '#6bb85a';
            
            setTimeout(() => {
                copyButton.textContent = originalText;
                copyButton.style.background = '#78cc6d';
            }, 2000);
        }
    } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback: try execCommand if clipboard API fails
        try {
            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand('copy');
        } catch (fallbackErr) {
            console.error('Fallback copy also failed:', fallbackErr);
        }
    }
}
