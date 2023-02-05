export interface XivapiOptions {
    /**
     * To help templating; you may want to use the simplified field Name,
     * so you can provide the query language=fr and now Name will be the French name.
     * This is also extended to other string fields such as Descriptions.
     *
     * Search will use the language parameter to decide which field to query the string against,
     * for example: language=fr&string=LeAwsome will search for LeAwesome on the field Name_fr.
     */
    language?: string;

    /**
     * Pull specific columns from the data. By default the list just provides the ID, and result provides every column.
     * You can request specific pieces of information from a list or result by plugging in the column names.
     * For extended content you use dot notation to access it, for example:
     *
     * To access the data in Items or a search on the Items index, you could request with these columns:
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
     * You can add tracking counters to your app for whatever purpose using "tags". Tags will appear in your dashboard with a counter
     * next to them. You can have as many tags you would like and counts will store for a period of 30 days before taping off
     * and being removed if they become inactive.
     *
     * A tag must be alpha numeric and allows dashes and underscores, however this is not checked or validated until it hits XivAPI.
     * A GitHub issue to add support for this to TypeScript can be found at https://github.com/Microsoft/TypeScript/issues/6579
     */
    tags?: string[];

    /**
     * Should this request be fired against staging environment? NOT SUITED FOR PRODUCTION !!!
     */
    staging?: boolean;

    /**
     * A custom xivapi instance to request instead of `xivapi.com`. This is prior to `staging`.
     */
    baseUrl?: string;

    /**
     * Servers for the market endpoint.
     */
    servers?: string[];

    /**
     * Extra query params to add to the request.
     */
    extraQueryParams?: { [index: string]: string };
}
