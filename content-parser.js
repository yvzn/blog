
export function extractExcerpt(templateContent) {
	const endPosition = templateContent.indexOf("<!--more-->");
	if (endPosition === -1) {
		return templateContent.trim();
	}
	return templateContent.substring(0, endPosition).trim();
}

export function extractDetails(templateContent) {
	const startPosition = templateContent.indexOf("<!--more-->");
	if (startPosition === -1) {
		return templateContent.trim();
	}
	return templateContent.substring(startPosition).trim();
}

export function stripMarkup(templateContent) {
	if (typeof templateContent !== "string") return templateContent;
	if (templateContent.length < 1) return templateContent;

	let result = templateContent;
	// Remove HTML tags
	result = result.replace(/<[^>]+>/g, "");
	// Replace markdown links with plain text
	result = result.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
	// Replace markdown formatting (bold, italic, etc.) with plain text
 	result = result.replace(/([\*_]{1,2})(.*?)\1/g, "$2"); // Bold
	// Remove line breaks
	result = result.replace(/(\r\n|\n|\r)/gm, " ");
	// Remove extra spaces
	result = result.replace(/\s+/g, " ");
	result = result.trim();

	return result;
}
