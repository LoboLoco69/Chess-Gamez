const board = document.getElementById("board");

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");

        if ((row + col) % 2 === 0) {
            square.classList.add("square-light");
        } else {
            square.classList.add("square-dark");
        }

        board.appendChild(square);
    }
}
