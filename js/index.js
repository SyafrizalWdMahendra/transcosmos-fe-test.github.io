document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tabbing-menu button");
  const tabImage = document.querySelector(".tabbing-body img");
  const tabParagraphs = document.querySelectorAll(".tabbing-content p");

  const tabData = [
    {
      title: "Branding",
      image: "images/circle.png",
      texts: [
        "Our team of experts specializes in creating unique and effective designs",
        "We created marketing materials that were consistent with the new brand identity, such as business cards, brochures, and social media graphics.",
      ],
    },
    {
      title: "Design",
      image: "images/circle_2.png",
      texts: [
        "Innovative and effective design solutions for business of our clients",
        "We partnered with a technology startup to create a new website that would showcase their innovative product and attract investors.",
      ],
    },
    {
      title: "Marketing",
      image: "images/circle_3.png",
      texts: [
        "Our team of experienced designers and marketing professionals work closely",
        "We provided the brand with a detailed social media strategy that outlined how they could continue to grow their following and engage with their audience in the future.",
      ],
    },
  ];

  const setActiveTab = (index) => {
    tabButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
    });

    const data = tabData[index];
    if (!data) return;

    tabImage.src = data.image;
    tabImage.classList.toggle("tab-image--shifted", index > 0);
    tabImage.classList.toggle("tab-image--last-child", index > 1);
    tabParagraphs.forEach((paragraph, paragraphIndex) => {
      paragraph.classList.toggle(
        "tab-paragraphs--first",
        index > 0 && paragraphIndex === 0,
      );
      paragraph.classList.toggle(
        "tab-paragraphs--second",
        index > 0 && paragraphIndex === 1,
      );
      paragraph.classList.toggle(
        "tab-paragraphs--third",
        index > 1 && paragraphIndex === 1,
      );
      paragraph.textContent = data.texts[paragraphIndex] || "";
    });
  };

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => setActiveTab(index));
  });

  setActiveTab(0);

  const carouselTrack = document.querySelector(
    ".what-we-do-carousel .carousel-track",
  );
  const slides = Array.from(
    document.querySelectorAll(".what-we-do-carousel .carousel-slide"),
  );
  const paginationDots = Array.from(
    document.querySelectorAll(".what-we-do-pagination .paginate-circle"),
  );
  const prevButton = document.querySelector(
    ".what-we-do-pagination .carousel-btn.prev",
  );
  const nextButton = document.querySelector(
    ".what-we-do-pagination .carousel-btn.next",
  );

  if (carouselTrack && slides.length > 0) {
    let activeIndex = 0;

    const updateCarousel = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      carouselTrack.style.transform = `translateX(-${activeIndex * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });

      paginationDots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === activeIndex);
      });
    };

    prevButton?.addEventListener("click", () =>
      updateCarousel(activeIndex - 1),
    );
    nextButton?.addEventListener("click", () =>
      updateCarousel(activeIndex + 1),
    );

    paginationDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        updateCarousel(Number(dot.dataset.index || 0));
      });
    });

    updateCarousel(0);
  }
});

(function () {
  const hamburger = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("main-nav");
  const closeBtn = document.getElementById("closeBtn");
  let isOpen = false;
  closeBtn.addEventListener("click", closeMenu);

  function toggleMenu() {
    isOpen = !isOpen;
    hamburger.classList.toggle("active", isOpen);
    nav.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    hamburger.classList.remove("active");
    nav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", toggleMenu);

  nav.querySelectorAll("li, a").forEach((el) => {
    el.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 335) closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 335 &&
      isOpen &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeMenu();
  });
})();
