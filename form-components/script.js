// slider
const slider = document.querySelector('#slider');
const sliderVal = document.querySelector('.sliderVal');

slider.addEventListener('mousemove', () => {
  sliderVal.innerText = slider.value;

  // update slider background color
  const gradientPercentage = `${(slider.value / 10) * 100}%`;
  const color = `linear-gradient(90deg, #83c5be ${gradientPercentage}, #fff ${gradientPercentage})`;
  slider.style.background = color;
});
