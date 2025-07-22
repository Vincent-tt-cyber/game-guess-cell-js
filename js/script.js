// Переменные для таблицы
const ROWS = 10;
const COLS = 10;
const TARGET_CELLS = 10;

// DOM
const gameTable = document.querySelector("#gameTable");
const cellsLeftDisplay = document.querySelector("#cellsLeft");
const restartBtn = document.querySelector("#restartBtn");

// Игровые переменные
let targetCells = [];
let foundCells = 0;

// Инициализация игры
function initGame() {
  // Чистка таблицы
  gameTable.innerHTML = "";
  foundCells = 0;
  cellsLeftDisplay.textContent = TARGET_CELLS;

  // Генерация случайных ячеек
  targetCells = [];
  while (targetCells.length < TARGET_CELLS) {
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

  // Проверка ячейки
  if (targetCells.includes(cellId)) {
    cell.classList.add("found");
    foundCells++;
    cellsLeftDisplay.textContent = TARGET_CELLS - foundCells;

    // Проверка на победу
    if (foundCells === TARGET_CELLS) {
      setTimeout(() => {
        alert("🎉 Поздравляем! Вы нашли все ячейки!");
      }, 100);
    }
  } else {
    cell.classList.add("missed");
  }
}

restartBtn.addEventListener("click", initGame);

initGame();
