module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,png,jpg,ico,txt,js,css,svg,woff2,otf,woff}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'build/service-worker.js'
};