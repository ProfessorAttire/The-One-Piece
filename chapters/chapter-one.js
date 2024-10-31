const fs = require("fs");

let courage = 0; // Initialize the Courage meter

function clearConsole() {
  console.clear(); // Clear the console
}

function saveGameState() {
  const gameState = {
    courage: courage,
    // Add other game state variables here
  };
  fs.writeFileSync("gameState.json", JSON.stringify(gameState));
  console.log("Game state saved!");
}

function loadGameState() {
  if (fs.existsSync("gameState.json")) {
    const gameState = JSON.parse(fs.readFileSync("gameState.json"));
    courage = gameState.courage;
    // Load other game state variables here
    console.log("Game state loaded!");
  } else {
    console.log("No saved game state found.");
  }
}

function startChapterOne(rl) {
  console.log(
    "The streets of Loguetown are packed. People from all across the seas have gathered, faces a mix of awe and fear, to witness the execution of the Pirate King, Gol D. Roger. You can feel the tension in the air, an unspoken promise of change. You can hear the murmur of the crowd, the salty breeze from the sea, and the faint clang of metal from the navy ships."
  );
  playerPrompt(rl);
}

function playerPrompt(rl) {
  console.log(
    "What do you want to do?\n1. Watch the Execution\n2. Avoid the Execution and Walk Through Town\n3. Save and Exit"
  );
  rl.question("Enter your choice (1, 2, or 3): ", (choice) => {
    console.log(`Player chose: ${choice}`); // Debugging statement
    clearConsole();
    if (choice === "1") {
      courage += 10; // Increase Courage for bold choice
      handleExecutionChoice(rl, "watch");
    } else if (choice === "2") {
      handleExecutionChoice(rl, "avoid");
    } else if (choice === "3") {
      saveGameState();
      console.log("Exiting game...");
      process.exit(); // Exit the game
    } else {
      console.log("Invalid choice. Please enter 1, 2, or 3.");
      playerPrompt(rl);
    }
  });
}

function handleExecutionChoice(rl, action) {
  if (action === "watch") {
    console.log(
      "You push through the crowd, getting as close as possible. Gol D. Roger is brought to the gallows, his face calm and unreadable.\nGol D. Roger's final words echo through the square...\nA navy officer locks eyes with you, a frown deepening on his face. You sense that your presence here may not go unnoticed."
    );
  } else if (action === "avoid") {
    console.log(
      "You slip away from the main square, preferring the quiet alleys over the noisy crowd. You can hear distant shouting, a reminder of what’s happening in the square.\nAs you slip into the quiet alley, you notice a grizzled old man, his eyes glinting with knowledge of the world. He leans against the wall, watching you intently.\nThe old man murmurs, 'The world is changing, young one. Choose wisely.'"
    );
  }
  interactiveDialogue(rl, action);
}

function interactiveDialogue(rl, action) {
  const dialogues = {
    watch: [
      "1. Ask about Gol D. Roger\n2. Inquire about the navy officer",
      [
        "You ask a nearby spectator about Gol D. Roger. 'He was the Pirate King,' they say, 'the man who conquered the Grand Line. Some say his death will spark a new era of piracy.'\n'Loguetown has always been a place of beginnings and endings,' another adds. 'It's where Roger was born and now where he meets his end.'",
        "You inquire about the navy officer. 'That's Captain Smoker,' someone whispers. 'He's known for his relentless pursuit of pirates. Rumor has it he's after a notorious crew linked to Roger's legacy.'\n'The Navy's presence here is stronger than ever,' another person notes. 'They're determined to crush any uprising before it starts.'",
      ],
    ],
    avoid: [
      "1. Ask the old man about the execution\n2. Inquire about the old man's past",
      [
        "You ask the old man about the execution. 'A turning point,' he says, 'for better or worse, the world will change today. Some fear the rise of a new pirate era.'\n'Loguetown has seen many legends,' he continues. 'From the tales of the Red-Haired Pirates to the whispers of the Revolutionary Army, this place is steeped in history.'",
        "You inquire about the old man's past. He chuckles, 'I've seen many things, young one. The seas are full of stories. Have you heard of the treasure linked to Roger's legacy?'\n'They say it's hidden somewhere in the Grand Line,' he adds. 'A treasure that could change the fate of the world.'",
      ],
    ],
  };

  console.log(dialogues[action][0]);
  rl.question("Enter your choice (1 or 2): ", (choice) => {
    clearConsole();
    if (choice === "1" || choice === "2") {
      console.log(dialogues[action][1][choice - 1]);
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
      interactiveDialogue(rl, action);
    }
    nextChoiceAfterExecution(rl);
  });
}

