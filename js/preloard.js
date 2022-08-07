`use strict`

document.body.onload = function (params) {
    setTimeout(() => {
        const preloader = document.querySelector(`#pagePreloader`);
        if(!preloader.classList.contains(`done`)) {
            preloader.classList.add(`done`);
        }
    }, 1000);
}