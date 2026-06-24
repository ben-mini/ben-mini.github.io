(function () {
  var lightbox;
  var lightboxImage;
  var previousActiveElement;

  function createLightbox() {
    lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Expanded image");
    lightbox.hidden = true;

    var closeButton = document.createElement("button");
    closeButton.className = "image-lightbox__close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close expanded image");
    closeButton.innerHTML = "&times;";

    lightboxImage = document.createElement("img");
    lightboxImage.className = "image-lightbox__image";
    lightboxImage.alt = "";
    lightboxImage.addEventListener("click", closeLightbox);

    lightbox.appendChild(closeButton);
    lightbox.appendChild(lightboxImage);
    document.body.appendChild(lightbox);

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  function openLightbox(image) {
    if (!lightbox) {
      createLightbox();
    }

    previousActiveElement = document.activeElement;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "";
    lightbox.hidden = false;
    document.documentElement.classList.add("image-lightbox-is-open");
    lightbox.querySelector("button").focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) {
      return;
    }

    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    document.documentElement.classList.remove("image-lightbox-is-open");

    if (previousActiveElement && typeof previousActiveElement.focus === "function") {
      previousActiveElement.focus();
    }
  }

  function setupImages() {
    var images = document.querySelectorAll(".page__content img");

    images.forEach(function (image) {
      if (image.closest("a") || image.dataset.lightbox === "false") {
        return;
      }

      image.classList.add("js-lightbox-image");
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", image.alt ? "Expand image: " + image.alt : "Expand image");

      image.addEventListener("click", function () {
        openLightbox(image);
      });

      image.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(image);
        }
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupImages);
  } else {
    setupImages();
  }
})();
