document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const gameArea = document.getElementById("gameArea");

  startBtn.addEventListener("click", () => {
    const start_game = document.getElementById("game-start");
    start_game.play();
    startBtn.style.display = "none";
    gameArea.style.display = "flex";
    score.textContent = scor;
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = 1.0;
    bgMusic.play();
  });
});
const screamerImg = document.getElementById("screamerImg");
const screamerSound = document.getElementById("screamerSound");
const redScreen = document.getElementById("redScreen");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const maxWidth = canvas.width;
const maxHeight = canvas.height;
const score = document.getElementById("score");
let scor = 0;
let speed = 200;
let interval;
let currentDirection = null;

const foodImg = new Image();
foodImg.src = "carrot.png";

const cub = [
  {
    x: 200,
    y: 200,
  },
];

const food = {
  x: 25 * Math.floor(Math.random() * (maxWidth / 25)),
  y: 25 * Math.floor(Math.random() * (maxWidth / 25)),
};

for (let x = 0; x <= maxWidth; x += 25) {
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(500, x);
  ctx.lineTo(0, x);
  ctx.stroke();
}

for (let y = 500; y >= 0; y -= 25) {
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(y, 500);
  ctx.lineTo(y, 0);
  ctx.stroke();
}

ctx.fillStyle = "yellow";
ctx.font = "bold 35px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(
  "Кнопки керування: W, A, S, D",
  canvas.width / 2,
  canvas.height / 2
);
ctx.font = "bold 20px sans-serif";
ctx.fillText(
  "Натисни одну з них щоб почати",
  canvas.width / 2,
  canvas.height / 2 + 40
);

window.addEventListener("keydown", (e) => {
  let direction = null;
  if (e.code === "KeyA") direction = "left";
  else if (e.code === "KeyD") direction = "right";
  else if (e.code === "KeyW") direction = "up";
  else if (e.code === "KeyS") direction = "down";

  const opposites = {
    left: "right",
    right: "left",
    up: "down",
    down: "up",
  };

  if (direction && direction !== opposites[currentDirection]) {
    intervalius(direction);
  }
});

function draw(direction) {
  const head = { ...cub[0] };

  if (direction === "left" && direction !== "right") {
    head.x -= 25;
  } else if (direction === "right" && direction !== "left") {
    head.x += 25;
  } else if (direction === "up" && direction !== "down") {
    head.y -= 25;
  } else if (direction === "down" && direction !== "up") {
    head.y += 25;
  }

  if (head.x < 0 || head.x >= maxWidth || head.y < 0 || head.y >= maxHeight) {
    const gameOver = document.getElementById("game-over");
    gameOver.play();
    document.body.style.backgroundColor = "";
    if (scor > 30) {
      document.getElementById("screamerImg").style.display = "block";
      document.getElementById("screamerSound").play();
      setTimeout(() => {
        document.getElementById("screamerImg").style.display = "none";
      }, 1100);
    }
    for (let i = 0; i < cub.length; i++) {
      ctx.fillStyle = "red";
      ctx.fillRect(cub[i].x, cub[i].y, 25, 25);
    }
    let changeKey = "";
    if (cub[0].x <= 0) {
      changeKey = "D";
    } else if (cub[0].x >= 475) {
      changeKey = "A";
    } else if (cub[0].y <= 0) {
      changeKey = "S";
    } else if (cub[0].y >= 475) {
      changeKey = "W";
    }

    scor = 0;
    speed = 200;
    score.textContent = scor;
    ctx.fillStyle = "red";
    ctx.font = "bold 80px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Координаты центра канваса
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Рисуем надпись
    ctx.fillText("Game Over", centerX, centerY);
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(`Press ${changeKey}`, centerX, centerY + 50);
    for (let i = cub.length; i !== 1; i--) {
      cub.pop();
    }
    clearInterval(interval);
    currentDirection = null;
    return;
  }

  cub.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    console.log(speed);
    const carrotSound = document.getElementById("carrotAudio");
    carrotSound.play();
    scor++;
    score.innerHTML = `${scor} <img src="carrot.png" width="24" height="24">`;
    if (scor % 5 === 0 && speed > 50) {
      if (scor >= 30) {
        document.body.style.backgroundColor = "darkred"; // или просто "red"
      }
      speed -= 25;
      intervalius(currentDirection);
      const level = Math.floor(scor / 5) + 1;
      document.getElementById("level").textContent = `LEVEL ${level - 1}`;

      // Плавно показать на секунду
      const levelDiv = document.getElementById("level");
      levelDiv.classList.add("show");

      setTimeout(() => {
        levelDiv.classList.remove("show");
      }, 1500);

      // Звук
      const sound = document.getElementById("levelUpSound");
      sound.currentTime = 0;
      sound.play();
    }
    food.x = 25 * Math.floor(Math.random() * (maxWidth / 25));
    food.y = 25 * Math.floor(Math.random() * (maxWidth / 25));
  } else {
    cub.pop();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let x = 0; x <= maxWidth; x += 25) {
    ctx.strokeStyle = "#330000";
    ctx.beginPath();
    ctx.moveTo(500, x);
    ctx.lineTo(0, x);
    ctx.stroke();
  }

  for (let y = 500; y >= 0; y -= 25) {
    ctx.strokeStyle = "#330000";
    ctx.beginPath();
    ctx.moveTo(y, 500);
    ctx.lineTo(y, 0);
    ctx.stroke();
  }

  cub.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "#ff0000" : "#ff4500";
    ctx.fillRect(segment.x, segment.y, 25, 25);
    ctx.strokeStyle = "white";
    ctx.strokeRect(segment.x + 1, segment.y + 1, 25 - 2, 25 - 2);
  });
}

function intervalius(direction) {
  clearInterval(interval);
  currentDirection = direction;
  interval = setInterval(() => draw(direction), speed);
}
