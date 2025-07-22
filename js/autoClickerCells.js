/* 
    Для быстрой проверки игры, можно использовать автоматический клик по ячейкам. 
    Этот скрипт можно вставить в консоль браузера.
*/

function autoClickCells() {
  const cells = document.querySelectorAll("#gameTable td");
  let currentIndex = 0;
  let foundCount = 0;
  const totalTargets = 10; // Кол-во ячеек для проверки

  //   Клик на следующую ячейку
  function clickNextCell() {
    // Если игра уже пройдена - останавить скрипт
    if (foundCount >= totalTargets) {
      return;
    }

    // Если прошли все ячейки - останавливаемся
    if (currentIndex >= cells.length) {
      console.log(
        `Все ячейки проверены, но найдены только ${foundCount} из ${totalTargets}.`
      );
      return;
    }

    const cell = cells[currentIndex];

    // Клик только по не проверенным ячейкам
    if (
      !cell.classList.contains("found") &&
      !cell.classList.contains("missed")
    ) {
      cell.click();
    }

    if (cell.classList.contains("found")) {
      foundCount++;
      console.log(
        "Найдена ячейка",
        foundCount,
        "из",
        totalTargets,
        ":",
        cell.dataset.row,
        "-",
        cell.dataset.col
      );
    }

    currentIndex++;

    setTimeout(clickNextCell, 100);
  }
  clickNextCell();
}

autoClickCells();
