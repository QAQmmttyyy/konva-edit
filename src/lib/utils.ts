import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { MAX_SCALE, MIN_SCALE, SCALE_STEP } from "./constants";

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

export function getZoomOutScale(oldScale: number) {
  return Math.max(MIN_SCALE, oldScale - SCALE_STEP);
}

export function getZoomInScale(oldScale: number) {
  return Math.min(MAX_SCALE, oldScale + SCALE_STEP);
}
