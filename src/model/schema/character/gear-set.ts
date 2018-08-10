import { GearDetails } from './gear-details';

export interface GearSet {
    Attributes: { [index: string]: number };
    ClassID: number;
    Gear: GearDetails;
    GearKey: string;
    JobID: number;
    Level: number;
}
