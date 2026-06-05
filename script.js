const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const accordions = document.querySelectorAll(".accordion-trigger");
const filterButtons = document.querySelectorAll(".filter-button");
const galleryCards = document.querySelectorAll(".gallery-card");
const modal = document.querySelector("#imageModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalImageLabel = document.querySelector("#modalImageLabel");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const contactForm = document.querySelector("#contactForm");
const formResponse = document.querySelector("#formResponse");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

accordions.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const panel = trigger.nextElementSibling;
    const isOpen = trigger.classList.contains("open");

    trigger.classList.toggle("open", !isOpen);

    if (isOpen) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    galleryCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !matches);
    });
  });
});

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
    modalImageLabel.textContent = card.dataset.title;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formResponse.classList.add("visible");
  contactForm.reset();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");

      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});
