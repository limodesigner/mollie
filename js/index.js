// @author Linda Moenstre <linda@digitaldesigner.no>

const productsContainer = document.querySelector(".products");
baseUrl = "https://mollie.no/wp-json/wc/v3/products/";

async function getProducts() {
  try {
    const response = await fetch(baseUrl);
    const products = await response.json();

    productsContainer.innerHTML = "";

    products.forEach(function (products) {
      productsContainer.innerHTML += `
      <a href="index.html?id=${products.id}" class="product-item">      
          <img src="${products.images[0].src}" alt="${products.name}" />
          <h4>${products.name}</h4>
          <p class="price">&euro; ${products.price}</p>
                <p class="button_category">View more</p>
      </a>
      `;
    });
  } catch (error) {
    console.error({ error: "Could not load content" });
  }
}

getProducts();
