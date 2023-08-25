//script here runs when page is loaded

//global variable
//let computerMove = '';

//outside of func to save the score from last time and update it
//give default value if score does not exist (after reset button clicked)
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElem();

/*
if (!score) { //score === null, null is a falsy value
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
}
*/

// console.log(JSON.parse(localStorage.getItem('score'))) //get the saved value out of local storage

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  //more preferred to return a variable
  //scope can prevent naming conflicts
  return computerMove;

  //JS best practice: keep variables inside a scope
  //HTML best practice: semantic HTML, using specific tags like nav, header, footer..
}

function playGame(userMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (userMove === "rock") {
    if (computerMove === "rock") {
      result = `Oops it's a tie.`;
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  } else if (userMove === "paper") {
    if (computerMove === "rock") {
      result = `You win.`;
    } else if (computerMove === "paper") {
      result = `Oops it's a tie.`;
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (userMove === "scissors") {
    if (computerMove === "rock") {
      result = `You lose.`;
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = `Oops it's a tie.`;
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === `Oops it's a tie.`) {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score)); //localStorage only supports strings

  updateScoreElem();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You
<img src="images/${userMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;

  //                 alert(`You picked ${userMove}. Computer picked ${computerMove}. ${result}
  // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function updateScoreElem() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
