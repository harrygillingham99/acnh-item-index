import { AnimalCrossingMonthlyItem } from "./Shared";

export interface Fish extends AnimalCrossingMonthlyItem {
  id: number;
  "file-name": string;
  shadow: string;
  price: number;
  "price-cj": number;
  "catch-phrase": string;
  "museum-phrase": string;
  icon_uri: string;
}
