// Language switcher for modals
document.querySelectorAll('.lang-switcher').forEach(switcher => {
    switcher.addEventListener('click', function() {
        const targetLang = this.dataset.lang;
        const modal = this.closest('.modal-panel');
        
        // Update active state
        modal.querySelectorAll('.lang-switcher').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        
        // Hide/show content
        modal.querySelectorAll('.modal-content').forEach(content => {
            if (content.dataset.lang === targetLang) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    });
});
