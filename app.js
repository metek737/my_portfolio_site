// ==========================================
// 1. MASAÜSTÜ SLIDER (Hata Korumalı)
// ==========================================
const desktopSliderElem = document.querySelector('.myPortfolioSlider');
let desktopSlider;

if (desktopSliderElem) {
    desktopSlider = new Swiper('.myPortfolioSlider', {
        observer: true,       
        observeParents: true, 
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 100, 
        allowTouchMove: false, 
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span>/<span class="' + totalClass + '"></span>';
            }
        },
        on: {
            init: function () { updateProjectName(this); },
            slideChange: function () { updateProjectName(this); }
        }
    });
}

function updateProjectName(swiperInstance) {
    if (!swiperInstance || !swiperInstance.slides || !swiperInstance.slides[swiperInstance.activeIndex]) return;

    let currentSlide = swiperInstance.slides[swiperInstance.activeIndex];
    let projectName = currentSlide.getAttribute('data-project');
    let displayElement = document.getElementById('projectNameDisplay');
    
    if (projectName && displayElement) {
        displayElement.innerText = projectName;
    } else if (displayElement) {
        displayElement.innerText = '';
    }
}



/// ==========================================
// 2. MOBİL SLIDER (Hata Korumalı)
// ==========================================
const mobileSliderElem = document.querySelector('.myMobileSlider');
let mobileSlider;
if (mobileSliderElem) {
    mobileSlider = new Swiper('.myMobileSlider', {
        observer: true,       
        observeParents: true, 
        loop: true,
        
        // İŞTE EKLENEN SİHİRLİ KISIM (Masaüstü ile aynı fade efekti)
        effect: 'fade',
        fadeEffect: { crossFade: true },
        
        speed: 100, 
        allowTouchMove: false, 
    });
}
// ==========================================
// 3. GLOBAL TIKLAMA VE İMLEÇ YÖNETİMİ
// ==========================================
const customCursor = document.getElementById('customCursor');
// GÜNCELLEME: Sadece header değil, sayfadaki TÜM linkleri (<a>) seçiyoruz
const allLinks = document.querySelectorAll('a');

// A) TÜM EKRAN TIKLAMA KONTROLÜ
document.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    if (!desktopSlider && !mobileSlider) return;

    if (window.innerWidth <= 768 && mobileSlider) {
        // İŞTE ÇÖZÜM: Mobilde de ekranın soluna dokunulursa geri, sağına dokunulursa ileri gidecek
        if (e.clientX < window.innerWidth / 2) {
            mobileSlider.slidePrev();
        } else {
            mobileSlider.slideNext();
        }
    } else if (desktopSlider) {
        if (e.clientX < window.innerWidth / 2) {
            desktopSlider.slidePrev();
        } else {
            desktopSlider.slideNext();
        }
    }
});

// A.2) KLAVYE OK TUŞLARI İLE KONTROL
document.addEventListener('keydown', (e) => {
    if (!desktopSlider && !mobileSlider) return; 

    if (e.key === 'ArrowRight') {
        if (window.innerWidth <= 768 && mobileSlider) {
            mobileSlider.slideNext();
        } else if (desktopSlider) {
            desktopSlider.slideNext();
        }
    } else if (e.key === 'ArrowLeft') {
        if (window.innerWidth <= 768 && mobileSlider) {
            mobileSlider.slidePrev(); 
        } else if (desktopSlider) {
            desktopSlider.slidePrev();
        }
    }
});

// B) MASAÜSTÜ ÖZEL İMLEÇ KONTROLÜ
if (customCursor) {
    let isHoveringLink = false;

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) { 
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';

            if (!isHoveringLink) {
                customCursor.classList.add('visible');
            }

            // SİHİRLİ DÜZELTME: Sola ve sağa dönüş mantığı SADECE slider varsa çalışsın
            if (desktopSlider) {
                if (e.clientX < window.innerWidth / 2) {
                    customCursor.classList.add('rotate-180');
                } else {
                    customCursor.classList.remove('rotate-180');
                }
            } else {
                // Slider olmayan sayfalarda (Works gibi) ok hep orijinal yönünde (düz) kalsın
                customCursor.classList.remove('rotate-180');
            }
        } else {
            customCursor.classList.remove('visible'); 
        }
    });

    // ==========================================
    // 5. TÜM LİNKLER İÇİN ÖZEL İMLEÇ GİZLEME (Güncellendi)
    // ==========================================
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            isHoveringLink = true;
            customCursor.classList.remove('visible'); // Linke girince oku gizle
        });
        
        link.addEventListener('mouseleave', () => {
            isHoveringLink = false;
            customCursor.classList.add('visible'); // Linkten çıkınca oku geri getir
        });
    });
}

// ==========================================
// 6. HAMBURGER MENÜ LOGİC
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.main-nav');
const menuLinks = document.querySelectorAll('.main-nav a');

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('is-active');
    });
}

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
    });
});

// ==========================================
// 7. SAYFA YÜKLENDİĞİNDE OTOMATİK ODAKLANMA
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    window.focus(); // Klavye odağını anında siteye çeker
});