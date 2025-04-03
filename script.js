const startButton = document.getElementById("start");
const paragraph = document.getElementById("paragraph");
startButton.addEventListener("click", startGame);
const Numbers = [];

for (let i = 0; i < 100; i++) {
  Numbers.push(i + 1);
}
let enterNumber;

function startGame() {
  let i = 0;
  const randomNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1);
  console.log(randomNumber);
  do {
    i++;
    enterNumber = Number(prompt("Введи число від 1 до 100!"));
    if (enterNumber === randomNumber) {
      const counter = binary_search(Numbers, randomNumber, i);
      paragraph.textContent = `Молодець шампіньон ти відгадав число за ${i} ${correctStep(
        i
      )}! А я відгадав число за ${counter} ${correctStep(counter)}`;
      break;
    } else if (enterNumber > randomNumber) {
      paragraph.textContent = "hi";
      alert(`Загадане число меньше!`);
    } else {
      alert(`Загадане число більше!`);
    }
  } while (randomNumber !== enterNumber);
}

function binary_search(Array, item, step_user) {
  let counter = 0;
  let low = 0;
  let high = Array.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let guess = Array[mid];
    counter++;
    if (guess === item) {
      return counter;
    } else if (guess > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return 0;
}

function correctStep(i) {
  let step = "";
  if (i % 10 === 1 && i % 100 !== 11) {
    step = "крок";
  } else if (i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20)) {
    step = "кроки";
  } else {
    step = "кроків";
  }
  return step;
}
