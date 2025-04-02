module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('./styles/')
	eleventyConfig.addWatchTarget('./styles/')
}

