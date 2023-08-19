// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>


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
