import greenCards from "./assets/mythicCards/green/index.js";
import brownCards from "./assets/mythicCards/brown/index.js";
import blueCards from "./assets/mythicCards/blue/index.js";
import ancients from './assets/ancients/index.js';

const ancientsCards = document.querySelector('.ancients')
const azathothCard = document.querySelector('.azathoth');
const azathoth = ancients[0];
const cthulhuCard = document.querySelector('.cthulhu');
const cthulhu = ancients[1];

if(azathothCard.addEventListener('click', ()=> {
  main.style.display = 'flex';
  azathothCard.classList.add('active');
  cthulhuCard.classList.remove('active');
  setNumOfCardForAncients(azathoth)
}));
if(cthulhuCard.addEventListener('click', () => {
  main.style.display = 'flex';
  azathothCard.classList.remove('active');
  cthulhuCard.classList.add('active');
  setNumOfCardForAncients(cthulhu);
}));


function shuffleDeskOfCards() {

  function randomDiffCards(num, overalNum) {
    let randomCards = []
    while(randomCards.length <= num) {
      let random = Math.ceil(Math.random()*overalNum);
      if(randomCards.includes(random)) {
        continue;
      } else {
        randomCards.push(random)
      }
    };
    return randomCards
  };

  let arrOfCardsGreen;
  let arrOfCardsBrown;
  let arrOfCardsBlue;

  if(azathothCard.classList.contains('active')) {
    arrOfCardsGreen = randomDiffCards(5, greenCards.length)
    arrOfCardsBrown = randomDiffCards(9, brownCards.length)
    arrOfCardsBlue = randomDiffCards(2, blueCards.length)
  } else if(cthulhuCard.classList.contains('active')) {
    arrOfCardsGreen = randomDiffCards(4, greenCards.length);
    arrOfCardsBrown = randomDiffCards(9, brownCards.length);
    arrOfCardsBlue = randomDiffCards(2, blueCards.length);
  };

  arrOfCardsBlue = arrOfCardsBlue.map(el => {
  return `blue${el}`
  });

  arrOfCardsBrown = arrOfCardsBrown.map(el => {
    return `brown${el}`
  });

  arrOfCardsGreen = arrOfCardsGreen.map(el => {
    return `green${el}`
  });

  let arrBlue = blueCards.filter(el => {
    return arrOfCardsBlue.includes(el.id)
  });

  let arrBrown = brownCards.filter(el => {
    return arrOfCardsBrown.includes(el.id)
  });

  let arrGreen = greenCards.filter(el => {
  return arrOfCardsGreen.includes(el.id)
  });

  let firstStageArr;
  let secondStageArr;
  let thirdStageArr;

  if(azathothCard.classList.contains('active')) {
    firstStageArr = [...arrBlue.slice(0,1),...arrBrown.slice(0,2), ...arrGreen.slice(0,1)]
    secondStageArr = [...arrBlue.slice(1,2),...arrBrown.slice(2,5), ...arrGreen.slice(1,3)]
    thirdStageArr = [...arrBrown.slice(5,9), ...arrGreen.slice(3,5)]
  } else if(cthulhuCard.classList.contains('active')) {
    firstStageArr = [...arrBlue.slice(0,2),...arrBrown.slice(0,2)]
    secondStageArr = [...arrBrown.slice(2,5), ...arrGreen.slice(0,1)]
    thirdStageArr = [...arrBrown.slice(5,9), ...arrGreen.slice(1,4)]
  };

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  shuffle(firstStageArr)
  shuffle(secondStageArr)
  shuffle(thirdStageArr)

  let arrFinal = [...firstStageArr, ...secondStageArr, ...thirdStageArr];
  console.log(arrFinal)
 return arrFinal
}

/***************CardMix*************/
const cardmix = document.querySelector('.cardmixButton');
const openCard = document.querySelector('.open_card');
const closedCard = document.querySelector('.closed_card');
const cards = document.querySelector('.cards');
const main = document.querySelector('.main');
const img = document.createElement('img');

let firstStageGreen;
let firstStageBlue;
let firstStageBrown;
let secondStageGreen;
let secondStageBlue;
let secondStageBrown;
let thirdStageGreen;
let thirdStageBlue;
let thirdStageBrown;

if(azathothCard.addEventListener('click', ()=> {
  main.style.display = 'flex';
  cards.style.display = 'none';
  azathothCard.style.border = 'red 2px solid';
  cthulhuCard.style.border = '0';
  setNumOfCardForAncients(azathoth);
  getStartTracker()
}));
if(cthulhuCard.addEventListener('click', () => {
  main.style.display = 'flex';
  cards.style.display = 'none';
  cthulhuCard.style.border = 'red 2px solid';
  azathothCard.style.border = '0';
  setNumOfCardForAncients(cthulhu);
  getStartTracker()
}));

function setNumOfCardForAncients(anc) {
  firstStageGreen = anc.firstStage.greenCards;
  firstStageBlue = anc.firstStage.blueCards;
  firstStageBrown = anc.firstStage.brownCards;
  secondStageGreen = anc.secondStage.greenCards;
  secondStageBlue = anc.secondStage.blueCards;
  secondStageBrown = anc.secondStage.brownCards;
  thirdStageGreen = anc.thirdStage.greenCards;
  thirdStageBlue = anc.thirdStage.blueCards;
  thirdStageBrown = anc.thirdStage.brownCards;
};

let shuffle;
let newOpenCard = 0;
let cardColor;

