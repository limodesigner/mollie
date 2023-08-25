// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import {
  fetchProducts,
  fetchSingleProd,
  woocommerceBaseUrl,
} from "./store-api.js";

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

      moreButton.addEventListener("click", async () => {
        const productId = product.id;

        try {
          const singleProd = await fetchSingleProd(productId);
          navigateToSingleProductPage(singleProd.id);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      });

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

function navigateToSingleProductPage(productId) {
  window.location.href = `${woocommerceBaseUrl}/${productId}`;
}
