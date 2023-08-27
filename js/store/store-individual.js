// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "../loader.js";
import { fetchSingleProd } from "./store-api.js";

const singleProductContainer = document.querySelector(".product-details");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  location.href = "/";
}

async function displaySingleProduct() {
  try {
    showLoader();

    const productDetails = await fetchSingleProd(id);

    if (
      !productDetails ||
      !productDetails.images ||
      productDetails.images.length === 0
    ) {
      singleProductContainer.innerHTML = "Product details not available.";
      return;
    }

    const { images, name, price, description, stock_quantity } = productDetails;

    const productImage = document.createElement("img");
    productImage.src = images[0]?.src || "";
    productImage.alt = name;

    const productTitle = document.createElement("h3");
    productTitle.textContent = name;

    const productPrice = document.createElement("p");
    productPrice.textContent = "Price: " + "£" + price;

    const addToCartButton = document.createElement("a");
    addToCartButton.textContent = "Add to Cart";

    const productDescription = document.createElement("p");
    productDescription.textContent = description;

    const productStockquantity = document.createElement("div");
    productStockquantity.textContent = "Stock level: " + stock_quantity;

    singleProductContainer.appendChild(productImage);
    singleProductContainer.appendChild(productTitle);
    singleProductContainer.appendChild(productPrice);
    singleProductContainer.appendChild(addToCartButton);
    singleProductContainer.appendChild(productDescription);
    singleProductContainer.appendChild(productStockquantity);

    const modifiedDescription = productDescription.textContent
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "");
    productDescription.textContent = modifiedDescription;
  } catch (error) {
    console.error("An error occurred while displaying product details:", error);
    singleProductContainer.innerHTML =
      "An error occurred while fetching product details.";
  } finally {
    hideLoader();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displaySingleProduct();
});

const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
