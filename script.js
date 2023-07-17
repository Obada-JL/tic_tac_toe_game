let current_player = "X";
const number_of_rows = 3;
const turns = number_of_rows ** 2;
let turns_counter = 0;
const reset_button = document.querySelector("#reset");

const create_board_array = () => {
  let board = [];

  for (let row = 0; row < number_of_rows; row++) {
    board.push(Array.from({ length: number_of_rows }, () => "_"));
  }
  return board;
};
let board = create_board_array();

const check_rows = (current_player) => {
  let column = 0;

  for (let row = 0; row < number_of_rows; row++) {
    while (column < number_of_rows) {
      if (board[row][column] !== current_player) {
        column = 0;
        break;
      }
      column++;
    }
    if (column === number_of_rows) {
      return true;
    }
  }
};
const check_diagonals = () => {
  let count = 0;

  while (count < number_of_rows) {
    if (board[count][count] !== current_player) {
      count = 0;
      break;
    }
    count++;
  }
  if (count === number_of_rows) {
    return true;
  }
};
const check_columns = () => {
  let row = 0;

  for (let column = 0; column < number_of_rows; column++) {
    while (row < number_of_rows) {
      if (board[row][column] !== current_player) {
        row = 0;
        break;
      }
      row++;
    }
    if (row === number_of_rows) {
      return true;
    }
  }
};
const check_reverse_diagonals = () => {
  let count = 0;

  while (count < number_of_rows) {
    if (board[count][number_of_rows - count - 1] !== current_player) {
      count = 0;
      break;
    }
    count++;
  }
  if (count === number_of_rows) {
    return true;
  }
};

const check_win = (current_player) => {
  if (check_rows(current_player)) {
    return true;
  }
  if (check_columns(current_player)) {
    return true;
  }
  if (check_diagonals(current_player)) {
    return true;
  }
  if (check_reverse_diagonals(current_player)) {
    return true;
  }
};
const reset_board = () => {
  document.querySelector(".board").remove();
  create_board();
  board = create_board_array();
  current_player = "X";
  turns_counter = 0;
};

const run_win_event = (current_player) => {
  setTimeout(() => {
    alert(`Player ${current_player} won`);
    reset_board();
  }, 100);
};

const run_draw_event = () => {
  setTimeout(() => {
    alert("Draw!");
    reset_board();
  }, 100);
};

const get_cell_placement = (index, number_of_rows) => {
  const row = Math.floor(index / number_of_rows);
  const col = index % number_of_rows;
  return [row, col];
};
const cell_click_handler = (event, index) => {
  const cell = event.target;
  const [row, col] = get_cell_placement(index, number_of_rows);

  if (board[row][col] === "_") {
    turns_counter++;
    board[row][col] = current_player;
    cell.querySelector(".value").textContent = current_player;
    cell.classList.add(`cell--${current_player}`);
    if (check_win(current_player)) {
      run_win_event(current_player);
    } else {
      if (turns_counter === turns) {
        run_draw_event();
      }
      if (current_player === "X") {
        current_player = "O";
      } else {
        current_player = "X";
      }
    }
  }

  console.log({ row });
  console.log({ col });
};

const create_cell = (index) => {
  const cell_element_string = `<div class="cell" role="button" tabindex="${
    index + 1
  }" ><span class="value"></span></div> `;
  const cell_element = document
    .createRange()
    .createContextualFragment(cell_element_string);

  cell_element.querySelector(".cell").onclick = (event) =>
    cell_click_handler(event, index);
  cell_element.querySelector(".cell").onkeydown = (event) =>
    event.key === "Enter" ? cell_click_handler(event, index) : true;
  return cell_element;
};
const create_board = () => {
  const container = document.querySelector(".container");
  const board = document.createElement("div");

  board.classList.add("board");

  for (let i = 0; i < number_of_rows ** 2; i++) {
    const cell_element = create_cell(i);
    board.appendChild(cell_element);
    document.documentElement.style.setProperty("--grid-rows", number_of_rows);
  }
  create_cell();
  container.insertAdjacentElement("afterbegin", board);
};

reset_button.addEventListener("click", reset_board);
create_board();
