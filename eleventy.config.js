import { stripMarkup, extractDetails, extractExcerpt } from "./content-parser.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {

	// -- Folder structure --
	eleventyConfig.addPassthroughCopy({ './public/': '.' });

	eleventyConfig.addWatchTarget('./styles/')

	eleventyConfig.addTemplateFormats("markdown");
	eleventyConfig.addExtension("markdown", {
		key: "md",
	});

	// -- Custom filters and shortcodes --
	eleventyConfig.addCollection("featuredArticles", getFeaturedArticles);

	eleventyConfig.addShortcode("excerpt", extractExcerpt);
	eleventyConfig.addShortcode("details", extractDetails);

	eleventyConfig.addFilter("limit", function (array, limit) {
		return array.slice(0, limit);
	});
	eleventyConfig.addFilter("stripMarkup", stripMarkup);
}

function getFeaturedArticles(collectionsApi) {
	// Get all articles and select random ones while keeping the date order
	const sortedArticles = collectionsApi.getFilteredByTag("article").reverse();
	const randomIndices = new Set();
	while (randomIndices.size < 2) { // will break if there are not enough articles
		const randomIndex = Math.floor(Math.random() * sortedArticles.length);
		randomIndices.add(randomIndex);
	}
	return Array.from(randomIndices).toSorted().map((index) => sortedArticles[index]);
}

