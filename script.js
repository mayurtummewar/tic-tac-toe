const pads = document.querySelectorAll(".pad")
const status = document.querySelector("#status")
const reset = document.querySelector("#reset")
let padClicked, winner
let X = new Set(), O = new Set()
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let turn = "X";

function changeTurn() {
    turn = (turn === "X") ? "O" : "X";
    status.innerText = turn + "'s turn";
}

function checkWin() {
    const playerSet = (turn === "X") ? X : O;
    for (const condition of winConditions) {
        if (condition.every(index => playerSet.has(index))) {
            return turn;
        }
    }
    return null;
}

function resetFunction() {
    window.location.reload();
}

reset.addEventListener('click', function () {
    resetFunction();
})

pads.forEach(pad => {
    pad.addEventListener('click', function () {
        padClicked = Array.prototype.indexOf.call(this.parentNode.children, this);
        (turn === "X") ? X.add(padClicked) : O.add(padClicked);
        pads[padClicked].innerText = turn;
        winner = checkWin();
        if(!winner) {
            changeTurn();
        }
        else {
            status.innerText = winner + " Won!!!";
        }
    })
})