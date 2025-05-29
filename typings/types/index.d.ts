/// <reference path="./wx/index.d.ts" />

export interface Option {
  label: string;
  value: string;
}

export type PickerOptionsMap = Record<string, Option[]>;
