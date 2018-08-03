export interface Pagination {
    /**
     * Current page number.
     */
    page: number;

    /**
     * Next page number, equals false if there's no next page (when you're on the last one).
     */
    page_next: number | boolean;

    /**
     * Previous page number, equals false if there's no previous page (when you're on the first one)
     */
    page_prev: number | boolean;

    /**
     * Total amount of pages.
     */
    page_total: number;

    /**
     * Total amount of results in the current page.
     */
    results: number;

    /**
     * Current maximum amount of results per page.
     */
    results_per_page: number;

    /**
     * Total amount of results.
     */
    results_total: number;
}
