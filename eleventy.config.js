export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ './public/': '.' });

	eleventyConfig.addWatchTarget('./styles/')

	eleventyConfig.addTemplateFormats("markdown");
	eleventyConfig.addExtension("markdown", {
		key: "md",
	});
}

