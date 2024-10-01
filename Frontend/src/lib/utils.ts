import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Function to convert a string to a slug >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const slugify = (text: string) => {
  return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // Remove all non-word characters
      .trim()
      .replace(/\s+/g, '-');  // Replace spaces with -
};



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
