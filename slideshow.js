// Slideshow Manager
const SlideshowManager = {
    slides: null,
    dots: null,
    currentSlide: 0,
    totalSlides: 4,
    slideDuration: 5000, // 5 seconds
    interval: null,

    init() {
        this.slides = document.querySelectorAll('.hero img');
        this.dots = document.querySelectorAll('.slide-nav-dot');
        
        // Set first slide as active with delay to trigger transition
        requestAnimationFrame(() => {
            this.setSlide(0);
            // Start auto-play after first slide is set
            this.startAutoPlay();
        });
        
        // Add click listeners to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.handleDotClick(index));
        });
        
        // Add ESC key listener for modals
        document.addEventListener('keydown', (e) => this.handleEscKey(e));
    },

    setSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('slide-active'));
        this.dots.forEach(dot => dot.classList.remove('dot-active'));
        
        // Add active class to current slide and dot
        this.currentSlide = index % this.totalSlides;
        this.slides[this.currentSlide].classList.add('slide-active');
        this.dots[this.currentSlide].classList.add('dot-active');
    },

    nextSlide() {
        this.setSlide(this.currentSlide + 1);
    },

    startAutoPlay() {
        this.interval = setInterval(() => this.nextSlide(), this.slideDuration);
    },

    resetAutoPlay() {
        clearInterval(this.interval);
        this.startAutoPlay();
    },

    handleDotClick(index) {
        this.setSlide(index);
        this.resetAutoPlay();
    },

    handleEscKey(event) {
        if (event.key === 'Escape') {
            // Close modals by clearing the hash (deactivates :target state)
            window.location.hash = '';
        }
    }
};

// Initialize slideshow when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    SlideshowManager.init();
});
