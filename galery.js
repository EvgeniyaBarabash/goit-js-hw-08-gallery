import gallarys from './app.js';
console.log(gallarys);

const gallaryList = document.querySelector('.js-gallery');
const modalImage = document.querySelector('.lightbox');
const backdropImage = document.querySelector('.lightbox__overlay');
const closeModalBtn = document.querySelector('.lightbox__button');
const image = document.querySelector('.lightbox__image');


let indexOfOriginalLink = 0;
const originalLinks = gallarys.map(elem => {
    return elem.original;
  });

function createGallary(gallarys){
    return gallarys.map(({preview, original, description})=>{
return `<li class="gallery__item">
<a
  class="gallery__link"
  href="${original}"
>
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />
</a>
</li>`
    }).join('');
};
const gallaryListImage = createGallary(gallarys);
gallaryList.insertAdjacentHTML('beforeend', gallaryListImage);
console.log(gallaryListImage);
gallaryList.addEventListener('click', onClickImage);
closeModalBtn.addEventListener('click', onCloseImage);

function onClickImage(event){
    event.preventDefault()
    if(!event.target.classList.contains('gallery__image')){
        return;
    };
modalImage.classList.add('is-open');

window.addEventListener('keydown', onCloseClickEsc);
window.addEventListener('keydown',arrowNavigation);
image.src=event.target.dataset.source;
indexOfOriginalLink = originalLinks.indexOf(event.target.dataset.source);
};

function onCloseImage(){
    window.removeEventListener('keydown', onCloseClickEsc);
    window.removeEventListener('keydown',arrowNavigation);
    modalImage.classList.remove('is-open');
image.src='';
};

backdropImage.addEventListener('click', onCloseBackdropClickImage);
function onCloseBackdropClickImage(event){
if(event.target===event.currentTarget){
    onCloseImage()
}
};

function onCloseClickEsc(event){
    if(event.code==='Escape'){
        onCloseImage()
    }
};


const moveToLeft = evt => {
    if (evt.code === 'ArrowLeft') {
      indexOfOriginalLink > 0
        ? (image.src = originalLinks[(indexOfOriginalLink -= 1)])
        : (image.src =
            originalLinks[(indexOfOriginalLink = originalLinks.length - 1)]);
    }
  };
  
  const moveToRight = evt => {
    if (evt.code === 'ArrowRight') {
      indexOfOriginalLink < originalLinks.length - 1
        ? (image.src = originalLinks[(indexOfOriginalLink += 1)])
        : (image.src = originalLinks[(indexOfOriginalLink = 0)]);
    }
  };
  
  const arrowNavigation = evt => {
    if (!modalImage.classList.contains('is-open')) {
      return;
    }
    moveToLeft(evt);
    moveToRight(evt);
  };
  

