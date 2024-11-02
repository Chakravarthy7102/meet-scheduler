import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNeetoCalApiKey() {
  return process.env.NEXT_PUBLIC_NEETOCAL_API_KEY ?? "";
}

export function getURLParams(params: Record<string, string>) {
  return new URLSearchParams(params).toString();
}

export function getDefaultHeaders() {
  return {
    "X-Api-Key": getNeetoCalApiKey(),
  };
}
