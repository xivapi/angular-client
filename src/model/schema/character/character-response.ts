import { Character } from './character';
import { PvpTeam } from '../pvp-team';

export interface CharacterResponse {
    // TODO
    Achievements: any;

    Character: Character;

    // TODO
    FreeCompany: any;

    // TODO
    FreeCompanyMembers: any;

    // TODO
    Info: any;

    PvPTeam: PvpTeam;
}
