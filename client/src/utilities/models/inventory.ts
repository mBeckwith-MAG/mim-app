import type { ColVal, Item } from "../types/inventory"
import { Columns } from "../constants/inventory"

type AllColumnKeys = keyof typeof Columns;
type DynamicColumnKeys = Exclude<AllColumnKeys, "STOCK_NUMBER" | "UID">;

export interface InventoryItem extends Record<DynamicColumnKeys, ColVal> {}

export class InventoryItem {
  public UID: string;
  public STOCK_NUMBER: string;

  constructor(item: Item) {
    this.UID = String(item.id);
    this.STOCK_NUMBER = String(item.name);

    for (const key in Columns) {
      // 💡 1. Skip over your static string keys so they don't get overwritten with ColVal objects
      if (key === "UID" || key === "STOCK_NUMBER") {
        continue;
      }

      const lookupKey = key as AllColumnKeys;
      const value: ColVal | undefined = item.column_values.find(
        (val) => val.id === Columns[lookupKey]
      );

      if (!value) {
        console.warn(`Column ${Columns[lookupKey]} not found for item ${item.id}`, item.column_values);
      } else {
        // Safe assignment: this will now only ever apply to DynamicColumnKeys (ColVal)
        (this as any)[key] = value;
      }
    }
  }
}
