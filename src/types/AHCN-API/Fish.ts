import { AnimalCrossingItem, Availability, Name } from "./Shared";

export interface Fish extends AnimalCrossingItem {
  id: number;
  "file-name": string;
  shadow: string;
  price: number;
  "price-cj": number;
  "catch-phrase": string;
  "museum-phrase": string;
  image_uri: string;
  icon_uri: string;
}
