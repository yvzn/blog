export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ './public/': '.' });

	eleventyConfig.addWatchTarget('./styles/')

	eleventyConfig.addTemplateFormats("markdown");
	eleventyConfig.addExtension("markdown", {
		key: "md",
	});

	eleventyConfig.addCollection("featuredArticles", getFeaturedArticles);

	eleventyConfig.addShortcode("excerpt", extractExcerpt);
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

function extractExcerpt(article) {
	const endPosition = article.templateContent.indexOf("<!--more-->");
	if (endPosition === -1) {
		return article.templateContent.trim();
	}
	return article.templateContent.substring(0, endPosition).trim();
}
