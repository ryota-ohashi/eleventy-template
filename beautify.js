const fs = require("fs");
const beautify = require("js-beautify");

const targetDir = "public";

const beautifyOptions = {
	indent_size: 2,
	preserve_newlines: false,
};

const listFiles = (dir) =>
	fs
		.readdirSync(dir, { withFileTypes: true })
		.flatMap((dirent) =>
			dirent.isFile()
				? [`${dir}/${dirent.name}`]
				: listFiles(`${dir}/${dirent.name}`)
		);

const files = listFiles(targetDir);

const htmls = files.filter((name) => {
	return name.match(/.html$/);
});

htmls.forEach((file) => {
	fs.readFile(file, "utf8", (err, html) => {
		if (err) console.log(err);
		if (err) return;
		const result = beautify.html(html, beautifyOptions);
		fs.writeFile(file, result, "utf8", (err) => {
			if (err) console.log(err);
		});
	});
});
