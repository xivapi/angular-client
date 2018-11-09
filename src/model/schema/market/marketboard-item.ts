import { MarketboardPrice } from './marketboard-price';

export interface MarketboardItem {
    Item: {
        ID: number;
        Icon: string;
        Name: string;
        Name_de: string;
        Name_fr: string;
        Name_en: string;
        Name_ja: string;
        Rarity: number;
        Url: string;
    };
    Lodestone: {
        Icon: string;
        IconHq: string;
        LodestoneId: string;
    };
    Prices: MarketboardPrice[];
}
