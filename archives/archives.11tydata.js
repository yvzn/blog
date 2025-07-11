import { extractExcerpt } from "../content-parser.js";

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
	return extractExcerpt(templateContent);
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
