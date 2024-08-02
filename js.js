

function GameBoard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
        board.push([]);
        for (let j = 0; j < 3; j++) {
            board[i].push("0")
        }
    }

    const getBoard = () => board;
    const printBoard = () => {
        console.log("-------")
        board.forEach((row) => {
            console.log("|" + row[0] + "|" + row[1] + "|" + row[2] + "|" + "\n");
            console.log("-------")
        })
    }
    const availableSpaces = function () {
        const availableSpacesBoard = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "0") {
                    availableSpacesBoard.push([i, j]);
                }
            }
        }
        return availableSpacesBoard
    }
    const changeCellValue = function (row, column, player) {
        if (board[row][column] == "0") {
            board[row][column] = player;
        }
    }
    return { getBoard, printBoard, changeCellValue, availableSpaces }
}


function Player(name, symbol) {
    const score = 0;
    return { name, symbol }
}

function Game(playerOne=Player("Player1","x"), playerTwo=Player("Player2","o")) {

    const board = GameBoard();
    const player1 = Player(playerOne.name, playerOne.symbol);
    const player2 = Player(playerTwo.name, playerTwo.symbol);
    let win = 0;

    activePlayer = player1;

    const switchPlayer = () => {
        if (activePlayer == player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }
    const getActive = () => activePlayer;
    const getWin = () => win;
    const getBoard = () => board;
    const printRound = () => {
        board.printBoard();
        console.log("\n \n \n \n \n \n \n \n  \n")
        console.log(activePlayer.name + "'s turn (" + activePlayer.symbol + ")");
        const available = board.availableSpaces()
        let string = "available places: "

        for (let i = 0; i < available.length; i++) {
            string += "[" + available[i] + "], ";
        }
        string = string.slice(0, string.length - 2)
        console.log(string)
    }

    const playRound = (row, column) => {

        if (board.getBoard()[row][column] == "0") {
            board.changeCellValue(row, column, activePlayer.symbol);
            console.log(activePlayer.name + " played[" + row + "]" + "[" + column + "] ")
            if ((board.getBoard()[0][0] == activePlayer.symbol & board.getBoard()[0][0] == board.getBoard()[0][1] & board.getBoard()[0][1] == board.getBoard()[0][2]) || (board.getBoard()[1][0] == activePlayer.symbol & board.getBoard()[1][0] == board.getBoard()[1][1] & board.getBoard()[1][1] == board.getBoard()[1][2]) || (board.getBoard()[2][0] == activePlayer.symbol & board.getBoard()[2][0] == board.getBoard()[2][1] & board.getBoard()[2][1] == board.getBoard()[2][2]) || (board.getBoard()[0][0] == activePlayer.symbol & board.getBoard()[0][0] == board.getBoard()[1][0] & board.getBoard()[1][0] == board.getBoard()[2][0]) || (board.getBoard()[0][1] == activePlayer.symbol & board.getBoard()[0][1] == board.getBoard()[1][1] & board.getBoard()[1][1] == board.getBoard()[2][1]) || (board.getBoard()[0][2] == activePlayer.symbol & board.getBoard()[0][2] == board.getBoard()[1][2] & board.getBoard()[1][2] == board.getBoard()[2][2]) || (board.getBoard()[0][0] == activePlayer.symbol & board.getBoard()[0][0] == board.getBoard()[1][1] & board.getBoard()[1][1] == board.getBoard()[2][2]) || (board.getBoard()[0][2] == activePlayer.symbol & board.getBoard()[0][2] == board.getBoard()[1][1] & board.getBoard()[1][1] == board.getBoard()[2][0])) {
                console.log("\n \n \n \n \n")
                console.log("congratulations " + activePlayer.name)
                win = activePlayer.name
            }
            switchPlayer();
            printRound();
        } else {
            printRound();
            console.log(activePlayer.name + " please play again form available places")

        }

    };

    return {
        playRound,
        printRound,
        getActive,
        getBoard,
        getWin,
        switchPlayer

    }



}


function screenController() {

    // const dialog = document.querySelector("dialog");
    // const showButton = document.querySelector(".playGame");
    // const cancelButton = document.querySelector(".cancel");
    // showButton.addEventListener("click", () => {
    //     dialog.showModal();
    // });

    // cancelButton.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     dialog.close();
    // });
    // const player1Input = document.getElementById(".player1");
    // const player2Input = document.getElementById(".player2");
    // const numberOfGamesInput = document.getElementById(".numberOfGames");
    let playerOne;
    let playerTwo;
    // showButton.addEventListener("click", () => {
    //     const player1 = player1Input.value;
    //     const player2 = player2Input.value;
    //     const numberOfGames = numberOfGamesInput.value;
    //     player1Input.value = "";
    //     player2Input.value = "";
    //     numberOfGamesInput.value = "";
    //     playerOne=Player(player1,"x")
    //     playerTwo=Player(player2,"o")
    //     dialog.close();
    // });
   


    let game = Game(playerOne, playerTwo);
    const start = document.querySelector(".control button")
    const playGame = document.querySelector(".control .playGame")

    const body = document.querySelector("body")
    const turn = document.querySelector(".turn");
    let win = 0;

    const container = document.querySelector(".container");
    const cells = document.querySelectorAll(".container button");


    const arr = Array.from(cells);
    const updateBoard = () => {
        const activePlayer = game.getActive();
        turn.textContent = `${activePlayer.name} 's turn`
    }
    arr.forEach((e) => {
        e.addEventListener("click", () => {
            const row = e.getAttribute("id", "").slice(3, 4);
            const column = e.getAttribute("id", "").slice(4, 5);
            const temp = activePlayer;
            if (win == 0) {
                game.playRound(row, column, activePlayer.symbol)
                if (temp == activePlayer) {

                } else {
                    game.switchPlayer();
                    e.classList.add(activePlayer.symbol);
                    game.switchPlayer();
                }
                updateBoard()

                if (game.getWin()) {
                    turn.textContent = ` Congratulations ${game.getWin()}`;
                    turn.setAttribute("style", "color:green")
                    game.switchPlayer();
                    arr.forEach((e) => {
                        if (e.classList == activePlayer.symbol) {
                            if (activePlayer.symbol == "x") {
                                e.classList.add("xx");
                            } else {
                                e.classList.add("ox");
                            }
                        }
                    })
                    win = 1
                    start.setAttribute("style", "opacity:1;")
                    start.addEventListener("click", () => {
                        win = 0;
                        arr.forEach((e) => {
                            e.classList.remove("x");
                            e.classList.remove("o");
                            e.classList.remove("xx");
                            e.classList.remove("ox");
                            start.setAttribute("style", "opacity:.6;")
                        })
                        turn.style.color = "black";
                        updateBoard()
                        game = Game(playerTwo, playerOne);
                        for (let i = 0; i < 3; i++) {
                            for (let j = 0; j < 3; j++) {
                                game.getBoard().getBoard()[i][j] = "0";
                            }
                        }
                    })

                }
                
            }
        })
    })

    updateBoard()
};

screenController();






