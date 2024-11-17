module.exports = {
	prefix: "u-",
  content: [
    "./src/**/*.{html,njk,js,scss}",
    "./src/site/**/*.njk"
  ],
  theme: {
		screens: {
			xs: {'min': '320px'},
			sm: {'min': '375px'},
			md: {'min': '768px'},
			lg: {'min': '1024px'},
			xl: {'min': '1440px'},
	},
    extend: {},
  },
  plugins: [],
};