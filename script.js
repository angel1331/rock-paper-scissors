//Смену темы нейронка написала, просто я слегка переделал что она написала:
const bodyElement = document.querySelector('body');
const buttonElement = document.querySelector('.theme-button');
const imgElement = document.querySelector('.theme-img');
const allPage = document.querySelector('.main');

// Все элементы с цветом
const colorElements = [
  allPage
];

// Все кнопки с border
const borderElements = [
  document.querySelector('.js-rock-button'),
  document.querySelector('.js-scissors-button'),
  document.querySelector('.js-paper-button')
];

buttonElement.addEventListener('click', () => {
  const darkMode = !bodyElement.classList.contains('background-color-dark');

  bodyElement.classList.toggle('background-color-dark', darkMode);
  imgElement.src = darkMode ? 'img/light-theme.png' : 'img/dark-theme.png';

  const color = darkMode ? 'white' : 'black';

  // Меняем цвет текста
  colorElements.forEach(el => el.style.color = color);

  // Меняем цвет рамки
  borderElements.forEach(el => el.style.borderColor = color);
});

const score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};


const rankNames = ['Fucking Slave', 'Fisting is 300 Bucks', 'Ass We Can', 'Fuck You Leather Man', 'You Like That, Huh?', 'You Got Me Mad Now', 'Six Hot Loads', 'Thanks, Sir', 'Lord of the Lockerroom', 'Dungeon Master'];
const rankThreshold = [0, 10, 20, 30, 40, 50, 60, 70, 80, 100];

const rank = JSON.parse(localStorage.getItem('rank')) || {
  MMR: 0
}

let yourRankName = JSON.parse(localStorage.getItem('yourRankName')) || '';
let nextRank = JSON.parse(localStorage.getItem('nextRank')) || [];
let yourRank = JSON.parse(localStorage.getItem('yourRank')) || [];

updateRankElement();
updateScoreElement();

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Камень');
  })

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Ножницы');
  })

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Бумага');
  })

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'q' || event.key === 'й') {
    playGame('Камень');
  }
  
  if (event.key === 'w' || event.key === 'ц') {
    playGame('Ножницы');
  }

  if (event.key === 'e' || event.key === 'у') {
    playGame('Бумага');
  }
})

let canPlay = true;

function playGame(playerMove) {
  if (canPlay === false) {
    return;
  } else {
    canPlay = false;
    setTimeout(() => {
      canPlay = true;
    }, 1000);
  }

  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === computerMove) {
    result = 'Ничья';
  } else if (playerMove === 'Камень' && computerMove !== 'Бумага') {
    result = 'Ты выйграл(ла)';
  } else if (playerMove === 'Ножницы' && computerMove !== 'Камень') {
    result = 'Ты выйграл(ла)';
  } else if (playerMove === 'Бумага' && computerMove !== 'Ножницы') {
    result = 'Ты выйграл(ла)';
  } else {result = `Ты проиграл(ла)`;}

  if (result === 'Ты выйграл(ла)') {
    score.Wins += 1;
    rank.MMR += 5;
  } else if (result === 'Ты проиграл(ла)') {
    score.Losses += 1;
    rank.MMR -= 3;
  } else if (result === 'Ничья') {
    score.Ties += 1;
  }

  if (rank.MMR >= 0) {
    yourRankName = rankNames[0];
    nextRank = rankThreshold[1] - rank.MMR;
  } if (rank.MMR >= 10) {
    yourRankName = rankNames[1];
    nextRank = rankThreshold[2] - rank.MMR;
  } if (rank.MMR >= 20) {
    yourRankName = rankNames[2];
    nextRank = rankThreshold[3] - rank.MMR;
  } if (rank.MMR >= 30) {
    yourRankName = rankNames[3];
    nextRank = rankThreshold[4] - rank.MMR;
  } if (rank.MMR >= 40) {
    yourRankName = rankNames[4];
    nextRank = rankThreshold[5] - rank.MMR;
  } if (rank.MMR >= 50) {
    yourRankName = rankNames[5];
    nextRank = rankThreshold[6] - rank.MMR;
  } if (rank.MMR >= 60) {
    yourRankName = rankNames[6];
    nextRank = rankThreshold[7] - rank.MMR;
  } if (rank.MMR >= 70) {
    yourRankName = rankNames[7];
    nextRank = rankThreshold[8] - rank.MMR;
  } if (rank.MMR >= 80) {
    yourRankName = rankNames[8];
    nextRank = rankThreshold[9] - rank.MMR;
  } if (rank.MMR >= 100) {
    yourRankName = rankNames[9];
    nextRank = 'У ВАС МАКСИМАЛЬНОЕ ЗВАНИЕ!!!'
  }

  localStorage.setItem('score', JSON.stringify(score));
  localStorage.setItem('rank', JSON.stringify(rank));
  localStorage.setItem('yourRank', JSON.stringify(yourRank));
  localStorage.setItem('yourRankName', JSON.stringify(yourRankName));
  localStorage.setItem('nextRank', JSON.stringify(nextRank));

  updateScoreElement();
  updateRankElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `Ты выбрал <img src="img/${playerMove}-emoji.png" class="img-move" alt="" >Компьютер выбрал <img src="img/${computerMove}-emoji.png" class="img-move" alt="" >`  
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }, 1000);
  isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Побед: ${score.Wins} Поражений: ${score.Losses} Ничья: ${score.Ties}`;
}

function updateRankElement() {
  document.querySelector('.js-rank')
  .innerHTML = `Твоё звание: ${yourRankName} |  MMR: ${rank.MMR}`;
  document.querySelector('.js-next-rank')
  .innerHTML = `До следующего ранга: ${nextRank}`;
}

function pickComputerMove (){
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'Камень';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Бумага';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'Ножницы';
  }

  return computerMove;
}