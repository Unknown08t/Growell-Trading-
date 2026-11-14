
document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.classList.toggle("open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // HOMEPAGE HERO SLIDER
  const slides = document.querySelectorAll(".hero-slide");
  const previous = document.querySelector(".slide-prev");
  const next = document.querySelector(".slide-next");
  const currentNumber = document.querySelector(".current-slide");
  const progressBar = document.querySelector(".slide-progress span");

  let current = 0;
  let slideTimer;

  function showSlide(index) {
    if (!slides.length) return;

    slides[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");

    if (currentNumber) {
      currentNumber.textContent = String(current + 1).padStart(2, "0");
    }

    if (progressBar) {
      progressBar.classList.remove("playing");
      void progressBar.offsetWidth;
      progressBar.classList.add("playing");
    }

    clearInterval(slideTimer);
    slideTimer = setInterval(() => showSlide(current + 1), 6000);
  }

  if (slides.length) {
    if (previous) previous.addEventListener("click", () => showSlide(current - 1));
    if (next) next.addEventListener("click", () => showSlide(current + 1));
    showSlide(0);
  }

  // SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }

  // AUTOMATIC COPYRIGHT YEAR
  document.querySelectorAll(".year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // PRE-FILL ENQUIRY TYPE FROM SECTION PAGE LINKS
  const subjectSelect = document.querySelector("#customer-subject");
  const query = new URLSearchParams(window.location.search);
  const requestedSubject = query.get("subject");

  if (subjectSelect && requestedSubject) {
    const option = [...subjectSelect.options].find(
      option => option.text.toLowerCase() === requestedSubject.toLowerCase()
    );

    if (option) subjectSelect.value = option.value;
  }

  // CUSTOMER ENQUIRY EMAIL
  const enquiryForm = document.querySelector("#enquiry-form");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", event => {
      event.preventDefault();

      const formData = new FormData(enquiryForm);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const company = formData.get("company").trim();
      const subject = formData.get("subject").trim();
      const message = formData.get("message").trim();

      // Replace this with the verified official company email.
      const companyEmail = "REPLACE_WITH_OFFICIAL_EMAIL";

      if (companyEmail === "REPLACE_WITH_OFFICIAL_EMAIL") {
        alert("The company email has not been configured yet. Please contact the website administrator.");
        return;
      }

      const emailSubject = encodeURIComponent("Growell Website Enquiry: " + subject);
      const emailBody = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Company: " + (company || "Not provided") + "\n" +
        "Enquiry Type: " + subject + "\n\n" +
        "Message:\n" + message
      );

      window.location.href =
        `mailto:${companyEmail}?subject=${emailSubject}&body=${emailBody}`;
    });
  }

});
