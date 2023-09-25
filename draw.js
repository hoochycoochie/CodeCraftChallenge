import { readPlayers } from "./utils/index.js";
import inquirer from "inquirer";

export const draw = async () => {
  try {
    const players = await readPlayers();
    const playersNumber = players.length;

    if (!playersNumber || playersNumber == 0) {
      console.error(`There are no players yet`);
      return false;
    }
    await inquirer.prompt([]);
    players.forEach((p, i) =>
      console.info(`${i + 1} ${p.player} [ ball number ${p.number}]`)
    );
    return true;
  } catch (error) {
    throw error;
  }
};
