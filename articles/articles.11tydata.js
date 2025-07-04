import { extractExcerpt } from "../content-parser.js";

export default {
	layout: "post.njk",
	eleventyComputed: {
		description: (data) => {
			return extractDescription(data);
		}
	}
}

function extractDescription(data) {
	if (!(data?.page?.rawInput)) return null;

	const templateContent = data.page.rawInput;
	return extractExcerpt(templateContent);
}
