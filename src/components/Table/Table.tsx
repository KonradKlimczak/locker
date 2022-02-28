import { Player } from '../../types';

type TableProps = {
  data: Player[];
};

export const Table = (props: TableProps) => {
  const { data } = props;

  return (
    <table>
      <tr>
        <th>Position</th>
        <th>Player Name</th>
        <th>Total Score</th>
        <th>Totals for each of the 4 rounds</th>
        <th>Total strokes taken</th>
      </tr>
      {data.map((row) => (
        <tr key={row.id}>
          <td>{row.position}</td>
          <td>{row.name}</td>
          <td>{row.score}</td>
          <td>{row.roundsTotal}</td>
          <td>{row.strokesTotal}</td>
        </tr>
      ))}
    </table>
  );
};
