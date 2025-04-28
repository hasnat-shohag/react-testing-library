import "@testing-library/jest-dom";

// Setup global fetch mock that resolves automatically
global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve([{ name: "Test User" }]),
	})
);

// Mock timers to handle async operations more predictably
jest.useFakeTimers();
