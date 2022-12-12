let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let reset = document.querySelector("#reset");
let box = document.querySelector(".box");
let result = document.querySelector("#score");
let userScoreTable = document.querySelector('.userScore')
let easy = document.querySelector('#easy')
let medium = document.querySelector('#medium')
let hard = document.querySelector('#hard')
let results = document.querySelector('#Results')

let allUsersData = JSON.parse(localStorage.getItem("usersScore")) ?? [];


// let allUsersData = []

let bubble;
let bubbleInterval;
let userScore = 0;


startBtn.addEventListener("click", function () {

  let userName = prompt('Enter the Name . . . . ')

  let obyekt = {
    name: '',
    point: '',
  }

  obyekt.name = userName
  obyekt.point = result.innerText

  allUsersData.push(obyekt)

  localStorage.setItem('usersScore', JSON.stringify(allUsersData))

  startBtn.disabled = true;
  stopBtn.disabled = false;

  //   clearInterval(bubbleInterval);

  easy.addEventListener('click', function () {
    easy.disabled = true;
    hard.disabled = true;
    medium.disabled = true;

    bubbleInterval = setInterval(function () {
      createBubble();
      bubble.addEventListener("click", function () {
        let mySound = new Audio("./mixkit-long-pop-2358.wav");
        mySound.play();
        this.remove();
        userScore += 1;
        result.innerText = userScore;
      });
    }, 2000);
  })
  medium.addEventListener('click', function () {
    easy.disabled = true;
    hard.disabled = true;
    medium.disabled = true;

    bubbleInterval = setInterval(function () {
      createBubble();

      bubble.addEventListener("click", function () {
        let mySound = new Audio("./mixkit-long-pop-2358.wav");
        mySound.play();
        this.remove();
        userScore += 2;
        result.innerText = userScore;
      });
    }, 1000);
  })
  hard.addEventListener('click', function () {
    easy.disabled = true;
    hard.disabled = true;
    medium.disabled = true;
    bubbleInterval = setInterval(function () {
      createBubble();
      bubble.addEventListener("click", function () {
        let mySound = new Audio("./mixkit-long-pop-2358.wav");
        mySound.play();
        this.remove();
        userScore += 3;
        result.innerText = userScore;
      });
    }, 500);
  })
});

stopBtn.addEventListener("click", function () {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(bubbleInterval);
  document.querySelectorAll(".bubble").forEach((element) => {
    element.disabled = true;
  });
});

reset.addEventListener("click", resetGame);

function resetGame() {
  startBtn.disabled = false;
  stopBtn.disabled = false;
  easy.disabled = false;
  hard.disabled = false;
  medium.disabled = false;
  clearInterval(bubbleInterval);
  box.innerHTML = "";
  userScore = 0;
  result.innerText = userScore;
}

function createBubble() {
  let leftPos = Math.floor(Math.random() * (95 - 1) + 1);
  let topPos = Math.floor(Math.random() * (95 - 1) + 1);
  bubble = document.createElement("button");
  bubble.setAttribute("class", "bubble");
  bubble.style.width = "25px";
  bubble.style.height = "25px";
  bubble.style.borderRadius = "50%";
  bubble.style.backgroundColor = "teal";
  bubble.style.border = "1px solid black";
  bubble.style.cursor = "pointer";
  bubble.style.position = "absolute";
  bubble.style.left = `${leftPos}%`;
  bubble.style.top = `${topPos}%`;

  box.appendChild(bubble);

  if (document.querySelectorAll(".bubble").length == 15) {
    clearInterval(bubbleInterval);
    if (confirm(`Game Over!! Your score is ${userScore}`)) {
      resetGame();
    }
  }

}

results.addEventListener('click', function () {
  // userScoreTable.empty()
  allUsersData.forEach(element => {
    let html =
      `<h5 style="margin-top: 15px;">${element.name}: ${element.point} </h5>`;
    userScoreTable.insertAdjacentHTML("beforeend", html);
  });
})


// localStorage.clear()