document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeMobileMenu();
  initializeScrollEffects();
  initializeHoverEffects();
  initializeContactForm();
  initializeSkillBars();
  initializeAboutAnimations();
  initializeAnimations();
});
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
        closeMobileMenu();
      }
    });
  });
  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}
function initializeMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    const spans = hamburger.querySelectorAll("span");
    if (hamburger.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });
}
function closeMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const spans = hamburger.querySelectorAll("span");
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  spans[0].style.transform = "none";
  spans[1].style.opacity = "1";
  spans[2].style.transform = "none";
}
function initializeScrollEffects() {
  const welcomeSection = document.getElementById("welcome-section");
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax effect for welcome section
    if (welcomeSection) {
      welcomeSection.style.transform = `translateY(${rate}px)`;
    }

    // Navbar background opacity based on scroll
    if (navbar) {
      const opacity = Math.min(scrolled / 100, 1);
      navbar.style.background = `rgba(255, 255, 255, ${0.85 + opacity * 0.15})`;
      navbar.style.backdropFilter = `blur(${10 + scrolled * 0.1}px)`;
    }
  });
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);
  const projectTiles = document.querySelectorAll(".project-tile");
  const skillTags = document.querySelectorAll(".skill-tag");
  const contactItems = document.querySelectorAll(".contact-item");
  [...projectTiles, ...skillTags, ...contactItems].forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}
function initializeAnimations() {
  const welcomeTitle = document.querySelector("#welcome-section h1");
  if (welcomeTitle) {
    const text = welcomeTitle.textContent;
    welcomeTitle.textContent = "";
    let i = 0;
    const typeWriter = function () {
      if (i < text.length) {
        welcomeTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      } else {
        // Add cursor blink effect
        welcomeTitle.style.borderRight = "3px solid white";
        welcomeTitle.style.animation = "blink 1s infinite";
        setTimeout(() => {
          welcomeTitle.style.borderRight = "none";
          welcomeTitle.style.animation = "none";
        }, 3000);
      }
    };
    setTimeout(typeWriter, 800);
  }
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(2deg)";
    });
    tag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });
  const projectTiles = document.querySelectorAll(".project-tile");
  projectTiles.forEach((tile) => {
    tile.addEventListener("mouseenter", function () {
      const projectLinks = this.querySelectorAll(".project-link");
      projectLinks.forEach((link) => {
        link.style.transform = "translateY(-2px)";
      });
    });
    tile.addEventListener("mouseleave", function () {
      const projectLinks = this.querySelectorAll(".project-link");
      projectLinks.forEach((link) => {
        link.style.transform = "translateY(0)";
      });
    });
  });
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    });
    scrollIndicator.style.cursor = "pointer";
  }
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px) scale(1.05)";
    });
    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0) scale(1)";
    });
  });
}
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  });
});
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Add smooth page load animation
  const elements = document.querySelectorAll(
    ".nav-link, .btn, .project-tile, .skill-category"
  );
  elements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "all 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Initialize particle effect for welcome section
  createParticleEffect();
});

