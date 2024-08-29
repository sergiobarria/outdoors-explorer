import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));

// Validate environment variables
jiti('./src/lib/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
				pathname: '**/*'
			},
			{
				protocol: 'https',
				hostname: 'pub-0bf034904b8b4d0d92025e3d97582454.r2.dev',
				port: '',
				pathname: '**/*'
			}
		]
	},
	logging: {
		fetches: {
			fullUrl: true
		}
	}
};

export default nextConfig;
