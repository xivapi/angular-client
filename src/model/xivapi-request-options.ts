import { XivapiOptions } from './xivapi-options';

export interface XivapiRequestOptions extends XivapiOptions {
    page?: number;
    minified?: boolean;
    max_items?: number;
    ids?: number[];
    columns?: string[];
    schema?: boolean;
}
