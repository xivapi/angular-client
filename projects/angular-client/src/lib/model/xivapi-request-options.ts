import { XivapiOptions } from './xivapi-options';

/**
 * Options for base Xivapi requests.
 */
export interface XivapiRequestOptions extends XivapiOptions {
    /**
     * The page you want.
     */
    page?: number;

    /**
     * Provides a minified version of the content, usually down to 1 depth.
     * This is useful if a piece of content has a lot of extended information that you
     * do not care about but may want it to provide application features.
     */
    minified?: boolean;

    /**
     * Limit the number of items returned by the API. The maximum items you can set depends on your Developer App Key,
     * by default this is 250 objects.
     */
    max_items?: number;

    /**
     * Filter the ids down if you want data for a specific series of items.
     */
    ids?: number[];

    /**
     * View the current column and schema information of the content. This will provide 2 objects: columns and schema.
     *
     * columns - This is list of all columns in dot notation. For example an achievement would have: AchievementCategory.AchievementKind.ID
     * schema - This is a nested representation of the schema.
     */
    schema?: boolean;
}
