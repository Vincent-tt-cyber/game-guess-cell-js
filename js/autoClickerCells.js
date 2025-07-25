autoClicker.addEventListener("click", function () {
  if (autoClicker.textContent === "Остановить") {
    // Если уже в процессе автопоиска - останавливаем
    autoClicker.textContent = "Автопоиск";
    return;
  }

  // Начинаем автопоиск
  autoClicker.textContent = "Остановить";
  restartBtn.disabled = true;
  autoClickRandomCells();
});

function autoClickRandomCells() {
  const cells = Array.from(document.querySelectorAll("#gameTable td"));
  let foundCount = 0;
  const totalTargets = currentTargetCount; // Используем текущее количество целей

  // Фильтруем только не проверенные ячейки
  let availableCells = cells.filter(
    (cell) =>
      !cell.classList.contains("found") && !cell.classList.contains("missed")
  );

  function clickRandomCell() {
    // Проверяем условия остановки
    if (
      autoClicker.textContent !== "Остановить" ||
      foundCount >= totalTargets ||
      availableCells.length === 0
    ) {
      autoClicker.textContent = "Автопоиск";
      restartBtn.disabled = false;
      return;
    }

    // Выбираем случайную ячейку из доступных
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cell = availableCells[randomIndex];

    // Кликаем по ячейке
    cell.click();

    // Обновляем счетчик найденных
    if (cell.classList.contains("found")) {
      foundCount++;
      console.log(`Найдена ячейка ${foundCount} из ${totalTargets}`);
    }

    // Удаляем ячейку из доступных
    availableCells = availableCells.filter((c) => c !== cell);

    // Запускаем следующий клик с задержкой
    setTimeout(clickRandomCell, 100); // Задержка 300мс между кликами
  }

  clickRandomCell();
}
