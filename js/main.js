// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { fetchBlogPosts } from "./api.js";

// loader

showLoader();

setTimeout(() => {
  hideLoader();
}, 2000);


// fetch blogposts
document.addEventListener("DOMContentLoaded", () => {
  const blogPostsContainer = document.getElementById("blog-posts-all");
  const loader = document.getElementById("loader");

  // Show the loader while fetching the data
  loader.style.display = "block";
  blogPostsContainer.innerHTML = ""; // Clear previous content

  fetchBlogPosts()
    .then((posts) => {
      loader.style.display = "none";

      blogPostsContainer.classList.remove("hidden");

      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      posts.forEach((post) => {
        const postContainer = document.createElement("div");
        postContainer.classList.add("blog-post");

        const titleElement = document.createElement("h2");
        titleElement.classList.add("post-title");
        titleElement.textContent = post.title.rendered;

        // Display the post featured image (if available)
        if (post._embedded && post._embedded["wp:featuredmedia"]) {
          const imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
          const imageElement = document.createElement("img");
          imageElement.classList.add("post-image"); // Add "post-image" class
          imageElement.src = imageUrl;
          postContainer.appendChild(imageElement);
        }

        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("post-excerpt");

        const apiContent = post.content.rendered;
        const parser = new DOMParser();
        const parsedContent = parser.parseFromString(apiContent, "text/html");
        const truncatedExcerpt = parsedContent.body.textContent.substring(
          0,
          200
        );

        descriptionElement.textContent = truncatedExcerpt + "...";

        const readMoreButton = document.createElement("a");
        readMoreButton.classList.add("read-more-button");
        readMoreButton.textContent = "Read >>>";
        readMoreButton.href = post.link; // Link to the full post - must alter

        const readMoreParagraph = document.createElement("p");
        readMoreParagraph.appendChild(readMoreButton);

        postContainer.appendChild(titleElement);
        postContainer.appendChild(descriptionElement);

        postContainer.appendChild(readMoreParagraph);

        blogPostsContainer.appendChild(postContainer);
      });
    })

    .catch((error) => {
      console.error("Error:", error);
      // Hide the loader in case of an error
      loader.style.display = "none";
    });
});


//copyright year
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
