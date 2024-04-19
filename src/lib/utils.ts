import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function camelCaseToSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, (match: string) => ` ${match.toLowerCase()}`)
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });
}
