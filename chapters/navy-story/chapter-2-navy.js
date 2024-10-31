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

function startChapterTwo(rl) {
  console.log("Chapter 2: [Title]");
  playerPromptChapterTwo(rl);
}

function playerPromptChapterTwo(rl) {
  console.log("1. [Choice 1]\n2. [Choice 2]\n3. Save and Exit");
  rl.question("Enter your choice (1, 2, or 3): ", (choice) => {
    console.log(`Player chose: ${choice}`);
    clearConsole();
    if (choice === "1") {
      courage += 10;
      handleChapterTwoChoice(rl, "choice1");
    } else if (choice === "2") {
      handleChapterTwoChoice(rl, "choice2");
    } else if (choice === "3") {
      saveGameState();
      console.log("Exiting game...");
      process.exit();
    } else {
      console.log("Invalid choice. Please enter 1, 2, or 3.");
      playerPromptChapterTwo(rl);
    }
  });
}

function handleChapterTwoChoice(rl, action) {
  if (action === "choice1") {
    console.log("[Description for choice 1]");
  } else if (action === "choice2") {
    console.log("[Description for choice 2]");
  }
  interactiveDialogueChapterTwo(rl, action);
}

function interactiveDialogueChapterTwo(rl, action) {
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
      interactiveDialogueChapterTwo(rl, action);
    }
    nextChoiceChapterTwo(rl);
  });
}

function nextChoiceChapterTwo(rl) {
  console.log("1. [Next choice 1]\n2. [Next choice 2]");
  rl.question("Enter your choice (1 or 2): ", (choice) => {
    console.log(`Player chose: ${choice}`);
    clearConsole();
    if (choice === "1") {
      courage += 5;
      transitionToNextEventChapterTwo(rl, "nextChoice1");
    } else if (choice === "2") {
      transitionToNextEventChapterTwo(rl, "nextChoice2");
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
      nextChoiceChapterTwo(rl);
    }
  });
}

function transitionToNextEventChapterTwo(rl, event) {
  if (event === "nextChoice1") {
    console.log("[Description for next choice 1]");
  } else if (event === "nextChoice2") {
    console.log("[Description for next choice 2]");
  }
  console.log(
    "You can't help but feel that this choice will echo through your journey, a decision that sets your course."
  );
  keyDecisionChapterTwo(rl);
}

function keyDecisionChapterTwo(rl) {
  console.log("1. Spare\n2. Destroy");
  rl.question("Enter your choice (1 or 2): ", (choice) => {
    console.log(`Player chose: ${choice}`);
    clearConsole();
    if (choice === "1") {
      decisionCount.spare += 1;
      courage += 15;
      continueStoryChapterTwo(rl, "spare");
    } else if (choice === "2") {
      decisionCount.destroy += 1;
      continueStoryChapterTwo(rl, "destroy");
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
      keyDecisionChapterTwo(rl);
    }
  });
}

function continueStoryChapterTwo(rl, path) {
  if (path === "spare") {
    console.log("[Spare storyline]");
    const nextChapter = require("./chapter-3-pirate");
    nextChapter(rl);
  } else if (path === "destroy") {
    console.log("[Destroy storyline]");
    const nextChapter = require("./chapter-3-pirate");
    nextChapter(rl);
  }
  console.log(
    "You can't help but feel that this choice will echo through your journey, a decision that sets your course."
  );
}

module.exports = startChapterTwo;
