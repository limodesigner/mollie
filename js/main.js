// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { fetchBlogPosts } from "./api.js";

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

  fetchBlogPosts().then((posts) => {
    loader.style.display = "none";

    blogPostsContainer.classList.remove("hidden");

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    posts
      .forEach((post) => {
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
        readMoreButton.href = `blog-post.html?id=${post.id}`;

        const readMoreParagraph = document.createElement("p");
        readMoreParagraph.appendChild(readMoreButton);

        postContainer.appendChild(titleElement);
        postContainer.appendChild(descriptionElement);
        postContainer.appendChild(readMoreParagraph);
        blogPostsContainer.appendChild(postContainer);

        readMoreButton.addEventListener("click", (event) => {
          const postLink = post.link; // Get the link to the full post
        });
      })

      .catch((error) => {
        console.error("Error:", error);
        loader.style.display = "none";
      });
  });

  // Show the loader while fetching the single blog post
  loader.style.display = "block";

  fetch(postLink)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch blog post");
      }
      return response.text(); // Get the HTML content of the blog post
    })
    .then((postContent) => {
      loader.style.display = "none";

      // Create a modal or overlay to display the full blog post content
      const modal = document.createElement("div");
      modal.classList.add("modal");

      const closeModalButton = document.createElement("span");
      closeModalButton.classList.add("close-modal");
      closeModalButton.innerHTML = "&times;";
      closeModalButton.addEventListener("click", () => {
        document.body.removeChild(modal); // Remove the modal when the close button is clicked
      });

      const postContentElement = document.createElement("div");
      postContentElement.classList.add("post-content");
      postContentElement.innerHTML = postContent; // Set the fetched HTML content

      modal.appendChild(closeModalButton);
      modal.appendChild(postContentElement);

      document.body.appendChild(modal); // Add the modal to the document
    })
    .catch((error) => {
      console.error("Error fetching blog post:", error);
      loader.style.display = "none"; // Hide the loader in case of an error
    });
});

//copyright year
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentYear").innerHTML = year;
