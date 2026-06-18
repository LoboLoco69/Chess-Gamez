const board = document.getElementById("board");

let selectedSquare = null;

const position = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

function drawBoard() {
    board.innerHTML = "";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const square = document.createElement("div");

            square.classList.add(
                (row + col) % 2 === 0
                    ? "square-light"
                    : "square-dark"
            );

            square.classList.add("square");

            square.textContent = position[row][col];

            square.dataset.row = row;
            square.dataset.col = col;

            square.addEventListener("click", handleSquareClick);

            board.appendChild(square);
        }
    }
}

function handleSquareClick(e) {

    const row = Number(e.currentTarget.dataset.row);
    const col = Number(e.currentTarget.dataset.col);

    if (!selectedSquare) {

        if (position[row][col] === "") return;

        selectedSquare = { row, col };

        e.currentTarget.classList.add("selected");

        return;
    }

    const piece =
        position[selectedSquare.row][selectedSquare.col];

    position[row][col] = piece;
    position[selectedSquare.row][selectedSquare.col] = "";

    selectedSquare = null;

    drawBoard();
}

drawBoard();
