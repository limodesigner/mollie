const productContainer = document.querySelector(".product");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseUrl = "https://mollie.no/wp-json/wc/v3/products/";
const specificUrl = baseUrl + `/${id}`;

async function getProduct() {
  try {
    const response = await fetch(specificUrl);
    const product = await response.json();
    createHtml(product);
  } catch (error) {
    console.error({ error: "Could not load content" });
  }
}

getProduct();

function createHtml(product) {
  productContainer.innerHTML = `
    <div class="card">
      <div class=card-img><img src="${product.image}" alt="${product.description}"/>
      </div>
      <div class=card-content>
      <h2>${product.title}</h2>
      <div class="padding-top"><br>${product.description}</div>        
      <h4 class="price">&euro; ${product.price}</h4>      
      <button class="button" data value=${product.id}>Add to cart</a></button>
      </div>
    </div>
`;

  const changeTitle = document.getElementsByClassName("newtitle").innerText;
  document.title = `${product.title}`;
}
