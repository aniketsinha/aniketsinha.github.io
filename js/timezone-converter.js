// Cities to display with their timezone identifiers
const CITIES = [
    { name: 'Los Angeles', timezone: 'America/Los_Angeles', id: 'la' },
    { name: 'New York', timezone: 'America/New_York', id: 'ny' },
    { name: 'London', timezone: 'Europe/London', id: 'london' },
    { name: 'Paris', timezone: 'Europe/Paris', id: 'paris' },
    { name: 'Berlin', timezone: 'Europe/Berlin', id: 'berlin' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata', id: 'mumbai' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', id: 'tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney', id: 'sydney' },
    { name: 'Melbourne', timezone: 'Australia/Melbourne', id: 'melbourne' }
];

// All timezones with their display names
const TIMEZONES = [
    { value: 'America/New_York', label: 'New York', abbr: 'EST/EDT', group: 'North America' },
    { value: 'America/Chicago', label: 'Chicago', abbr: 'CST/CDT', group: 'North America' },
    { value: 'America/Denver', label: 'Denver', abbr: 'MST/MDT', group: 'North America' },
    { value: 'America/Los_Angeles', label: 'Los Angeles', abbr: 'PST/PDT', group: 'North America' },
    { value: 'America/Phoenix', label: 'Phoenix', abbr: 'MST', group: 'North America' },
    { value: 'America/Anchorage', label: 'Anchorage', abbr: 'AKST/AKDT', group: 'North America' },
    { value: 'America/Honolulu', label: 'Honolulu', abbr: 'HST', group: 'North America' },
    { value: 'America/Toronto', label: 'Toronto', abbr: 'EST/EDT', group: 'North America' },
    { value: 'America/Vancouver', label: 'Vancouver', abbr: 'PST/PDT', group: 'North America' },
    { value: 'America/Mexico_City', label: 'Mexico City', abbr: 'CST/CDT', group: 'North America' },
    { value: 'America/Sao_Paulo', label: 'São Paulo', abbr: 'BRT/BRST', group: 'South America' },
    { value: 'America/Buenos_Aires', label: 'Buenos Aires', abbr: 'ART', group: 'South America' },
    { value: 'America/Lima', label: 'Lima', abbr: 'PET', group: 'South America' },
    { value: 'America/Bogota', label: 'Bogotá', abbr: 'COT', group: 'South America' },
    { value: 'America/Santiago', label: 'Santiago', abbr: 'CLT/CLST', group: 'South America' },
    { value: 'America/Caracas', label: 'Caracas', abbr: 'VET', group: 'South America' },
    { value: 'Europe/London', label: 'London', abbr: 'GMT/BST', group: 'Europe' },
    { value: 'Europe/Paris', label: 'Paris', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Berlin', label: 'Berlin', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Rome', label: 'Rome', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Madrid', label: 'Madrid', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Amsterdam', label: 'Amsterdam', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Brussels', label: 'Brussels', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Vienna', label: 'Vienna', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Prague', label: 'Prague', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Warsaw', label: 'Warsaw', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Stockholm', label: 'Stockholm', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Copenhagen', label: 'Copenhagen', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Oslo', label: 'Oslo', abbr: 'CET/CEST', group: 'Europe' },
    { value: 'Europe/Helsinki', label: 'Helsinki', abbr: 'EET/EEST', group: 'Europe' },
    { value: 'Europe/Athens', label: 'Athens', abbr: 'EET/EEST', group: 'Europe' },
    { value: 'Europe/Istanbul', label: 'Istanbul', abbr: 'TRT', group: 'Europe' },
    { value: 'Europe/Moscow', label: 'Moscow', abbr: 'MSK', group: 'Europe' },
    { value: 'Europe/Kiev', label: 'Kyiv', abbr: 'EET/EEST', group: 'Europe' },
    { value: 'Europe/Dublin', label: 'Dublin', abbr: 'GMT/IST', group: 'Europe' },
    { value: 'Europe/Lisbon', label: 'Lisbon', abbr: 'WET/WEST', group: 'Europe' },
    { value: 'Africa/Cairo', label: 'Cairo', abbr: 'EET/EEST', group: 'Africa' },
    { value: 'Africa/Johannesburg', label: 'Johannesburg', abbr: 'SAST', group: 'Africa' },
    { value: 'Africa/Lagos', label: 'Lagos', abbr: 'WAT', group: 'Africa' },
    { value: 'Africa/Nairobi', label: 'Nairobi', abbr: 'EAT', group: 'Africa' },
    { value: 'Africa/Casablanca', label: 'Casablanca', abbr: 'WET/WEST', group: 'Africa' },
    { value: 'Asia/Dubai', label: 'Dubai', abbr: 'GST', group: 'Middle East' },
    { value: 'Asia/Riyadh', label: 'Riyadh', abbr: 'AST', group: 'Middle East' },
    { value: 'Asia/Tehran', label: 'Tehran', abbr: 'IRST/IRDT', group: 'Middle East' },
    { value: 'Asia/Jerusalem', label: 'Jerusalem', abbr: 'IST/IDT', group: 'Middle East' },
    { value: 'Asia/Baghdad', label: 'Baghdad', abbr: 'AST', group: 'Middle East' },
    { value: 'Asia/Kolkata', label: 'Mumbai / New Delhi', abbr: 'IST', group: 'Asia' },
    { value: 'Asia/Dhaka', label: 'Dhaka', abbr: 'BST', group: 'Asia' },
    { value: 'Asia/Karachi', label: 'Karachi', abbr: 'PKT', group: 'Asia' },
    { value: 'Asia/Colombo', label: 'Colombo', abbr: 'IST', group: 'Asia' },
    { value: 'Asia/Kathmandu', label: 'Kathmandu', abbr: 'NPT', group: 'Asia' },
    { value: 'Asia/Bangkok', label: 'Bangkok', abbr: 'ICT', group: 'Asia' },
    { value: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh City', abbr: 'ICT', group: 'Asia' },
    { value: 'Asia/Jakarta', label: 'Jakarta', abbr: 'WIB', group: 'Asia' },
    { value: 'Asia/Singapore', label: 'Singapore', abbr: 'SGT', group: 'Asia' },
    { value: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur', abbr: 'MYT', group: 'Asia' },
    { value: 'Asia/Manila', label: 'Manila', abbr: 'PHT', group: 'Asia' },
    { value: 'Asia/Hong_Kong', label: 'Hong Kong', abbr: 'HKT', group: 'Asia' },
    { value: 'Asia/Shanghai', label: 'Shanghai / Beijing', abbr: 'CST', group: 'Asia' },
    { value: 'Asia/Taipei', label: 'Taipei', abbr: 'CST', group: 'Asia' },
    { value: 'Asia/Seoul', label: 'Seoul', abbr: 'KST', group: 'Asia' },
    { value: 'Asia/Tokyo', label: 'Tokyo', abbr: 'JST', group: 'Asia' },
    { value: 'Australia/Sydney', label: 'Sydney', abbr: 'AEDT/AEST', group: 'Australia & Pacific' },
    { value: 'Australia/Melbourne', label: 'Melbourne', abbr: 'AEDT/AEST', group: 'Australia & Pacific' },
    { value: 'Australia/Brisbane', label: 'Brisbane', abbr: 'AEST', group: 'Australia & Pacific' },
    { value: 'Australia/Perth', label: 'Perth', abbr: 'AWST', group: 'Australia & Pacific' },
    { value: 'Australia/Adelaide', label: 'Adelaide', abbr: 'ACDT/ACST', group: 'Australia & Pacific' },
    { value: 'Australia/Darwin', label: 'Darwin', abbr: 'ACST', group: 'Australia & Pacific' },
    { value: 'Pacific/Auckland', label: 'Auckland', abbr: 'NZDT/NZST', group: 'Australia & Pacific' },
    { value: 'Pacific/Wellington', label: 'Wellington', abbr: 'NZDT/NZST', group: 'Australia & Pacific' },
    { value: 'Pacific/Fiji', label: 'Fiji', abbr: 'FJT/FJST', group: 'Australia & Pacific' },
    { value: 'Pacific/Honolulu', label: 'Honolulu', abbr: 'HST', group: 'Australia & Pacific' }
];

let customTime = null; // Store custom time for conversion
let updateInterval = null;
let selectedTimezone = null;

// Format date and time for display
function formatDateTime(date, timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    const parts = formatter.formatToParts(date);
    const timePart = parts.find(p => p.type === 'hour').value + ':' + 
                     parts.find(p => p.type === 'minute').value + ':' + 
                     parts.find(p => p.type === 'second').value + ' ' + 
                     parts.find(p => p.type === 'dayPeriod').value;
    
    const datePart = parts.find(p => p.type === 'weekday').value + ', ' +
                     parts.find(p => p.type === 'month').value + ' ' +
                     parts.find(p => p.type === 'day').value + ', ' +
                     parts.find(p => p.type === 'year').value;
    
    return { time: timePart, date: datePart };
}

// Get timezone abbreviation
function getTimezoneAbbr(date, timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'short'
    });
    
    const parts = formatter.formatToParts(date);
    const tzPart = parts.find(p => p.type === 'timeZoneName');
    return tzPart ? tzPart.value : '';
}

// Get timezone offset in format +HH:MM or -HH:MM
function getTimezoneOffset(timezone) {
    try {
        const now = new Date();
        
        // Format the same moment in UTC and target timezone
        const utcFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const tzFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const utcParts = utcFormatter.formatToParts(now);
        const tzParts = tzFormatter.formatToParts(now);
        
        const getValue = (parts, type) => parseInt(parts.find(p => p.type === type).value);
        
        const utcHours = getValue(utcParts, 'hour');
        const utcMinutes = getValue(utcParts, 'minute');
        const tzHours = getValue(tzParts, 'hour');
        const tzMinutes = getValue(tzParts, 'minute');
        
        // Calculate difference
        let diffMinutes = (tzHours * 60 + tzMinutes) - (utcHours * 60 + utcMinutes);
        
        // Handle day boundary
        const utcDay = getValue(utcParts, 'day');
        const tzDay = getValue(tzParts, 'day');
        if (tzDay !== utcDay) {
            if (tzDay > utcDay) {
                diffMinutes += 24 * 60;
            } else {
                diffMinutes -= 24 * 60;
            }
        }
        
        const hours = Math.floor(Math.abs(diffMinutes) / 60);
        const minutes = Math.abs(diffMinutes) % 60;
        const sign = diffMinutes >= 0 ? '+' : '-';
        
        return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    } catch (e) {
        return '+00:00';
    }
}

// Update city display
function updateCityDisplay(city, date) {
    const cityItem = document.getElementById(`city-${city.id}`);
    if (!cityItem) return;
    
    const { time, date: dateStr } = formatDateTime(date, city.timezone);
    const tzAbbr = getTimezoneAbbr(date, city.timezone);
    
    cityItem.querySelector('.city-time').textContent = time;
    cityItem.querySelector('.city-date').textContent = dateStr;
    cityItem.querySelector('.city-timezone').textContent = tzAbbr;
}

// Update all cities
function updateAllCities() {
    const date = customTime || new Date();
    CITIES.forEach(city => {
        updateCityDisplay(city, date);
    });
}

// Create city cards
function createCityCards() {
    const citiesGrid = document.getElementById('cities-grid');
    if (!citiesGrid) return;
    
    CITIES.forEach(city => {
        const cityItem = document.createElement('div');
        cityItem.className = 'city-item';
        cityItem.id = `city-${city.id}`;
        cityItem.innerHTML = `
            <div class="city-name">${city.name}</div>
            <div class="city-time">--:--:-- --</div>
            <div class="city-date">--</div>
            <div class="city-timezone">--</div>
        `;
        citiesGrid.appendChild(cityItem);
    });
}

// Initialize searchable dropdown
function initSearchableDropdown() {
    const timezoneInput = document.getElementById('timezone-input');
    const timezoneList = document.getElementById('timezone-list');
    const timezoneSelect = document.getElementById('timezone-select');
    
    if (!timezoneInput || !timezoneList || !timezoneSelect) return;
    
    // Group timezones by group
    const grouped = {};
    TIMEZONES.forEach(tz => {
        if (!grouped[tz.group]) {
            grouped[tz.group] = [];
        }
        grouped[tz.group].push(tz);
    });
    
    // Render dropdown
    function renderDropdown(filter = '') {
        timezoneList.innerHTML = '';
        const searchLower = filter.toLowerCase();
        
        Object.keys(grouped).forEach(groupName => {
            const filtered = grouped[groupName].filter(tz => {
                const searchText = `${tz.label} ${tz.abbr} ${tz.value}`.toLowerCase();
                return searchText.includes(searchLower);
            });
            
            if (filtered.length === 0) return;
            
            const optgroup = document.createElement('div');
            optgroup.className = 'dropdown-optgroup';
            optgroup.textContent = groupName;
            timezoneList.appendChild(optgroup);
            
            filtered.forEach(tz => {
                const offset = getTimezoneOffset(tz.value);
                const option = document.createElement('div');
                option.className = 'dropdown-option';
                option.dataset.value = tz.value;
                option.innerHTML = `
                    <span class="option-label">${tz.label} (${tz.abbr})</span>
                    <span class="option-offset">${offset}</span>
                `;
                
                option.addEventListener('click', function() {
                    selectedTimezone = tz.value;
                    timezoneSelect.value = tz.value;
                    timezoneInput.value = `${tz.label} (${tz.abbr}) ${offset}`;
                    timezoneList.classList.remove('show');
                });
                
                timezoneList.appendChild(option);
            });
        });
    }
    
    // Initial render
    renderDropdown();
    
    // Handle input
    timezoneInput.addEventListener('input', function() {
        const value = this.value;
        renderDropdown(value);
        timezoneList.classList.add('show');
        
        if (value === '') {
            selectedTimezone = null;
            timezoneSelect.value = '';
        }
    });
    
    // Show dropdown on focus
    timezoneInput.addEventListener('focus', function() {
        timezoneList.classList.add('show');
    });
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!timezoneInput.contains(e.target) && !timezoneList.contains(e.target)) {
            timezoneList.classList.remove('show');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Create city cards
    createCityCards();
    
    // Initialize searchable dropdown
    initSearchableDropdown();
    
    // Set default time input to current time
    const timeInput = document.getElementById('time-input');
    if (timeInput) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    
    // Update cities initially
    updateAllCities();
    
    // Update cities every second
    updateInterval = setInterval(updateAllCities, 1000);
    
    // Handle form submission
    const form = document.getElementById('conversion-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const timeInput = document.getElementById('time-input');
            const timezoneSelect = document.getElementById('timezone-select');
            const resultDiv = document.getElementById('converted-result');
            const resultTime = document.getElementById('result-time');
            const resultDate = document.getElementById('result-date');
            
            if (!timeInput || !timezoneSelect || !resultDiv || !resultTime || !resultDate) return;
            
            const inputDateTime = new Date(timeInput.value);
            const targetTimezone = timezoneSelect.value;
            
            if (isNaN(inputDateTime.getTime())) {
                alert('Please enter a valid date and time.');
                return;
            }
            
            if (!targetTimezone) {
                alert('Please select a target timezone.');
                return;
            }
            
            // Set custom time for all cities to display
            customTime = inputDateTime;
            
            // Clear the auto-update interval
            if (updateInterval) {
                clearInterval(updateInterval);
            }
            
            // Update all cities with the custom time
            updateAllCities();
            
            // Display converted result
            const { time, date: dateStr } = formatDateTime(inputDateTime, targetTimezone);
            const tzAbbr = getTimezoneAbbr(inputDateTime, targetTimezone);
            
            resultTime.textContent = time;
            resultDate.textContent = dateStr + ' (' + tzAbbr + ')';
            resultDiv.classList.add('show');
            
            // Restart auto-update after 5 seconds
            setTimeout(() => {
                customTime = null;
                updateInterval = setInterval(updateAllCities, 1000);
            }, 5000);
        });
    }
});

// Clean up interval on page unload
window.addEventListener('beforeunload', function() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
});
