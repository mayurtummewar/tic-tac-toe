const pads = document.querySelectorAll(".pad")
const status = document.querySelector("#status")
const reset = document.querySelector("#reset")
let padClicked, winner = null
let X = new Set(), O = new Set(), winArray = []
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
            winArray = condition
            return turn;
        }
    }
    return null;
}

reset.addEventListener('click', function resetFunction() {
    pads.forEach(pad => {
        pad.innerText = '';
        pad.style.backgroundColor = "aliceblue";
    });
    X.clear();
    O.clear();
    winner = null;
    turn = "X";
    status.innerText = "X's turn";
})

pads.forEach(pad => {
    pad.addEventListener('click', function () {
        if (!winner) {
                padClicked = Array.prototype.indexOf.call(this.parentNode.children, this);
                if (!(X.has(padClicked) || O.has(padClicked))) {
                    (turn === "X") ? X.add(padClicked) : O.add(padClicked);
                    pads[padClicked].innerText = turn;
                    winner = checkWin();
                    if(!winner) {
                        if (X.size + O.size === 9) {
                            status.innerText = "Tie";
                        } else changeTurn();
                    }
                    else {
                        status.innerText = winner + " Won!!!";
                        winArray.forEach(winPad => {
                            pads[winPad].style.backgroundColor = "cyan";
                        })
                    }
                }
            
        }
    })
})