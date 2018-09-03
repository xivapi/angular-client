import { PvpTeamMember } from './pvp-team-member';

export interface PvpTeam {
    Crest: [string, string, string];
    ID: string;
    Members: PvpTeamMember[];
    Name: string;
    Server: string;
}
