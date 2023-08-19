// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

export async function fetchRecentBlogPosts() {
  const response = await fetch(
    "https://mollie.no/wp-json/wp/v2/posts?per_page=3&_embed"
  );
  const data = await response.json();
  return data;
}

export async function fetchBlogPosts(page = 1, perPage = 10) {
    const response = await fetch(`https://mollie.no/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`);
    const data = await response.json();
    return data;
}

export async function fetchBlogCategories() {
    const response = await fetch('https://mollie.no/wp-json/wp/v2/categories');
    const data = await response.json();
    return data;
}

export async function fetchBlogTags() {
    const response = await fetch('https://mollie.no/wp-json/wp/v2/tags');
    const data = await response.json();
    return data;
}


