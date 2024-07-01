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
let currentIndex = 8; // Начинаем с 0028.png
const animationImage = document.getElementById('animationImage');
const backgroundDiv = document.querySelector('#animation .mining__bg');
const frameInterval = 20; // Интервал в миллисекундах между кадрами (0.5 секунды = 500 миллисекунд / 2)
let lastFrameTime = 0;

if (animationImage && backgroundDiv) {
    const preloadedImages = [];

    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = () => reject(`Не удалось загрузить изображение: ${src}`);
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
            requestAnimationFrame(changeImage);
        }, 500); 
    }

    function changeImage(timestamp) {
        if (!lastFrameTime) lastFrameTime = timestamp;
        const elapsed = timestamp - lastFrameTime;

        if (elapsed > frameInterval) {
            animationImage.src = preloadedImages[currentIndex];
            currentIndex = (currentIndex + 1) % preloadedImages.length;
            lastFrameTime = timestamp;
        }
        requestAnimationFrame(changeImage);
    }

    animationImage.src = images[currentIndex];

    preloadImages();
} else {
    console.error('Анимационное изображение или контейнер не найдены');
}
