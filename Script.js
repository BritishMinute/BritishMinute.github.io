document.addEventListener("DOMContentLoaded", function() {
    // Loader animation
    const loader = document.getElementById('loader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';  // Enable scrolling after load
        }, 1000);
    });

    // Hero Title Typewriter Effect
    new Typed('#hero-title', {
        strings: ["Hi, I'm BritishMinute", "A Web Developer", "A Designer", "A Creator"],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        startDelay: 500,
        loop: true
    });

    // Sticky Header
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
