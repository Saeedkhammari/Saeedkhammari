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
            slidesPerView: 4,
            spaceBetween: 50,
        },
    },
});
const navToggler = document.querySelector('.navbar-toggler');
console.log(navToggler)

navToggler.addEventListener('click', navToggle);


function navToggle() {
    navToggler.classList.toggle('active')
    const nav = document.querySelector('.nav');
    nav.classList.toggle('open');
    if (nav.classList.contains('open')) {
        nav.style.height = nav.scrollHeight + "px"
    } else {
        nav.style.height = ""
    }
}
const slides = document.querySelector('.slider').children;
console.log(slides);
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const indicator = document.querySelector('.indicator');
let index = 0;


prev.addEventListener('click', function() {
    prevSlide();
    updateCircleIndicator();
    resetTimer();
})

next.addEventListener('click', function() {
    nextSlide();
    updateCircleIndicator();
    resetTimer();
})


function circleIndicator() {
    for (let i = 0; i < slides.length; i++) {
        const div = document.createElement('div');
        div.innerHTML = i + 1;
        div.setAttribute('onclick', 'indicatorSlide(this)');
        div.id = i
        if (i == 0) {
            div.className = "active"
        }
        indicator.appendChild(div)
    }
}

circleIndicator();


function updateCircleIndicator() {
    for (let i = 0; i < indicator.children.length; i++) {
        indicator.children[i].classList.remove('active')
    }
    indicator.children[index].classList.add('active');

}

function indicatorSlide(element) {
    index = element.id;
    changeSlide();
    updateCircleIndicator();
    resetTimer();
}



function prevSlide() {
    if (index == 0) {
        index = slides.length - 1;
    } else {
        index--
    }
    console.log
    changeSlide()
}

function nextSlide() {
    if (index == slides.length - 1) {
        index = 0
    } else {
        index++
    }
    changeSlide()
}


function changeSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active')
    }
    slides[index].classList.add('active')
}

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoplay, 4000);
}

function autoplay() {
    nextSlide();
    updateCircleIndicator();
}

let timer = setInterval(autoplay, 4000);
const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const seconds = document.getElementById('seconds');
let set_clock = setInterval(() => {

    let date_now = new Date();
    let hr = date_now.getHours();
    let min = date_now.getMinutes();
    let sec = date_now.getSeconds();
    let hr_calc = (hr * 30) + (min / 2);
    let min_calc = (min * 6) + (sec / 10);
    let sec_calc = sec * 6;
    hour.style.transform = `rotate(${hr_calc}deg)`
    minute.style.transform = `rotate(${min_calc}deg)`
    seconds.style.transform = `rotate(${sec_calc}deg)`

}, 1000)
const toTop = document.querySelector('.to-top')

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 400) {
        toTop.classList.add('active');

    } else {
        toTop.classList.remove('active');

    }
})