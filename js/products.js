const productsContainer = document.querySelector(".products");

const baseUrl = "https://api.noroff.dev/api/v1/rainy-days";

async function fetchAndDisplayProduct() {
  try {
    const response = await fetch(baseUrl);
    const products = await response.json();

    productsContainer.innerHTML = "";

    products.forEach(function (products) {
      productsContainer.innerHTML += `
      <a href="product.html?id=${products.id}" class="product-item">      
          <img src="${products.image}" alt="${products.description}" />
          <h4>${products.title}</h4>
          <p class="price">&euro; ${products.price}</p>
                <p class="button_category">View more</p>
      </a>
      `;
    });
  } catch (error) {
    console.error({ error: "Could not load content" });
  }
}

fetchAndDisplayProduct();
