import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from 'react';
import { Player } from '../../types';
import { Header } from './Header';

import './Table.css';
import { getSearchedData, getSortedData, getSortList } from './utils';

type SortTable = { column: keyof Player; direction: 'asc' | 'desc' };

type TableProps = {
  data: Player[];
};

export const Table = (props: TableProps) => {
  const { data } = props;

  const [search, setSearch] = useState<string>('');
  const [sortList, setSortList] = useState<SortTable[]>([]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  }, []);

  const handleClickHeader = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const { column } = event.currentTarget.dataset;
    setSortList((prev) => getSortList(prev, column));
  }, []);

  const handleRemoveSort = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const { column } = event.currentTarget.dataset;
    setSortList((prev) => prev.filter((sort) => sort.column !== column));
  }, []);

  const searchedData = useMemo(
    () => getSearchedData(data, search),
    [data, search]
  );

  const sortedData = useMemo(
    () => getSortedData(searchedData, sortList),
    [searchedData, sortList]
  );

  return (
    <div className="Table">
      {JSON.stringify(sortList)}
      <input value={search} onChange={handleChange} />
      <div className="Table-headers">
        <Header
          column="position"
          label="Position"
          sortList={sortList}
          onClick={handleClickHeader}
          onSortRemove={handleRemoveSort}
        />
        <Header
          column="name"
          label="Player Name"
          sortList={sortList}
          onClick={handleClickHeader}
          onSortRemove={handleRemoveSort}
        />
        <Header
          column="score"
          label="Total Score"
          sortList={sortList}
          onClick={handleClickHeader}
          onSortRemove={handleRemoveSort}
        />
        <Header
          column="roundsTotal"
          label="Totals for each of dive 4 rounds"
          sortList={sortList}
          onClick={handleClickHeader}
          onSortRemove={handleRemoveSort}
        />
        <Header
          column="strokesTotal"
          label="Total strokes taken"
          sortList={sortList}
          onClick={handleClickHeader}
          onSortRemove={handleRemoveSort}
        />
      </div>
      {sortedData.map((row) => (
        <div key={row.id} className="Table-row">
          <div className="Table-cell">{row.position}</div>
          <div className="Table-cell">{row.name}</div>
          <div className="Table-cell">{row.score}</div>
          <div className="Table-cell">{row.roundsTotal}</div>
          <div className="Table-cell">{row.strokesTotal}</div>
        </div>
      ))}
    </div>
  );
};
