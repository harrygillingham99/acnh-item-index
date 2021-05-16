export interface Name {
  "name-USen": string;
  "name-EUen": string;
  "name-EUde": string;
  "name-EUes": string;
  "name-USes": string;
  "name-EUfr": string;
  "name-USfr": string;
  "name-EUit": string;
  "name-EUnl": string;
  "name-CNzh": string;
  "name-TWzh": string;
  "name-JPja": string;
  "name-KRko": string;
  "name-EUru": string;
}

export interface AnimalCrossingItem {
  name: Name;
  image_uri: string;
}

export interface AnimalCrossingMonthlyItem extends AnimalCrossingItem {
  availability: Availability;
}

export interface Availability {
  "month-northern": string;
  "month-southern": string;
  time: string;
  isAllDay: boolean;
  isAllYear: boolean;
  location: string;
  rarity: string;
  "month-array-northern": any[];
  "month-array-southern": any[];
  "time-array": any[];
}
