export async function fetchBlogPosts(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}
