import { Pagination } from './pagination';

export interface LoreSearchResult {
    Results: {
        Data?: any;
        Context: string;
        Source: string;
        SourceID: number;
        Text: string;
    }[];
    Pagination: Pagination;
}
