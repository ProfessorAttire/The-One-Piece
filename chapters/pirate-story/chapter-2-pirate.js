const fs = require("fs");

let courage = 0;
let decisionCount = {
  spare: 0,
  destroy: 0,
};

function clearConsole() {
  console.clear();
}

function saveGameState() {
  const gameState = {
    courage: courage,
    decisionCount: decisionCount,
  };
  fs.writeFileSync("gameState.json", JSON.stringify(gameState));
  console.log("Game state saved!");
}

function loadGameState() {
  if (fs.existsSync("gameState.json")) {
    const gameState = JSON.parse(fs.readFileSync("gameState.json"));
    courage = gameState.courage;
    decisionCount = gameState.decisionCount;
    console.log("Game state loaded!");
  } else {
    console.log("No saved game state found.");
  }
}

function startChapterThree(rl) {
  console.log("Chapter 3: [Title]");
  playerPromptChapterThree(rl);
}

function playerPromptChapterThree(rl) {
  console.log("1. [Choice 1]\n2. [Choice 2]\n3. Save and Exit");
  rl.question("Enter your choice (1, 2, or 3): ", (choice) => {
    console.log(`Player chose: ${choice}`);
    clearConsole();
    if (choice === "1") {
      courage += 10;
      handleChapterThreeChoice(rl, "choice1");
    } else if (choice === "2") {
      handleChapterThreeChoice(rl, "choice2");
    } else if (choice === "3") {
      saveGameState();
      console.log("Exiting game...");
      process.exit();
    } else {
      console.log("Invalid choice. Please enter 1, 2, or 3.");
      playerPromptChapterThree(rl);
    }
  });
}

function handleChapterThreeChoice(rl, action) {
  if (action === "choice1") {
    console.log("[Description for choice 1]");
  } else if (action === "choice2") {
    console.log("[Description for choice 2]");
  }
  interactiveDialogueChapterThree(rl, action);
}

function interactiveDialogueChapterThree(rl, action) {
  const dialogues = {
    choice1: [
      "1. [Dialogue option 1]\n2. [Dialogue option 2]",
      ["[Response to dialogue option 1]", "[Response to dialogue option 2]"],
    ],
    choice2: [
      "1. [Dialogue option 1]\n2. [Dialogue option 2]",
      ["[Response to dialogue option 1]", "[Response to dialogue option 2]"],
    ],
  };

  console.log(dialogues[action][0]);
  rl.question("Enter your choice (1 or 2): ", (choice) => {
    clearConsole();
    if (choice === "1" || choice === "2") {
      console.log(dialogues[action][1][choice - 1]);
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
      interactiveDialogueChapterThree(rl, action);
    }
    nextChoiceChapterThree(rl);
  });
}

function nextChoiceChapterThree(rl) {
  console.log("1. [Next choice 1]\n2. [Next choice 2]");
  rl.question("Enter your choice (1 or 2): ", (choice) => {
    console.log(`Player chose: ${choice}`);
    clearConsole();
    if (choice === "1") {
      courage += 5;
      transitionToNextEventChapterThree(rl, "nextChoice1");
    } else if (choice === "2") {
      transitionToNextEventChapterThree(rl, "nextChoice2");
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
      nextChoiceChapterThree(rl);
    }
  });
}

function transitionToNextEventChapterThree(rl, event) {
  if (event === "nextChoice1") {
    console.log("[Description for next choice 1]");
  } else if (event === "nextChoice2") {
    console.log("[Description for next choice 2]");
  }
  console.log(
    "You can't help but feel that this choice will echo through your journey, a decision that sets your course."
  );
  keyDecisionChapterThree(rl);
}

function keyDecisionChapterThree(rl) {
  console.log("1. Spare\n2. Destroy");
  rl.question("Enter your choice (1 or 2): ", (choice) => {
    console.log(`Player chose: ${choice}`);
    clearConsole();
    if (choice === "1") {
      decisionCount.spare += 1;
      courage += 15;
      continueStoryChapterThree(rl, "spare");
    } else if (choice === "2") {
      decisionCount.destroy += 1;
      continueStoryChapterThree(rl, "destroy");
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
      keyDecisionChapterThree(rl);
    }
  });
}

function continueStoryChapterThree(rl, path) {
  if (path === "spare") {
    console.log("[Spare storyline]");
    // Continue to the next chapter or event
  } else if (path === "destroy") {
    console.log("[Destroy storyline]");
    // Continue to the next chapter or event
  }
  console.log(
    "You can't help but feel that this choice will echo through your journey, a decision that sets your course."
  );
}

module.exports = startChapterThree;
