"use strict"


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