import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function timeAgo(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const secondsAgo = Math.floor((now - createdDate) / 1000);
  const daysAgo = Math.floor(secondsAgo / 86400);

  if (daysAgo > 6) {
    return createdDate.toLocaleDateString('en-GB'); // dd/mm/yyyy
  }

  const intervals = [
    { suffix: 'd', seconds: 86400 },
    { suffix: 'h', seconds: 3600 },
    { suffix: 'm', seconds: 60 },
    { suffix: 's', seconds: 1 },
  ];

  for (const { suffix, seconds } of intervals) {
    const count = Math.floor(secondsAgo / seconds);
    if (count >= 1) {
      return `${count}${suffix}`;
    }
  }

  return 'just now';
}
