import { XivapiOptions } from './xivapi-options';

/**
 * Defines the options to be used for /Character endpoint
 */
export interface XivapiCharacterOptions extends XivapiOptions {
    /**
     * Elements you want on the character.
     *
     * | Parameters    | Details |
     * | --- | --- |
     * | data    | Get basic profile information (including Minions and Mounts) |
     * | friends    | Get a list of the characters friends |
     * | achievements    | Get the characters achievements (if they're public) |
     * | record    | Get record information of the character |
     * | gear    | Get Gearsets |
     */
    files?: 'data' | 'friends' | 'achievements' | 'record' | 'gea' [];

    /**
     * Extends profile and gear data
     *
     * * For profile, this will include information about Grand Companies, full Minion/Mount information etc.
     * * For gear, this will include equipment, dye, materia and glamour item details.
     */
    extended?: 0 | 1;

    /**
     * Include characters Free Company information
     */
    fc?: 0 | 1;
}
