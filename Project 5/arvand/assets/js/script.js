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
var splide = new Splide('.splide', {
    perPage: 3,
    rewind: true,
});

splide.mount();


function applyTheme(theme) {
    document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
}


document.addEventListener("DOMContentLoaded", () => {
    const saveTheme = localStorage.getItem('theme') || "auto";

    applyTheme(saveTheme)

    for (const opationElement of document.querySelectorAll('#selTheme option')) {
        opationElement.selected = saveTheme === opationElement.value
    }


    document.querySelector('#selTheme').addEventListener("change", function() {
        localStorage.setItem("theme", this.value)
        applyTheme(this.value)
    })
})