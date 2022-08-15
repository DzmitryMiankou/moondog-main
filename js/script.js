`use strict`

window.addEventListener('load',function () {
  document.body.style.overflow = `hidden`;  
  setTimeout(() => {
    const preloader = document.querySelector(`#pagePreloader`);
    if(!preloader.classList.contains(`done`)) {
      preloader.classList.add(`done`);
      document.querySelector(`body`).style.overflow = ``;
    }
    addAnimItem();//Запуск анимации элементво при видимости
  }, 1000);
  initCode();
});





/*______________________________________________________
____________________________________________________________________
___________________________________________________________________________________
__________________ANIMATION CIRCLE___WITH ANIMEjs________________________________________________
_________AND CONTROL AUDIO___________________________________________________________________________________*/



function animationBraille() {
  let braille = anime.timeline({
    targets: '.motion-path .el',
    delay: function(el, i) { return i * 200 },
    duration: 500,
    loop: true,
    direction: 'alternate',
  });

  braille
  .add({
    targets: '.motion-path .e1',
    translateX: -100,
    easing: 'easeInOutSine',
  })
  .add({
    targets: '.motion-path .e4',
    translateY: -100,
    easing: 'easeInOutSine',
  })
  .add({
    targets: '.motion-path .e3',
    translateY: 100,
    easing: `easeInOutSine`
  })
  .add({
    targets: '.motion-path .e6',
    translateX: 100,
    easing: `easeInOutSine`
  });

  const bottomAudio = document.querySelector(`#playMusic`);
  const circle = document.querySelectorAll(`.motion-path .el`);
  const audios = document.querySelectorAll(`.motion__audios-audio`);

  bottomAudio.addEventListener(`click`, handler);
  circle.forEach(e => e.addEventListener(`mouseout`, handler));
  circle.forEach(e => e.addEventListener(`mouseover`, handler)); 

  let a;

  function  handler (event) {
    switch(event.type) {
      case `mouseover`:
        playMusic();
        mouseOverStyle(event);
        break;
      case `mouseout`:
        mouseOutStyle(event);
        break;
      case `click`:
        bottomAudio.innerHTML = `PLAY`;
        a = true;
        break;
    };
  };

  function mouseOverStyle(event) {
    anime({
      targets: event.target,
      r:35,
      duration: 500,
      fill:`#6668ac`
    });
  };

  function mouseOutStyle(event) {
    anime({
      targets: event.target,
      r:28,
      duration: 5500,
      fill:`#dcd4d1`,
      delay:2000
    });
  };

  function playMusic() {
    function RandArray(array) {
      const rand = Math.random()*array.length | 0;
      const rValue = array[rand];
      return rValue;
    };
    const myArray = audios;
    const rValue = RandArray(myArray);
    if(a == true) {
      rValue.play();
      a==false;
    }else {
      rValue.pause();
    };
  };
};



/*_______________TV___TV____TV____TV____________________
_______________________________________________________________
_____________________________________________________________________
____________________________________________________________________________________ */



const addSound = document.querySelector(`#addSound`);
const next = document.querySelector(`#nextSound`);
const nextInvert = document.querySelector(`#nextInvert`);
const bottomObj = document.querySelector(`.video-text`);
const topObj = document.querySelector(`.information__life`);

const content = document.querySelectorAll(`.video-itam`);// Массив медиафайлов
content.forEach(element => element.style.cssText=`display:none;`);
content[0].style.cssText=``;


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





/*_______________CANVAS STARS_____________
______________________________________________________________
____________________________________________________________________________________
____________________________________________________________________________________________ */



const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const h = canvas.height = 900;
const w = canvas.width = innerWidth;

const particles = [];


const properties = { // свойства объектов
  bgColor: `rgba(0, 0, 0, 0.08)`,
  particlesColor: `#dcd4d1`,
  particlesRadius: 2,
  particlesCount: 60,
  particlesMaxV: 0.1,
  particlesLife: 70,
};

