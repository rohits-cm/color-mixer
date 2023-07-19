// Variables to store the interval ID, color mixing values, and bucket status
let intervalId;
let colorMix = {
  red: 0,
  green: 0,
  blue: 0,
};

let isBucketEmpty = true;
let isFirstClick = {
  red: true,
  green: true,
  blue: true,
};

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

// Function to start filling the bucket with the selected color
const startFill = (color) => {
  const colorBar = document.querySelector(`.${color}-bar`);
  colorBar.style.opacity = '1';

  // Check if it's the first click on the color, update bucket color if true
  // if (isFirstClick[color]) {
  //   isFirstClick[color] = false;
  //   updateBucketColor();
  // }

  // Interval function to gradually fill the bucket with the selected color
  intervalId = setInterval(() => {
    if (!isBucketFilledWith(color) && colorMix[color] < 255) {
      colorMix[color]++;
      updateBucketColor();
      updateBucketHeight();
      updateColorBucketHeight(color); // Update the color bucket height as the mixing bucket fills
      hideFilledColorBars(color);
    } else {
      clearInterval(intervalId);
    }
  }, 30);
};

// Function to stop the bucket from filling
const stopFill = () => {
  clearInterval(intervalId);
  intervalId = null;
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

// Function to reset the main bucket height to 0%
const resetBucketHeight = () => {
  const bucket = document.querySelector('.bucket-color');
  bucket.style.height = '0';
};

// Function to reset the color bucket height to 50% for all colors
const resetColorBucketHeight = () => {
  const colorBuckets = document.querySelectorAll('.color-bucket');
  colorBuckets.forEach((bucket) => (bucket.style.height = '50%'));
};

// Function to update the color bucket height as the mixing bucket fills
const updateColorBucketHeight = (color) => {
  const colorBucket = document.querySelector(`.${color}-bucket`);
  const colorPercentage = 100 - ((colorMix[color] / 255) * 100);
  colorBucket.style.height = `${colorPercentage}%`;
};
