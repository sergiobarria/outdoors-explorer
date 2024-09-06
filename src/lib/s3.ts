import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const {
	CLOUDFLARE_R2_BUCKET_ENDPOINT,
	CLOUDFLARE_R2_ACCESS_KEY_ID,
	CLOUDFLARE_R2_SECRET_ACCESS_KEY,
	CLOUDFLARE_R2_PUBLIC_BASE_URL,
	CLOUDFLARE_R2_BUCKET_NAME
} = import.meta.env;

export function getS3Client() {
	return new S3Client({
		region: 'auto',
		endpoint: CLOUDFLARE_R2_BUCKET_ENDPOINT,
		credentials: {
			accessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID,
			secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY
		}
	});
}

export function getSignedUrlForUpload(key: string) {
	const s3 = getS3Client();
	const command = new PutObjectCommand({
		Bucket: CLOUDFLARE_R2_BUCKET_NAME,
		Key: key,
		ContentType: 'image/webp'
	});

	return getSignedUrl(s3, command, { expiresIn: 3600 });
}

export function getImageUrl(imageKey: string) {
	const baseURL = CLOUDFLARE_R2_PUBLIC_BASE_URL;
	return `${baseURL}/${imageKey}`;
}
