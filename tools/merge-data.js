import { catsData } from "./data.js";
import cloudinaryImages from "./cloudinary-images.json" with { type: "json" };import { writeFile } from "node:fs/promises";

const normalize = (filename) =>
    filename
        .replace(/\.jpeg$/i, ".jpg")
        .toLowerCase();

const cloudinaryByName = new Map(
    cloudinaryImages.map((asset) => {
        const originalName = asset.publicId.replace(/_[a-z0-9]+$/i, "");
        const filename = `${originalName}.${asset.format}`;

        return [normalize(filename), asset];
    })
);

const mergedCats = catsData.map((cat) => {
    const asset = cloudinaryByName.get(normalize(cat.image));

    if (!asset) {
        console.warn(`No Cloudinary match for: ${cat.image}`);
        return cat;
    }

    return {
        ...cat,
        image: asset.url,
    };
});

const output = `export const catsData = ${JSON.stringify(mergedCats, null, 4)};\n`;

await writeFile("data.merged.js", output);

console.log(`Processed ${mergedCats.length} cats.`);
console.log("Output written to data.merged.js");