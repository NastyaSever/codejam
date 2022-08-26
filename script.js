import greenCards from "./assets/mythicCards/green/index.js";
import brownCards from "./assets/mythicCards/brown/index.js";
import blueCards from "./assets/mythicCards/blue/index.js";
import ancientsData from './assets/ancients/index.js';

function shuffleDeskOfCards() {
  const numGreenGardsAzathoth = 5;
  const numBrownGardsAzathoth = 9;
  const numBlueGardsAzathoth = 2;

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
    //console.log(randomCards)
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
    //console.log(randomCards)
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
    //console.log(randomCards)
    return randomCards
  };

  let arrOfCardsGreen = randomGreenGards();
  let arrOfCardsBrown = randomBrownGards();
  let arrOfCardsBlue = randomBlueGards();

  const firstStageGreen = 1;
  const firstStageBlue = 1;
  const firstStageBrown = 2;

  const secondStageGreen = 2;
  const secondStageBlue = 1;
  const secondStageBrown = 3;

  const thirdStageGreen = 2;
  const thirdStageBlue = 0;
  const thirdStageBrown = 4;

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

/***************Events************/
const cardmix = document.querySelector('.cardmixButton');
const openCard = document.querySelector('.open_card');
const closedCard = document.querySelector('.closed_card')

cardmix.addEventListener('click', shuffleDeskOfCards());

closedCard.addEventListener('click',() => {
  const img = document.createElement('img');
  img.classList.add('card_img');
  openCard.append(img)
  img.src = './assets/mythicCards/blue/blue1.png';
  img.onload = () => {
    openCard.style.backroundImage = 'url(`./assets/mythicCards/blue/blue1.png`)'
  }
})
