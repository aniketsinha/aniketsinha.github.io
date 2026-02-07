const textOriginalId = "text-original";
const textModifiedId = "text-modified";
const diffOriginalOutputId = "diff-original-output";
const diffModifiedOutputId = "diff-modified-output";

const textOriginal = document.getElementById(textOriginalId);
const textModified = document.getElementById(textModifiedId);
const diffOriginalOutputElement = document.getElementById(diffOriginalOutputId);
const diffModifiedOutputElement = document.getElementById(diffModifiedOutputId);

// Simple diff algorithm using longest common subsequence
function computeLCS(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Reconstruct the LCS
    const lcs = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcs.unshift(str1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return lcs.join('');
}

// Compute diff and return highlighted HTML
function computeDiff() {
    if (!textOriginal || !textModified) {
        return;
    }
    
    const original = textOriginal.value;
    const modified = textModified.value;
    
    if (!original && !modified) {
        diffOriginalOutputElement.innerHTML = "";
        diffModifiedOutputElement.innerHTML = "";
        return;
    }
    
    // Use word-level diffing for better readability
    const originalWords = original.split(/(\s+)/);
    const modifiedWords = modified.split(/(\s+)/);
    
    // Compute diff using a simpler approach - compare word by word
    let originalHtml = "";
    let modifiedHtml = "";
    
    let i = 0, j = 0;
    const originalLen = originalWords.length;
    const modifiedLen = modifiedWords.length;
    
    while (i < originalLen || j < modifiedLen) {
        if (i >= originalLen) {
            // Only modified has words left
            modifiedHtml += '<span class="diff-added">' + escapeHtml(modifiedWords[j]) + '</span>';
            j++;
        } else if (j >= modifiedLen) {
            // Only original has words left
            originalHtml += '<span class="diff-removed">' + escapeHtml(originalWords[i]) + '</span>';
            i++;
        } else if (originalWords[i] === modifiedWords[j]) {
            // Words match
            originalHtml += '<span class="diff-unchanged">' + escapeHtml(originalWords[i]) + '</span>';
            modifiedHtml += '<span class="diff-unchanged">' + escapeHtml(modifiedWords[j]) + '</span>';
            i++;
            j++;
        } else {
            // Words don't match - try to find the word in the other string
            let foundInModified = false;
            let foundInOriginal = false;
            
            // Look ahead in modified
            for (let k = j + 1; k < Math.min(j + 10, modifiedLen); k++) {
                if (originalWords[i] === modifiedWords[k]) {
                    foundInModified = true;
                    // Add words from modified as added
                    for (let l = j; l < k; l++) {
                        modifiedHtml += '<span class="diff-added">' + escapeHtml(modifiedWords[l]) + '</span>';
                    }
                    j = k;
                    break;
                }
            }
            
            // Look ahead in original
            if (!foundInModified) {
                for (let k = i + 1; k < Math.min(i + 10, originalLen); k++) {
                    if (modifiedWords[j] === originalWords[k]) {
                        foundInOriginal = true;
                        // Add words from original as removed
                        for (let l = i; l < k; l++) {
                            originalHtml += '<span class="diff-removed">' + escapeHtml(originalWords[l]) + '</span>';
                        }
                        i = k;
                        break;
                    }
                }
            }
            
            if (!foundInModified && !foundInOriginal) {
                // No match found, mark both as different
                originalHtml += '<span class="diff-removed">' + escapeHtml(originalWords[i]) + '</span>';
                modifiedHtml += '<span class="diff-added">' + escapeHtml(modifiedWords[j]) + '</span>';
                i++;
                j++;
            }
        }
    }
    
    diffOriginalOutputElement.innerHTML = originalHtml || '<span class="diff-unchanged">(empty)</span>';
    diffModifiedOutputElement.innerHTML = modifiedHtml || '<span class="diff-unchanged">(empty)</span>';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
