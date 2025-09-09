const score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};

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

function playGame(playerMove) {

  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'Ножницы') {
    if (computerMove === 'Камень') {
      result = 'Ты проиграл(ла)';
    } else if (computerMove === 'Бумага') {
      result = 'Ты выйграл(ла)';
    } else if (computerMove === 'Ножницы') {
      result = 'Ничья';
    }
  } else if (playerMove === 'Бумага') {
    if (computerMove === 'Камень') {
      result = 'Ты выйграл(ла)';
    } else if (computerMove === 'Бумага') {
      result = 'Ничья';
    } else if (computerMove === 'Ножницы') {
      result = 'Ты проиграл(ла)';
    }
  } else if (playerMove === 'Камень') {
    if (computerMove === 'Камень') {
      result = 'Ничья';
    }else if (computerMove === 'Бумага') {
      result = 'Ты проиграл(ла)'
    }else if (computerMove === 'Ножницы') {
      result = 'Ты выйграл(ла)'
    }
  }

  if (result === 'Ты выйграл(ла)') {
    score.Wins += 1;
  } else if (result === 'Ты проиграл(ла)') {
    score.Losses += 1;
  } else if (result === 'Ничья') {
    score.Ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

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