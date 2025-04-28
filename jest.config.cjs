module.exports = {
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.[t|j]sx?$": "babel-jest",
	},
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	transformIgnorePatterns: [
		"/node_modules/(?!(node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)/)",
	],
	extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
};
