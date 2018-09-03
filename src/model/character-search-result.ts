import { CharacterSearchResultRow } from './character-search-result-row';
import { Pagination } from './pagination';

export interface CharacterSearchResult {
    Results: CharacterSearchResultRow[];

    Pagination: Pagination;
}
