// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { fetchProducts, fetchSingleProd, woocommerceBaseUrl } from "./store-api.js";

export async function displayProducts() {
  const loader = document.getElementById("loader");
  const productContainer = document.getElementById("product-container");

  try {
    loader.style.display = "block";
    productContainer.innerHTML = "";

    const products = await fetchProducts();

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      const productName = document.createElement("h4");
      productName.textContent = product.name;

      const thumbnailImage = document.createElement("img");
      thumbnailImage.src = product.images[0].src;
      thumbnailImage.alt = product.name;
      productDiv.appendChild(thumbnailImage);

      const productPrice = document.createElement("p");
      productPrice.textContent = "Price: " + product.price;

      const moreButton = document.createElement("button");
      moreButton.textContent = "More";
      moreButton.className = "more-button";

      moreButton.addEventListener("click", () => {
        navigateToSingleProductPage(product.id);
      });

    function navigateToSingleProductPage(id) {
        fetchSingleProd(id).then((singleProdUrl) => {
          window.location.href = woocommerceBaseUrl + singleProdUrl; // Navigate to the product URL
        });
      }

      productDiv.appendChild(productName);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(moreButton);
      productContainer.appendChild(productDiv);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    loader.style.display = "none";
  }
}
