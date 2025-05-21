import { HtmlBasePlugin } from "@11ty/eleventy";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {

	// -- Folder structure --
	eleventyConfig.addPassthroughCopy({ './public/': '.' });

	eleventyConfig.addWatchTarget('./styles/')

	eleventyConfig.addTemplateFormats("markdown");
	eleventyConfig.addExtension("markdown", {
		key: "md",
	});

	// -- Plugins --
	eleventyConfig.addPlugin(HtmlBasePlugin);

	// -- Custom filters and shortcodes --
	eleventyConfig.addCollection("featuredArticles", getFeaturedArticles);

	eleventyConfig.addShortcode("excerpt", extractExcerpt);
	eleventyConfig.addShortcode("details", extractDetails);

	eleventyConfig.addFilter("limit", function (array, limit) {
		return array.slice(0, limit);
	});
	eleventyConfig.addFilter("stripMarkup", stripMarkup);
}

export const config = {
	pathPrefix: '/blog_v2/',
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

function extractExcerpt(templateContent) {
	const endPosition = templateContent.indexOf("<!--more-->");
	if (endPosition === -1) {
		return templateContent.trim();
	}
	return templateContent.substring(0, endPosition).trim();
}

function extractDetails(templateContent) {
	const startPosition = templateContent.indexOf("<!--more-->");
	if (startPosition === -1) {
		return templateContent.trim();
	}
	return templateContent.substring(startPosition).trim();
}

function stripMarkup(content) {
	if (typeof content !== "string") return content;
	if (content.length < 1) return content;

	let result = content;
	// Remove HTML tags
	result = result.replace(/<[^>]+>/g, "");
	// Replace markdown links with plain text
	result = result.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
	// Remove line breaks
	result = result.replace(/(\r\n|\n|\r)/gm, " ");
	// Remove extra spaces
	result = result.replace(/\s+/g, " ");
	result = result.trim();

	return result;
}
