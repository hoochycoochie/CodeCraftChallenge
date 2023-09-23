import { addPlayer } from "./utils/index.js";
import inquirer from "inquirer";
export const purchase = async () => {
  try {
    const questions = [
      {
        type: "input",
        name: "player",
        message: "Quel est votre prénom ?",
      },
    ];
    const answer = await inquirer.prompt(questions);
    const player = await addPlayer(answer.player);
    console.info(`${player.player} number ${player.number}`);
  } catch (error) {
    throw error;
  }
};
