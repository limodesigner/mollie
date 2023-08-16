export async function fetchSingleProduct(productId) {
  try {
    const response = await fetch(
      `https://mollie.no/wp-json/wc/v3/products/${productId}`
    );
    const product = await response.json();
    return product;
  } catch (error) {
    throw error;
  }
}

export function displayProductDetails(product) {
  const productDetailContainer = document.createElement("div");
  productDetailContainer.classList.add("product-detail");

  const productImage = document.createElement("img");
  productImage.src = product.images[0]?.src;
  productImage.alt = product.name ?? "Product Image";

  const productName = document.createElement("h2");
  productName.textContent = product.name;

  const productDescription = document.createElement("p");
  productDescription.textContent = `${product.description} Price: ${product.price_html}`;

  const backToProductsLink = document.createElement("a");
  backToProductsLink.href = "index.html";
  backToProductsLink.textContent = "Back to products";

  productDetailContainer.appendChild(productImage);
  productDetailContainer.appendChild(productName);
  productDetailContainer.appendChild(productDescription);
  productDetailContainer.appendChild(backToProductsLink);

  const productDetailElement = document.getElementById("product-detail");
  productDetailElement.innerHTML = "";
  productDetailElement.appendChild(productDetailContainer);
}

export async function fetchAndDisplayProduct(productId) {
  try {
    const product = await fetchSingleProduct(productId);
    displayProductDetails(product);
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
  }
}
