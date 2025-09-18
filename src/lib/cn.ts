// src/lib/cn.ts
import clsx from 'clsx'

export function cn(...inputs: unknown[]): string {
  return clsx(inputs)
}