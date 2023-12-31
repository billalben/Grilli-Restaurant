"use strict";

// ?=== Preloader
const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// Add event listener on multiple elements
const addEventOnElements = function (elements, eventType, callback) {
  for (const item of elements) item.addEventListener(eventType, callback);
};

// ?=== Navbar
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

// ?=== Header
const header = document.querySelector("[data-header]");
let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  header.classList[isScrollBottom ? "add" : "remove"]("hide");

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 60) {
    header.classList.add("active");
    hideHeader();
  } else header.classList.remove("active");
});

// ? === Hero Slider
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

const heroSliderItemsLength = heroSliderItems.length - 1;

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItemsLength) currentSlidePos = 0;
  else currentSlidePos++;

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) currentSlidePos = heroSliderItemsLength;
  else currentSlidePos--;

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

// Auto Slide
let autoSlideInterval;
const autoSlide = function () {
  autoSlideInterval = setInterval(() => {
    slideNext();
  }, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", () => {
  clearInterval(autoSlideInterval);
});

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);