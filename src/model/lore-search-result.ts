import { Pagination } from './pagination';

export interface LoreSearchResult {
    Data?: any;
    Results: {
        Context: string;
        Source: string;
        SourceID: number;
        Text: string;
    }[];
    Pagination: Pagination;
}
