// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import {
  fetchRecentBlogPosts,
  fetchBlogCategories,
  fetchBlogTags,
} from "./api/blog-api.js";
import { createBlogPostComponent } from "./components/blog-components.js";

document.addEventListener("DOMContentLoaded", () => {
  displayRecentBlogPosts();
  displayBlogCategoriesAndTags();
});

async function displayRecentBlogPosts() {
  const recentBlogPosts = await fetchRecentBlogPosts();
  const blogPostsContainer = document.getElementById("blog-posts");

  if (blogPostsContainer) {
    const numberOfPostsToShow = 3; // Adjust this number as needed

    for (let i = 0; i < numberOfPostsToShow; i++) {
      const postComponent = createBlogPostComponent(recentBlogPosts[i]);
      blogPostsContainer.appendChild(postComponent);
    }
  } else {
    console.error("Container element not found.");
  }
}

async function displayBlogCategoriesAndTags() {
  const blogCategories = await fetchBlogCategories();
  const blogTags = await fetchBlogTags();

  const categoriesContainer = document.querySelector(".blog-categories");
  const tagsContainer = document.querySelector(".blog-tags");

  if (categoriesContainer && tagsContainer) {
    categoriesContainer.innerHTML = createListItems(blogCategories, "name");
    tagsContainer.innerHTML = createListItems(blogTags, "name");
  } else {
    console.error("Container element not found.");
  }
}

function createListItems(items, property) {
  return items.map((item) => `<p>${item[property]}</p>`).join("");
}

//copyright year
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
