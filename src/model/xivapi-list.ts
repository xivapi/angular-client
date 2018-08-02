import { Pagination } from './pagination';

export interface XivapiList<T> {
    results: T[];
    pagination: Pagination;
}
