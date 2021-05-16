import { AnimalCrossingMonthlyItem } from "./Shared";

export interface Bug extends AnimalCrossingMonthlyItem {
  id: number;
  "file-name": string;
  price: number;
  "price-flick": number;
  "catch-phrase": string;
  "museum-phrase": string;
  icon_uri: string;
}
