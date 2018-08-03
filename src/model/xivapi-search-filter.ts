export interface XivapiSearchFilter {
    column: string;
    operator: '=' | '>' | '<' | '<=' | '>=';
    value: string | number;
}
