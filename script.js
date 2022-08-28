import greenCards from "./assets/mythicCards/green/index.js";
import brownCards from "./assets/mythicCards/brown/index.js";
import blueCards from "./assets/mythicCards/blue/index.js";
import ancients from './assets/ancients/index.js';

function shuffleDeskOfCards() {
  function randomGreenGards() {
    let randomCards = []
    while(randomCards.length < 5) {
      let random = Math.ceil(Math.random()*18);
      if(randomCards.includes(random)) {
        continue;
      } else {
        randomCards.push(random)
      }
    };
    return randomCards
  };

  function randomBlueGards() {
    let randomCards = []
    while(randomCards.length < 2) {
      let random = Math.ceil(Math.random()*12);
      if(randomCards.includes(random)) {
        continue;
      } else {
        randomCards.push(random)
      }
    };
    return randomCards
  };

  function randomBrownGards() {
    let randomCards = []
    while(randomCards.length < 9) {
      let random = Math.ceil(Math.random()*21);
      if(randomCards.includes(random)) {
        continue;
      } else {
        randomCards.push(random)
      }
    };
    return randomCards
  };

  let arrOfCardsGreen = randomGreenGards();
  let arrOfCardsBrown = randomBrownGards();
  let arrOfCardsBlue = randomBlueGards();

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

  let firstStageArr = [...arrBlue.slice(0,1),...arrBrown.slice(0,2), ...arrGreen.slice(0,1)]
  let secondStageArr = [...arrBlue.slice(1,2),...arrBrown.slice(2,5), ...arrGreen.slice(1,3)]
  let thirdStageArr = [...arrBrown.slice(5,9), ...arrGreen.slice(3,5)]

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
const img = document.createElement('img');

let firstStageGreen = ancients[0].firstStage.greenCards;
let firstStageBlue = ancients[0].firstStage.blueCards;
let firstStageBrown = ancients[0].firstStage.brownCards;
let secondStageGreen = ancients[0].secondStage.greenCards;
let secondStageBlue = ancients[0].secondStage.blueCards;
let secondStageBrown = ancients[0].secondStage.brownCards;
let thirdStageGreen = ancients[0].thirdStage.greenCards;
let thirdStageBlue = ancients[0].thirdStage.blueCards;
let thirdStageBrown = ancients[0].thirdStage.brownCards;

let shuffle;
let newOpenCard = 0;
let cardColor;

if(cardmix.addEventListener('click', () => {
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

counterFirstBrown.textContent = firstStageGreen;
counterFirstBlue.textContent = firstStageBlue;
counterFirstGreen.textContent = firstStageBrown;
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
  firstStageGreen = ancients[0].firstStage.greenCards;
  firstStageBlue = ancients[0].firstStage.blueCards;
  firstStageBrown = ancients[0].firstStage.brownCards;
  secondStageGreen = ancients[0].secondStage.greenCards;
  secondStageBlue = ancients[0].secondStage.blueCards;
  secondStageBrown = ancients[0].secondStage.brownCards;
  thirdStageGreen = ancients[0].thirdStage.greenCards;
  thirdStageBlue = ancients[0].thirdStage.blueCards;
  thirdStageBrown = ancients[0].thirdStage.brownCards;

  counterFirstBrown.textContent = firstStageGreen;
  counterFirstBlue.textContent = firstStageBlue;
  counterFirstGreen.textContent = firstStageBrown;
  counterSecondBrown.textContent = secondStageBrown;
  counterSecondBlue.textContent = secondStageBlue;
  counterSecondGreen.textContent = secondStageGreen;
  counterThirdGreen.textContent = thirdStageGreen;
  counterThirdBrown.textContent = thirdStageBrown;
  counterThirdBlue.textContent = thirdStageBlue;
}