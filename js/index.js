// @author Linda Moenstre <linda@digitaldesigner.no>

// navigation menu
$(".menu-toggle").click(function () {
  $(".nav__wrapper").toggleClass("nav__wrapper--open", 500);
  $(this).toggleClass("open");
});

// back to top btn
let prevScrollPos = window.scrollY;

window.onscroll = function () {
  const currentScrollPos = window.scrollY;
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (prevScrollPos > currentScrollPos) {
    backToTopBtn.style.display = "block"; // Show the button when scrolling up
  } else {
    backToTopBtn.style.display = "none"; // Hide the button when scrolling down
  }

  prevScrollPos = currentScrollPos;
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// API get product
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
