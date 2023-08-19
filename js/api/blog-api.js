// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

export async function fetchRecentBlogPosts() {
  const response = await fetch(
    "https://mollie.no/wp-json/wp/v2/posts?per_page=3&_embed"
  );
  const data = await response.json();
  return data;
}
