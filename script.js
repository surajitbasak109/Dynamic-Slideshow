// const showSlides = n => {
//   let i,
//     slides = document.querySelectorAll(".mySlides"),
//     dots = document.querySelectorAll(".dot");

//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }

//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }

//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }

//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
// };

// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/Previous controls
// const plusSlides = n => {
//   showSlides((slideIndex += n));
// };

// // Thumnail Image Controls
// const currentSlide = n => {
//   showSlides((slideIndex = n));
// };

class Slideshow {
  constructor(images, target) {
    this.slideWrap = document.createElement("div");
    this.images = images;
    this.target = target;
    this.slideIndex = 1;
    this.renderElement();
    this.showSlides(this.slideIndex);
    this.addEvent();
  }

  setImages(obj) {
    this.images = [...this.images, obj];
  }

  getImages() {
    return this.images;
  }

  createSlides() {
    if (this.images.length > 0) {
      let i = this.images.length;
      return (
        this.images
          .map(
            (item, idx) => `<div class="mySlides fade">
          <div class="numbertext">${idx + 1} / ${i}</div>
          <img src="${item.src}" style="width: 100%;">
          <div class="text">${item.caption}</div>
        </div>
        `
          )
          .join("") +
        `<button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>`
      );
    }
  }

  createDots() {
    if (this.images.length > 0) {
      let elm = this.images
        .map((item, idx) => `<span class="dot" data-slide="${idx + 1}"></span>`)
        .join("");
      return elm;
    }
  }

  renderElement() {
    let target = document.querySelector(this.target);
    let elms = this.createSlides();
    let dots = this.createDots();
    this.slideWrap.className = "slideshow-container";
    this.slideWrap.innerHTML = elms;
    let dotElm = document.createElement("div");
    dotElm.className = "dots-container";
    dotElm.innerHTML = dots;
    target.appendChild(this.slideWrap);
    target.appendChild(dotElm);
  }

  addEvent() {
    document.querySelector(".prev").addEventListener("click", () => {
      this.plusSlides(-1);
    });

    document.querySelector(".next").addEventListener("click", () => {
      this.plusSlides(1);
    });

    document.querySelectorAll(".dot").forEach(elm => {
      elm.addEventListener("click", e => {
        let index = e.target.getAttribute("data-slide");
        this.currentSlide(index);
      });
    });
  }

  showSlides(n) {
    let i,
      slides = document.querySelectorAll(".mySlides"),
      dots = document.querySelectorAll(".dot");
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += 1));
  }

  currentSlide(n) {
    this.showSlides((this.slideIndex = n));
  }
}

const $img = [
  {
    src: "img1.jpg",
    caption: "Image Caption 1"
  },
  {
    src: "img2.jpg",
    caption: "Image Caption 2"
  },
  {
    src: "img3.jpg",
    caption: "Image Caption 3"
  },
  {
    src: "img4.jpg",
    caption: "Image Caption 4"
  }
];

const slm = new Slideshow($img, ".slideshow");
