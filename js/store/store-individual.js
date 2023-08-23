// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from './loader.js';

const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get("productID");
console.log(productID);

const singleProductUrl = `https://www.mollie.no/wp-json/wc/store/products/${productID}`;

async function fetchProductDetails(productID) {
  try {
    const response = await fetch(singleProductUrl);

    if (!response.ok) {
      throw new Error(
        `Error fetching product details: ${response.status} ${response.statusText}`
      );
    }

    const productDetails = await response.json();
    return productDetails;
  } catch (error) {
    console.error("An error occurred while fetching product details:", error);
    return null;
  }
}

async function displayIndividualProduct(productID) {
  const productDetailsContainer = document.getElementById("product-details");
  const loader = document.getElementById("loader");

  try {
    loader.style.display = "block";

    const productDetails = await fetchProductDetails(productID);

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
    loader.style.display = "none";
  }
}

displayIndividualProduct(productID);
