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

// ======== CONTACT FORM HANDLING ========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async function(event) {
    // Prevent the default page reload
    event.preventDefault();

    // Change button text so the user knows it's working
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    // Package the form data
    const formData = new FormData(contactForm);

    try {
        // Send the data to Formspree
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Success!
            formStatus.innerText = "Message sent successfully! I'll be in touch soon.";
            formStatus.style.color = "#15803d"; 
            formStatus.style.display = "block";
            contactForm.reset(); // Clear the form
        } else {
            // Formspree returned an error
            formStatus.innerText = "Oops! There was a problem sending your message.";
            formStatus.style.color = "#b91c1c"; 
            formStatus.style.display = "block";
        }
    } catch (error) {
        // Network error
        formStatus.innerText = "Network error. Please try again later.";
        formStatus.style.color = "#b91c1c";
        formStatus.style.display = "block";
    } finally {
        // Reset the button
        submitBtn.innerText = "Send Message";
        submitBtn.disabled = false;

        setTimeout(() => {
            formStatus.style.display = "none";
        }, 5000);
    }
});