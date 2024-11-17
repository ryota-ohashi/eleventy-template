const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { publicPathPrefix } = require("./config");
const mode = process.env.NODE_ENV;
const isDev = mode !== "production";

module.exports = async () => {
	return {
		mode,
		context: path.resolve(__dirname, "src", "scripts"),
		target: ["web", "es2015"],
		entry: {
			main: "./main.js",
			// header: "./header.js",
		},
		output: {
			path: path.resolve(__dirname, "public", "assets", "js"),
			filename: "[name].js",
			publicPath: `${publicPathPrefix}/assets/`,
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false,
				}),
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				linkType: "text/css",
				filename: "../css/[name].css",
			}),
		].filter(Boolean),
		module: {
			rules: [
				{
					test: /\.(js|mjs)$/,
					include: path.join(__dirname, "src", "scripts"),
					use: {
						loader: "babel-loader",
						options: {
							presets: [
								[
									"@babel/preset-env",
									{
										bugfixes: true,
										modules: false,
										useBuiltIns: "entry",
										corejs: 3,
									},
								],
							],
							plugins: ["@babel/plugin-transform-runtime"],
							cacheDirectory: true,
						},
					},
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						!isDev ? MiniCssExtractPlugin.loader : "style-loader",
						{
							loader: "css-loader",
							options: {
								url: false,
								sourceMap: isDev,
							},
						},
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									plugins: [
										[
											"autoprefixer",
											{
												cascade: false,
												grid: "autoplace",
											},
										],
									],
								},
								sourceMap: isDev,
							},
						},
						{
							loader: "sass-loader",
							options: {
								implementation: require("sass"),
								sassOptions: {
									fiber: false, // Fibers is not compatible with Node.js v16.0.0
								},
								sourceMap: isDev,
							},
						},
					].filter(Boolean),
				},
			],
		},
		resolve: {
			extensions: [".js", ".mjs", ".json"],
		},
	};
};