window.addEventListener('resize', () => {
	canvas.width = w;
	canvas.height = h;
});


let mouse = {
  x: undefined,
  y: undefined
};

const canva = document.querySelector('.canva');

canva.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});


class Particles {
  constructor(){
    this.x = Math.random()*w;
    this.y = Math.random()*h;
    this.vX = Math.random()*(properties.particlesMaxV*2)-properties.particlesMaxV;
    this.vY = Math.random()*(properties.particlesMaxV*2)-properties.particlesMaxV;
    this.life = Math.random()*properties.particlesLife*60;
  }
 
  position() {
    if(mouse.x - this.x < 10 && mouse.x - this.x > -10) {
     this.x=Math.random()*w;
    }
    if(mouse.y - this.y < 10 && mouse.y - this.y > -10) {
     this.y=Math.random()*h;
    }
    this.x + this.vX > w && this.vX > 0 || this.x + this.vX < 0 && this.x < 0? this.vX*=-1: this.vX;
    this.y + this.vY > h && this.vY > 0 || this.y + this.vY < 0 && this.y < 0? this.vY*=-1: this.vY;
    this.x += this.vX;
    this.y += this.vY;
  }
  reDraw() {
    context.beginPath();
    context.arc(this.x, this.y, Math.random()*properties.particlesRadius, 0, Math.PI*2 );
    context.closePath;
    context.fillStyle = properties.particlesColor;
    context.fill();
  }
  reCalcLife() {
    if(this.life < 1) {
      this.x = Math.random()*w;
      this.y = Math.random()*h;
      this.vX = Math.random()*(properties.particlesMaxV*2)-properties.particlesMaxV;
      this.vY = Math.random()*(properties.particlesMaxV*2)-properties.particlesMaxV;
      this.life = Math.random()*properties.particlesLife*60;
    }
    this.life--;
  }
};

function reDrawBackgraund() { // Заливка фона
  context.fillStyle = properties.bgColor;
  context.fillRect(0, 0, w, h);
  
};

function reDrawParticles() {
  for(let i in particles){
    particles[i].reCalcLife();
    particles[i].position();
    particles[i].reDraw();
    
  }
};

function loop() { //самовызывание анимации повтор
  reDrawBackgraund();
  reDrawParticles();
  requestAnimationFrame(loop);
};


function init() { //инициация программы
  for(let i = 0; i < properties.particlesCount; i++) {
    particles.push(new Particles);
  }
  loop();
};





/*_______________________________________
_____________________________Animation Elem____________________________
_________________________________________________________________________________
_________________________________________________________________________________________*/



function addAnimItem(params) {
  const animItems = document.querySelectorAll(`._anim-items`);
  if(animItems.length > 0) {
    window.addEventListener(`scroll`, animOnScroll);
      function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHight = animItem.offsetHeight;//размер элемента по высате
        const animItemOffset = offset(animItem).top;// от 0 до элемента 
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHight / animStart;

        if(animItemHight > window.innerHeight) {
          window.innerHeight - window.innerHeight / animStart;
        }
        if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHight)) {
          animItem.classList.add(`_active`);
        } else {
          if(!animItem.classList.contains(`_anim-no-hide`)) {
            animItem.classList.remove(`_active`);
          }
        }
      };
    };
    setTimeout(() => {
      animOnScroll();
    }, 300);
  };
};

  
/*________________________________Anime mouse__________________
_________________________________________________________________________
__________________________________________________________________________________________ */

