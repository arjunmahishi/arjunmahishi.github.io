const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://arjunmahishi.me';

export function absoluteImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith('https://') || imagePath.startsWith('http://')) return imagePath;
  if (imagePath.startsWith('/')) return `${BASE_URL}${imagePath}`;
  return `${BASE_URL}/${imagePath}`;
}