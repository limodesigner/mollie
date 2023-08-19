// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { fetchAndDisplaySingleBlogPost } from "./components/single-blog-post.js";
import { fetchAndDisplayBlogCategories } from "./components/blog-post-categories.js";
import { initializeCarousel } from "./components/carousel.js";
import { showLoader, hideLoader } from "./components/loader.js";
import { fetchBlogPosts } from "./api/blog-posts-api.js";
import { fetchCategories } from "./api/blog-categories-api.js";
import { displaySingleProduct } from "./store/components/single-product.js";
import { displayFeaturedProducts } from "./store/components/featured-products.js";
import { fetchProducts } from "./store/api/store-api.js";
import { displayCategoryPage } from "./store/components/category-page.js"; // Import the new category page JavaScript

// Call the functions to initialize components
fetchAndDisplaySingleBlogPost();
fetchAndDisplayBlogCategories();
initializeCarousel();
showLoader();
hideLoader();
setupNavigation();

// Call the API functions
fetchBlogPosts();
fetchCategories();

// Call the Store functions
displaySingleProduct();
displayFeaturedProducts();
fetchProducts();

// Call the new category page function
displayCategoryPage();

//copyright year
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
