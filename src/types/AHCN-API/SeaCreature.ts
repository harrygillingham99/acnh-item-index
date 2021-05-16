import { AnimalCrossingItem, Availability, Name } from "./Shared";

export interface SeaCreature extends AnimalCrossingItem {
  id: number;
  "file-name": string;
  speed: string;
  shadow: string;
  price: number;
  "catch-phrase": string;
  image_uri: string;
  icon_uri: string;
  "museum-phrase": string;
}
