// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

// Update icon based on current theme
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
}

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const navActions = document.querySelector(".nav-actions");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  navActions.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    navActions.classList.remove("active");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Card hover effects and interactions
document.querySelectorAll(".opportunity-card").forEach((card) => {
  card.addEventListener("click", () => {
    const cardType = card.classList[1]; // Get the second class (e.g., 'internships-card')
    const section = cardType.replace("-card", "");

    // You can add navigation logic here
    console.log(`Navigating to ${section} section`);

    // Add a subtle click animation
    card.style.transform = "scale(0.95)";
    setTimeout(() => {
      card.style.transform = "";
    }, 150);
  });
});

// User card interactions
document.querySelectorAll(".user-card").forEach((card) => {
  card.addEventListener("click", () => {
    // Add click interaction for user cards
    card.style.transform = "scale(0.98)";
    setTimeout(() => {
      card.style.transform = "";
    }, 150);
  });
});

// Know How button functionality
const knowHowBtn = document.getElementById("knowHowBtn");
let isExpanded = false;

knowHowBtn.addEventListener("click", () => {
  isExpanded = !isExpanded;
  const icon = knowHowBtn.querySelector("i");

  if (isExpanded) {
    icon.style.transform = "rotate(180deg)";
    // You can add content expansion logic here
    console.log("Know How section expanded");
  } else {
    icon.style.transform = "rotate(0deg)";
    console.log("Know How section collapsed");
  }
});

// Search functionality
const searchInput = document.querySelector(".nav-search input");
if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const searchTerm = e.target.value.trim();
      if (searchTerm) {
        console.log(`Searching for: ${searchTerm}`);
        // Add search functionality here
        alert(`Searching for: ${searchTerm}`);
      }
    }
  });
}

// Add loading animation for cards on page load
window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".opportunity-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Animate user cards
  const userCards = document.querySelectorAll(".user-card");
  userCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateX(-20px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateX(0)";
    }, index * 200 + 800);
  });
});

// Add scroll-based animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document
  .querySelectorAll(".users-section, .know-how-section")
  .forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s ease";
    observer.observe(section);
  });

// Add ripple effect to buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
