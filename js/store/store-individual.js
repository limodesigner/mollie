// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

// Import necessary modules
import { showLoader, hideLoader } from "../loader.js";
import { fetchSingleProd } from "./store-api.js";

// Get the product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Function to display single product details
async function displaySingleProduct(id) {
  const productDetailsContainer = document.querySelector(".product-details");

  try {
    // Show loader while fetching data
    showLoader();

    // Fetch the single product details
    const productDetails = await fetchSingleProd(id);

    if (!productDetails) {
      productDetailsContainer.innerHTML = "Product details not available.";
      return;
    }

    // Create and populate product details elements
    const productImage = document.createElement("img");
    productImage.src = productDetails.images[0].src;
    productImage.alt = productDetails.name;

    const productTitle = document.createElement("h3");
    productTitle.textContent = productDetails.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = "Price: " + productDetails.price;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";

    // Append elements to the container
    productDetailsContainer.appendChild(productImage);
    productDetailsContainer.appendChild(productTitle);
    productDetailsContainer.appendChild(productPrice);
    productDetailsContainer.appendChild(addToCartButton);
  } catch (error) {
    console.error("An error occurred while displaying product details:", error);
    productDetailsContainer.innerHTML =
      "An error occurred while fetching product details.";
  } finally {
    // Hide loader after fetching data
    hideLoader();
  }
}

// Call the displaySingleProduct function with the retrieved product ID
displaySingleProduct(id);
