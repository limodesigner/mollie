// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

const wordpressBaseUrl = "https://mollie.no/wp-json/wp/v2/posts";
// const singleBlogpostUrl = "${wordpressBaseUrl}/${postId}";

export async function fetchBlogPosts() {
  return fetch(wordpressBaseUrl)
    .then((response) => {
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((posts) => {
      console.log("Fetched posts:", posts);
      return posts;
    })
    .catch((error) => {
      console.error("Error fetching blog posts:", error);
    });
}
