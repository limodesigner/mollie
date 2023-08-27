// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "../loader.js";

const featuredApiUrl =
  "https://mollie.no/wp-json/wc/v3/products?consumer_key=ck_4610f0d6eeb34112a6c99680b0dc29e1bfbf0068&consumer_secret=cs_7f1291d689278bcb23359a9a9662dbac95a4a1a4";

async function fetchFeaturedProducts() {
  try {
    const response = await fetch(`${featuredApiUrl}&featured=true`);
    const featuredProducts = await response.json();
    return featuredProducts;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

function displayFeaturedProduct(product) {
  const featuredContainer = document.querySelector(".featured-container");

  const productImage = document.createElement("img");
  productImage.src = product.images[0]?.src || "";
  productImage.alt = product.name;

  const productTitle = document.createElement("h4");
  productTitle.textContent = product.name;

  const productPrice = document.createElement("p");
  productPrice.textContent = "Price: " + "£" + product.price;

  const moreButton = document.createElement("a");
  moreButton.textContent = "More";
  moreButton.className = "more-button";
  moreButton.href = `product.html?id=${product.id}`;

  const productElement = document.createElement("div");
  productElement.appendChild(productImage);
  productElement.appendChild(productTitle);
  productElement.appendChild(productPrice);
  productElement.appendChild(moreButton);

  featuredContainer.appendChild(productElement);
}

async function fetchAndDisplayFeaturedProducts() {
  try {
    showLoader();

    const featuredProducts = await fetchFeaturedProducts();
    console.log(featuredProducts); // Log the featured products in the console

    featuredProducts.forEach((product) => {
      displayFeaturedProduct(product);
    });
  } catch (error) {
    console.error("An error occurred while fetching featured products:", error);
  } finally {
    hideLoader();
  }
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayFeaturedProducts);

const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
