import { ClassJob } from './class-job';
import { GearSet } from './gear-set';
import { GrandCompany } from './grand-company';

export interface Character {
    ActiveClassJob: ClassJob;
    Added: number;
    Avatar: string;
    Bio: string;
    ClassJobs: { [index: string]: ClassJob };
    FreeCompanyId: number;
    GearSet: GearSet;
    Gender: 1 | 2;
    GrandCompany: GrandCompany;
    GuardianDeity: number;
    ID: number;
    Minions: number[];
    Mounts: number[];
    Name: string;
    Nameday: string;
    Portrait: string;
    PvPTeam: null;
    Race: number;
    Server: string;
    Title: number;
    Town: number;
    Tribe: number;
    Updated: number;
    VerificationToken: string;
    VerificationTokenPass: boolean;
}
