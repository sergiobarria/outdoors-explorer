import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { TOURS_SIMPLE } from '../data/tours-simple';
import { uploadImage } from './upload-image';

// Manually create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
	const allImages = [];

	for (const tour of TOURS_SIMPLE) {
		const uploadedImages = [];

		for (const image of tour.images) {
			const filepath = path.join(__dirname, '..', 'data', 'images', image);
			const imageKey = await uploadImage(filepath);
			console.log('=> ✅ Uploaded image:', imageKey);
			if (imageKey) {
				uploadedImages.push(imageKey);
			}
		}

		allImages.push({
			id: tour.id,
			images: uploadedImages
		});
	}

	const fileContent = `// Auto-generated file. Do not edit Manually. 
    export const TOUR_IMAGES = ${JSON.stringify(allImages, null, 4)};`;

	fs.writeFileSync('./data/tour-images.js', fileContent);
}

main();
