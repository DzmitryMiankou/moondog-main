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



const addSound = document.querySelector(`#addSound`);
const next = document.querySelector(`#nextSound`);
const nextInvert = document.querySelector(`#nextInvert`);
const bottomObj = document.querySelector(`.video-text`);
const topObj = document.querySelector(`.information__life`);

const content = document.querySelectorAll(`.video-itam`);// Массив медиафайлов


content.forEach(element => element.style.cssText=`display:none;`);


window.onload = function() {
  content[0].style.cssText=``;

  const tv = new Tvpresentatin(content);
  tv.clickInput();
  tv.scrollTv();
};

let c;

class Tvpresentatin {
  constructor(content) {
    this.content = content;
    this.video = content[0];
    this.zero = 1;
    this.lengthContent = content.length;
  }
  scrollTv() {
    window.addEventListener("scroll", (event) => {
    const bottRect = bottomObj.getBoundingClientRect();
    const topRect = topObj.getBoundingClientRect();
    this.scrollStop(bottRect, topRect);
    });
  }
  clickInput() {
    window.addEventListener("click", (event) => {
      const target = event.target;
      switch(target.id) {
        case "addSound":
          this.mutedFalse(this.video);
          break;
        case "addSound2":
          this.mutedTrue(this.video);
          break;
        case "nextSound":
          this.nextRight();
          this.playVideo(this.video);
          break;
        case "nextInvert":
          this.nextLeft();
          this.playVideo(this.video);
          break;
      };
    });
  }
  mutedFalse(a) {
    this.video.volume = 0.2;
    a.muted = false;
    addSound.id = `addSound2`;
    addSound.style.cssText=`transform: rotate(180deg);`;
  }
  mutedTrue(a) {
    a.muted = true;
    addSound.id = `addSound`;
    addSound.style.cssText=`transform: rotate(0deg)`;
  }
  playVideo() {
    if(this.video.style.display == `none`) {
      this.video.pause();
      this.video.currentTime = 0;
    }
    else {
      this.video.play();
    }
  }
  scrollStop(bottRect, topRect) {
    if(bottRect.top < 1 || topRect.top > 0 || this.video.style.display == `none`) {
      this.video.pause();
    }
    else {
      this.video.play();
    };
  }
  nextRight() {
    let cauntP = this.zero++;    
    if(cauntP > this.content.length-1) {
      this.zero = 1;
      this.styleCSS(0);
      return;
    } else {
    this.styleCSS(cauntP);
    };
    c = cauntP-1;
  }
  nextLeft() {
    let cauntM = c--;
    if(cauntM === 0 || cauntM < 0 || this.video.style.display == ``) {
      c = this.lengthContent-1;
      this.styleCSS(0);
      return;
    } else {
      this.styleCSS(cauntM);
    };
    c = cauntM - 1;
  }
  styleCSS(numb) {
    this.content.forEach(element => element.style.cssText=`display: none;`);
    this.content[numb].style.cssText=``;
  }
};





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


/*

const windowInnerWidth = document.documentElement.clientWidth; // Ширина канваса от ширины окна без элем.браузера
const windowInnerHeight = document.documentElement.clientHeight; // Высота канваса от ширины окна без элем.браузера
*/
const canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext('2d');


const innerX = canvas.width = document.documentElement.clientWidth;
const innerY = canvas.height = document.documentElement.clientHeight;


window.addEventListener('resize', () => {
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
  init();
});


ctx.beginPath();
ctx.fillStyle = `#6668ac`;
ctx.arc(innerX/2, 150, innerX/25, 0, 2 * Math.PI, true);
ctx.fill();
























/*
img.onload = function() {
  canvas.height = this.height;
  canvas.width = this.width;
  document.querySelector(`.canva`).style.height = canvas.height + `px`;
  document.querySelector(`.canva`).style.width = canvas.width +`px`;
  let pat = new Image();
  pat.onload = function () {
    ctx.fillStyle = ctx.createPattern(this, "repeat");
    ctx.fillRect(10, 0, canvas.width, canvas.height );
  }
  pat.src = "images/d.jpg";
  
};


let drawStarted = false;

canvas.addEventListener("mousedown", beginDraw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mouseout", endDraw);
canvas.addEventListener("mousemove", draw);


function beginDraw(ev) {
        ctx.beginPath();
        n_x = ev.offsetX;
        n_y = ev.offsetY;
        ctx.moveTo(n_x, n_y);
        drawStarted = true;
      }

      // Эта функция вызывается каждый раз, когда вы перемещаете мышь.
      // Но рисование происходит только когда вы удерживаете кнопку мыши
      // нажатой.
      function draw(ev) {
        if (drawStarted) {
          console.log(n_x + " " + n_y + " " + (n_x + 5) + " " + (n_y + 5));
          //делаем пиксели прозрачными
          
          ctx.arc(n_x, n_y, 50, 0, 2 * Math.PI, false);
          ctx.stroke();

          
          ctx.clearRect(n_x, n_y, 80, 150);
          ctx.moveTo(ev._x, ev._y);
          n_x = ev.offsetX;
          n_y = ev.offsetY;
        }
      }

      // Событие при отпускании мыши
      function endDraw(ev) {
        if (drawStarted) {
          draw(ev);
          drawStarted = false;
        }
      }

*/
