document.getElementById('generate-button').addEventListener('click', generateStrongPassword);
document.getElementById('regenerate-button').addEventListener('click', generateStrongPassword);
document.getElementById('copy-button').addEventListener('click', copyToClipboard);

const lengthSlider = document.getElementById('password-length');
const lengthValueDisplay = document.getElementById('length-value');

lengthSlider.addEventListener('input', () => {
    lengthValueDisplay.textContent = lengthSlider.value;
});

function generateStrongPassword() {
    const significantName = document.getElementById('weak-password').value;
    let significantNumber = document.getElementById('significant-number').value;
    const desiredLength = parseInt(lengthSlider.value);
    const avoidSimilar = document.getElementById('avoid-similar').checked;

    const result = strengthenPassword(significantName, significantNumber, desiredLength, avoidSimilar);
    document.getElementById('strong-password-display').textContent = result.password;
    document.getElementById('copy-message').textContent = "";
    document.getElementById('password-explanation').textContent = result.explanation;
}

function strengthenPassword(significantName, significantNumber, desiredLength, avoidSimilar) {
    const substitutions = { // ... (your substitutions object from the previous response) };

    if (!significantName) {
        const defaultNames = [ // ... (your default names array from the previous response) ];
        significantName = defaultNames[Math.floor(Math.random() * defaultNames.length)];
    }

    if (!significantNumber) {
        significantNumber = new Date().getFullYear();
    } else {
        significantNumber = String(significantNumber);
    }

    let combined = significantName + significantNumber;
    let strongPassword = "";
    let explanation = "";

    // ... (rest of your strengthenPassword function code)
}

function copyToClipboard() {
    const strongPassword = document.getElementById('strong-password-display').textContent;
    navigator.clipboard.writeText(strongPassword)
        .then(() => {
            document.getElementById('copy-message').textContent = "Password copied!";
        })
        .catch(err => {
            document.getElementById('copy-message').textContent = "Failed to copy.";
            console.error('Failed to copy: ', err);
        });
}
