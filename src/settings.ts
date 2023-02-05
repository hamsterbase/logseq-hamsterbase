export const enum LogseqHamsterBaseSettingKeys {
  endpoint = "hamsterbase-logseq-endpoint",
  token = "hamsterbase-logseq-token",
  namespace = "hamsterbase-logseq-namespace",
}

export type SettingSchemaDesc = {
  key: string;
  type: "string" | "number" | "boolean" | "enum" | "object" | "heading";
  default: string | number | boolean | Array<any> | object | null;
  title: string;
  description: string;
  inputAs?: "color" | "date" | "datetime-local" | "range" | "textarea";
  enumChoices?: Array<string>;
  enumPicker?: "select" | "radio" | "checkbox";
};

export const settingSchema: SettingSchemaDesc[] = [
  {
    key: LogseqHamsterBaseSettingKeys.endpoint,
    type: "string",
    default: null,
    title: "Endpoint",
    description: "Endpoint of hamsterbase",
  },
  {
    key: LogseqHamsterBaseSettingKeys.token,
    type: "string",
    default: null,
    title: "API Token",
    description: "API Token of hamsterbase",
  },
  {
    key: LogseqHamsterBaseSettingKeys.namespace,
    type: "string",
    default: "hamsterbase/highlights",
    title: "Namespace",
    description: "Namespace of highlights",
    inputAs: "textarea",
  },
];
