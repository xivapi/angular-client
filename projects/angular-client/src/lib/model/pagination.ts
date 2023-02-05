export interface Pagination {
    /**
     * Current page number.
     */
    Page: number;

    /**
     * Next page number, equals false if there's no next page (when you're on the last one).
     */
    PageNext: number | boolean;

    /**
     * Previous page number, equals false if there's no previous page (when you're on the first one)
     */
    PagePrev: number | boolean;

    /**
     * Total amount of pages.
     */
    PageTotal: number;

    /**
     * Total amount of results in the current page.
     */
    Results: number;

    /**
     * Current maximum amount of results per page.
     */
    ResultsPerPage: number;

    /**
     * Total amount of results.
     */
    ResultsTotal: number;
}
