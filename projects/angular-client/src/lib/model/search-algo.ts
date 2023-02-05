export enum SearchAlgo {
    /**
     * A very basic wild card, for example: ard would match: b-ard-ing or h-ard etc.
     */
    WILDCARD = 'wildcard',
    WILDCARD_PLUS = 'wildcard_plus',
    MULTI_MATCH = 'multi_match',
    QUERY_STRING = 'query_string',
    TERM = 'term',
    MATCH_PHRASE_PREFIX = 'match_phrase_prefix',
    FUZZ = 'fuzzy',
    STRING_CUSTOM = 'custom'
}
