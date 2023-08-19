// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("hide-loader");

  loader.addEventListener("transitioned", () => {
    document.body.removeChild("loader");
  });
});
