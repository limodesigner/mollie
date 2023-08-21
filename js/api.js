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


// const baseUrl = "https://mollie.no/wp-json/wc/store/products?per_page=12";
// const consumerKey = "ck_4610f0d6eeb34112a6c99680b0dc29e1bfbf0068";
// const consumerSecret = "cs_7f1291d689278bcb23359a9a9662dbac95a4a1a4";
