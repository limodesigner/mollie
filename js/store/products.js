import { showLoader, hideLoader } from "../loader.js";
import { fetchProducts, woocommerceBaseUrl } from "./store-api.js";

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
      productPrice.textContent = "Price: " + product.price;

      const moreButton = document.createElement("button");
      moreButton.textContent = "More";
      moreButton.className = "more-button";

      moreButton.addEventListener("click", () => {
        window.location.href = `${woocommerceBaseUrl}/${product.id}`;
      });

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
