document.addEventListener("DOMContentLoaded", () => {
// Add smooth scrolling to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener("click", function(e) {
e.preventDefault();
document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior: "smooth",
});
});
});

// Main menu
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");
const menuLinks = document.querySelectorAll(".menu a");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
  menuToggle.classList.toggle("active");

  if (menu.classList.contains("active")) {
    menuLinks.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add("show");
      }, index * 100); // Delay for each link
    });
  } else {
    menuLinks.forEach((link) => {
      link.classList.remove("show");
    });
  }
});

overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
  menuToggle.classList.remove("active");
  menuLinks.forEach((link) => {
    link.classList.remove("show");
  });
});

// Initialize Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Unobserve after animation
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

// Attach observer to elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});
});
//loading
document.addEventListener("DOMContentLoaded", function() {
  var loadingOverlay = document.getElementById("loading-overlay");
  window.addEventListener("load", function() {
    // Remove the loading overlay when everything is fully loaded
    loadingOverlay.style.display = "none";
  });
});

//one shot & fast image loader
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img.lazy-load');
    
    function loadImage(image) {
        const src = image.getAttribute('data-src');
        if (src) {
            image.src = src;
            image.classList.add('loaded');
        }
    }
    
    function handleScroll() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        images.forEach(image => {
            const rect = image.getBoundingClientRect();
            if (rect.top < windowHeight + scrollTop) {
                loadImage(image);
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check images that are already in view on page load
});



