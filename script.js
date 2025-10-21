// script.js
// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Header scroll effect
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Video Background Functionality
const heroSection = document.getElementById('hero');
if (heroSection) {
    // Remove any existing slideshow elements
    const heroSlideshow = document.getElementById('heroSlideshow');
    if (heroSlideshow) {
        heroSlideshow.remove();
    }

    // Create video element
    const video = document.createElement('video');
    video.id = 'heroVideo';
    video.className = 'hero-video';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    
    // Create source element
    const source = document.createElement('source');
    source.src = 'assets/videos.mp4';
    source.type = 'video/mp4';
    
    video.appendChild(source);
    
    // Add fallback text
    video.innerHTML += 'Your browser does not support the video tag.';
    
    // Insert video at the beginning of hero section
    heroSection.insertBefore(video, heroSection.firstChild);

    // Play video when user interacts with the page
    let videoPlayed = false;
    
    const playVideo = () => {
        if (!videoPlayed) {
            video.play().catch(e => {
                console.log('Video autoplay failed:', e);
            });
            videoPlayed = true;
            // Remove event listeners after first interaction
            document.removeEventListener('click', playVideo);
            document.removeEventListener('scroll', playVideo);
            document.removeEventListener('keydown', playVideo);
        }
    };

    // Add multiple interaction listeners to ensure video plays
    document.addEventListener('click', playVideo);
    document.addEventListener('scroll', playVideo);
    document.addEventListener('keydown', playVideo);

    // Also try to play on load
    window.addEventListener('load', () => {
        video.play().catch(e => {
            console.log('Video autoplay on load failed, waiting for user interaction');
        });
        
        // Animate hero content
        const heroContent = document.getElementById('heroContent');
        if (heroContent) {
            heroContent.classList.add('animate');
        }
    });

    // Handle video loading errors
    video.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        // Fallback to a background image if video fails to load
        heroSection.style.backgroundImage = 'url(https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)';
        video.style.display = 'none';
    });

    // Handle video loading success
    video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
    });
}

// Testimonial Slider
const testimonialTrack = document.getElementById('testimonialTrack');
const sliderNav = document.getElementById('sliderNav');

if (testimonialTrack && sliderNav) {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    let currentTestimonial = 0;

    // Create dots for navigation
    testimonialSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            goToTestimonial(index);
        });
        sliderNav.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function goToTestimonial(index) {
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
        dots[currentTestimonial].classList.remove('active');
        currentTestimonial = index;
        dots[currentTestimonial].classList.add('active');
    }

    // Auto-advance testimonials
    setInterval(() => {
        const next = (currentTestimonial + 1) % testimonialSlides.length;
        goToTestimonial(next);
    }, 6000);
}

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message. We will be in touch soon.');
        contactForm.reset();
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Set active page in navigation
function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setActivePage();
});
