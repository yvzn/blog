export default {
	layout: "post.njk",
	eleventyComputed: {
		description: (data) => {
			return extractDescription(data);
		},
	}
}

function extractDescription(data) {
	if (!(data?.page?.rawInput)) return null;

	const templateContent = data.page.rawInput;
	let description = extractExerpt(templateContent);
	description = sanitize(description);
	return description;
}

function sanitize(description) {
	let result = description;

	// Remove TL;DR
	result = result.replace("TL;DR", "");
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

function extractExerpt(articleBody) {
	const endPosition = articleBody.indexOf("<!--more-->");
	if (endPosition === -1) {
		return articleBody.trim();
	}
	return articleBody.substring(0, endPosition).trim();
}
