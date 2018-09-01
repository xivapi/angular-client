import { CharacterSearchResultRow } from './character-search-result-row';

export interface CharacterSearchResult {
    Characters: CharacterSearchResultRow[];

    // TODO change this for normalized pagination
    PageCurrent: number;
    PageNext: number;
    PagePrevious: number;
    PageTotal: number;
    Total: number;
}
