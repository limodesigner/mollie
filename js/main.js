// @author Linda Moenstre <linda@digitaldesigner.no>

import { fetchBlogPosts } from "./api/api-blog.js";

// URL for the "get all products" endpoint
const baseUrl = "https://mollie.no/wp-json/wc/store/products?per_page=12";
const consumerKey = "ck_4610f0d6eeb34112a6c99680b0dc29e1bfbf0068";
const consumerSecret = "cs_7f1291d689278bcb23359a9a9662dbac95a4a1a4";

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

// URL to fetch new blog posts
const apiUrl =
  "https://mollie.no/wp-json/wp/v2/posts?_embed&per_page=4&_order=desc";
const blogPostsContainer = document.getElementById("blog-posts");

async function displayBlogPosts() {
  try {
    const posts = await fetchBlogPosts(apiUrl);

    posts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.classList.add("post-card");

      const postThumbnail = document.createElement("img");
      postThumbnail.classList.add("post-thumbnail");
      postThumbnail.alt = "Post Thumbnail";

      // Calculate and set the image source
      const thumbnailUrl =
        post._embedded["wp:featuredmedia"][0].media_details.sizes.medium
          .source_url;
      postThumbnail.src = thumbnailUrl;

      const postTitle = document.createElement("h3");
      postTitle.classList.add("post-title");
      postTitle.textContent = post.title.rendered;

      const postExcerpt = document.createElement("p");
      postExcerpt.classList.add("post-excerpt");
      postExcerpt.innerHTML = post.excerpt.rendered;

      const readMoreButton = document.createElement("button");
      readMoreButton.classList.add("read-more-button");
      readMoreButton.textContent = "Read More";
      readMoreButton.addEventListener("click", () => {
        // Redirect to the full post URL
        window.location.href = post.link;
      });

      postCard.appendChild(postThumbnail);
      postCard.appendChild(postTitle);
      postCard.appendChild(postExcerpt);
      postCard.appendChild(readMoreButton);

      blogPostsContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
}

displayBlogPosts();

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

//copyright year
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
