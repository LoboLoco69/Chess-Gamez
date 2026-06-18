const board = document.getElementById("board");
const moveList = document.getElementById("move-list");
const newGameButton = document.getElementById("new-game");
const gameAlert = document.getElementById("game-alert");
const game = new Chess();

let selectedSquare = null;
let legalTargets = [];
let playerColor = "white";

const pieceMap = {
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
    P: "♙",
    R: "♖",
    N: "♘",
    B: "♗",
    Q: "♕",
    K: "♔"
};

function drawBoard() {
    board.innerHTML = "";

    for (let displayRow = 0; displayRow < 8; displayRow++) {
        for (let displayCol = 0; displayCol < 8; displayCol++) {
            const row = playerColor === "white" ? displayRow : 7 - displayRow;
            const col = playerColor === "white" ? displayCol : 7 - displayCol;

            const squareName = coordsToSquare(row, col);
            const piece = game.get(squareName);

            const square = document.createElement("div");

            square.classList.add(
                (displayRow + displayCol) % 2 === 0
                    ? "square-light"
                    : "square-dark"
            );

            square.classList.add("square");
            square.dataset.square = squareName;

            if (piece) {
                const symbol = piece.color === "w"
                    ? pieceMap[piece.type.toUpperCase()]
                    : pieceMap[piece.type];

                square.textContent = symbol;

                square.classList.add(
                    piece.color === "w" ? "white-piece" : "black-piece"
                );
            }

            if (selectedSquare === squareName) {
                square.classList.add("selected");
            }

            if (legalTargets.includes(squareName)) {
                square.classList.add("legal-target");
            }

            square.addEventListener("click", handleSquareClick);
            board.appendChild(square);
        }
    }
}

function handleSquareClick(e) {
    const squareName = e.currentTarget.dataset.square;
    const piece = game.get(squareName);

    if (!selectedSquare) {
        if (!piece) return;

        const playerTurn = game.turn() === "w" ? "white" : "black";
        const selectedColor = piece.color === "w" ? "white" : "black";

        if (selectedColor !== playerTurn) return;

        selectedSquare = squareName;
        legalTargets = game
            .moves({ square: squareName, verbose: true })
            .map(move => move.to);

        drawBoard();
        updateGameStatus();
        return;
    }

    if (selectedSquare === squareName) {
        selectedSquare = null;
        legalTargets = [];
        drawBoard();
        updateGameStatus();
        return;
    }

    const move = game.move({
        from: selectedSquare,
        to: squareName,
        promotion: "q"
    });

    selectedSquare = null;
    legalTargets = [];

    if (move) {
    updateMoveList();
    setTimeout(makeBotMove, 300);
}

    drawBoard();
    updateGameStatus();
}

function coordsToSquare(row, col) {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return files[col] + (8 - row);
}

function updateMoveList() {
    moveList.innerHTML = "";

    const history = game.history();

    for (let i = 0; i < history.length; i += 2) {
        const li = document.createElement("li");

        const whiteMove = history[i] || "";
        const blackMove = history[i + 1] || "";

        li.textContent = `${whiteMove} ${blackMove}`;

        moveList.appendChild(li);
    }
}

function makeBotMove() {
    if (game.game_over()) return;

    const moves = game.moves();

    if (moves.length === 0) return;

    const randomMove = moves[Math.floor(Math.random() * moves.length)];

    game.move(randomMove);

    updateMoveList();
    drawBoard();
    updateGameStatus();
}

newGameButton.addEventListener("click", () => {
    game.reset();
    selectedSquare = null;
    legalTargets = [];
    moveList.innerHTML = "";
    gameAlert.classList.add("hidden");
    drawBoard();
});


drawBoard();
updateGameStatus();

function updateGameStatus() {
    gameAlert.classList.add("hidden");

    if (game.in_checkmate()) {
        const winner = game.turn() === "w" ? "Black" : "White";
        gameAlert.textContent = `Checkmate. ${winner} wins.`;
        gameAlert.classList.remove("hidden");
        return;
    }

    if (game.in_check()) {
        gameAlert.textContent = "Check.";
        gameAlert.classList.remove("hidden");

        setTimeout(() => {
            gameAlert.classList.add("hidden");
        }, 1600);
    }
}
