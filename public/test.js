"use strict";

// selectors

const checkBtn = document.querySelector(".check-btn");
const restartBtn = document.querySelector(".restart-btn");
const numberInput = document.querySelector(".input-num");
const questionMark = document.querySelector(".question");
const randomNumber = document.querySelector(".number");
const instructioMsg = document.querySelector(".message");
const hightScore = document.querySelector(".score-num");
let currentScore = document.querySelector(".current-num");
const mainP = document.querySelector(".main");
// ganerating random number
//all the functions

let closeHintCount = 0;

let getRandomNumber = function () {
  return Math.floor(Math.random() * 21);
};

// function for each showing hint
const showHint = function () {
  // creating hint sections element and appending to parent
  let hintSection = document.createElement("section");
  mainP.appendChild(hintSection);
  //adding class
  hintSection.classList.add("hint-section");
  hintSection.classList.add("absolute");

  // setting innerHtml
  hintSection.innerHTML = `<div class="wrap-hint ">
                          <p class="want-hint-text font-medium">You seems to be struggling, do you want a <span className="hint-yellow">hint</span>?</p>
                          <p class="actual-hint hint-hide "> <img src="./hint-icon.png" alt="" class="img-hint" /> The number is between ${
                            Number(randomNumber.innerHTML) - 1
                          } and ${Number(randomNumber.innerHTML) + 1} </p>
                          </div>
                         <div class="want-or-not-btns">
                         <button class="yes-hint">Yes</button>
                         <button class="no-hint">Close</button>

                         </div>`;
  let yesBtn = document.querySelector(".yes-hint");
  let noBtn = document.querySelector(".no-hint");
  let wnatHintText = document.querySelector(".want-hint-text");
  let actualHint = document.querySelector(".actual-hint");
  // function to show hint with animation
  let showHintText = function () {
    wnatHintText.style.transform = "translateX(-999px)";
    wnatHintText.style.transition = "0.5s ease";
    actualHint.style.transform = "translateX(0)";

    actualHint.style.transition = "0.5s ease 0.5s";
  };

  // on closeBtn click
  let closeHint = function () {
    hintSection.style.opacity = 0;
    hintSection.style.transition = "1s ease";
    hintSection.addEventListener("transitionend", function () {
      hintSection.remove();
    });
    closeHintCount = 1;
  };
  //event listeners for btns

  yesBtn.addEventListener("click", showHintText);
  noBtn.addEventListener("click", closeHint);
};

//function for succsess

let ifSuccess = function () {
  instructioMsg.innerHTML = `Ohoo! you got it.`;
  randomNumber.style.opacity = 1;
  questionMark.style.opacity = 0;
  instructioMsg.style.color = "#50C878";
  if (currentScore.innerHTML > hightScore.innerHTML) {
    let currentScoreAdded = Number(currentScore.innerHTML) + 1;
    currentScore.innerHTML = currentScoreAdded;
    hightScore.innerHTML = currentScoreAdded;
  }
  checkBtn.classList.add("dim");
  numberInput.classList.add("dim");
  restartBtn.classList.remove("hide");
  let hintSection = document.querySelector(".hint-section");
  hintSection.style.opacity = 0;
  hintSection.style.transition = "1s ease";
  hintSection.addEventListener("transitionend", function () {
    hintSection.remove();
  });
  closeHintCount = 0;
  countOfCheck = 0;
};

//function to compare input with number

const compareInput = function () {
  let userGuess = Number(numberInput.value);
  let generatedNum = Number(randomNumber.innerHTML);
  countOfCheck < 6 ? countOfCheck++ : (countOfCheck = countOfCheck);
  let haveOrNot = document.querySelector(".hint-section") || false;
  if (!haveOrNot && countOfCheck === 6 && closeHintCount === 0) {
    showHint();
  }

  if (numberInput.value !== "" && numberInput.value !== null) {
    score--;
    currentScore.innerHTML = score;
  }
  if (userGuess !== generatedNum) {
    userGuess < generatedNum
      ? ((instructioMsg.innerHTML = `Enter a higher number`),
        (instructioMsg.style.color = "#319795"))
      : ((instructioMsg.innerHTML = `Enter a lower number`),
        (instructioMsg.style.color = "#319795"));
  } else {
    ifSuccess();
  }
};

let startAgain = function () {
  instructioMsg.innerHTML = `Start guessing . . .`;
  instructioMsg.style.color = "#319795";
  currentScore.innerHTML = 20;
  randomNumber.style.opacity = 0;
  questionMark.style.opacity = 1;
  score = currentScore.innerHTML;
};

// function to show tutorial

let tuorialInstruction = function () {
  let tutorDiv = document.createElement("div");
  tutorDiv.classList.add("tutorial-area");
  tutorDiv.classList.add("shadow-lg");
  tutorDiv.classList.add("shadow-black");
  tutorDiv.classList.add("absolute");
  mainP.appendChild(tutorDiv);
  tutorDiv.innerHTML = `<ul class="list">
                      <li class="list-item">Enter a number.</li>
                      <li class="list-item">Click the check button.</li>
                      <li class="list-item">Follow the instruction-msg</li>
                      
                      </ul>`;
  tutorDiv.style.opacity = 0;
  //showing the tutorial with animation
  let showAfterTime = function () {
    tutorDiv.style.opacity = 1;
    tutorDiv.style.transition = "all 1s ease";
  };

  // hiding the tutorial with animation

  let hideTutorial = function () {
    tutorDiv.style.opacity = 0;
    tutorDiv.style.transition = "all 1s ease";
    tutorDiv.addEventListener("transitionend", function () {
      tutorDiv.remove();
    });
  };

  setTimeout(showAfterTime, 100);
  setTimeout(hideTutorial, 4000);
};

//hard variables
let countOfCheck = 0;
let score = currentScore.innerHTML;

//eventListeners

window.addEventListener("DOMContentLoaded", function () {
  let numberR = getRandomNumber();
  randomNumber.innerHTML = numberR;
  restartBtn.classList.add("hide");
  tuorialInstruction();
});

checkBtn.addEventListener("click", compareInput);

restartBtn.addEventListener("click", function () {
  let reGen = getRandomNumber();
  randomNumber.innerHTML = reGen;
  startAgain();
  restartBtn.classList.add("hide");
  checkBtn.classList.remove("dim");
  numberInput.classList.remove("dim");
  closeHintCount = 0;
  countOfCheck = 0;
});

//key press

// document.addEventListener("keydown", function (e) {
//   if (
//     e.key === "Enter" &&
//     !checkBtn.classList.contains("dim") &&
//     !numberInput.classList.contains("dim")
//   ) {
//     compareInput();
//   }
//   if (
//     !checkBtn.classList.contains("dim") &&
//     !numberInput.classList.contains("dim")
//   ) {
//     if (e.key === "ArrowUp" && numberInput.value <= 19) {
//       numberInput.value++;
//     } else if (e.key === "ArrowDown" && numberInput.value >= 1) {
//       numberInput.value--;
//     }
//   }
// });
