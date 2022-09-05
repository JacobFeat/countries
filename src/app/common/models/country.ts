export interface Country {
    name: Names;
    nativeName: string;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string;
    currencies: string[];
    languages: string;
    borders: string[];
    flags: Flags;
}

export interface Flags {
    png?: string;
    svg?: string;
}

export interface Names {
    common?: string;
    official?: string;
    nativeName?: any;
}
