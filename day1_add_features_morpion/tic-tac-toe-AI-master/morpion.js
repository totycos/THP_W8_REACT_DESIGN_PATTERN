class Morpion {
    humanPlayer = 'J1';
    iaPlayer = 'J2';
    turn = 0;
    gameOver = false;
    moveBackBtn = document.getElementById('moveBack')
    moveForwardBtn = document.getElementById('moveForward')

    gridMap = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    constructor(firstPlayer = 'J1') {
        this.humanPlayer = firstPlayer;
        this.iaPlayer = (firstPlayer === 'J1') ? 'J2' : 'J1';
        this.initGame();
    }

    initGame = () => {
        localStorage.clear()

        this.gridMap.forEach((line, y) => {
            line.forEach((cell, x) => {
                this.getCell(x, y).onclick = () => {
                    this.doPlayHuman(x, y);
                };
            });
        });

        if (this.iaPlayer === 'J1') {
            this.doPlayIa();
        }
    }

    getCell = (x, y) => {
        const column = x + 1;
        const lines = ['A', 'B', 'C'];
        const cellId = `${lines[y]}${column}`;
        return document.getElementById(cellId);
    }

    getBoardWinner = (board) => {
        const isWinningRow = ([a, b, c]) => (
            a !== null && a === b && b === c
        );

        let winner = null;

        // Horizontal
        board.forEach((line) => {
            if (isWinningRow(line)) {
                winner = line[0];
            }
        });

        // Vertical
        [0, 1, 2].forEach((col) => {
            if (isWinningRow([board[0][col], board[1][col], board[2][col]])) {
                winner = board[0][col];
            }
        });

        if (winner) {
            return winner;
        }

        // Diagonal
        const diagonal1 = [board[0][0], board[1][1], board[2][2]];
        const diagonal2 = [board[0][2], board[1][1], board[2][0]];
        if (isWinningRow(diagonal1) || isWinningRow(diagonal2)) {
            return board[1][1];
        }

        const isFull = board.every((line) => (
            line.every((cell) => cell !== null)
        ));
        return isFull ? 'tie' : null;
    }

    checkWinner = (lastPlayer) => {
        const winner = this.getBoardWinner(this.gridMap);
        if (!winner) {
            return;
        }

        this.gameOver = true;
        switch (winner) {
            case 'tie':
                this.displayEndMessage("Vous êtes à égalité !");
                break;
            case this.iaPlayer:
                this.displayEndMessage("L'IA a gagné !");
                break;
            case this.humanPlayer:
                this.displayEndMessage("Tu as battu l'IA !");
                break;
        }
    }

    displayEndMessage = (message) => {
        const endMessageElement = document.getElementById('end-message');
        endMessageElement.textContent = message;
        endMessageElement.style.display = 'block';
    }

    drawHit = (x, y, player) => {
        if (this.gridMap[y][x] !== null) {
            return false;
        }

        this.gridMap[y][x] = player;
        this.turn += 1;
        this.getCell(x, y).classList.add(`filled-${player}`);
        this.checkWinner(player);
        return true;
    }

    doPlayHuman = (x, y) => {
        if (this.gameOver) {
            return;
        }

        // UNDO / REDO BUTTONS LISTENERS
        this.moveBackBtn.addEventListener("click", () => {
            console.log('move back')
            localStorage.getItem(`move${this.turn - 1}`) ? this.moveForwardBtn.style.display = "block" : this.moveForwardBtn.style.display = "none"
            this.turn = this.turn - 2
            console.log('turn:', this.turn)
        });

        this.moveForwardBtn.addEventListener("click", () => {
            console.log('move forward')
        });

        if (this.drawHit(x, y, this.humanPlayer)) {
            console.log('turn when set localStorae:', this.turn)
            this.saveInLocalStorage() // SAVE IN LOCALSTORAGE

            this.displayMoveBackBtn()
            this.displayMoveForwardBtn()

            this.doPlayIa();
        }
    }

    doPlayIa = () => {
        if (this.gameOver) {
            return;
        }

        const { x, y } = this.minmax(this.gridMap, 0, -Infinity, Infinity, true);
        this.drawHit(x, y, this.iaPlayer);
    }

    minmax = (board, depth, alpha, beta, isMaximizing) => {
        // Return a score when there is a winner
        const winner = this.getBoardWinner(board);
        if (winner === this.iaPlayer) {
            return 10 - depth;
        }
        if (winner === this.humanPlayer) {
            return depth - 10;
        }
        if (winner === 'tie' && this.turn === 9) {
            return 0;
        }

        const getSimulatedScore = (x, y, player) => {
            board[y][x] = player;
            this.turn += 1;

            const score = this.minmax(
                board,
                depth + 1,
                alpha,
                beta,
                player === this.humanPlayer
            );

            board[y][x] = null;
            this.turn -= 1;

            return score;
        };

        // This tree is going to test every move still possible in game
        // and suppose that the 2 players will always play there best move.
        // The IA search for its best move by testing every combinations,
        // and affects score to every node of the tree.
        if (isMaximizing) {
            // The higher is the score, the better is the move for the IA.
            let bestIaScore = -Infinity;
            let optimalMove;
            for (const y of [0, 1, 2]) {
                for (const x of [0, 1, 2]) {
                    if (board[y][x]) {
                        continue;
                    }

                    const score = getSimulatedScore(x, y, this.iaPlayer);
                    if (score > bestIaScore) {
                        bestIaScore = score;
                        optimalMove = { x, y };
                    }

                    // clear useless branch of the algorithm tree
                    // (optional but recommended)
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }

            return (depth === 0) ? optimalMove : bestIaScore;
        }

        // The lower is the score, the better is the move for the player.
        let bestHumanScore = Infinity;
        for (const y of [0, 1, 2]) {
            for (const x of [0, 1, 2]) {
                if (board[y][x]) {
                    continue;
                }

                const score = getSimulatedScore(x, y, this.humanPlayer);
                bestHumanScore = Math.min(bestHumanScore, score);

                // clear useless branch of the algorithm tree
                // (optional but recommended)
                beta = Math.min(beta, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }

        return bestHumanScore;
    }

    saveInLocalStorage = () => {
        localStorage.setItem(`move${this.turn}`, JSON.stringify(this.gridMap))
    }

    displayMoveBackBtn = () => {
        this.turn > 0 ? this.moveBackBtn.style.display = "block" : this.turn
    }

    displayMoveForwardBtn = () => {
        localStorage.getItem(`move${this.turn - 1}`) ? this.moveForwardBtn.style.display = "block" : this.moveForwardBtn.style.display = "none"
    }


    moveBack = () => {
        if (turn === 1) {
            gridMap = [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ];
            turn = 0
        }
        else {
            this.gridMap = JSON.parse(localStorage.move + ($this.turn - 2))
            turn -= 2
        }

        console.log(gridMap)
    }

    moveForward = () => {

    }

    updateGrid = () => {

    }
}
