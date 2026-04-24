// Configuration
const SLIDESHOW_CONFIG = {
    TOTAL_SLIDES: 6,
    SLIDE_DURATION: 5000, // 5 seconds
};

// Slideshow Manager
const SlideshowManager = {
    slides: null,
    dots: null,
    currentSlide: 0,
    interval: null,
    touchStartX: 0,
    touchEndX: 0,

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
        
        // Touch swipe support for mobile
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e), false);
    },

    setSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('slide-active'));
        this.dots.forEach(dot => dot.classList.remove('dot-active'));
        
        this.currentSlide = ((index % SLIDESHOW_CONFIG.TOTAL_SLIDES) + SLIDESHOW_CONFIG.TOTAL_SLIDES) % SLIDESHOW_CONFIG.TOTAL_SLIDES;
        this.slides[this.currentSlide].classList.add('slide-active');
        this.dots[this.currentSlide].classList.add('dot-active');
        this.updateLocation();
    },

    updateLocation() {
        const location = this.slides[this.currentSlide].getAttribute('data-location');
        const locationDisplay = document.querySelector('.image-location');
        locationDisplay.innerHTML = '';
        
        const div = document.createElement('div');
        const label = document.createElement('span');
        label.className = 'location-label';
        label.textContent = 'Location';
        div.appendChild(label);
        
        const br = document.createElement('br');
        div.appendChild(br);
        
        const locationText = document.createTextNode(location);
        div.appendChild(locationText);
        
        locationDisplay.appendChild(div);
    },

    nextSlide() {
        this.setSlide(this.currentSlide + 1);
    },

    prevSlide() {
        this.setSlide(this.currentSlide - 1);
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

    handleTouchStart(event) {
        this.touchStartX = event.changedTouches[0].screenX;
        this.stopAutoPlay();
    },

    handleTouchEnd(event) {
        this.touchEndX = event.changedTouches[0].screenX;
        this.handleSwipe();
    },

    handleSwipe() {
        const diff = this.touchStartX - this.touchEndX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? this.nextSlide() : this.prevSlide();
            this.resetAutoPlay();
        }
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
