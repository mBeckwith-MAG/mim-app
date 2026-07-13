export interface ColVal {
  id: string
  text: string | null
  value: string | null
}

export interface Item {
  id: string
  name: string
  column_values: Array<ColVal>
}