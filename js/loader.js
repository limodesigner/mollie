// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

export function showLoader() {
  const loader = document.querySelector(".loader");
  loader.innerHTML = '<div class="pulsing-star"></div>';
}

export function hideLoader() {
  const loader = document.querySelector(".loader");
  loader.innerHTML = "";
}
