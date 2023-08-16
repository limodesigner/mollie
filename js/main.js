// @author Linda Moenstre <linda@digitaldesigner.no>

import { fetchAndDisplayProduct } from "./productDetail.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
if (productId) {
  fetchAndDisplayProduct(productId);
}

// back to top btn
let prevScrollPos = window.scrollY;

window.onscroll = function () {
  const currentScrollPos = window.scrollY;
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (prevScrollPos > currentScrollPos) {
    backToTopBtn.style.display = "block"; // Show the button when scrolling up
  } else {
    backToTopBtn.style.display = "none"; // Hide the button when scrolling down
  }

  prevScrollPos = currentScrollPos;
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

//copyright year
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
