/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
// document.querySelector("#current-" + activePlayer).textConten = dice;
// var x = document.querySelector("#score-0").textContent;
var scores, randomScore, activePlayer, Gameplaying;
init();

document.querySelector(".dice").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function () {
	if (Gameplaying){
		// 1. Random Number
		dice = Math.floor(Math.random() * 6) + 1;

		// 2 Display The Reuslt
		var diceDOM = document.querySelector(".dice");
		diceDOM.style.display = "block";
		diceDOM.src = "dice-" + dice + ".png";

		// 3 upadate the round score IF the rolled number was NOT one
		if (dice !== 1) {
			//add score
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}
	
});

document.querySelector(".btn-hold").addEventListener("click", function () {
	if(Gameplaying){
		// Add CURRENT score to Globle score
		scores[activePlayer] += roundScore;
		// upadate ui
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
		// check if the player won the Game
		if (scores[activePlayer] >= 10) {
			document.getElementById("name-" + activePlayer).textContent = "WINNER!";
			document.querySelector(".dice").style.display = "block";
			document.querySelector(".player-0-panel").classList.remove("active");
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
			Gameplaying = false;

		} else {
			//Next player
			nextPlayer();
		}
	}
	
});

function nextPlayer() {
	//next player
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0;
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");
	document.querySelector(".dice").style.display = "none";
}
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	Gameplaying = true;
	document.getElementById("score-0").textContent = 0;
	document.getElementById("score-1").textContent = 0;
	document.getElementById("current-0").textContent = 0;
	document.getElementById("current-1").textContent = 0;
	document.getElementById("name-0").textContent = "player-1";
	document.getElementById("name-1").textContent = "player-2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
}