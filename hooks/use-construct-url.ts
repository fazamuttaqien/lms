import { env } from '@/lib/env';

export function useConstructUrl(key: string): string {
  if (!key) return '';
  return `https://fm-lms.fly.storage.tigris.dev/${key}`;
}
