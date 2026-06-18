let playerColor = "white";

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

    for (let displayRow = 0; displayRow < 8; displayRow++) {
    for (let displayCol = 0; displayCol < 8; displayCol++) {

        const row =
            playerColor === "white"
                ? displayRow
                : 7 - displayRow;

        const col =
            playerColor === "white"
                ? displayCol
                : 7 - displayCol;

            const square = document.createElement("div");

            square.classList.add(
                (row + col) % 2 === 0
                    ? "square-light"
                    : "square-dark"
            );

            square.classList.add("square");

            const piece = position[row][col];

square.textContent = piece;

if ("♙♖♘♗♕♔".includes(piece)) {
    square.classList.add("white-piece");
}

if ("♟♜♞♝♛♚".includes(piece)) {
    square.classList.add("black-piece");
}

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
