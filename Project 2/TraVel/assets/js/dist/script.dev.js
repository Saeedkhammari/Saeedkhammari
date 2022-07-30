"use strict";

var rqjs = document.getElementById('requirejs');
requirejs.config({
  baseUrl: rqjs.getAttribute('src').replace('require.js', ''),
  paths: {
    mmenu: 'mmenu-light',
    splide: 'splide.min'
  }
});
if (typeof jQuery === 'function') define('jQuery', function () {
  return jQuery;
});
var imageObserver = new IntersectionObserver(function (entries, imgObserver) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var lazyImage = entry.target;
      lazyImage.src = lazyImage.dataset.src;
      imgObserver.unobserve(lazyImage);
    }
  });
});
jQuery(document).ready(function ($) {
  "use strict";

  function init_scripts() {
    var lazyImages = document.querySelectorAll('[data-src]');

    for (var i = 0; i < lazyImages.length; i++) {
      imageObserver.observe(lazyImages[i]);
    }

    requirejs(['bootstrap'], function (bootstrap) {
      var tooltipList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

      for (var i = 0; i < tooltipList.length; i++) {
        new bootstrap.Tooltip(tooltipList[i]);
      }
    });

    if (document.getElementsByClassName('splide')) {
      requirejs(['splide'], function (Splide) {
        var splides = document.getElementsByClassName('splide');

        for (var i = 0; i < splides.length; i++) {
          new Splide(splides[i]).mount();
        }
      });
    }
  }

  init_scripts();

  if (document.getElementById('mmenu')) {
    requirejs(['mmenu'], function () {
      var menu = new MmenuLight(document.getElementById('mmenu')),
          drawer = menu.offcanvas({
        position: document.dir == 'rtl' ? 'right' : 'left'
      });
      menu.navigation({
        title: $('#mmenu').data('mm-spn-title')
      });
      $('[href="#mmenu"]').click(function (e) {
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
    clickable: true
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50
    }
  }
});
var navToggler = document.querySelector('.navbar-toggler');
console.log(navToggler);
navToggler.addEventListener('click', navToggle);

function navToggle() {
  navToggler.classList.toggle('active');
  var nav = document.querySelector('.nav');
  nav.classList.toggle('open');

  if (nav.classList.contains('open')) {
    nav.style.height = nav.scrollHeight + "px";
  } else {
    nav.style.height = "";
  }
}

var slides = document.querySelector('.slider').children;
console.log(slides);
var next = document.querySelector('.next');
var prev = document.querySelector('.prev');
var indicator = document.querySelector('.indicator');
var index = 0;
prev.addEventListener('click', function () {
  prevSlide();
  updateCircleIndicator();
  resetTimer();
});
next.addEventListener('click', function () {
  nextSlide();
  updateCircleIndicator();
  resetTimer();
});

function circleIndicator() {
  for (var i = 0; i < slides.length; i++) {
    var div = document.createElement('div');
    div.innerHTML = i + 1;
    div.setAttribute('onclick', 'indicatorSlide(this)');
    div.id = i;

    if (i == 0) {
      div.className = "active";
    }

    indicator.appendChild(div);
  }
}

circleIndicator();

function updateCircleIndicator() {
  for (var i = 0; i < indicator.children.length; i++) {
    indicator.children[i].classList.remove('active');
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
    index--;
  }

  console.log;
  changeSlide();
}

function nextSlide() {
  if (index == slides.length - 1) {
    index = 0;
  } else {
    index++;
  }

  changeSlide();
}

function changeSlide() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }

  slides[index].classList.add('active');
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoplay, 4000);
}

function autoplay() {
  nextSlide();
  updateCircleIndicator();
}

var timer = setInterval(autoplay, 4000);
var hour = document.getElementById('hour');
var minute = document.getElementById('minute');
var seconds = document.getElementById('seconds');
var set_clock = setInterval(function () {
  var date_now = new Date();
  var hr = date_now.getHours();
  var min = date_now.getMinutes();
  var sec = date_now.getSeconds();
  var hr_calc = hr * 30 + min / 2;
  var min_calc = min * 6 + sec / 10;
  var sec_calc = sec * 6;
  hour.style.transform = "rotate(".concat(hr_calc, "deg)");
  minute.style.transform = "rotate(".concat(min_calc, "deg)");
  seconds.style.transform = "rotate(".concat(sec_calc, "deg)");
}, 1000);
var toTop = document.querySelector('.to-top');
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 400) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
});