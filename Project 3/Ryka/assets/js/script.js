var rqjs = document.getElementById('requirejs');
requirejs.config({
    baseUrl: rqjs.getAttribute('src').replace('require.js', ''),
    paths: {
        mmenu: 'mmenu-light',
        splide: 'splide.min',
    }
});
if (typeof jQuery === 'function') define('jQuery', function() {
    return jQuery;
});
const imageObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            imgObserver.unobserve(lazyImage);
        }
    });
});

jQuery(document).ready(function($) {
    "use strict";

    function init_scripts() {
        const lazyImages = document.querySelectorAll('[data-src]');
        for (var i = 0; i < lazyImages.length; i++) {
            imageObserver.observe(lazyImages[i]);
        }

        requirejs(['bootstrap'], function(bootstrap) {
            const tooltipList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            for (var i = 0; i < tooltipList.length; i++) {
                new bootstrap.Tooltip(tooltipList[i]);
            }
        });

        if (document.getElementsByClassName('splide')) {
            requirejs(['splide'], function(Splide) {
                const splides = document.getElementsByClassName('splide');
                for (var i = 0; i < splides.length; i++) {
                    new Splide(splides[i]).mount();
                }
            });
        }
    }
    init_scripts();

    if (document.getElementById('mmenu')) {
        requirejs(['mmenu'], function() {
            const menu = new MmenuLight(document.getElementById('mmenu')),
                drawer = menu.offcanvas({ position: ((document.dir == 'rtl') ? 'right' : 'left') });
            menu.navigation({ title: $('#mmenu').data('mm-spn-title') });
            $('[href="#mmenu"]').click(function(e) {
                e.preventDefault();
                drawer.open();
            });
        });
    }
});
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 50,
        },
    },
});

const imgBx = document.querySelector('.imgBx');
const slides = imgBx.getElementsByTagName('img');
console.log(slides);
let i = 0;

function nextSlide() {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active')
}


function prevSlide() {
    slides[i].classList.remove('active');
    i = (i - 1 + slides.length) % slides.length;
    slides[i].classList.add('active')
}


const progress = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
    const winScroll = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    progress.style.width = `${scrolled}%`

})