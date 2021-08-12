import galerys from './app.js'; 
const openModal = document.querySelector('.lightbox');
const closeModal =document.querySelector('.lightbox__button');
const imageModal = document.querySelector('.lightbox__image');
const cardsContainer = document.querySelector('.js-gallery');
const cardsOverlay = document.querySelector('.lightbox__overlay');
const cardsMarkup= createGalerryList(galerys);
console.log(cardsMarkup);
let currentEventImage;
function createGalerryList(galerys){
    return galerys.map(({preview, original, description})=>{
return `<li class="gallery__item">
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />
</li>`}).join('')
};
cardsContainer.insertAdjacentHTML('beforeend', cardsMarkup);
cardsContainer.addEventListener('click', onClickImage);
function onClickImage(event){
    console.log(event.target);
if(!event.target.classList.contains('gallery__image')){
  return;
};
currentEventImage = event.target.parentNode;  //обращаемся к родителю елемента на кoтором произошло событие - это li
window.addEventListener('keydown',onBtnArrowClick);
window.addEventListener('keydown',onEscPress);
openModal.classList.add('is-open');
imageModal.src=event.target.dataset.source;
};
closeModal.addEventListener('click', onCloseBtnImage);
function onCloseBtnImage(){
    window.removeEventListener('keydown',onBtnArrowClick);
    window.removeEventListener('keydown',onEscPress);
    openModal.classList.remove('is-open');
    imageModal.src ='';
  
};
// Закрыть модалку по клику в бекдроп
cardsOverlay.addEventListener('click', onCloseModalClickBackdrop);
function onCloseModalClickBackdrop(event){
    if(event.target===event.currentTarget){
        onCloseBtnImage()
    }
};
// Закрыть мoдалку по клику на esc
// сначала повесим слушатель события нажатия на клавиатуру на window(  window.removeEventListener('keydown',onEscPress);
function onEscPress(event){
    if(event.code==='Escape'){
        onCloseBtnImage()
    }
};
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"
function onBtnArrowClick(event){
if(event.code==='ArrowRight'){
    let pressBtnLeft = currentEventImage.nextElementSibling;
    if(!pressBtnLeft){
        pressBtnLeft=cardsContainer.firstElementChild;
    };
    imageModal.src = pressBtnLeft.firstElementChild.dataset.source;
    currentEventImage=pressBtnLeft;
};
if(event.code==='ArrowLeft'){
    let pressBrtnRigth = currentEventImage.previousElementSibling;
    if(!pressBrtnRigth){
        pressBrtnRigth = cardsContainer.lastElementChild;
    };
    imageModal.src = pressBrtnRigth.lastElementChild.dataset.source;
    currentEventImage=pressBrtnRigth;
}
    };