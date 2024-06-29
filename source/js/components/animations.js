const images = [
  "./img/mining/0020.png", "./img/mining/0021.png", "./img/mining/0022.png", 
  "./img/mining/0023.png", "./img/mining/0024.png", "./img/mining/0025.png",
  "./img/mining/0026.png", "./img/mining/0027.png", "./img/mining/0028.png",
  "./img/mining/0029.png", "./img/mining/0030.png", "./img/mining/0031.png",
  "./img/mining/0032.png", "./img/mining/0033.png", "./img/mining/0034.png",
  "./img/mining/0035.png", "./img/mining/0036.png", "./img/mining/0037.png",
  "./img/mining/0038.png", "./img/mining/0039.png", "./img/mining/0040.png",
  "./img/mining/0041.png", "./img/mining/0042.png", "./img/mining/0043.png",
  "./img/mining/0044.png", "./img/mining/0045.png", "./img/mining/0046.png",
  "./img/mining/0047.png", "./img/mining/0048.png", "./img/mining/0049.png",
  "./img/mining/0050.png"
];

let currentIndex = 0;
const animationDiv = document.getElementById('animation');

if (animationDiv) {
  const preloadedImages = [];

  images.forEach((src) => {
      const img = new Image();
      img.src = src;
      preloadedImages.push(img);
  });

  function changeImage() {
      if (animationDiv) {
          animationDiv.style.backgroundImage = `url('${images[currentIndex]}')`;
          currentIndex = (currentIndex + 1) % images.length;
      }
  }

  Promise.all(preloadedImages.map(img => new Promise(resolve => {
      img.onload = resolve;
      img.onerror = () => {
          console.error(`Failed to load image: ${img.src}`);
          resolve();
      };
  }))).then(() => setInterval(changeImage, 50));

  window.onload = changeImage;
} else {
  console.error('Animation div not found');
}