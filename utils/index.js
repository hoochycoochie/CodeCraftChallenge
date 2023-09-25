import { promises } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { readFile, writeFile } = promises;
const PLAYERS_RELATIVE_PATH = "../players.json";
const MAX_RANDOM_NUMBER = 2600;
export const savePlayers = async (players) => {
  try {
    const jsonContent = JSON.stringify(players);
    await writeFile(
      path.join(__dirname, PLAYERS_RELATIVE_PATH),
      jsonContent,
      "utf8"
    );
    return true;
  } catch (error) {
    throw error;
  }
};
export const readPlayers = async () => {
  try {
    const rawdata = await readFile(path.join(__dirname, PLAYERS_RELATIVE_PATH));
    const players = JSON.parse(rawdata);
    return players;
  } catch (error) {
    throw error;
  }
};

export const randomNumber = (players) => {
  const random = Math.floor(Math.random() * MAX_RANDOM_NUMBER);
  if (!players.length || players.length == 0) return random;
  const index = players.findIndex((p) => p.number == random);
  if (index != -1) return randomNumber(players);
  return random;
};
export const addPlayer = async (player) => {
  try {
    const players = await readPlayers();

    const newPlayer = { player, number: randomNumber(players) };
    players.push(newPlayer);
    if (savePlayers(players)) {
      return newPlayer;
    }
  } catch (error) {
    throw error;
  }
};
