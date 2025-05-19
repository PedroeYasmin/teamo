// Configuração da data inicial
const startDate = new Date('2024-05-25T22:25:00');

// Função para atualizar o contador
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    // Cálculo de tempo
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Atualização dos elementos HTML
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // Atualização do texto da mensagem
    document.getElementById('days-text').textContent = days;
    document.getElementById('hours-text').textContent = hours;
    document.getElementById('minutes-text').textContent = minutes;
    document.getElementById('seconds-text').textContent = seconds;
}

// Atualizar o contador a cada segundo
setInterval(updateCounter, 1000);
updateCounter(); // Inicializar o contador imediatamente

// Configuração do carrossel
const images = [
    'images/imagem1.jpg',
    'images/imagem2.jpg',
    'images/imagem3.jpg',
    'images/imagem4.jpg',
    'images/imagem5.jpg'
];

let currentImageIndex = 0;
const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

// Função para carregar as imagens no carrossel
function loadCarouselImages() {
    carousel.innerHTML = '';
    
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = 'Foto do casal';
        carousel.appendChild(img);
    });
    
    updateCarouselPosition();
}

// Função para atualizar a posição do carrossel
function updateCarouselPosition() {
    carousel.style.transform = `translateX(-${currentImageIndex * 100}%)`;
}

// Função para avançar para a próxima imagem
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateCarouselPosition();
}

// Função para voltar para a imagem anterior
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateCarouselPosition();
}

// Adicionar event listeners aos botões
nextButton.addEventListener('click', nextImage);
prevButton.addEventListener('click', prevImage);

// Iniciar o carrossel automático
let carouselInterval = setInterval(nextImage, 5000);

// Pausar o carrossel automático quando o mouse estiver sobre ele
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

// Retomar o carrossel automático quando o mouse sair
carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextImage, 5000);
});

// Carregar as imagens quando a página for carregada
window.addEventListener('load', loadCarouselImages);

// Adicionar funcionalidade de swipe para dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Swipe para a esquerda
        nextImage();
    } else if (touchEndX > touchStartX) {
        // Swipe para a direita
        prevImage();
    }
}
