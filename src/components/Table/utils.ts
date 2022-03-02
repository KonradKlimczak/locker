import { Player } from '../../types';
import { SortTable } from './type';

const SORTABLE_COLUMNS: (keyof Player)[] = [
  'name',
  'position',
  'roundsTotal',
  'score',
  'strokesTotal',
];

export const isSortableColumn = (column?: string): column is keyof Player => {
  return SORTABLE_COLUMNS.some((sortable) => sortable === column);
};

export const getSortList = (
  sortList: SortTable[],
  column?: string
): SortTable[] => {
  if (!isSortableColumn(column)) {
    return sortList;
  }

  if (sortList.some((sort) => sort.column === column)) {
    return sortList.map((sort) => {
      if (sort.column === column) {
        return {
          column,
          direction: sort.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return sort;
    });
  }

  return [...sortList, { column: column, direction: 'asc' }];
};

const sortByPosition =
  (sort: SortTable) => (playerA: Player, playerB: Player) => {
    const positionA = Number(playerA.position.replace('T', ''));
    const positionB = Number(playerB.position.replace('T', ''));

    if (positionA > positionB) {
      return sort.direction === 'asc' ? 1 : -1;
    } else if (positionA < positionB) {
      return sort.direction === 'asc' ? -1 : 1;
    }
    return 0;
  };

const defaultSort = (sort: SortTable) => (playerA: Player, playerB: Player) => {
  if (playerA[sort.column] > playerB[sort.column]) {
    return sort.direction === 'asc' ? 1 : -1;
  } else if (playerA[sort.column] < playerB[sort.column]) {
    return sort.direction === 'asc' ? -1 : 1;
  }
  return 0;
};

export const getSortedData = (data: Player[], sortList: SortTable[]) => {
  if (sortList.length === 0) {
    return data;
  }
  const sortedData = [...data];

  const reversedList = [...sortList].reverse();
  for (const sort of reversedList) {
    switch (sort.column) {
      case 'position':
        sortedData.sort(sortByPosition(sort));
        break;

      default:
        sortedData.sort(defaultSort(sort));
        break;
    }
  }

  return sortedData;
};

const SEARCHALEB_COLUMNS: (keyof Player)[] = [
  'name',
  'position',
  'roundsTotal',
  'score',
  'strokesTotal',
];

export const getSearchedData = (data: Player[], query: string) => {
  if (query.trim().length === 0) {
    return data;
  }
  const terms = query
    .trim()
    .split(' ')
    .map((term) => term.toLowerCase());

  return data.filter((player) => {
    const found = terms.every((term) => {
      return SEARCHALEB_COLUMNS.some(
        (column) => String(player[column]).toLowerCase().indexOf(term) > -1
      );
    });

    return found;
  });
};
