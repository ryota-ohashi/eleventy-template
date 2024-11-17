const fs = require("fs");
const path = require("path");
const config = require("./config");

module.exports = (eleventyConfig) => {
	eleventyConfig.addPassthroughCopy({ resource: "./" });

	eleventyConfig.setBrowserSyncConfig({
    files: [
      'public/**/*',
      'src/site/**/*.njk',
      'src/styles/**/*.scss',
      'src/scripts/**/*.js'
    ],
    open: true,
    ghostMode: false,
    https: true,
    notify: true,
    reloadDelay: 0,
		rewriteRules: [
			{
				match: /<!--#include virtual="(.+?)" -->/g,
				fn(req, res, match, filename) {
					let includeFilePath = path.join("public", filename);

					if (fs.existsSync(includeFilePath) ){
						if (fs.lstatSync(includeFilePath).isDirectory() ) {
							includeFilePath = includeFilePath + 'index.html'
						}
						return fs.readFileSync(includeFilePath);

					} else {
						return `<span style="color: red">\`${includeFilePath}\` could not be found</span>`;
					}
				},
			},
		],
	});

  // ウォッチ対象の追加
  eleventyConfig.addWatchTarget('./src/site/');
  eleventyConfig.addWatchTarget('./src/styles/');
  eleventyConfig.addWatchTarget('./src/scripts/');

	return {
		dir: {
			input: "src/site/pages",
			includes: "../inc",
			layouts: "../inc/layouts",
			data: "../data",
			output: "public",
		},
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		pathPrefix: config.pathPrefix,
	};
};
