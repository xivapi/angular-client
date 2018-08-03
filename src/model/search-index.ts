/**
 * Lists all the indexes one can search on /Search endpoint.
 */
export enum SearchIndex {
    ACHIEVEMENT = 'achievement',
    ACTION = 'action',
    /**
     * Enemies index.
     */
    BNPCNAME = 'bnpcname',
    /**
     * Minions index.
     */
    COMPANION = 'companion',
    /**
     * NPCs index.
     */
    ENPCRESIDENT = 'enpcresident',
    EMOTE = 'emote',
    FATE = 'fate',
    INSTANCECONTENT = 'instancecontent',
    ITEM = 'item',
    LEVE = 'leve',
    MOUNT = 'mount',
    PLACENAME = 'placename',
    QUEST = 'quest',
    RECIPE = 'recipe',
    STATUS = 'status',
    TITLE = 'title',
    WEATHER = 'weather'
}
