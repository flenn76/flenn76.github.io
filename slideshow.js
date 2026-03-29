// Configuration
const SLIDESHOW_CONFIG = {
    TOTAL_SLIDES: 4,
    SLIDE_DURATION: 5000, // 5 seconds
};

// Slideshow Manager
const SlideshowManager = {
    slides: null,
    dots: null,
    currentSlide: 0,
    interval: null,

    init() {
        this.slides = document.querySelectorAll('.hero img');
        this.dots = document.querySelectorAll('.slide-nav-dot');
        this.setupEventListeners();
        
        // Set first slide as active with delay to trigger transition
        requestAnimationFrame(() => {
            this.setSlide(0);
            this.startAutoPlay();
        });
    },

    setupEventListeners() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.handleDotClick(index));
        });
        
        document.addEventListener('keydown', (e) => this.handleEscKey(e));
        
        // Protect images from being downloaded
        // 1. Disable context menu (right-click)
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // 2. Disable drag and drop
        document.addEventListener('dragstart', (e) => e.preventDefault());
        
        // 3. Block save keyboard shortcuts (Ctrl+S, Cmd+S)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
            }
        });
    },

    setSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('slide-active'));
        this.dots.forEach(dot => dot.classList.remove('dot-active'));
        
        // Set and activate current slide
        this.currentSlide = index % SLIDESHOW_CONFIG.TOTAL_SLIDES;
        this.slides[this.currentSlide].classList.add('slide-active');
        this.dots[this.currentSlide].classList.add('dot-active');
    },

    nextSlide() {
        this.setSlide(this.currentSlide + 1);
    },

    startAutoPlay() {
        this.interval = setInterval(
            () => this.nextSlide(),
            SLIDESHOW_CONFIG.SLIDE_DURATION
        );
    },

    stopAutoPlay() {
        clearInterval(this.interval);
    },

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    },

    handleDotClick(index) {
        this.setSlide(index);
        this.resetAutoPlay();
    },

    handleEscKey(event) {
        if (event.key === 'Escape') {
            window.location.hash = '';
        }
    },
};

// Initialize slideshow when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    SlideshowManager.init();
});
