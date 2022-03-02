import { Player } from '../../types';

export type SortTable = { column: keyof Player; direction: 'asc' | 'desc' };
