export interface Country {
  name: Names;
  nativeName: NativeName;
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies: any[];
  languages: any;
  borders: string[];
  flags: Flags;
  cioc?: string;
  ccn3?: string;
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

export interface NativeName {
  common: string;
  official: string;
}

export interface CountriesStore {
  all: Country[];
  asia: Country[];
  africa: Country[];
  americas: Country[];
  europe: Country[];
  oceania: Country[];
}
