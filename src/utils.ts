import { Player } from './types';

export const getData = (rawData: any) => {
  const players: Player[] = [];

  for (const event of rawData.events) {
    for (const competition of event.competitions) {
      for (const competitor of competition.competitors) {
        players.push({
          id: competitor.id,
          name: competitor.athlete.displayName,
          position: competitor.status.position.displayName,
          score: competitor.score.displayValue,
          roundsTotal: 0,
          strokesTotal: 0,
        });
      }
    }
  }

  return players;
};
