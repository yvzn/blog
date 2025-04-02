export default function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('./styles/')
	eleventyConfig.addWatchTarget('./styles/')
}