function createParticleEffect() {
  const welcomeSection = document.getElementById("welcome-section");
  if (!welcomeSection) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
      `;
    welcomeSection.appendChild(particle);
  }
}
const throttledScrollHandler = debounce(function () {}, 16);
window.addEventListener("scroll", throttledScrollHandler);
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("input", clearFieldError);
    });
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const subject = formData.get("subject").trim();
      const message = formData.get("message").trim();
      let isValid = true;
      if (!validateName(name)) isValid = false;
      if (!validateEmail(email)) isValid = false;
      if (!validateSubject(subject)) isValid = false;
      if (!validateMessage(message)) isValid = false;
      if (!isValid) {
        showFormError("Please correct the errors above");
        return;
      }
      const submitButton = this.querySelector(".form-submit");
      const originalText = submitButton.textContent;
      submitButton.innerHTML = "<span>Sending...</span>";
      submitButton.disabled = true;
      submitButton.style.background = "#ccc";
      const loadingDots = document.createElement("span");
      loadingDots.className = "loading-dots";
      loadingDots.innerHTML = "<span>.</span><span>.</span><span>.</span>";
      submitButton.appendChild(loadingDots);
      setTimeout(() => {
        submitButton.innerHTML = "✓ Message Sent!";
        submitButton.style.background = "#28a745";
        showFormSuccess(
          "Thank you for your message! I'll get back to you within 24 hours."
        );
        setTimeout(() => {
          this.reset();
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
          submitButton.style.background = "";
          clearAllErrors();
        }, 3000);
      }, 2000);
    });
  }
}
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  switch (field.name) {
    case "name":
      validateName(value, field);
      break;
    case "email":
      validateEmail(value, field);
      break;
    case "subject":
      validateSubject(value, field);
      break;
    case "message":
      validateMessage(value, field);
      break;
  }
}
function validateName(name, field = null) {
  const nameField = field || document.getElementById("name");
  if (!name || name.length < 2) {
    showFieldError(nameField, "Name must be at least 2 characters long");
    return false;
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    showFieldError(
      nameField,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    );
    return false;
  }
  clearFieldError(nameField);
  return true;
}
function validateEmail(email, field = null) {
  const emailField = field || document.getElementById("email");
  if (!email) {
    showFieldError(emailField, "Email is required");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFieldError(emailField, "Please enter a valid email address");
    return false;
  }
  clearFieldError(emailField);
  return true;
}
function validateSubject(subject, field = null) {
  const subjectField = field || document.getElementById("subject");
  if (!subject || subject.length < 3) {
    showFieldError(subjectField, "Subject must be at least 3 characters long");
    return false;
  }
  if (subject.length > 100) {
    showFieldError(subjectField, "Subject must be less than 100 characters");
    return false;
  }
  clearFieldError(subjectField);
  return true;
}
function validateMessage(message, field = null) {
  const messageField = field || document.getElementById("message");
  if (!message || message.length < 10) {
    showFieldError(messageField, "Message must be at least 10 characters long");
    return false;
  }
  if (message.length > 1000) {
    showFieldError(messageField, "Message must be less than 1000 characters");
    return false;
  }
  clearFieldError(messageField);
  return true;
}
function showFieldError(field, message) {
  clearFieldError(field);
  field.style.borderColor = "#ff6b6b";
  field.style.background = "rgba(255, 107, 107, 0.1)";
  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `color: #ff6b6b;font-size: 0.8rem;margin-top: 0.3rem;animation: fadeIn 0.3s ease;`;
  field.parentNode.appendChild(errorDiv);
}
function clearFieldError(field) {
  if (typeof field === "object" && field.target) {
    field = field.target;
  }
  field.style.borderColor = "";
  field.style.background = "";
  const existingError = field.parentNode.querySelector(".field-error");
  if (existingError) {
    existingError.remove();
  }
}
function clearAllErrors() {
  const errors = document.querySelectorAll(
    ".field-error, .form-error, .form-success"
  );
  errors.forEach((error) => error.remove());
  const fields = document.querySelectorAll(
    "#contact-form input, #contact-form textarea"
  );
  fields.forEach((field) => {
    field.style.borderColor = "";
    field.style.background = "";
  });
}
function showFormError(message) {
  clearFormMessages();
  const errorDiv = document.createElement("div");
  errorDiv.className = "form-error";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `background: rgba(255, 107, 107, 0.1);color: #ff6b6b;padding: 1rem;border-radius: 8px;margin-bottom: 1rem;border: 1px solid rgba(255, 107, 107, 0.3);animation: slideDown 0.3s ease;`;
  const form = document.getElementById("contact-form");
  form.insertBefore(errorDiv, form.firstChild);
}
function showFormSuccess(message) {
  clearFormMessages();
  const successDiv = document.createElement("div");
  successDiv.className = "form-success";
  successDiv.textContent = message;
  successDiv.style.cssText = `background: rgba(40, 167, 69, 0.1);color: #28a745;padding: 1rem;border-radius: 8px;margin-bottom: 1rem;border: 1px solid rgba(40, 167, 69, 0.3);animation: slideDown 0.3s ease;`;
  const form = document.getElementById("contact-form");
  form.insertBefore(successDiv, form.firstChild);
}
function clearFormMessages() {
  const messages = document.querySelectorAll(".form-error, .form-success");
  messages.forEach((message) => message.remove());
}
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");
  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const level = bar.getAttribute("data-level");
      const rect = bar.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        setTimeout(() => {
          bar.style.width = level + "%";
        }, Math.random() * 500);
      }
    });
  };
  animateSkillBars();
  window.addEventListener("scroll", debounce(animateSkillBars, 100));
}
function initializeAboutAnimations() {
  const profileImage = document.querySelector(".profile-svg");
  const highlightItems = document.querySelectorAll(".highlight-item");
  const skillCategories = document.querySelectorAll(".skill-category");
  if (profileImage) {
    profileImage.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)";
    });
    profileImage.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  }
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 200);
      }
    });
  }, observerOptions);
  highlightItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.6s ease";
    highlightObserver.observe(item);
  });
  const categoryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 300);
      }
    });
  }, observerOptions);
  skillCategories.forEach((category) => {
    category.style.opacity = "0";
    category.style.transform = "translateY(40px)";
    category.style.transition = "all 0.8s ease";
    categoryObserver.observe(category);
  });
}
