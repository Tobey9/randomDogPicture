const nextImageBtn = document.getElementById("next-image-btn");
const imageContainer = document.getElementById("image-container");
let ready = false;
const loader = document.getElementById("loader");

let totalImages = 0;
let imagesLoaded = 0;

let photoArrays = [];

let count = 5;
const apiUrl = `https://dog.ceo/api/breeds/image/random/${count}`;

function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayImages() {
  imagesLoaded = 0;
  photos = photoArrays.message;
  totalImages = photos.length;

  photos.forEach((photo) => {
    const image = document.createElement("img");
    setAttributes(image, {
      src: photo,
    });
    image.addEventListener("load", imageLoaded);

    imageContainer.appendChild(image);
  });
}

async function getImages() {
  try {
    const response = await fetch(apiUrl);
    photoArrays = await response.json();
    // imageContainer.innerHTML = `<img src='${photoArrays.message[0]}'>`;
    displayImages();
  } catch (error) {}
}

// nextImageBtn.addEventListener("click", getImages);

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getImages();
  }
});

getImages();
