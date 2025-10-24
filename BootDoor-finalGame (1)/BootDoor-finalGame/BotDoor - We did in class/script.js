
let door1 = document.getElementById("door1");
let door2 = document.getElementById("door2");
let door3 = document.getElementById("door3");
let startButton = document.getElementById("start");
let resetButton = document.getElementById("reset");
let currentStreak = document.getElementById("score-number");
let bestStreak = document.getElementById("high-score-number");
let historyBox = document.getElementById("history");


let botDoorPath = "./images/robot.svg";
let beachDoorPath = "./images/beach.svg";
let spaceDoorPath = "./images/space.svg";
let closedDoorPath = "./images/closed_door.svg";


let openDoor1, openDoor2, openDoor3;
let numClosedDoors = 3;
let currentlyPlaying = true;
let score = 0;
let highscore = 0;
let results = [];


const doorOpenSound = new Audio("./audio/open.mp3");
const hoverSound = new Audio("./audio/hover.mp3");


[door1, door2, door3].forEach(door => {
  door.addEventListener("mouseenter", () => {
    if (currentlyPlaying) hoverSound.play();
  });
});


const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * 3);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor1 = spaceDoorPath;
    openDoor2 = beachDoorPath;
  }
};

const isClicked = (door) => door.src.indexOf("closed_door.svg") === -1;

const isBot = (door) => door.src.indexOf("robot.svg") > -1;


const updateHistory = (result) => {
  results.unshift(result);
  if (results.length > 3) results.pop();
  historyBox.innerHTML = results.map(r => r === "Win" ? "✅" : "❌").join(" ");
};


const revealAllDoors = () => {
  door1.src = openDoor1;
  door2.src = openDoor2;
  door3.src = openDoor3;
};


const playDoor = (door) => {
  numClosedDoors--;

  if (isBot(door)) {

    gameOver("Lose");
  } else if (numClosedDoors === 1) {

    gameOver("Win");
  }
};


const gameOver = (status) => {
  currentlyPlaying = false;
  revealAllDoors();

  if (status === "Win") {
    startButton.innerHTML = "🎉 You Win!";
    score++;
    if (score > highscore) highscore = score;
  } else {
    startButton.innerHTML = "💀 Game Over!";
    score = 0;
  }

  currentStreak.innerHTML = score;
  bestStreak.innerHTML = highscore;
  updateHistory(status);


  setTimeout(() => {
    startRound();
  }, 2000);
};

const startRound = () => {
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = "Good luck!";
  randomChoreDoorGenerator();
};


resetButton.onclick = () => startRound();


door1.onclick = () => {
  if (currentlyPlaying && !isClicked(door1)) {
    doorOpenSound.play();
    door1.src = openDoor1;
    playDoor(door1);
  }
};

door2.onclick = () => {
  if (currentlyPlaying && !isClicked(door2)) {
    doorOpenSound.play();
    door2.src = openDoor2;
    playDoor(door2);
  }
};

door3.onclick = () => {
  if (currentlyPlaying && !isClicked(door3)) {
    doorOpenSound.play();
    door3.src = openDoor3;
    playDoor(door3);
  }
};


startRound();
