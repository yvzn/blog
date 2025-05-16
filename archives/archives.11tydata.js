export default {
	layout: "post.njk",
	eleventyComputed: {
		description: (data) => {
			return extractDescription(data);
		},
		series: (data) => {
			return extractSeries(data);
		}
	}
}

function extractDescription(data) {
	if (!(data?.page?.rawInput)) return null;

	const templateContent = data.page.rawInput;
	return extractExerpt(templateContent);
}

function extractExerpt(articleBody) {
	const endPosition = articleBody.indexOf("<!--more-->");
	if (endPosition === -1) {
		return articleBody.trim();
	}
	return articleBody.substring(0, endPosition).trim();
}

function extractSeries(data) {
	const tags = data?.tags || [];
	for(const tag of tags) {
		if (data?.blog_series?.items?.[tag]) {
			return tag;
		}
	}
	return null;
}
