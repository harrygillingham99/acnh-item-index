import { AnimalCrossingItem, Availability, Name } from "./Shared";

export interface Bug extends AnimalCrossingItem {
  id: number;
  "file-name": string;
  price: number;
  "price-flick": number;
  "catch-phrase": string;
  "museum-phrase": string;
  image_uri: string;
  icon_uri: string;
}