function nextChoiceAfterExecution(rl) {
  console.log("1. Head to the Docks\n2. Talk to Others in the Crowd");
  rl.question("Enter your choice (1 or 2): ", (choice) => {
    console.log(`Player chose: ${choice}`); // Debugging statement
    clearConsole();
    if (choice === "1") {
      courage += 5; // Increase Courage for bold choice
      transitionToNextEvent(rl, "docks");
    } else if (choice === "2") {
      transitionToNextEvent(rl, "crowd");
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
      nextChoiceAfterExecution(rl);
    }
  });
}

function transitionToNextEvent(rl, event) {
  if (event === "docks") {
    console.log(
      "You head down to the docks, where ships from both the Navy and various pirate crews wait, each vessel buzzing with activity. You feel a pull to either board a pirate ship or report to the navy’s ship docked nearby.\n'The docks are always bustling,' a sailor tells you. 'Pirates and merchants alike come here, each with their own stories and secrets.'"
    );
  } else if (event === "crowd") {
    console.log(
      "People whisper among themselves, discussing whether Gol D. Roger’s final words were a call to rebellion or a warning. Some look inspired, while others are wary.\n'Did you hear about the Red-Haired Pirates?' someone asks. 'They say they're making waves in the East Blue.'"
    );
  }
  console.log(
    "You can’t help but feel that this choice will echo through your journey, a decision that sets your course."
  );
  keyDecision(rl);
}

function keyDecision(rl) {
  console.log("1. Join the Pirates\n2. Join the Navy");
  rl.question("Enter your choice (1 or 2): ", (choice) => {
    console.log(`Player chose: ${choice}`); // Debugging statement
    clearConsole();
    if (choice === "1") {
      courage += 15; // Increase Courage for bold choice
      joinFaction(rl, "pirates");
    } else if (choice === "2") {
      joinFaction(rl, "navy");
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
      keyDecision(rl);
    }
  });
}

function joinFaction(rl, faction) {
  if (faction === "pirates") {
    console.log(
      "You decide to throw caution to the wind and step aboard a pirate ship, ready to follow in Gol D. Roger’s footsteps.\nThe pirates cheer as you board. Your journey as a pirate begins, with the open sea calling and your name yet to be feared.\n'Welcome aboard,' a pirate says. 'We're headed to the Grand Line, where legends are born.'"
    );
    const pirateStory = require("./pirate-story/chapter-2-pirate");
    pirateStory(rl); // Transition to the pirate story
  } else if (faction === "navy") {
    console.log(
      "You approach the navy vessel, where an officer greets you with a nod. This is your chance to bring order to the seas.\nThe navy officers welcome you aboard. Your journey to uphold justice begins, as you prepare to bring pirates to their knees.\n'Stay sharp,' an officer advises. 'The seas are full of dangers, and we must be ready for anything.'"
    );
    const navyStory = require("./navy-story/chapter-2-navy");
    navyStory(rl); // Transition to the navy story
  }
  console.log(
    "You can’t help but feel that this choice will echo through your journey, a decision that sets your course."
  );
}

module.exports = startChapterOne;
