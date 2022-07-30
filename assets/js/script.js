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



let header = document.querySelector('.header');
let sticky = header.offsetTop;


window.addEventListener('scroll', () => {
    if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
})

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const c = +counter.innerText;

        const increment = target / 500;

        if (c < target) {
            counter.innerText = Math.ceil(c + increment);
            setTimeout(updateCounter, 1)
        } else {
            counter.innerText = target
        }

    }

    updateCounter()

})

const accor = document.querySelectorAll('.accordion-title');

accor.forEach(item => {
    item.addEventListener('click', function() {
        item.classList.toggle('active');
        const content = item.nextElementSibling;
        if (content.style.height) {
            content.style.height = null
        } else {
            content.style.height = content.scrollHeight + 'px';
        }
    })
})

const toTop = document.querySelector('.to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 400) {
        toTop.classList.add('active');
    } else {
        toTop.classList.remove('active');
    }
})

const log = document.querySelector('#login');
const reg = document.querySelector('#register');
const btn = document.querySelector('#btn');
console.log(register)


function login() {
    log.style.right = "0px";
    reg.style.right = "450px";
    btn.style.right = "0"
}


function register() {
    log.style.right = "-450px";
    reg.style.right = "0";
    btn.style.right = "110px"
}
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