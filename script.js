
// PAGE LOADER
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader").classList.add("hide");
  }, 900);
});

// NAVBAR SCROLL EFFECT
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// MOBILE MENU
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.textContent =
    navLinks.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

// SCROLL REVEAL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// Scroll-driven taco assembly: activate the step closest to the viewport center.
const tacoBuild = document.querySelector("#tacoBuild");
const tacoPhoto = document.querySelector("#tacoPhoto");
const prepSteps = [...document.querySelectorAll(".prep-step")];

if (tacoBuild && prepSteps.length) {
  const prepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const step = Number(entry.target.dataset.step);
      tacoBuild.dataset.stage = step;
      if (tacoPhoto && entry.target.dataset.image && tacoPhoto.getAttribute("src") !== entry.target.dataset.image) {
        tacoPhoto.classList.remove("photo-arrive");
        tacoPhoto.src = entry.target.dataset.image;
        void tacoPhoto.offsetWidth;
        tacoPhoto.classList.add("photo-arrive");
      }
      prepSteps.forEach((item, index) => item.classList.toggle("active", index === step));
    });
  }, { rootMargin: "-38% 0px -38% 0px", threshold: 0 });

  prepSteps.forEach(step => prepObserver.observe(step));
  tacoBuild.dataset.stage = "0";
}

// 3D TILT EFFECT
const canHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

if (canHover) {
  document.querySelectorAll(".tilt-card").forEach(card => {

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

  });
}

// HERO PARALLAX
const heroVisual = document.querySelector(".hero-visual");

if (canHover && heroVisual) {
  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;

    heroVisual.style.transform =
      `translate3d(${x}px, ${y}px, 0)`;
  });
}

// SCROLL PROGRESS / HERO DEPTH
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  if (heroVisual && window.innerWidth > 700) {
    heroVisual.style.opacity = Math.max(
      0.3,
      1 - scroll / 1000
    );
  }
});
