import { Character } from './character';

export interface CharacterResponse {
    Payload: Character;
    /**
     * State |    Number    | Details
     * --- | --- | ---
     * STATE_ADDING |    1    | This state is returned when the character does not exist on the API
     * and needs adding (the first ever request and sub-sequent requests until the character is added).
     * The Payload should be empty if this state is provided.
     * You are advised to inform your audience that a character add request has been performed.
     * It should take 2 minutes or less to add your character.
     *
     * STATE_CACHED |    2    | This state is returned when the character exists in the system and you're being provided a cached response.
     * The Payload will contain the character information which will include useful information such as LastUpdated
     * which you can use to base on if a character update request is required
     * STATE_NOT_FOUND |    3    | This state is returned when a character does not exist on The Lodestone.
     * If a character is attempted to be added but the system does not find it then it will be registered as not found.
     * The Payload will return empty. Characters in this state are checked every 24 hours,
     * if the character continues to not be found after several tries then this entry will be deleted.
     * You can also request a deletion of this entry via the /Delete endpoint.
     */
    State: 1 | 2 | 3;
}
