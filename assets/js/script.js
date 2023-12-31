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
