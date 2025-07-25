// Переменные для таблицы
const ROWS = 10;
const COLS = 10;
const TARGET_CELLS = 10;

// DOM
const gameTable = document.querySelector("#gameTable");
const cellsLeftDisplay = document.querySelector("#cellsLeft");
const restartBtn = document.querySelector("#restartBtn");
const autoClicker = document.querySelector("#autoClicker");

// Игровые переменные
let targetCells = [];
let foundCells = 0;
let timerInterval;
let isFirstClick = true;
let currentTargetCount = 1;

function startTimer() {
  let timer = 60;
  document.querySelector("#timer").textContent = timer;

  // Очистка прошлого таймера при новой игре
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    timer--;
    document.querySelector("#timer").textContent = timer;

    if (timer <= 0) {
      clearInterval(timerInterval);

      // Блокировка дальнейших кликов
      document.querySelectorAll("td").forEach((cell) => {
        cell.removeEventListener("click", handleCellClick);
      });
      autoClicker.disabled = true;
      restartBtn.disabled = false;
      alert("Время вышло!");
    }
  }, 1000);
}

// Инициализация игры
function initGame() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  // Чистка таблицы
  gameTable.innerHTML = "";
  foundCells = 0;
  isFirstClick = true;

  // Случайное кол-во ячеек
  currentTargetCount = Math.floor(Math.random() * (TARGET_CELLS + 1));
  cellsLeftDisplay.textContent = currentTargetCount;
  document.querySelector("#timer").textContent = 60;

  // Генерация случайных ячеек
  targetCells = [];
  while (targetCells.length < currentTargetCount) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    const cellId = `${row}-${col}`;

    if (!targetCells.includes(cellId)) {
      targetCells.push(cellId);
    }
    // Загаданные ячейки
    // console.log(targetCells);
  }
  // Создание таблицы
  for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < COLS; j++) {
      const cell = document.createElement("td");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", handleCellClick);
      row.appendChild(cell);
    }

    gameTable.appendChild(row);
  }
}

// Обработка клика по ячейке
function handleCellClick(event) {
  const cell = event.target;
  const row = cell.dataset.row;
  const col = cell.dataset.col;
  const cellId = `${row}-${col}`;

  // Если ячейка уже проверялась
  if (cell.classList.contains("found") || cell.classList.contains("missed")) {
    return;
  }

  // Первый клик
  if (isFirstClick) {
    startTimer();
    isFirstClick = false;
  }

  // Проверка ячейки
  if (targetCells.includes(cellId)) {
    cell.classList.add("found");
    foundCells++;
    cellsLeftDisplay.textContent = currentTargetCount - foundCells;

    // Проверка на победу
    if (foundCells === currentTargetCount) {
      // Остановка таймера
      clearInterval(timerInterval);

      setTimeout(() => {
        alert("🎉 Поздравляем! Вы нашли все ячейки!");
        restartBtn.disabled = false;
      }, 100);
    }
  } else {
    cell.classList.add("missed");
  }
}

// Обработка клика по кнопке "Новая игра"
restartBtn.addEventListener("click", () => {
  isFirstClick = true; // Сброс первого клика
  initGame();
  autoClicker.disabled = false;
});

initGame();
