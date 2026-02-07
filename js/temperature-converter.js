// Track which input is being edited to prevent circular updates
let activeInput = null;

// Conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

// Initialize conversion
document.addEventListener('DOMContentLoaded', function() {
    const celsiusInput = document.getElementById('celsius-input');
    const fahrenheitInput = document.getElementById('fahrenheit-input');
    
    if (!celsiusInput || !fahrenheitInput) return;
    
    // Celsius to Fahrenheit
    celsiusInput.addEventListener('input', function() {
        if (activeInput === 'celsius') return;
        activeInput = 'celsius';
        const value = parseFloat(celsiusInput.value);
        if (!isNaN(value) && value !== '') {
            const fahrenheit = celsiusToFahrenheit(value);
            fahrenheitInput.value = fahrenheit.toFixed(2).replace(/\.?0+$/, '');
        } else {
            fahrenheitInput.value = '';
        }
        activeInput = null;
        updateCopyButtons();
    });
    
    // Fahrenheit to Celsius
    fahrenheitInput.addEventListener('input', function() {
        if (activeInput === 'fahrenheit') return;
        activeInput = 'fahrenheit';
        const value = parseFloat(fahrenheitInput.value);
        if (!isNaN(value) && value !== '') {
            const celsius = fahrenheitToCelsius(value);
            celsiusInput.value = celsius.toFixed(2).replace(/\.?0+$/, '');
        } else {
            celsiusInput.value = '';
        }
        activeInput = null;
        updateCopyButtons();
    });
    
    // Clear both when one is cleared
    celsiusInput.addEventListener('focus', function() {
        if (celsiusInput.value === '' && fahrenheitInput.value !== '') {
            fahrenheitInput.value = '';
            updateCopyButtons();
        }
    });
    
    fahrenheitInput.addEventListener('focus', function() {
        if (fahrenheitInput.value === '' && celsiusInput.value !== '') {
            celsiusInput.value = '';
            updateCopyButtons();
        }
    });
    
    // Initialize copy buttons
    updateCopyButtons();
});

function updateCopyButtons() {
    const celsiusInput = document.getElementById('celsius-input');
    const fahrenheitInput = document.getElementById('fahrenheit-input');
    const copyCelsius = document.getElementById('copy-celsius');
    const copyFahrenheit = document.getElementById('copy-fahrenheit');
    
    if (celsiusInput && celsiusInput.value && celsiusInput.value !== '') {
        if (copyCelsius) copyCelsius.classList.add('show');
    } else {
        if (copyCelsius) copyCelsius.classList.remove('show');
    }
    
    if (fahrenheitInput && fahrenheitInput.value && fahrenheitInput.value !== '') {
        if (copyFahrenheit) copyFahrenheit.classList.add('show');
    } else {
        if (copyFahrenheit) copyFahrenheit.classList.remove('show');
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
        const copyButton = inputId === 'celsius-input' 
            ? document.getElementById('copy-celsius')
            : document.getElementById('copy-fahrenheit');
        
        if (copyButton) {
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
