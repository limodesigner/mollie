// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import {
  fetchRecentBlogPosts,
  fetchBlogPosts,
  fetchBlogCategories,
  fetchBlogTags,
} from "./api/blog-api.js";
import { createBlogPostComponent } from "./components/blog-components.js";

document.addEventListener("DOMContentLoaded", () => {
  displayRecentBlogPosts();
  displayBlogCategoriesAndTags();
});

async function displayRecentBlogPosts() {
  const allBlogPosts = await fetchRecentBlogPosts();
  const blogPostsContainer = document.getElementById("blog-posts-all"); // Use 'blog-posts-all' ID

  if (blogPostsContainer) {
    allBlogPosts.forEach((post) => {
      const postComponent = createBlogPostComponent(post);
      blogPostsContainer.appendChild(postComponent);
    });
  } else {
    console.error("Container element not found.");
  }
}

async function displayBlogPosts(page) {
  const perPage = 10; // Adjust the number of posts per page as needed
  const blogPostsContainer = document.getElementById('blog-posts-all');

  if (blogPostsContainer) {
      const blogPosts = await fetchBlogPosts(page, perPage);

      if (blogPosts.length > 0) {
          blogPosts.forEach(post => {
              const postComponent = createBlogPostComponent(post);
              blogPostsContainer.appendChild(postComponent);
          });

          createPagination(blogPostsContainer, page, perPage, blogPosts.length);
      } else {
          blogPostsContainer.innerHTML = '<p>No blog posts found.</p>';
      }
  } else {
      console.error('Container element not found.');
  }
}

function createPagination(container, currentPage, perPage, totalPosts) {
  const totalPages = Math.ceil(totalPosts / perPage);

  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination';

  for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.href = `javascript:void(0);`;
      pageLink.textContent = i;
      pageLink.addEventListener('click', () => {
          container.innerHTML = ''; // Clear the container before fetching new page
          displayBlogPosts(i);
      });

      paginationContainer.appendChild(pageLink);
  }

  container.appendChild(paginationContainer);
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
