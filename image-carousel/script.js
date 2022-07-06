const sliderContainer = document.querySelector('.slider');
const sliderImages = document.querySelector('.slider__images');
const prevBtn = document.querySelector('.btn__prev');
const nextBtn = document.querySelector('.btn__next');

const dummyData = [
  {
    image: 'https://source.unsplash.com/random?landscape,mountain',
  },
  {
    image: 'https://source.unsplash.com/random?landscape,cars',
  },
  {
    image: 'https://source.unsplash.com/random?landscape,night',
  },
  {
    image: 'https://source.unsplash.com/random?landscape,city',
  },
];

let curInd = 0;
let imgLen = dummyData.length;
showImage(dummyData[curInd].image);

function nextImage() {
  if (curInd === imgLen - 1) {
    curInd = 0;
  } else {
    curInd++;
  }
  //   console.log(curInd);
  showImage(dummyData[curInd].image);
}

function prevImage() {
  if (curInd === 0) {
    curInd = imgLen - 1;
  } else {
    curInd--;
  }
  //   console.log(curInd);
  showImage(dummyData[curInd].image);
}

function showImage(imgLink) {
  sliderImages.innerHTML = '';
  const img = document.createElement('img');
  img.src = imgLink;

  sliderImages.append(img);
}

prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);
