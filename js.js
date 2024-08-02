

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

function Game(playerOne, playerTwo) {

    const board = GameBoard();
    const player1 = Player(playerOne.name, playerOne.symbol);
    const player2 = Player(playerTwo.name, playerTwo.symbol);
    let win=0;

    activePlayer = player1;

    const switchPlayer = () => {
        if (activePlayer == player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }
    const getActive = () => activePlayer;

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
                win=1;
                return;
            }
            switchPlayer();
            printRound();
        } else {
            printRound();
            console.log(activePlayer.name + " please play again form available places")
        }

    };
    
     
    

    printRound();
    while (win==0) {
        const row = prompt("Enter rows to play move");
        const column = prompt("Enter columns to play move")
        playRound(row, column);

    }

    return {
        playRound,
        printRound,
    
    }



}
// const screenController = (function () {



// })();



const game = Game(Player("Ahmed", "x"), Player("Mohamed", "o"));




