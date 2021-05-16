import { Name } from "./Shared";

export interface CatchTranslations {
    "catch-USen": string;
    "catch-EUen": string;
    "catch-EUde": string;
    "catch-EUes": string;
    "catch-USes": string;
    "catch-EUfr": string;
    "catch-USfr": string;
    "catch-EUit": string;
    "catch-EUnl": string;
    "catch-CNzh": string;
    "catch-TWzh": string;
    "catch-JPja": string;
    "catch-KRko": string;
    "catch-EUru": string;
}

export interface Villager {
    id: number;
    'file-name': string;
    name: Name;
    personality: string;
    'birthday-string': string;
    birthday: string;
    species: string;
    gender: string;
    subtype: string;
    hobby: string;
    'catch-phrase': string;
    icon_uri: string;
    image_uri: string;
    'bubble-color': string;
    'text-color': string;
    saying: string;
    'catch-translations': CatchTranslations;
}