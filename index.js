const startBtn = document.getElementById("startBtn");
let scoreCount = 0;
let totalFruits = 24;

let scoreEl = document.getElementById("scoreEl");
let missedCountEl = document.getElementById("missedCountEl");
let fruitsArr = [
  "./assets/strawberryImage1.jfif",
  "./assets/appleImage2.jfif",
  "./assets/pearImage3.jfif",
  "./assets/bananaImage4.jfif",
  "./assets/pineappleImage5.jfif",
  "./assets/watermelonImage6.jfif",
];

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  document.getElementById("gameDiv").style.display = "inline-flex";
  document.querySelector("h2").style.display = "block";

  let count = 0;

  startGame();

  const gameInterval = setInterval(() => {
    if (count < 2) {
      startGame();
      count++;
    } else {
      clearInterval(gameInterval);
      stopGame();
    }
  }, 10000);
});

function startGame() {
  const gameDiv = document.getElementById("gameDiv");
  gameDiv.innerHTML = "";

  for (let i = 0; i < fruitsArr.length; i++) {
    let fruitDiv = document.createElement("div");
    fruitDiv.setAttribute("alt", "fruitImage");
    fruitDiv.classList.add("move-vertical");
    fruitDiv.style.position = "relative";

    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", fruitsArr[i]);
    imageElement.classList.add("fruit-image");
    fruitDiv.appendChild(imageElement);
    fruitDiv.setAttribute("id", `${i}`);

    fruitDiv.addEventListener("click", function () {
      fruitDiv.remove(); // Remove fruit when clicked
      ++scoreCount;
      scoreEl.textContent = `Score: ${scoreCount}`;
    });

    gameDiv.appendChild(fruitDiv);

    setTimeout(() => {
      fruitDiv.remove();
    }, 6000);
  }
}

function stopGame() {
  const gameDiv = document.getElementById("gameDiv");
  gameDiv.innerHTML = "";
  const endGame = document.getElementById("endGame");
  endGame.style.display = "block";

  let remaining = 2 * (scoreCount - totalFruits);
  let result = scoreCount - remaining;

  if (result > 0) {
    endGame.children[0].textContent = "You Won";
    endGame.children[1].textContent = `Missed: ${Math.abs(
      scoreCount - totalFruits
    )}`;
    endGame.children[2].textContent = `Caught: ${scoreCount}`;
  } else {
    endGame.children[0].textContent = "You Lose";
    endGame.children[1].textContent = `Missed: ${scoreCount - totalFruits}`;
    endGame.children[2].textContent = `Caught: ${scoreCount}`;
  }
}
