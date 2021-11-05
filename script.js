const BOARDSIZE = 9;

const player = (name, marker) =>{
    return {name, marker};
}

const gameBoard = (()=> {

    let _board = new Array(BOARDSIZE).fill('');

    function getMove(i){
        return _board[i];
    }

    function setMove(i, playerMarker){
        _board[i] = playerMarker;
    }

    function reset(){
        const selected = document.querySelectorAll('.selected');
        selected.forEach((item, index) =>{
            item.classList.remove('selected');
            item.innerHTML = '';
            _board[index] = '';
        })
    }
    
    return {getMove, setMove, reset};
})();

const gameController = (() => {

    const squareElements = document.querySelectorAll('.square');
    const restartBtn = document.querySelector('#restart-btn');
    const subText = document.querySelector('#subtext');
    const playerOne = player('player 1', 'X');
    const playerTwo = player('player 2', 'O');

    winningRows = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [3,4,5],
        [6,7,8],
    ]

    // initial setting
    let activePlayer = playerOne;
    let maxMoves = BOARDSIZE;
    let isOver = false;

    // listen for marking event
    squareElements.forEach(element => {
        element.addEventListener('click', () =>{
            // add marker on frontend side
            element.innerHTML = `${activePlayer.marker}`;

            // add marker to gameBoard data
            gameBoard.setMove(element.dataset.index, activePlayer.marker);

            // count move
            maxMoves-=1;

            // disable click event
            element.classList.add('selected');

            // check winner
            checkWinner(activePlayer);

            // switch user and edit subtext
            if(!isOver) nextPlayer();
        });
    })
    
    // listening for restart event
    restartBtn.addEventListener('click', (e) =>{
        // reset gameboard
        gameBoard.reset();
        reset();
    })

    function reset(){
        // reset initial setting of game controller
        activePlayer = playerOne;
        maxMoves = BOARDSIZE;
        // set subtext
        subText.innerHTML = `${activePlayer.name}'s turn`;
        // re-active square elements

        // reset isOVer
        isOver = false;
    }

    function nextPlayer(){
        activePlayer == playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
        subText.innerHTML = `${activePlayer.name}'s turn`;
    }

    function endGame(winner){
        squareElements.forEach(element =>{
            if(!element.classList.contains('selected')) element.classList.add('selected');
        })
        if(winner == "tie") subText.innerHTML = 'Tie game';
        else subText.innerHTML = `${winner} wins`;
        isOver = true;
    }

    function checkWinner(player){
        if (maxMoves==0) endGame("tie");

        winningRows.forEach(row =>{
            let result = row.every(index =>{
                return gameBoard.getMove(index) == player.marker;
            })
            if(result) endGame(activePlayer.name);
        })
    }
    
})();
