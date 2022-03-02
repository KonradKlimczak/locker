import { MouseEvent } from 'react';
import { Player } from '../../types';

type SortTable = { column: keyof Player; direction: 'asc' | 'desc' };

type HeaderProps = {
  column: keyof Player;
  label: string;
  sortList: SortTable[];
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  onSortRemove: (event: MouseEvent<HTMLDivElement>) => void;
};

export const Header = (props: HeaderProps) => {
  const { column, label, sortList, onClick, onSortRemove } = props;

  const sorted = sortList.find((sort) => sort.column === column);

  return (
    <div
      className="Table-cell Table-header"
      data-column={column}
      onClick={onClick}
    >
      <div>{label}</div>
      {sorted && (
        <div
          onClick={onSortRemove}
          className="Table-header-sort"
          data-column={column}
        >
          {sorted.direction}
        </div>
      )}
    </div>
  );
};
