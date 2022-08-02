`use strict`


const footerButtons = document.querySelector(`.footer__main`);


document.addEventListener("DOMContentLoaded", () => {
  const getfilter = new CreatTooltip(footerButtons);
  getfilter.appendElement();
  getfilter.endAppendElement();
});

/*Всплывающие подсказки*/

let tooltipElem;

class CreatTooltip {
  constructor (a) {
    this.a = a;
  }
  appendElement() {
    this.a.onmouseover = (event) => {
      let target = event.target;

      let tooltipHtml = target.dataset.tooltip;
      if (!tooltipHtml) return;

      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = tooltipHtml;
      document.body.append(tooltipElem);
      
      let coords = target.getBoundingClientRect();
      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0;

      let top = coords.top - tooltipElem.offsetHeight - 5;
  
      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    }
  }
  endAppendElement() {
    document.onmouseout = (e) => {
      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
    };
  }
};
    





$(document) .ready( () => {
  /*Настройки слайдера slick*/

  $(`.slider`).slick({
    arrows:false,// Видимость кнопок
    dots:true,// Видимость пуль
    adaptiveHeight:false,// адаптив вымота
    slidesToShow:2,
    slidesToScroll:2,
    speed: 2000,
    easing:`linear`,
    infinite: true,
    initialSlide:1,// с какого начало
    autoplay: true,
    autoplaySpeed:7000,
    pouseOnFocus:false,// пауза при наведении
    pauseOnDotsHover:false,
    pauseOnHover:false,
    centerMode:false,// по центру
    variableWidth:false,// убрать промежутки
    focusOnSelect:false,
    fade:false,
    centerPadding: `0px`,
    draggable:false,//Перетаскивание элемента мышью
    responsive:[{
      breakpoint: 1000,
      settings:{
        slidesToShow:1,
        slidesToScroll:1,
      },
    }]
  });


  $(`.slider__item-tex`).css(`padding`,`8%`);
});// окончание ready











/*_______________TV___TV____TV____TV____________________________________ */

const promoVideo = document.querySelector(`#promoVideo`);
const addSound = document.querySelector(`#addSound`);
const next = document.querySelector(`#nextSound`);
const nextInvert = document.querySelector(`#nextInvert`);
const photo = document.querySelector(`#tvPhotp`);



photo.style.cssText=`display:none;`;
promoVideo.volume = 0.5; 



window.onload = function() {
  

  const tv = new Tvpresentatin();
    tv.chekInput();
};



class Tvpresentatin {
  constructor() {
    
  }
  chekInput() {
    window.addEventListener("click", (event) => {
      const target = event.target;
      switch(target.id) {
        case "addSound":
          this.mutedFalse(promoVideo);
          break;
        case "addSound2":
          this.mutedTrue(promoVideo);
          break;
        case "nextSound":
          this.mutedFalse(promoVideo);
          photo.style.cssText=`width: 800px; `;
          promoVideo.style.cssText=`display:none;`;
          this.playVideo(promoVideo);
          addSound.style.cssText=`transform: rotate(0deg);`
          break;
        case "nextInvert":
          promoVideo.style.cssText=``;
          this.mutedFalse(promoVideo);
          this.playVideo(promoVideo);
          photo.style.cssText=`display:none; `;
          break;
      };
    });
  }
  mutedFalse(a) {
    a.muted = false;
    addSound.id = `addSound2`;
    addSound.style.cssText=`transform: rotate(180deg);`;
  }
  mutedTrue(a) {
    a.muted = true;
    addSound.id = `addSound`;
    addSound.style.cssText=`transform: rotate(0deg)`;
  }
  playVideo(video) {
    if(video.style.display == `none`) {
      video.pause();
      video.currentTime = 0;
    }
    else {
      video.play();
    }
  }
};








const bottomObj = document.querySelector(`.video-text`);
const topObj = document.querySelector(`.information__life`);


window.addEventListener("scroll", (event) => {
  const bottRect = bottomObj.getBoundingClientRect();
  const topRect = topObj.getBoundingClientRect();
  
  console.log(topRect);

  if(bottRect.top < 1 || topRect.top > 0) {
    promoVideo.style.display = `none`;
    promoVideo.pause();
  }
  else {
    promoVideo.play();
    promoVideo.style.display = ``;
  };
});






/*_______________TV___TV____TV____TV____________________________________ */




/*Скорость скролла при нажатии на ссылку*/
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};