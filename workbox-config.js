module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,png,ico,txt,css,woff2,otf,woff}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'build/service-worker.js'
};