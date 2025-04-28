import { render, screen, waitFor } from "@testing-library/react";
import User from "./user";
import { act } from "react";

// Define a more specific mock response interface
interface MockResponse {
	json: () => Promise<Array<{ name: string }>>;
	// Add any other properties that might be used from the Response
	ok?: boolean;
	status?: number;
	statusText?: string;
}

describe("User component", () => {
	// Create a resolvable promise with our specific type
	let resolvePromise: (value: MockResponse) => void;

	beforeEach(() => {
		// Clear mocks between tests
		jest.clearAllMocks();

		// Mock fetch with a promise we can resolve manually
		global.fetch = jest.fn().mockImplementation(() =>
			new Promise((resolve) => {
				resolvePromise = resolve;
			}).then(() => ({
				json: () => Promise.resolve([{ name: "Test User" }]),
			}))
		);
	});

	test("displays heading immediately", () => {
		render(<User />);
		const heading = screen.getByRole("heading", { name: /user/i });
		expect(heading).toBeInTheDocument();
		expect(screen.getByText("Loading users...")).toBeInTheDocument();
	});

	test("loads and displays user data", async () => {
		// First render the component
		render(<User />);

		// Wait for loading indicator to appear
		expect(screen.getByText("Loading users...")).toBeInTheDocument();

		// Explicitly resolve the fetch promise within act
		await act(async () => {
			// Resolve the fetch promise with a mock response object
			resolvePromise({
				json: () => Promise.resolve([{ name: "Test User" }]),
			});
		});

		// Wait for the data to appear
		await waitFor(() => {
			expect(screen.getByText("Test User")).toBeInTheDocument();
		});

		// Verify fetch was called correctly
		expect(fetch).toHaveBeenCalledWith(
			"https://jsonplaceholder.typicode.com/users"
		);
	});
});
