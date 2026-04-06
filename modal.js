// Language switcher for modals
document.querySelectorAll('.lang-switcher').forEach(switcher => {
    switcher.addEventListener('click', function() {
        const modal = this.closest('.modal-panel');
        const targetLang = this.dataset.lang;
        
        modal.querySelectorAll('.lang-switcher').forEach(s => s.classList.toggle('active', s === this));
        modal.querySelectorAll('.modal-content').forEach(content => {
            content.classList.toggle('hidden', content.dataset.lang !== targetLang);
        });
    });
});

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