function animMouse() {

  const parallax = document.querySelector(`.canva`);
   const container = document.querySelector(`.parallax__container`);
   const moonText = document.querySelector(`.canva__moontext`);
  if(parallax) {
   

    const moonText = document.querySelector(`.canva__moontext`);

    const forText = 6;
    const speed = 0.05;

    let positionX = 0;
    let positionY = 0;
    let coordXprocent = 0;
    let coordYprocent = 0;

  function setMausParallaxStyle() {
    const distX = coordXprocent - positionX;
    const distY = coordYprocent - positionY;

    positionX = positionX + (distX * speed);
    positionY = positionY + (distY * speed);
    let a =moonText.style.cssText = `transform: translate(${positionX / forText}%,${positionX / -28}%);`;
    requestAnimationFrame(setMausParallaxStyle);
  }
    setMausParallaxStyle();
    parallax.addEventListener(`mousemove`, function (e) {
      
      const parallaxHight = parallax.offsetHeight;
      const parallaxWidth = parallax.offsetWidth;

      const coordX = e.pageX - parallaxWidth / 2;
      const coordY = e.pageY - parallaxHight / 2;


      coordXprocent = coordX / parallaxWidth * 100;
      coordYprocent = coordY / parallaxHight * 100;
    });
  };
};


/*____________________________________
_______________________SCROLL TEXT ________________________________
_____________________________________________________________________________
__________________________________________________________________________________________ */

function scrollElem() {
  window.addEventListener(`scroll`, sizeScroll);
  function sizeScroll() {
    const offsetTop = offset(document.querySelector(`.video-text-el`)).top;
    const scrolled = (window.pageYOffset - offsetTop) + window.innerHeight / 2; 
    let size = scrolled * 0.8;
    sizeScrollMinimal(size);
    const offsetTop2 = offset(document.querySelector(`.video-text-el1`)).top;
    const scrolled2 = (window.pageYOffset - offsetTop2) + window.innerHeight / 2;
    let size2 = scrolled2 * 0.6;
    sizeScrollAvangarde(size2);
  };

  function sizeScrollMinimal(size){
  animationMinimal.seek(-size+200);
  }

  function sizeScrollAvangarde(size){
  animationAvangarde.seek(-size+200);
  }

  let animationMinimal = anime({
    targets: `.video-text-el`,
    translateX: -200+`%`,
    easing: `easeInOutSine`,
    elasticity: 600,
    autoplay:false,
  
 });

  let animationAvangarde = anime({
    targets: `.video-text-el1`,
    translateX: 200+`%`,
    easing: `easeInOutSine`,
    elasticity: 600,
    autoplay:false,
 });
};




/*____________________________________________________________________________
______________________________easy scroll________________________________________________
__________________________________________________________________________________________________
______________________________________________________________________________________________________ */

function scrollToElement(el, offset) {
  const off = offset || 0;
  const rect = el.getBoundingClientRect();
  const top = rect.top + off;
  const animation = anime({
    targets: [document.body, document.documentElement],
    scrollTop: top,
    easing: 'easeInOutSine',
    duration: 0
  });
};


const scrollToGettingheadermusic = document.querySelector('#header__music');
window.addEventListener('load', function(e) {
  e.preventDefault();
  scrollToElement(document.querySelector('#logoscrol'));
});






/*______________________________________________
____________________________observer_______________________
___________________________________________________________________
______________________________________________________________________________*/


const options = {
    threshold: 0,
}
const callback = function(entries, observer) {
    entries.forEach(entry => {
      const {target, isIntersecting, intersectionRatio} = entry;
      if (isIntersecting) {
        animParadox();
      }else {
        return;
      }
    })
};
const observer = new IntersectionObserver(callback, options);

const target = document.querySelector(`.paradox__text`);
observer.observe(target);



function animParadox() {
var tl = anime({
  targets: ".elem .paradox__svg-path",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 2500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: false
});
};







function offset(el) {
  const rec = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, //Safari  не  видит scrrollL,T. Эта функциия добавляет кроссбраузерности
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {top: rec.top + scrollTop, left: rec.left + scrollLeft};
};


function initCode() {
  animationBraille();//Запуск анимации кружков
  scrollElem();// Скролл текста

  animMouse();// Движение за мышью
  init();// запуск анимации Canvas
  const tv = new Tvpresentatin(content);// Запуск кода управлением "TV"
  tv.clickInput();
  tv.scrollTv();
};