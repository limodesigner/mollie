// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "../loader.js";
import { fetchProducts } from "./store-api.js";

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
});

export async function displayProducts() {
  const loader = document.getElementById("loader");
  const productContainer = document.getElementById("product-container");

  try {
    showLoader();

    const products = await fetchProducts();

    // Clear previous content before appending new products
    productContainer.innerHTML = "";

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      const productName = document.createElement("h4");
      productName.textContent = product.name;

      const thumbnailImage = document.createElement("img");
      thumbnailImage.src = product.images[0]?.src || "";
      thumbnailImage.alt = product.name;
      productDiv.appendChild(thumbnailImage);

      const productPrice = document.createElement("p");
      productPrice.textContent = "Price: " + "£" + product.price;

      const moreButton = document.createElement("a");
      moreButton.textContent = "More";
      moreButton.className = "more-button";
      moreButton.href = `product.html?id=${product.id}`;

      productDiv.appendChild(productName);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(moreButton);
      productContainer.appendChild(productDiv);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    hideLoader();
  }
}

const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
