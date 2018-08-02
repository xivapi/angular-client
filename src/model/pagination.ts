export interface Pagination {
    page: number;
    page_next: number | boolean;
    page_prev: number | boolean;
    page_total: number;
    results: number;
    results_per_page: number;
    results_total: number;
}
