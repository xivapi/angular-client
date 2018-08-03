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
}
