const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const themeButton = document.querySelector(".theme-toggle");
const form = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");
const year = document.querySelector("#year");

// Mobile navigation
menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  mobileMenu.classList.toggle("open", !isOpen);
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    mobileMenu.classList.remove("open");
  });
});

// Light / dark mode
const savedTheme = localStorage.getItem("sg-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

themeButton?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "sg-theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

// Reveal elements as they enter the viewport
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Demo contact form
form?.addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();

  formMessage.textContent = `Thanks${name ? `, ${name}` : ""}! Your message is ready to connect to a real email service.`;
  form.reset();
});

if (year) {
  year.textContent = new Date().getFullYear();
}
