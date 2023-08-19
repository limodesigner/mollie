// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

export function createBlogPostComponent(post) {
  const postTitle = post.title.rendered;
  const postExcerpt = post.excerpt.rendered;
  const postLink = post.link;
  const postImage = post._embedded["wp:featuredmedia"][0].source_url;

  const postHTML = `
        <div class="blog-post">
            <a href="${postLink}" class="post-link">
                <img src="${postImage}" alt="${postTitle}" class="post-image">
                <h3 class="post-title">${postTitle}</h3>
            </a>
            <div class="post-excerpt">${postExcerpt}</div>
            <a href="${postLink}" class="read-more-button">Read More</a>
        </div>
    `;

  const postElement = document.createElement("div");
  postElement.innerHTML = postHTML;
  return postElement;
}
