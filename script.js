// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animation for sections
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            section.classList.add('active');
        }
    });
});

// Form submission handling
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    });
}

// Text Typing Animation
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if(elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.classList.add('fade-in-up');
        }
    });
}

// Particle Background
function createParticles() {
    const particles = document.querySelector('.particles');
    const numberOfParticles = 50;
    
    for(let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5}px;
            height: ${Math.random() * 5}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 5}s linear infinite;
        `;
        particles.appendChild(particle);
    }
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

function initTextSlider() {
    const textElement = document.querySelector('.text-slider');
    if (!textElement) return;

    const texts = JSON.parse(textElement.getAttribute('data-text'));
    let currentIndex = 0;

    function updateText() {
        textElement.style.opacity = '0';
        setTimeout(() => {
            textElement.textContent = texts[currentIndex];
            textElement.style.opacity = '1';
            currentIndex = (currentIndex + 1) % texts.length;
        }, 500);
    }

    updateText();
    setInterval(updateText, 3000);
}

// Education Timeline Animation
function animateEducationTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const animationDelay = 200; // Delay between each item animation

    timelineItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.classList.add('animate-timeline');
                    }, index * animationDelay);
                    observer.unobserve(item);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(item);
    });
}

// Stagger Animation for Education Details
function animateEducationDetails() {
    const detailsLists = document.querySelectorAll('.education-details');
    
    detailsLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// Add custom cursor functionality
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        // Update cursor position immediately
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    });

    // Smooth animation for cursor dot
    function animateDot() {
        const dx = cursorX - dotX;
        const dy = cursorY - dotY;
        
        dotX += dx * 0.2;
        dotY += dy * 0.2;
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateDot);
    }
    
    animateDot();

    // Add hover states for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .achievement-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'var(--accent-color)';
            cursorDot.style.opacity = '0';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--secondary-color)';
            cursorDot.style.opacity = '1';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn) return; // Exit if menu button doesn't exist

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling to document
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-content') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Init TypeWriter
    const txtElement = document.querySelector('.text-slider');
    const words = JSON.parse(txtElement.getAttribute('data-text'));
    new TypeWriter(txtElement, words);

    // Init Particles
    createParticles();

    // Init Progress Bars
    animateProgressBars();

    // Add animation classes to elements
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate');
    });

    // Scroll Animation
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    initTextSlider();
    handleScrollAnimations();
    
    // Initialize education section animations
    animateEducationTimeline();
    animateEducationDetails();
    
    // Add hover effect for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dot = item.querySelector('.timeline-dot');
            dot.style.transform = 'scale(1.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            const dot = item.querySelector('.timeline-dot');
            dot.style.transform = 'scale(1)';
        });
    });

    addScrollProgressBar();
    addBackToTopButton();
    
    initCustomCursor();
    initMobileMenu();
});

function handleScrollAnimations() {
    // Education timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe both timeline items and skill cards
    timelineItems.forEach(item => observer.observe(item));
    skillCards.forEach(card => observer.observe(card));
}

// Add a scroll progress indicator
function addScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Add a "Back to Top" button
function addBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Email handling function
function sendEmail(e) {
    e.preventDefault();

    // Get the form elements
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Get the button
    const submitBtn = document.querySelector('.send-message-btn');
    const originalText = submitBtn.innerHTML;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.classList.remove('success', 'error');

    // Send email using EmailJS
    emailjs.send("service_ygovc0i", "template_i94xbal", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
    }).then(
        function(response) {
            // Success state
            submitBtn.classList.add('success');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
            }, 3000);
        },
        function(error) {
            // Error state
            submitBtn.classList.add('error');
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to Send';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('error');
            }, 3000);
            
            console.error("Failed to send email:", error);
        }
    );

    return false;
}
