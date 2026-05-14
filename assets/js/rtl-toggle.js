/**
 * RTL Support Toggle
 * Toggles the direction of the page between LTR and RTL
 */

document.addEventListener('DOMContentLoaded', () => {
    const rtlToggle = document.getElementById('rtl-toggle');
    const htmlTag = document.documentElement;

    // Check for saved preference
    const currentDir = localStorage.getItem('dir') || 'ltr';
    htmlTag.setAttribute('dir', currentDir);
    updateRTLButton(currentDir);

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const newDir = htmlTag.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
            htmlTag.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRTLButton(newDir);
        });
    }

    function updateRTLButton(dir) {
        if (rtlToggle) {
            rtlToggle.textContent = dir === 'ltr' ? 'RTL' : 'LTR';
        }
    }
});
