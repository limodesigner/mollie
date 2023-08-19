// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { fetchRecentBlogPosts } from './api/blog-api.js';
import { createBlogPostComponent } from './components/blog-components.js';

document.addEventListener('DOMContentLoaded', () => {
    displayRecentBlogPosts();
});

async function displayRecentBlogPosts() {
  const recentBlogPosts = await fetchRecentBlogPosts();

  const blogPostsContainer = document.getElementById('blog-posts');

  if (blogPostsContainer) {
      const numberOfPostsToShow = 3; // Adjust this number as needed

      for (let i = 0; i < numberOfPostsToShow; i++) {
          const postComponent = createBlogPostComponent(recentBlogPosts[i]);
          blogPostsContainer.appendChild(postComponent);
      }
  } else {
      console.error('Container element not found.');
  }
}



displayRecentBlogPosts();

//copyright year
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
