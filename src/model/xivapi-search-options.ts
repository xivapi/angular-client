import { SearchIndex } from './search-index';
import { XivapiOptions } from './xivapi-options';
import { SearchAlgo } from './search-algo';

export interface XivapiSearchOptions extends XivapiOptions {
    indexes?: SearchIndex[];
    string: string;
    string_algo?: SearchAlgo;
    string_column?: string;
    page?: number;
    sort_field?: string;
    sort_order?: 'asc' | 'desc';
    limit?: number;
}
