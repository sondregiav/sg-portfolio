/* =========================================================
   SG PORTFOLIO
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const menuButton =
  document.querySelector(".menu-toggle");

const mobileMenu =
  document.querySelector(".mobile-menu");

const themeButton =
  document.querySelector(".theme-toggle");

const form =
  document.querySelector("#contact-form");

const formMessage =
  document.querySelector("#form-message");

const year =
  document.querySelector("#year");


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function closeMobileMenu() {

  if (!menuButton || !mobileMenu) {
    return;
  }

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "Open menu"
  );

  mobileMenu.classList.remove(
    "open"
  );

}


menuButton?.addEventListener(
  "click",
  () => {

    const isOpen =
      menuButton.getAttribute(
        "aria-expanded"
      ) === "true";


    menuButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );


    menuButton.setAttribute(
      "aria-label",
      isOpen
        ? "Open menu"
        : "Close menu"
    );


    mobileMenu?.classList.toggle(
      "open",
      !isOpen
    );

  }
);


document
  .querySelectorAll(".mobile-menu a")
  .forEach(link => {

    link.addEventListener(
      "click",
      closeMobileMenu
    );

  });


/* Close mobile menu with Escape */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeMobileMenu();
    }

  }
);


/* =========================================================
   LIGHT / DARK MODE
   ========================================================= */

const savedTheme =
  localStorage.getItem("sg-theme");


if (savedTheme === "light") {

  document.body.classList.add(
    "light"
  );

}


function updateThemeLabel() {

  if (!themeButton) {
    return;
  }

  const isLight =
    document.body.classList.contains(
      "light"
    );


  themeButton.setAttribute(
    "aria-label",
    isLight
      ? "Switch to dark mode"
      : "Switch to light mode"
  );

}


updateThemeLabel();


themeButton?.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "light"
    );


    const theme =
      document.body.classList.contains(
        "light"
      )
        ? "light"
        : "dark";


    localStorage.setItem(
      "sg-theme",
      theme
    );


    updateThemeLabel();

  }
);


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

const revealItems =
  document.querySelectorAll(
    ".reveal"
  );


if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.classList.add(
            "visible"
          );


          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealItems.forEach(item => {

    observer.observe(item);

  });

} else {

  revealItems.forEach(item => {

    item.classList.add(
      "visible"
    );

  });

}


/* =========================================================
   CONTACT FORM — FORMSPREE
   ========================================================= */

form?.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const submitButton =
      form.querySelector(
        'button[type="submit"]'
      );


    const formData =
      new FormData(form);


    /* Disable button while sending */

    if (submitButton) {

      submitButton.disabled = true;

      submitButton.innerHTML =
        `Sending... <span>↗</span>`;

    }


    /* Clear previous message */

    if (formMessage) {

      formMessage.textContent = "";

      formMessage.className =
        "form-message";

    }


    try {

      const response =
        await fetch(
          form.action,
          {
            method: "POST",

            body: formData,

            headers: {
              Accept: "application/json"
            }
          }
        );


      /* Treat non-2xx responses as errors */

      if (!response.ok) {

        throw new Error(
          "Form submission failed."
        );

      }


      /* Successful submission */

      if (formMessage) {

        formMessage.textContent =
          "Message sent successfully. Thanks for reaching out!";

        formMessage.classList.add(
          "success"
        );

      }


      /* Clear the form */

      form.reset();


    } catch (error) {

      /* Submission failed */

      if (formMessage) {

        formMessage.textContent =
          "Something went wrong. Please try again or email me directly.";

        formMessage.classList.add(
          "error"
        );

      }

    } finally {

      /* Re-enable button */

      if (submitButton) {

        submitButton.disabled = false;

        submitButton.innerHTML =
          `Send message <span>↗</span>`;

      }

    }

  }
);


/* =========================================================
   CURRENT YEAR
   ========================================================= */

if (year) {

  year.textContent =
    new Date().getFullYear();

}