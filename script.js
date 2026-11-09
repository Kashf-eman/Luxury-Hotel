// pop up
function openPopup(id) { document.getElementById(id).classList.add('active'); }
    function closePopup(id) { document.getElementById(id).classList.remove('active'); }
    function switchPopup(closeId, openId) { closePopup(closeId); openPopup(openId); }
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.popup-overlay').forEach(p => p.classList.remove('active'));
        }
    });
    // gallery 
    const images = document.querySelectorAll('#galleryGrid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const counter = document.getElementById('counter');
    let currentIndex = 0;

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightboxImg.src = images[currentIndex].src;
        counter.textContent = (currentIndex + 1) + ' / ' + images.length;
        lightbox.classList.add('active');
    }
    function closeLightbox() {
        lightbox.classList.remove('active');
    }
    function changeImage(step) {
        currentIndex += step;
        if (currentIndex < 0) currentIndex = images.length - 1;
        if (currentIndex >= images.length) currentIndex = 0;
        openLightbox();
    }
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'Escape') closeLightbox();
    });
    // slider
    const track = document.getElementById('sliderTrack');
    const cards = document.querySelectorAll('.room-card');
    const dotsBox = document.getElementById('dots');
    let index = 0;

    function cardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    function maxIndex() { return cards.length - cardsPerView(); }

    function createDots() {
        dotsBox.innerHTML = '';
        for (let i = 0; i <= maxIndex(); i++) {
            const d = document.createElement('div');
            d.className = 'dot' + (i === index ? ' active' : '');
            d.onclick = () => { index = i; updateSlider(); };
            dotsBox.appendChild(d);
        }
    }
    function updateSlider() {
        if (index > maxIndex()) index = 0;
        if (index < 0) index = maxIndex();
        const gap = window.innerWidth <= 768 ? 0 : 20;
        const cardWidth = cards[0].offsetWidth + gap;
        track.style.transform = `translateX(${-index * cardWidth}px)`;
        createDots();
    }
    function moveSlide(step) {
        index += step;
        updateSlider();
        resetAuto();
    }
    let auto = setInterval(() => { index++; updateSlider(); }, 3000);
    function resetAuto() {
        clearInterval(auto);
        auto = setInterval(() => { index++; updateSlider(); }, 3000);
    }
    window.addEventListener('resize', updateSlider);
    createDots();
    // review
     let rIndex = 0;
  const rTrack = document.getElementById('reviewTrack');
  function moveReview(step){
    rIndex += step;
    const total = 3;
    if(rIndex < 0) rIndex = total - 1;
    if(rIndex >= total) rIndex = 0;
    rTrack.style.transform = `translateX(${-rIndex * 100}%)`;
    resetReviewAuto();
  }
  let rAuto = setInterval(()=>{ rIndex++; if(rIndex>=3) rIndex=0; rTrack.style.transform = `translateX(${-rIndex*100}%)`; }, 4000);
  function resetReviewAuto(){
    clearInterval(rAuto);
    rAuto = setInterval(()=>{ rIndex++; if(rIndex>=3) rIndex=0; rTrack.style.transform = `translateX(${-rIndex*100}%)`; }, 4000);
  }
  //nav 
  function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('show');
}

function closeMenu() {
    document.getElementById('navMenu').classList.remove('show');
}

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});