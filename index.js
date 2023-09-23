import { purchase } from "./purchase.js";
import { draw } from "./draw.js";
import { winners } from "./winners.js";
import inquirer from "inquirer";

const timeout = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const run = async () => {
  try {
    const questions = [
      {
        type: "list",
        name: "purpose",
        message: "",
        choices: ["purchase", "draw", "winners"],
      },
    ];
    const answer = await inquirer.prompt(questions);

    if (answer.purpose == "purchase") {
      await purchase();
      await timeout(3000);
      console.clear();
      await run();
    }

    if (answer.purpose == "draw") {
      const enough = await draw();
      if (!enough) {
        await timeout(2000);
        console.clear();
        await run();
      } else {
        await timeout(3000);
        console.clear();
        await run();
      }
    }

    if (answer.purpose == "winners") {
      const enough = await winners();
      if (!enough) {
        await timeout(3000);
        console.clear();
        await run();
      }
    }
  } catch (error) {
    throw error;
  }
};

run();
