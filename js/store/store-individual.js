// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "../loader.js";
import { fetchSingleProd } from "./store-api.js";

const productDetailsContainer = document.querySelector(".product-details");

const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");

async function displaySingleProduct() {
  try {
    showLoader();

    const productDetails = await fetchSingleProd(id);

    if (!productDetails) {
      productDetailsContainer.innerHTML = "Product details not available.";
      return;
    }

    const productImage = document.createElement("img");
    productImage.src = productDetails.images[0].src;
    productImage.alt = productDetails.name;

    const productTitle = document.createElement("h3");
    productTitle.textContent = productDetails.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = "Price: " + productDetails.price;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";

    productDetailsContainer.appendChild(productImage);
    productDetailsContainer.appendChild(productTitle);
    productDetailsContainer.appendChild(productPrice);
    productDetailsContainer.appendChild(addToCartButton);
  } catch (error) {
    console.error("An error occurred while displaying product details:", error);
    productDetailsContainer.innerHTML =
      "An error occurred while fetching product details.";
  } finally {
    hideLoader();
  }
}

displaySingleProduct();
