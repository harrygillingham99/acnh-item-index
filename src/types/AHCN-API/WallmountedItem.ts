import { Name } from "./Shared";

export interface WallmountedItem {
  variant: string;
  "body-title"?: any;
  pattern?: any;
  "pattern-title"?: any;
  isDIY: boolean;
  canCustomizeBody: boolean;
  canCustomizePattern: boolean;
  "kit-cost"?: any;
  "color-1": string;
  "color-2": string;
  size: string;
  source: string;
  "source-detail": string;
  version: string;
  "hha-concept-1": string;
  "hha-concept-2": string;
  "hha-series"?: any;
  "hha-set"?: any;
  isInteractive: boolean;
  tag: string;
  isOutdoor: boolean;
  "lighting-type"?: any;
  isDoorDeco: boolean;
  isCatalog: boolean;
  "file-name": string;
  "variant-id": string;
  "internal-id": number;
  name: Name;
  "buy-price": number;
  "sell-price": number;
  image_uri: string;
}
