import { Player } from './types';

export const getData = (rawData: any) => {
  const players: Player[] = [];

  for (const event of rawData.event) {
    for (const competition of event.competitions) {
      for (const competitor of competition.competitors) {
        console.log(competitor);
      }
    }
  }

  return players;
};
