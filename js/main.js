// @author Linda Moenstre <linda@digitaldesigner.no>

// URL for the "get all products" endpoint
const baseUrl = "https://mollie.no/wp-json/wc/store/products?per_page=12";
const consumerKey = "ck_4610f0d6eeb34112a6c99680b0dc29e1bfbf0068";
const consumerSecret = "cs_7f1291d689278bcb23359a9a9662dbac95a4a1a4";

const productContainer = document.querySelector(".products");

export async function fetchAndDisplayProduct(url) {
  try {
    const response = await fetch(url);
    const products = await response.json();

    products.forEach(function (product) {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const productName = document.createElement("h3");
      productName.textContent = product.name;

      const productImageDiv = document.createElement("div");
      productImageDiv.classList.add("product-image");
      productImageDiv.style.backgroundImage = `url('${product.images[0]?.src}')`;

      productDiv.appendChild(productName);
      productDiv.appendChild(productImageDiv);

      productContainer.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error fetching and displaying products:", error);
  }
}

fetchAndDisplayProduct(baseUrl);

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
