import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	base: './',
	plugins: [
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'inline',
			workbox: {
				// Automatically caches all your local JS, HTML, and CSS assets
				globPatterns: ['**/*.{js,css,html,ico,png,svg,gif,jpeg,jpg}'],

				// Allows the service worker to cache Firebase assets from the web CDN
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/www\.gstatic\.com\/firebasejs\/.*/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'firebase-cdn-cache',
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					}
				]
			},
			manifest: {
				name: 'Cat Mood',
				short_name: 'catmood',
				description: 'Matches your mood to a cat meme',
				theme_color: '#ffffff', // Matches your custom success green
				background_color: '#ffffff',
				display: 'standalone', // Removes the browser URL address bar
				orientation: 'portrait',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			}
		})
	]
});