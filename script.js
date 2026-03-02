// Grab all elements that have the hidden class
const hiddenElements = document.querySelectorAll('.hidden-scroll');

// Create the Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // If the element has entered the viewport
        if (entry.isIntersecting) {
            // Add the class that animates it in
            entry.target.classList.add('show-scroll');
            
            // Unobserve the element so the animation only happens once
            observer.unobserve(entry.target);
        }
    });
}, {
    // Triggers when 15% of the element is visible
    threshold: 0.15, 
    // Triggers slightly before the bottom of the screen
    rootMargin: "0px 0px -50px 0px" 
});

// Tell the observer to watch every hidden element
hiddenElements.forEach((el) => observer.observe(el));

// ==== MOBILE NAVIGATION TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');

    // Hamburger Animation
    hamburger.classList.toggle('toggle');
});

// Close the menu automatically when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
    });
});