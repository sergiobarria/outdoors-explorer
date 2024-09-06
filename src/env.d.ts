/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
	readonly VITE_APP_SALES_TAX: number;
	readonly VITE_APP_BOOKING_FEE: number;
	readonly VITE_APP_PROCESSING_FEE: number;
	readonly DATABASE_URL: string;
	readonly DATABASE_AUTH_TOKEN: string;
	readonly CLOUDFLARE_R2_BUCKET_NAME: string;
	readonly CLOUDFLARE_R2_TOKEN: string;
	readonly CLOUDFLARE_R2_ACCESS_KEY_ID: string;
	readonly CLOUDFLARE_R2_SECRET_ACCESS_KEY: string;
	readonly CLOUDFLARE_R2_BUCKET_ENDPOINT: string;
	readonly CLOUDFLARE_R2_PUBLIC_BASE_URL: string;
	readonly STRIPE_PUBLIC_KEY: string;
	readonly STRIPE_SECRET_KEY: string;
	readonly STRIPE_WEBHOOK_SECRET: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		session: import('lucia').Session | null;
		user: import('lucia').User | null;
	}
}
