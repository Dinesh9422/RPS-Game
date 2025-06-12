let player1Score = 0, player2Score = 0, rounds = 0;
let mode = "1-player";

function setMode(selectedMode) {
    mode = selectedMode;
    player1Score = 0;
    player2Score = 0;
    rounds = 0;
    updateScore();
    document.getElementById("winner-message").innerText = '';
}

function play(choice1, choice2 = null) {
    if (rounds >= 10 || player1Score === 5 || player2Score === 5) return;

    fetch('/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: mode, player1: choice1, player2: choice2 })
    })
    .then(res => res.json())
    .then(data => {
        rounds++;
        if (data.result === 'player1') player1Score++;
        else if (data.result === 'player2') player2Score++;
        updateScore();

        if (rounds === 10 || player1Score === 5 || player2Score === 5) {
            let winner = 'No Winner';
            if (player1Score >= 5 && player1Score > player2Score) {
                winner = mode === "computer" ? "Computer 1 Wins" : "Player 1 Wins";
            } else if (player2Score >= 5 && player2Score > player1Score) {
                winner = mode === "computer" ? "Computer 2 Wins" : (mode === "1-player" ? "Computer Wins" : "Player 2 Wins");
            }
            document.getElementById("winner-message").innerText = winner;
        }
    });
}

function updateScore() {
    document.getElementById("score").innerText = `P1: ${player1Score} | P2: ${player2Score} | Round: ${rounds}/10`;
}
