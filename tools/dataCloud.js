import { v2 as cloudinary } from 'cloudinary';
import { writeFile } from 'node:fs/promises';

cloudinary.config({
    cloud_name: 'dihujgmwe',
    api_key: 'add_your_API',
    api_secret: 'AAiNIJLLUg_eJomcLARk6yYP_eg',
});

async function main() {
    const images = [];
    let next_cursor;

    do {
        const result = await cloudinary.api.resources({
            resource_type: 'image',
            type: 'upload',
            max_results: 500,
            next_cursor,
        });

        images.push(...result.resources);
        next_cursor = result.next_cursor;
    } while (next_cursor);

    const data = images.map(image => ({
        publicId: image.public_id,
        format: image.format,
        url: image.secure_url,
        originalFilename: image.original_filename,
    }));

    await writeFile(
        'cloudinary-images.json',
        JSON.stringify(data, null, 2)
    );

    console.log(`Found ${data.length} images.`);
    console.log('Saved to cloudinary-images.json');
}

main().catch(console.error);