if(cardmix.addEventListener('click', () => {
  cards.style.display = 'flex';
  shuffle = shuffleDeskOfCards();
  newOpenCard = 0;
  openCard.style.display = 'none';
  getStartTracker()
}));

function addNewOpenCard() {
  let numOfCard = newOpenCard;
  openCard.append(img)
  img.classList.add('card_img');
  img.src = `./assets/mythicCards/${shuffle[numOfCard].color}/${shuffle[numOfCard].cardFace}`;
  img.onload = () => {
    openCard.style.backroundImage = `url(./assets/mythicCards/${shuffle[numOfCard].color}/${shuffle[numOfCard].cardFace})`;
  }
  cardColor = `${shuffle[numOfCard].color}`
  console.log(shuffle[numOfCard])
};

function getNextCard() {
  if(newOpenCard >= shuffle.length) {
    openCard.style.display = 'none';
    return;
  } else {
    addNewOpenCard()
    newOpenCard++
    openCard.style.display = 'flex'
    setClosedCardTracker()
  }
};

closedCard.addEventListener('click', getNextCard)

/******************Tracker***********/

let counterFirstBrown = document.querySelector('.dot_brown');
let counterFirstBlue = document.querySelector('.dot_blue');
let counterFirstGreen = document.querySelector('.dot_green');
let counterSecondBrown = document.querySelector('.counter_second .dot_brown');
let counterSecondBlue = document.querySelector('.counter_second .dot_blue');
let counterSecondGreen = document.querySelector('.counter_second .dot_green');
let counterThirdGreen = document.querySelector('.counter_third .dot_green');
let counterThirdBrown = document.querySelector('.counter_third .dot_brown');
let counterThirdBlue = document.querySelector('.counter_third .dot_blue');

counterFirstBrown.textContent = firstStageBrown;
counterFirstBlue.textContent = firstStageBlue;
counterFirstGreen.textContent = firstStageGreen;
counterSecondBrown.textContent = secondStageBrown;
counterSecondBlue.textContent = secondStageBlue;
counterSecondGreen.textContent = secondStageGreen;
counterThirdGreen.textContent = thirdStageGreen;
counterThirdBrown.textContent = thirdStageBrown;
counterThirdBlue.textContent = thirdStageBlue;

function setClosedCardTracker() {
  if(secondStageGreen === 0 && secondStageBlue === 0 && secondStageBrown === 0) {
    if(cardColor === 'green') {
      thirdStageGreen--
    } else if(cardColor === 'blue') {
      thirdStageBlue--
    } else if(cardColor === 'brown') {
      thirdStageBrown--
    }
  } else if(firstStageGreen === 0 && firstStageBlue === 0 && firstStageBrown === 0) {
    if(cardColor === 'green') {
      secondStageGreen--
    } else if(cardColor === 'blue') {
      secondStageBlue--
    } else if(cardColor === 'brown') {
      secondStageBrown--
    }
  } else {
    if(cardColor === 'green') {
      firstStageGreen--
    } else if(cardColor === 'blue') {
      firstStageBlue--
    } else if(cardColor === 'brown') {
      firstStageBrown--
    }
  }
  counterFirstBrown.textContent = firstStageGreen;
  counterFirstBlue.textContent = firstStageBlue;
  counterFirstGreen.textContent = firstStageBrown;
  counterSecondBrown.textContent = secondStageBrown;
  counterSecondBlue.textContent = secondStageBlue;
  counterSecondGreen.textContent = secondStageGreen;
  counterThirdGreen.textContent = thirdStageGreen;
  counterThirdBrown.textContent = thirdStageBrown;
  counterThirdBlue.textContent = thirdStageBlue;
};

function getStartTracker() {
  if(azathothCard.classList.contains('active')) {
    firstStageGreen = ancients[0].firstStage.greenCards;
    firstStageBlue = ancients[0].firstStage.blueCards;
    firstStageBrown = ancients[0].firstStage.brownCards;
    secondStageGreen = ancients[0].secondStage.greenCards;
    secondStageBlue = ancients[0].secondStage.blueCards;
    secondStageBrown = ancients[0].secondStage.brownCards;
    thirdStageGreen = ancients[0].thirdStage.greenCards;
    thirdStageBlue = ancients[0].thirdStage.blueCards;
    thirdStageBrown = ancients[0].thirdStage.brownCards;
  } else if(cthulhuCard.classList.contains('active')) {
    firstStageGreen = ancients[1].firstStage.greenCards;
    firstStageBlue = ancients[1].firstStage.blueCards;
    firstStageBrown = ancients[1].firstStage.brownCards;
    secondStageGreen = ancients[1].secondStage.greenCards;
    secondStageBlue = ancients[1].secondStage.blueCards;
    secondStageBrown = ancients[1].secondStage.brownCards;
    thirdStageGreen = ancients[1].thirdStage.greenCards;
    thirdStageBlue = ancients[1].thirdStage.blueCards;
    thirdStageBrown = ancients[1].thirdStage.brownCards;
  }

  counterFirstBrown.textContent = firstStageBrown;
  counterFirstBlue.textContent = firstStageBlue;
  counterFirstGreen.textContent = firstStageGreen;
  counterSecondBrown.textContent = secondStageBrown;
  counterSecondBlue.textContent = secondStageBlue;
  counterSecondGreen.textContent = secondStageGreen;
  counterThirdGreen.textContent = thirdStageGreen;
  counterThirdBrown.textContent = thirdStageBrown;
  counterThirdBlue.textContent = thirdStageBlue;
}