baseUrl = "https://mollie.no/wp-json/wc/v3/products/";

async function getProducts(url) {
  const response = await fetch(url);
  const products = await response.json();
  console.log(products);
}

getProducts(baseUrl);

//copyright year
const d = new Date();
document.getElementById("currentYear").innerHTML = d.getFullYear();
