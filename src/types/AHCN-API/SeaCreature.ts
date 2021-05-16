import { AnimalCrossingMonthlyItem } from "./Shared";

export interface SeaCreature extends AnimalCrossingMonthlyItem {
  id: number;
  "file-name": string;
  speed: string;
  shadow: string;
  price: number;
  "catch-phrase": string;
  icon_uri: string;
  "museum-phrase": string;
}
