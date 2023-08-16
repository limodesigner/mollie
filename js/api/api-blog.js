const apiBase = "https://mollie.no/wp-json/wp/v2/posts";
const commentEndpoint = "/comments";
const embeddedBase = "?_embed";

const apiUrlPosts = `${apiBase}${postEndpoint}${embeddedBase}`;
const apiUrlWithId = (id) => `${apiBase}${postEndpoint}/${id}${embeddedBase}`;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

async function getApiFromId(id) {
  try {
    const response = await fetch(apiUrlWithId(id));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    pageContent.innerHTML = error;
  }
}

function emailValidate(email) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailPattern.test(email);
}

function valueLength(value, inputLength) {
  return value.trim().length >= inputLength;
}

export {
  apiBase,
  postEndpoint,
  commentEndpoint,
  embeddedBase,
  apiUrlPosts,
  productId,
  getApiFromId,
  emailValidate,
  valueLength,
};
