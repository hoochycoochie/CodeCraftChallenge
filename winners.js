import { readPlayers, savePlayers } from "./utils/index.js";

let totalJackpot = 200;

export const winners = async () => {
  try {
    const players = await readPlayers();
    const playersNumber = players.length;
    const minPlayersNumber = 3;

    if (playersNumber < minPlayersNumber) {
      console.error(
        `Not enough players, minimum ${minPlayersNumber} players before lauching jackpot, we are waiting  for ${
          minPlayersNumber - playersNumber
        } other player(s)`
      );

      return false;
    }
    const firstIndex = Math.floor(Math.random() * players.length);
    let first = players[firstIndex];
    players.splice(firstIndex, 1);

    const secondIndex = Math.floor(Math.random() * players.length);
    let second = players[secondIndex];
    players.splice(secondIndex, 1);

    const thirdIndex = Math.floor(Math.random() * players.length);
    let third = players[thirdIndex];
    players.splice(thirdIndex, 1);

    first.percent = 0.75;
    first.jackpot = totalJackpot * first.percent;

    second.percent = 0.15;
    second.jackpot = totalJackpot * second.percent;

    third.percent = 0.1;
    third.jackpot = totalJackpot * third.percent;
    const winners = [first, second, third];
    console.log("winners");
    winners.forEach((p, i) =>
      console.info(
        ` number ${p.number} ${p.player} [ ${p.jackpot} € ( ${
          p.percent * 100
        } %)]`
      )
    );
    await savePlayers([]);
    return true;
  } catch (error) {
    throw error;
  }
};
