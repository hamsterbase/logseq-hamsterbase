import { v5 } from "uuid";

export function stringToUUIDFormat(original: string): string {
  const MY_NAMESPACE = "6ab18aa9-8368-4f61-99ae-a09342277035";
  return v5(original, MY_NAMESPACE);
}
