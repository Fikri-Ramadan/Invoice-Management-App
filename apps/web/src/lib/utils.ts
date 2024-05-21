import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sumTotal(inputs: { quantity: number, price: number; }[]): number {
  return inputs.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
}
