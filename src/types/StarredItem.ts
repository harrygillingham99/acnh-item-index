export interface StarredItem {
  itemLookupId: string;
  itemType: "bugs" | "villagers" | "sea" | "fish";
}

export interface StarredItems {
  items: StarredItem[];
}
