const board = document.getElementById("board");

let selectedSquare = null;
let playerColor = "white";
let legalTargets = [];

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

            const row = playerColor === "white" ? displayRow : 7 - displayRow;
            const col = playerColor === "white" ? displayCol : 7 - displayCol;

            const square = document.createElement("div");
            const piece = position[row][col];

            square.classList.add((displayRow + displayCol) % 2 === 0 ? "square-light" : "square-dark");
            square.classList.add("square");

            square.dataset.row = row;
            square.dataset.col = col;

            square.textContent = piece;

            if ("♙♖♘♗♕♔".includes(piece)) {
                square.classList.add("white-piece");
            }

            if ("♟♜♞♝♛♚".includes(piece)) {
                square.classList.add("black-piece");
            }

            if (
                selectedSquare &&
                selectedSquare.row === row &&
                selectedSquare.col === col
            ) {
                square.classList.add("selected");
            }

            if (isLegalTarget(row, col)) {
                square.classList.add("legal-target");
            }

            square.addEventListener("click", handleSquareClick);

            board.appendChild(square);
        }
    }
}

function handleSquareClick(e) {
    const row = Number(e.currentTarget.dataset.row);
    const col = Number(e.currentTarget.dataset.col);
    const piece = position[row][col];

    if (!selectedSquare) {
        if (piece === "") return;

        selectedSquare = { row, col };
        legalTargets = getBasicLegalTargets(row, col);

        drawBoard();
        return;
    }

    if (selectedSquare.row === row && selectedSquare.col === col) {
        selectedSquare = null;
        legalTargets = [];
        drawBoard();
        return;
    }

    if (!isLegalTarget(row, col)) {
        selectedSquare = null;
        legalTargets = [];
        drawBoard();
        return;
    }

    const selectedPiece = position[selectedSquare.row][selectedSquare.col];

    position[row][col] = selectedPiece;
    position[selectedSquare.row][selectedSquare.col] = "";

    selectedSquare = null;
    legalTargets = [];

    drawBoard();
}

function isLegalTarget(row, col) {
    return legalTargets.some(square => square.row === row && square.col === col);
}

function getBasicLegalTargets(row, col) {
    const targets = [];
    const piece = position[row][col];

    const directions = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
        { row: -1, col: -1 },
        { row: -1, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 1 }
    ];

    // Temporary: knights get knight-looking moves
    if (piece === "♘" || piece === "♞") {
        const knightMoves = [
            { row: -2, col: -1 },
            { row: -2, col: 1 },
            { row: -1, col: -2 },
            { row: -1, col: 2 },
            { row: 1, col: -2 },
            { row: 1, col: 2 },
            { row: 2, col: -1 },
            { row: 2, col: 1 }
        ];

        knightMoves.forEach(move => {
            addTargetIfOnBoard(targets, row + move.row, col + move.col);
        });

        return targets;
    }

    // Temporary: everyone else can move one square
    directions.forEach(direction => {
        addTargetIfOnBoard(targets, row + direction.row, col + direction.col);
    });

    return targets;
}

function addTargetIfOnBoard(targets, row, col) {
    if (row < 0 || row > 7 || col < 0 || col > 7) return;

    targets.push({ row, col });
}

drawBoard();
