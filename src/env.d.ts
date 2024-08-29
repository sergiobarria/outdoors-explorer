/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
	readonly DATABASE_URL: string;
	readonly DATABASE_AUTH_TOKEN: string;
	readonly CLOUDFLARE_R2_BUCKET_NAME: string;
	readonly CLOUDFLARE_R2_TOKEN: string;
	readonly CLOUDFLARE_R2_ACCESS_KEY_ID: string;
	readonly CLOUDFLARE_R2_SECRET_ACCESS_KEY: string;
	readonly CLOUDFLARE_R2_BUCKET_ENDPOINT: string;
	readonly CLOUDFLARE_R2_PUBLIC_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
