const readline = require("readline");
const fs = require("fs");
const startChapterOne = require("./chapters/chapter-one"); // Import chapter-one.js

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the One Piece Text Adventure!");
console.log("Your journey begins here...");
console.log("Tip: Press Ctrl+C to quit\n");

function loadGameState() {
  if (fs.existsSync("gameState.json")) {
    const gameState = JSON.parse(fs.readFileSync("gameState.json"));
    console.log("Game state loaded!");
    return gameState;
  } else {
    console.log("No saved game state found.");
    return null;
  }
}

rl.question(
  "Press 1 to start your adventure or 2 to load your game: ",
  (answer) => {
    if (answer === "1") {
      console.clear(); // Clear the console
      startChapterOne(rl); // Pass the readline interface to chapter-one.js
    } else if (answer === "2") {
      const gameState = loadGameState();
      if (gameState) {
        // Pass the loaded game state to startChapterOne or another function to resume the game
        startChapterOne(rl, gameState); // Ensure startChapterOne can handle the gameState parameter
      } else {
        rl.close();
      }
    } else {
      console.log(
        "Invalid input. Press 1 to start your adventure or 2 to load your game."
      );
      rl.close();
    }
  }
);
