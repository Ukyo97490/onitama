// Onitama Game Logic
class OnitamaGame {
    constructor() {
        this.board = [];
        this.currentPlayer = 'blue';
        this.selectedPiece = null;
        this.selectedCard = null;
        this.possibleMoves = [];
        this.cards = [];
        this.gameState = {
            blueCards: [],
            redCards: [],
            nextCard: null,
            pieces: []
        };
        this.humanPlayer = null;
        this.aiPlayer = null;
        this.aiDifficulty = 'medium';
        this.isAiThinking = false;
        this.showPlayerSelection();
    }

    init() {
        this.loadCards();
        this.setupBoard();
        this.dealCards();
        this.render();
        this.attachEventListeners();
        this.updatePlayerLabels();
        
        // Si c'est le tour de l'IA au début, la faire jouer
        if (this.currentPlayer === this.aiPlayer) {
            setTimeout(() => this.aiTurn(), 800);
        }
    }

    showPlayerSelection() {
        const selectionScreen = document.getElementById('player-selection');
        const gameContainer = document.querySelector('.game-container');
        const colorButtons = document.querySelectorAll('.color-btn');
        const difficultySelect = document.getElementById('ai-difficulty');

        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.humanPlayer = btn.dataset.color;
                this.aiPlayer = this.humanPlayer === 'blue' ? 'red' : 'blue';
                this.aiDifficulty = difficultySelect.value;
                
                // Animer la transition
                selectionScreen.style.animation = 'fadeOut 0.5s ease-out';
                setTimeout(() => {
                    selectionScreen.style.display = 'none';
                    gameContainer.style.display = 'flex';
                    gameContainer.style.animation = 'fadeIn 0.8s ease-out';
                    this.init();
                }, 500);
            });
        });
    }

    loadCards() {
        // Cartes Onitama avec leurs mouvements
        this.cards = [
            {
                name: "Tigre",
                moves: [{x: 0, y: -2}, {x: 0, y: 1}],
                stamp: "隆"
            },
            {
                name: "Dragon",
                moves: [{x: -2, y: -1}, {x: 2, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}],
                stamp: "竜"
            },
            {
                name: "Grenouille",
                moves: [{x: -1, y: -1}, {x: -2, y: 0}, {x: 1, y: 1}],
                stamp: "蛙"
            },
            {
                name: "Lapin",
                moves: [{x: 1, y: -1}, {x: 2, y: 0}, {x: -1, y: 1}],
                stamp: "兎"
            },
            {
                name: "Crabe",
                moves: [{x: 0, y: -1}, {x: -2, y: 0}, {x: 2, y: 0}],
                stamp: "蟹"
            },
            {
                name: "Éléphant",
                moves: [{x: -1, y: -1}, {x: -1, y: 0}, {x: 1, y: -1}, {x: 1, y: 0}],
                stamp: "象"
            },
            {
                name: "Oie",
                moves: [{x: -1, y: -1}, {x: -1, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}],
                stamp: "雁"
            },
            {
                name: "Mante",
                moves: [{x: -1, y: -1}, {x: 1, y: -1}, {x: 0, y: 1}],
                stamp: "蟷"
            },
            {
                name: "Bœuf",
                moves: [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}],
                stamp: "牛"
            },
            {
                name: "Coq",
                moves: [{x: -1, y: 0}, {x: 0, y: -1}, {x: 1, y: 1}],
                stamp: "鶏"
            },
            {
                name: "Singe",
                moves: [{x: -1, y: -1}, {x: 1, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}],
                stamp: "猿"
            },
            {
                name: "Cheval",
                moves: [{x: 0, y: -1}, {x: -1, y: 0}, {x: 0, y: 1}],
                stamp: "馬"
            },
            {
                name: "Sanglier",
                moves: [{x: 0, y: -1}, {x: -1, y: 0}, {x: 1, y: 0}],
                stamp: "猪"
            },
            {
                name: "Anguille",
                moves: [{x: -1, y: -1}, {x: 1, y: 0}, {x: -1, y: 1}],
                stamp: "鰻"
            },
            {
                name: "Cobra",
                moves: [{x: 1, y: -1}, {x: -1, y: 0}, {x: 1, y: 1}],
                stamp: "蛇"
            },
            {
                name: "Grue",
                moves: [{x: 0, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}],
                stamp: "鶴"
            }
        ];
    }

    setupBoard() {
        // Initialiser le plateau 5x5
        this.board = Array(5).fill(null).map(() => Array(5).fill(null));
        
        // Placer les pièces bleues (en haut)
        this.board[0][0] = { player: 'blue', type: 'pawn' };
        this.board[0][1] = { player: 'blue', type: 'pawn' };
        this.board[0][2] = { player: 'blue', type: 'master' };
        this.board[0][3] = { player: 'blue', type: 'pawn' };
        this.board[0][4] = { player: 'blue', type: 'pawn' };
        
        // Placer les pièces rouges (en bas)
        this.board[4][0] = { player: 'red', type: 'pawn' };
        this.board[4][1] = { player: 'red', type: 'pawn' };
        this.board[4][2] = { player: 'red', type: 'master' };
        this.board[4][3] = { player: 'red', type: 'pawn' };
        this.board[4][4] = { player: 'red', type: 'pawn' };
    }

    dealCards() {
        // Mélanger les cartes
        const shuffled = [...this.cards].sort(() => Math.random() - 0.5);
        
        // Distribuer 2 cartes à chaque joueur + 1 carte suivante
        this.gameState.blueCards = shuffled.slice(0, 2);
        this.gameState.redCards = shuffled.slice(2, 4);
        this.gameState.nextCard = shuffled[4];
        
        // Déterminer le premier joueur (celui qui a la carte avec le stamp le plus ancien)
        // Pour simplifier, on utilise la carte suivante pour déterminer
        const nextStamp = this.gameState.nextCard.stamp;
        this.currentPlayer = this.determineFirstPlayer(nextStamp);
    }

    determineFirstPlayer(stamp) {
        // Cartes bleues commencent généralement (simplifié)
        return 'blue';
    }

    selectPiece(row, col) {
        // Empêcher l'humain de jouer pendant le tour de l'IA
        if (this.currentPlayer === this.aiPlayer || this.isAiThinking) {
            return;
        }

        const piece = this.board[row][col];
        
        if (!piece) {
            // Clic sur une case vide - peut-être un mouvement
            if (this.selectedPiece && this.selectedCard) {
                this.attemptMove(row, col);
            }
            return;
        }

        // Si c'est une pièce adverse et qu'on a déjà sélectionné une pièce et une carte
        // alors c'est peut-être une tentative de capture
        if (piece.player !== this.currentPlayer) {
            if (this.selectedPiece && this.selectedCard) {
                this.attemptMove(row, col);
            }
            return;
        }

        // Sélectionner la pièce (c'est notre pièce)
        this.selectedPiece = { row, col, piece };
        this.updatePossibleMoves();
        this.render();
    }

    selectCard(cardIndex) {
        // Empêcher l'humain de jouer pendant le tour de l'IA
        if (this.currentPlayer === this.aiPlayer || this.isAiThinking) {
            return;
        }

        if (this.currentPlayer === 'blue') {
            this.selectedCard = { index: cardIndex, card: this.gameState.blueCards[cardIndex] };
        } else {
            this.selectedCard = { index: cardIndex, card: this.gameState.redCards[cardIndex] };
        }
        
        if (this.selectedPiece) {
            this.updatePossibleMoves();
        }
        
        this.render();
    }

    updatePossibleMoves() {
        this.possibleMoves = [];
        
        if (!this.selectedPiece || !this.selectedCard) {
            return;
        }

        const { row, col } = this.selectedPiece;
        const card = this.selectedCard.card;

        card.moves.forEach(move => {
            let newRow, newCol;
            
            // Les mouvements sont relatifs - pour le joueur rouge, on inverse
            if (this.currentPlayer === 'blue') {
                newRow = row + move.y;
                newCol = col + move.x;
            } else {
                // Pour le joueur rouge, on inverse les mouvements
                newRow = row - move.y;
                newCol = col - move.x;
            }

            // Vérifier si le mouvement est valide
            if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
                const targetPiece = this.board[newRow][newCol];
                
                // On peut se déplacer sur une case vide OU capturer un adversaire
                if (!targetPiece) {
                    // Case vide - mouvement normal
                    this.possibleMoves.push({ 
                        row: newRow, 
                        col: newCol,
                        isCapture: false
                    });
                } else if (targetPiece.player !== this.currentPlayer) {
                    // Pièce adverse - capture possible
                    this.possibleMoves.push({ 
                        row: newRow, 
                        col: newCol,
                        isCapture: true
                    });
                }
                // Si c'est une pièce alliée, on ne peut pas bouger là
            }
        });
    }

    attemptMove(row, col) {
        const move = this.possibleMoves.find(m => m.row === row && m.col === col);
        
        if (!move) {
            return;
        }

        // Effectuer le mouvement
        const { row: fromRow, col: fromCol, piece } = this.selectedPiece;
        
        // Capturer si nécessaire
        if (move.isCapture) {
            const capturedPiece = this.board[row][col];
            
            // Vérifier victoire par capture du maître
            if (capturedPiece.type === 'master') {
                this.endGame(`${this.currentPlayer === 'blue' ? 'Bleu' : 'Rouge'} gagne par capture du maître !`);
                return;
            }
        }

        // Déplacer la pièce
        this.board[row][col] = piece;
        this.board[fromRow][fromCol] = null;

        // Vérifier victoire par atteinte du temple adverse
        if (piece.type === 'master') {
            if ((this.currentPlayer === 'blue' && row === 4 && col === 2) ||
                (this.currentPlayer === 'red' && row === 0 && col === 2)) {
                this.endGame(`${this.currentPlayer === 'blue' ? 'Bleu' : 'Rouge'} gagne en atteignant le temple !`);
                return;
            }
        }

        // Échanger la carte
        this.swapCard();

        // Changer de joueur
        this.currentPlayer = this.currentPlayer === 'blue' ? 'red' : 'blue';
        this.selectedPiece = null;
        this.selectedCard = null;
        this.possibleMoves = [];

        this.render();

        // Si c'est le tour de l'IA, la faire jouer
        if (this.currentPlayer === this.aiPlayer) {
            setTimeout(() => this.aiTurn(), 800);
        }
    }

    swapCard() {
        const cardIndex = this.selectedCard.index;
        const nextCard = this.gameState.nextCard;

        if (this.currentPlayer === 'blue') {
            this.gameState.nextCard = this.gameState.blueCards[cardIndex];
            this.gameState.blueCards[cardIndex] = nextCard;
        } else {
            this.gameState.nextCard = this.gameState.redCards[cardIndex];
            this.gameState.redCards[cardIndex] = nextCard;
        }
    }

    endGame(message) {
        // Afficher le message de fin
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <h2>${message}</h2>
            <button class="btn" onclick="location.reload()">Nouvelle Partie</button>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(messageDiv);
    }

    // ============ LOGIQUE IA ============

    async aiTurn() {
        if (this.currentPlayer !== this.aiPlayer) return;
        
        this.isAiThinking = true;
        this.showThinkingIndicator();

        // Délai pour simuler la réflexion
        const thinkingTime = this.aiDifficulty === 'easy' ? 500 : 
                            this.aiDifficulty === 'medium' ? 800 : 1200;

        await new Promise(resolve => setTimeout(resolve, thinkingTime));

        const bestMove = this.calculateBestMove();

        if (bestMove) {
            // Sélectionner la pièce et la carte
            this.selectedPiece = { 
                row: bestMove.fromRow, 
                col: bestMove.fromCol, 
                piece: this.board[bestMove.fromRow][bestMove.fromCol] 
            };
            this.selectedCard = { 
                index: bestMove.cardIndex, 
                card: this.aiPlayer === 'blue' ? 
                    this.gameState.blueCards[bestMove.cardIndex] : 
                    this.gameState.redCards[bestMove.cardIndex]
            };

            // Afficher brièvement les mouvements possibles
            this.updatePossibleMoves();
            this.render();

            await new Promise(resolve => setTimeout(resolve, 600));

            // Effectuer le mouvement
            this.attemptMove(bestMove.toRow, bestMove.toCol);
        }

        this.isAiThinking = false;
        this.hideThinkingIndicator();
    }

    calculateBestMove() {
        const availableCards = this.aiPlayer === 'blue' ? 
            this.gameState.blueCards : this.gameState.redCards;
        
        let allPossibleMoves = [];

        // Générer tous les mouvements possibles pour toutes les pièces et cartes
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const piece = this.board[row][col];
                if (piece && piece.player === this.aiPlayer) {
                    availableCards.forEach((card, cardIndex) => {
                        const moves = this.getPossibleMovesForPiece(row, col, card);
                        moves.forEach(move => {
                            allPossibleMoves.push({
                                fromRow: row,
                                fromCol: col,
                                toRow: move.row,
                                toCol: move.col,
                                cardIndex: cardIndex,
                                piece: piece,
                                move: move
                            });
                        });
                    });
                }
            }
        }

        if (allPossibleMoves.length === 0) return null;

        // Évaluer chaque mouvement selon la difficulté
        if (this.aiDifficulty === 'easy') {
            return this.selectRandomMove(allPossibleMoves);
        } else if (this.aiDifficulty === 'medium') {
            return this.selectMediumMove(allPossibleMoves);
        } else {
            return this.selectHardMove(allPossibleMoves);
        }
    }

    getPossibleMovesForPiece(row, col, card) {
        let moves = [];

        card.moves.forEach(move => {
            let newRow, newCol;
            
            if (this.aiPlayer === 'blue') {
                newRow = row + move.y;
                newCol = col + move.x;
            } else {
                newRow = row - move.y;
                newCol = col - move.x;
            }

            if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
                const targetPiece = this.board[newRow][newCol];
                
                // Case vide OU pièce adverse
                if (!targetPiece) {
                    moves.push({ 
                        row: newRow, 
                        col: newCol,
                        isCapture: false,
                        capturedPiece: null
                    });
                } else if (targetPiece.player !== this.aiPlayer) {
                    moves.push({ 
                        row: newRow, 
                        col: newCol,
                        isCapture: true,
                        capturedPiece: targetPiece
                    });
                }
                // Sinon c'est une pièce alliée, on ne peut pas aller là
            }
        });

        return moves;
    }

    selectRandomMove(moves) {
        // Difficulté facile : mouvement aléatoire
        return moves[Math.floor(Math.random() * moves.length)];
    }

    selectMediumMove(moves) {
        // Difficulté moyenne : prioriser captures et mouvement du maître
        let scoredMoves = moves.map(move => ({
            ...move,
            score: this.evaluateMoveBasic(move)
        }));

        // Trier par score et prendre un des meilleurs avec un peu d'aléatoire
        scoredMoves.sort((a, b) => b.score - a.score);
        
        // Prendre un des 3 meilleurs mouvements aléatoirement
        const topMoves = scoredMoves.slice(0, Math.min(3, scoredMoves.length));
        return topMoves[Math.floor(Math.random() * topMoves.length)];
    }

    selectHardMove(moves) {
        // Difficulté difficile : évaluation avancée
        let scoredMoves = moves.map(move => ({
            ...move,
            score: this.evaluateMoveAdvanced(move)
        }));

        scoredMoves.sort((a, b) => b.score - a.score);
        
        // Prendre le meilleur ou un des 2 meilleurs
        const topMoves = scoredMoves.slice(0, Math.min(2, scoredMoves.length));
        return topMoves[Math.floor(Math.random() * topMoves.length)];
    }

    evaluateMoveBasic(move) {
        let score = 0;

        // Capture = très bon
        if (move.move.isCapture) {
            score += 50;
            if (move.move.capturedPiece.type === 'master') {
                score += 1000; // Victoire !
            }
        }

        // Déplacer le maître vers le temple adverse
        if (move.piece.type === 'master') {
            const targetTempleRow = this.aiPlayer === 'blue' ? 4 : 0;
            const distanceToTemple = Math.abs(move.toRow - targetTempleRow) + Math.abs(move.toCol - 2);
            score += (10 - distanceToTemple) * 5;

            // Bonus si on atteint le temple
            if (move.toRow === targetTempleRow && move.toCol === 2) {
                score += 1000; // Victoire !
            }
        }

        // Avancer en général
        if (this.aiPlayer === 'blue') {
            score += (move.toRow - move.fromRow) * 2;
        } else {
            score += (move.fromRow - move.toRow) * 2;
        }

        return score;
    }

    evaluateMoveAdvanced(move) {
        let score = this.evaluateMoveBasic(move);

        // Évaluation avancée

        // Protéger le maître
        const masterPos = this.findMasterPosition(this.aiPlayer);
        if (masterPos) {
            const distanceToMaster = Math.abs(move.toRow - masterPos.row) + 
                                    Math.abs(move.toCol - masterPos.col);
            if (move.piece.type !== 'master') {
                score += (5 - distanceToMaster) * 3; // Rester proche du maître
            }
        }

        // Contrôle du centre
        const centerDistance = Math.abs(move.toRow - 2) + Math.abs(move.toCol - 2);
        score += (4 - centerDistance) * 2;

        // Menacer le maître adverse
        const enemyMasterPos = this.findMasterPosition(
            this.aiPlayer === 'blue' ? 'red' : 'blue'
        );
        if (enemyMasterPos) {
            const distanceToEnemyMaster = Math.abs(move.toRow - enemyMasterPos.row) + 
                                         Math.abs(move.toCol - enemyMasterPos.col);
            score += (5 - distanceToEnemyMaster) * 4;
        }

        // Mobilité : préférer les positions avec plus d'options
        score += this.countMobilityFromPosition(move.toRow, move.toCol) * 2;

        return score;
    }

    findMasterPosition(player) {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const piece = this.board[row][col];
                if (piece && piece.player === player && piece.type === 'master') {
                    return { row, col };
                }
            }
        }
        return null;
    }

    countMobilityFromPosition(row, col) {
        let count = 0;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        directions.forEach(([dy, dx]) => {
            const newRow = row + dy;
            const newCol = col + dx;
            if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
                const piece = this.board[newRow][newCol];
                if (!piece || piece.player !== this.aiPlayer) {
                    count++;
                }
            }
        });

        return count;
    }

    showThinkingIndicator() {
        const label = this.aiPlayer === 'blue' ? 
            document.getElementById('blue-label') : 
            document.getElementById('red-label');
        
        const indicator = document.createElement('span');
        indicator.className = 'thinking-indicator';
        indicator.textContent = '💭';
        indicator.id = 'thinking-indicator';
        label.appendChild(indicator);
    }

    hideThinkingIndicator() {
        const indicator = document.getElementById('thinking-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    updatePlayerLabels() {
        const blueLabel = document.getElementById('blue-label');
        const redLabel = document.getElementById('red-label');
        const blueAiBadge = document.getElementById('blue-ai-badge');
        const redAiBadge = document.getElementById('red-ai-badge');

        if (this.aiPlayer === 'blue') {
            blueLabel.textContent = '⛩ IA';
            redLabel.textContent = 'Vous ⛩';
            blueAiBadge.style.display = 'inline-block';
            redAiBadge.style.display = 'none';
        } else if (this.aiPlayer === 'red') {
            blueLabel.textContent = '⛩ Vous';
            redLabel.textContent = 'IA ⛩';
            blueAiBadge.style.display = 'none';
            redAiBadge.style.display = 'inline-block';
        }
    }

    newGame() {
        // Recharger la page pour revenir à la sélection
        location.reload();
    }

    render() {
        this.renderBoard();
        this.renderCards();
        this.updatePlayerInfo();
    }

    renderBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';

        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                // Marquer les temples
                if ((row === 0 && col === 2) || (row === 4 && col === 2)) {
                    cell.classList.add('temple');
                }

                // Marquer la case sélectionnée
                if (this.selectedPiece && 
                    this.selectedPiece.row === row && 
                    this.selectedPiece.col === col) {
                    cell.classList.add('selected');
                }

                // Marquer les mouvements possibles
                const possibleMove = this.possibleMoves.find(m => m.row === row && m.col === col);
                if (possibleMove) {
                    cell.classList.add('possible-move');
                    if (possibleMove.isCapture) {
                        cell.classList.add('possible-capture');
                    }
                }

                // Ajouter la pièce si présente
                const piece = this.board[row][col];
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `piece ${piece.player}`;
                    if (piece.type === 'master') {
                        pieceElement.classList.add('master');
                        pieceElement.textContent = '王';
                    } else {
                        pieceElement.textContent = '兵';
                    }
                    cell.appendChild(pieceElement);
                }

                boardElement.appendChild(cell);
            }
        }
    }

    renderCards() {
        this.renderPlayerCards('blue');
        this.renderPlayerCards('red');
        this.renderNextCard();
    }

    renderPlayerCards(player) {
        const container = document.getElementById(`${player}-cards`);
        container.innerHTML = '';

        const cards = player === 'blue' ? this.gameState.blueCards : this.gameState.redCards;
        
        cards.forEach((card, index) => {
            const cardElement = this.createCardElement(card, player, index);
            container.appendChild(cardElement);
        });
    }

    renderNextCard() {
        const container = document.getElementById('next-card');
        container.innerHTML = '';
        
        const cardElement = this.createCardElement(this.gameState.nextCard, 'next', -1);
        cardElement.classList.add('disabled');
        container.appendChild(cardElement);
    }

    createCardElement(card, player, index) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        if (this.selectedCard && 
            this.selectedCard.index === index && 
            ((player === 'blue' && this.currentPlayer === 'blue') ||
             (player === 'red' && this.currentPlayer === 'red'))) {
            cardElement.classList.add('selected');
        }

        if ((player === 'blue' && this.currentPlayer !== 'blue') ||
            (player === 'red' && this.currentPlayer !== 'red') ||
            player === 'next') {
            cardElement.classList.add('disabled');
        }

        cardElement.innerHTML = `
            <div class="card-name">${card.name}</div>
            <div class="card-grid">
                ${this.renderCardGridForPlayer(card, player)}
            </div>
            <div class="card-stamp">${card.stamp}</div>
        `;

        if (player !== 'next') {
            cardElement.dataset.player = player;
            cardElement.dataset.index = index;
        }

        return cardElement;
    }

    renderCardGridForPlayer(card, player) {
        let grid = '';
        
        // Pour le joueur rouge, on inverse l'affichage de la grille
        // pour qu'elle corresponde à sa perspective du plateau
        const shouldInvert = player === 'red';
        
        for (let row = -2; row <= 2; row++) {
            for (let col = -2; col <= 2; col++) {
                // Inverser la grille pour le joueur rouge
                const displayRow = shouldInvert ? -row : row;
                const displayCol = shouldInvert ? -col : col;
                
                const cellClass = this.getCardCellClassForPlayer(card, displayRow, displayCol);
                let content = '';
                
                if (displayRow === 0 && displayCol === 0) {
                    content = '◉';
                } else if (cellClass === 'move') {
                    content = '●';
                }
                
                grid += `<div class="card-cell ${cellClass}">${content}</div>`;
            }
        }
        
        return grid;
    }

    getCardCellClassForPlayer(card, row, col) {
        if (row === 0 && col === 0) {
            return 'start';
        }

        const hasMove = card.moves.some(move => move.y === row && move.x === col);
        return hasMove ? 'move' : '';
    }

    updatePlayerInfo() {
        const blueInfo = document.getElementById('player-blue-info');
        const redInfo = document.getElementById('player-red-info');

        blueInfo.classList.toggle('active', this.currentPlayer === 'blue');
        redInfo.classList.toggle('active', this.currentPlayer === 'red');
    }

    attachEventListeners() {
        // Écouter les clics sur le plateau
        document.getElementById('board').addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (cell) {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                this.selectPiece(row, col);
            }
        });

        // Écouter les clics sur les cartes
        document.getElementById('blue-cards').addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card && !card.classList.contains('disabled')) {
                const index = parseInt(card.dataset.index);
                this.selectCard(index);
            }
        });

        document.getElementById('red-cards').addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card && !card.classList.contains('disabled')) {
                const index = parseInt(card.dataset.index);
                this.selectCard(index);
            }
        });

        // Bouton nouvelle partie
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.newGame();
        });
    }
}

// Initialiser le jeu
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new OnitamaGame();
});