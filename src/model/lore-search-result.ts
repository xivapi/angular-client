import { Pagination } from './pagination';

export interface LoreSearchResult {
    Results: {
        Context: string;
        Source: string;
        SourceID: number;
        Text: string;
    };
    Pagination: Pagination;
}
