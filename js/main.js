// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

// loader
import { showLoader, hideLoader } from "./loader.js";
import { fetchBlogPosts, fetchSingleBlogPost } from "./api.js";

showLoader();

setTimeout(() => {
  hideLoader();
}, 2000);

// fetch blogposts
document.addEventListener("DOMContentLoaded", () => {
  const postIdInput = document.getElementById("postIdInput");
  const blogPostsContainer = document.getElementById("blog-posts-all");
  const loader = document.getElementById("loader");

  postIdInput.addEventListener("change", () => {
    const postId = postIdInput.value;

    // Show the loader while fetching the data
    loader.style.display = "block";
    blogPostsContainer.innerHTML = ""; // Clear previous content

    fetchSingleBlogPost(postId)
      .then((post) => {
        // Hide the loader after fetching the data
        loader.style.display = "none";

        // Create elements to display the post content
        const titleElement = document.createElement("h2");
        titleElement.textContent = post.title.rendered;

        const contentElement = document.createElement("div");
        contentElement.innerHTML = post.content.rendered;

        // Append elements to the container
        blogPostsContainer.appendChild(titleElement);
        blogPostsContainer.appendChild(contentElement);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Hide the loader in case of an error
        loader.style.display = "none";
      });
  });
});

//copyright year
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
