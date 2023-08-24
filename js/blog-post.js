// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";

const blogContainer = document.querySelector(".post-content");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const postUrl = "https://mollie.no/wp-json/wp/v2/posts";
const specificPostUrl = postUrl + `/${id}?_embed`;

showLoader();

async function getPost() {
  try {
    const response = await fetch(specificPostUrl);
    const post = await response.json();
    createHtml(post);
  } catch (error) {
    console.error({ error: "Could not load content" });
  } finally {
    hideLoader();
  }
}

getPost();

function createHtml(post) {
  const postTitle = post.title.rendered;
  const postContent = post.content.rendered;

  document.getElementById("post-title").textContent = postTitle;
  blogContainer.innerHTML = postContent;

  const changeTitle = document.getElementsByClassName("newtitle").innerText;
  document.title = `${postTitle}`;
}
