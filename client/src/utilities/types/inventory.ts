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

export interface RawFile {
  ui:string
  file: File
  preview: string
}

export type RawFiles = {
  files: Array<FileData>
}

export type FileData = {
  name: string,
  assetId: number,
  isImage: boolean,
  fileType: string
}

export type Attachment = {
  url: string,
  name: string
}