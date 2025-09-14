import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Melix',
    short_name: 'Melix',
    description: 'Watch Movies & Tv-Shows',
    start_url: '/',
    display: 'fullscreen',
    background_color: '#0F172A',
    theme_color: '#1E293B',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}