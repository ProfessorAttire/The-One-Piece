const fs = require("fs");

let decisionCount = {
  spare: 0,
  destroy: 0,
};

function loadGameState() {
  if (fs.existsSync("gameState.json")) {
    const gameState = JSON.parse(fs.readFileSync("gameState.json"));
    decisionCount = gameState.decisionCount;
    console.log("Game state loaded!");
  } else {
    console.log("No saved game state found.");
  }
}

function pirateEnding() {
  loadGameState();

  const totalSpare = decisionCount.spare;
  const totalDestroy = decisionCount.destroy;

  console.log("Pirate Ending:");

  if (totalSpare > totalDestroy) {
    console.log(
      "You chose to spare more often than destroy. Your compassion has earned you the respect of your crew and the title of a benevolent pirate leader."
    );
    console.log(
      "As you sail the seas, your legend grows as a pirate who values life and honor above all."
    );
  } else if (totalDestroy > totalSpare) {
    console.log(
      "You chose to destroy more often than spare. Your ruthless decisions have instilled fear in your enemies and loyalty in your crew."
    );
    console.log(
      "As you conquer the seas, your name becomes synonymous with power and dominance."
    );
  } else {
    console.log(
      "You balanced your decisions between sparing and destroying. Your crew sees you as a pragmatic leader who makes tough choices when necessary."
    );
    console.log(
      "Your legacy is one of balance, navigating the fine line between mercy and might."
    );
  }

  console.log(
    "The end of your pirate journey marks the beginning of your legend. What kind of pirate will you be remembered as?"
  );
}

module.exports = pirateEnding;
