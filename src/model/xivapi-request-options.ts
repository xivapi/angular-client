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
     * Pull specific columns from the data. By default the list just provides the ID.
     * You can request specific pieces of information from a list by plugging in the column names.
     * For extended content you use dot notation to access it, for example:
     *
     * To access the data in Items these you would request the columns:
     *
     * columns=Items.0.Name,Items.1.Name
     * If you imagine an array having 50 items, this could be tedious and will eat into your maximum column count.
     * You can therefore use a count format, eg:
     *
     * columns=Items.*50.Name
     * This will return 50 rows from the column Items using the index Name
     *
     * There are restrictions on the number of columns you can query, the column character length and the maximum items.
     * By default these are pretty strict so it is recommended to create a Developer App to be provided a key to increase your limits.
     */
    columns?: string[];

    /**
     * View the current column and schema information of the content. This will provide 2 objects: columns and schema.
     *
     * columns - This is list of all columns in dot notation. For example an achievement would have: AchievementCategory.AchievementKind.ID
     * schema - This is a nested representation of the schema.
     */
    schema?: boolean;
}
