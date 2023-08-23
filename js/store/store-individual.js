// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get("productID");

const singleProductUrl = `https://www.mollie.no/wp-json/wc/store/products/${productID}`;

async function fetchAndDisplayProductDetails(productID) {
  const loader = document.getElementById("loader");

  try {
    loader.style.display = "block"; // Show the loader

    const response = await fetch(singleProductUrl);

    if (!response.ok) {
      throw new Error(
        `Error fetching product details: ${response.status} ${response.statusText}`
      );
    }

    const productDetails = await response.json();

    const productImage = document.querySelector(".product-image");
    const productName = document.querySelector(".product-name");
    const productPrice = document.querySelector(".product-price");

    productImage.src = productDetails.images[0].src;
    productImage.alt = productDetails.name;
    productName.textContent = productDetails.name;
    productPrice.textContent = "Price: " + productDetails.price;
  } catch (error) {
    console.error("An error occurred while fetching product details:", error);
  } finally {
    loader.style.display = "none"; // Hide the loader
  }
}

fetchAndDisplayProductDetails(productID);

