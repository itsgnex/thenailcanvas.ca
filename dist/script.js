const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const serviceButtons = document.querySelectorAll(".service-item");
const serviceImage = document.querySelector("[data-service-image]");
const dragRails = document.querySelectorAll("[data-drag-scroll]");

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

serviceButtons.forEach((button) => {
  const activate = () => {
    serviceButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    if (serviceImage) {
      serviceImage.src = button.dataset.image;
    }
  };

  button.addEventListener("mouseenter", activate);
  button.addEventListener("focus", activate);
  button.addEventListener("click", activate);
});

dragRails.forEach((rail) => {
  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  rail.addEventListener("pointerdown", (event) => {
    isDown = true;
    startX = event.clientX;
    startScroll = rail.scrollLeft;
    rail.setPointerCapture(event.pointerId);
  });

  rail.addEventListener("pointermove", (event) => {
    if (!isDown) return;
    rail.scrollLeft = startScroll - (event.clientX - startX);
  });

  rail.addEventListener("pointerup", () => {
    isDown = false;
  });

  rail.addEventListener("pointercancel", () => {
    isDown = false;
  });
});
