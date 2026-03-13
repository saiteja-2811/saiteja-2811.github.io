document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Timeline item click functionality
    const timelineItems = document.querySelectorAll('.timeline-item');
    let activeItem = null;

    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const details = this.querySelector('.timeline-details');
            const content = this.querySelector('.timeline-content');
            
            // If clicking the already active item, collapse it and show all content boxes
            if (activeItem === this) {
                details.style.display = 'none';
                this.classList.remove('expanded');
                
                // Show all timeline content boxes
                timelineItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.timeline-content');
                    otherContent.style.visibility = 'visible';
                    otherContent.style.height = '';
                    otherContent.style.padding = '';
                    otherContent.style.opacity = '1';
                });
                
                activeItem = null;
            } else {
                // Hide all details first
                timelineItems.forEach(otherItem => {
                    const otherDetails = otherItem.querySelector('.timeline-details');
                    otherDetails.style.display = 'none';
                    otherItem.classList.remove('expanded');
                });
                
                // Hide other timeline content boxes (but keep icons visible and items in layout)
                timelineItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        const otherContent = otherItem.querySelector('.timeline-content');
                        otherContent.style.visibility = 'hidden';
                        otherContent.style.height = '0';
                        otherContent.style.padding = '0';
                        otherContent.style.opacity = '0';
                    }
                });
                
                // Show details for clicked item
                details.style.display = 'block';
                this.classList.add('expanded');
                activeItem = this;
                
                // Smooth scroll to the expanded item
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
        
        // Add cursor pointer to indicate clickability
        item.style.cursor = 'pointer';
    });
});
