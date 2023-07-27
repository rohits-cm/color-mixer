// Variables to store the interval ID, color mixing values, and bucket status
let intervalId;
let colorMix = {
  red: 0,
  green: 0,
  blue: 0,
};

let isBucketEmpty = true;
let counter = 100;

// Function to toggle fill the bucket with the selected color
const toggleFill = (color) => {
  if (isBucketEmpty) {
    isBucketEmpty = false;
    startFill(color);
  } else {
    stopFill();
    isBucketEmpty = true;
    hideColorBars();
  }
};

// Function to add the CSS animation class to the bucket
const startAnimation = () => {
  const bucketColor = document.querySelector('.bucket-color');
  bucketColor.classList.add('swell-animation');
};

// Function to remove the CSS animation class from the bucket
const stopAnimation = () => {
  const bucketColor = document.querySelector('.bucket-color');
  bucketColor.classList.remove('swell-animation');
};

// Function to start filling the bucket with the selected color
const startFill = (color) => {
  const colorBar = document.querySelector(`.${color}-bar`);
  colorBar.style.opacity = '1';
  startAnimation(); // Add animation class when the bucket starts filling

  // Interval function to gradually fill the bucket with the selected color
  intervalId = setInterval(() => {
    if (!isBucketFilledWith(color) && colorMix[color] < 255) {
      colorMix[color]++;
      updateBucketColor();
      updateBucketHeight();
      updateColorBucketHeight(color); // Update the color bucket height as the mixing bucket fills
      hideFilledColorBars(color);
      counter = 100 - Math.floor((colorMix[color] / 255) * 100);
      updateColorBucketCounter(color);
    } else {
      stopFill();
    }
  }, 10); // Changed interval timing to 10ms for smoother filling
};

// Function to stop the bucket from filling
const stopFill = () => {
  clearInterval(intervalId);
  intervalId = null;
  stopAnimation(); // Remove animation class when the bucket stops filling
};

// Function to update the main bucket color based on the colorMix values
const updateBucketColor = () => {
  const bucket = document.querySelector('.bucket-color');
  const { red, green, blue } = colorMix;
  bucket.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
};

// Function to update the main bucket height based on the colorMix values
const updateBucketHeight = () => {
  const bucket = document.querySelector('.bucket-color');
  const { red, green, blue } = colorMix;
  const sum = red + green + blue;
  const maxHeight = 100; // The maximum height of the bucket (100%)
  bucket.style.height = `${(sum / (255 * 3)) * maxHeight}%`;
};

// Function to hide all color bars
const hideColorBars = () => {
  const colorBars = document.querySelectorAll('.color-bar');
  colorBars.forEach((bar) => (bar.style.opacity = '0'));
};

// Function to hide filled color bars based on the colorMix values
const hideFilledColorBars = (color) => {
  const bar = document.querySelector(`.${color}-bar`);
  if (colorMix[color] === 255 || isBucketFilledWith(color)) {
    bar.style.opacity = '0';
  }
};

// Function to check if the bucket is filled with the selected color
const isBucketFilledWith = (color) => {
  const bucket = document.querySelector('.bucket-color');
  const computedColor = getComputedStyle(bucket).backgroundColor;
  const [r, g, b] = computedColor.match(/\d+/g);
  return (
    (color === 'red' && r === '255') ||
    (color === 'green' && g === '255') ||
    (color === 'blue' && b === '255')
  );
};

// Function to update the color bucket height as the mixing bucket fills
const updateColorBucketHeight = (color) => {
  const colorBucket = document.querySelector(`.${color}-bucket`);
  const colorPercentage = 100 - ((colorMix[color] / 255) * 100);
  colorBucket.style.height = `${colorPercentage}%`;
};

// Function to update the color bucket counter as the mixing bucket fills
const updateColorBucketCounter = (color) => {
  const counterElement = document.querySelector(`.${color}-counter`);
  counterElement.textContent = `${counter}%`;
};
