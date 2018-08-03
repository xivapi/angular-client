import { SearchIndex } from './search-index';
import { XivapiOptions } from './xivapi-options';
import { SearchAlgo } from './search-algo';
import { XivapiSearchFilter } from './xivapi-search-filter';

export interface XivapiSearchOptions extends XivapiOptions {
    /**
     * Search a specific piece of content rather than all pieces of content, eg: one=item will only search Items.
     */
    indexes?: SearchIndex[];

    /**
     * Search Names for a specific string. Using additional filters this can be extended to search descriptions and lore material.
     */
    string?: string;

    /**
     * Filters results based on a given operator/value combination.
     *
     * See http://xivapi.com/docs/Search for all the filters available.
     */
    filters?: XivapiSearchFilter[];

    /**
     * Change the string search algorithm, there are currently 6 to choose from based on ElasticSearch,
     * these are useful to narrow down different ways of searching via strings
     */
    string_algo?: SearchAlgo;

    /**
     * Adjust which column the string search is performed on,
     * by default this is the Name column. This can be changed to things like descriptions or even lore columns.
     * It can only be changed to one of the filterable columns
     */
    string_column?: string;

    /**
     * Pull content from a specific page in the search results.
     */
    page?: number;

    /**
     * The column to sort the results by.
     */
    sort_field?: string;

    /**
     * The order the sort should be, this will either be Ascending or Descending order.
     */
    sort_order?: 'asc' | 'desc';

    /**
     *  * Min: 1
     *  * Max: 500
     * Limit the number of results, this cannot be higher than the maximum allowed
     */
    limit?: number;
}
