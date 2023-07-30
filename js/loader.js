window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("hide-loader");

  loader.addEventListener("transitioned", () => {
    document.body.removeChild("loader");
  });
});
