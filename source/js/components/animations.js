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
const animationImage = document.getElementById('animationImage');
const backgroundDiv = document.querySelector('#animation .mining__bg');

if (animationImage && backgroundDiv) {
    const preloadedImages = [];

    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = () => reject(`Failed to load image: ${src}`);
        });
    }

    async function preloadImages() {
        for (let i = 0; i < images.length; i++) {
            try {
                const imgSrc = await preloadImage(images[i]);
                preloadedImages.push(imgSrc);
            } catch (error) {
                console.error(error);
            }
        }
        startAnimation();
    }

    function startAnimation() {
        setTimeout(() => {
            backgroundDiv.style.opacity = '0';
            backgroundDiv.style.display = 'none';
            animationImage.style.visibility = 'visible';
            setInterval(changeImage, 35);
        }, 500); 
    }

    function changeImage() {
        animationImage.src = preloadedImages[currentIndex];
        currentIndex = (currentIndex + 1) % preloadedImages.length;
    }

    animationImage.src = images[0];

    preloadImages();
} else {
    console.error('Animation image or container not found');
}