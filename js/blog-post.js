// Get the postId from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

// Fetch and display the content of the individual blog post
fetch(`https://mollie.no/wp-json/wp/v2/posts/${postId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }
    return response.json();
  })
  .then((post) => {
    // Display the blog post content in the page
    const postTitleElement = document.createElement("h2");
    postTitleElement.textContent = post.title.rendered;

    const postContentElement = document.createElement("div");
    postContentElement.innerHTML = post.content.rendered;

    document.getElementById("post-title").appendChild(postTitleElement);
    document.getElementById("post-content").appendChild(postContentElement);
  })
  .catch((error) => {
    console.error("Error fetching blog post:", error);
  });
