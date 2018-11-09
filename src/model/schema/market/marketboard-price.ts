export interface MarketboardPrice {
    CraftSignature: string;
    ID: number;
    IsCrafted: false;
    IsHQ: number;
    Materia: any[];
    PricePerUnit: number;
    PriceTotal: number;
    Quantity: number;
    RetainerName: string;
    Stain: number;
    Town: {
        ID: number;
        Icon: string;
        Name: string;
        Name_de: string;
        Name_fr: string;
        Name_en: string;
        Name_ja: string;
        Url: string;
    };
}
