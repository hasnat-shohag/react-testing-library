import { render, screen, waitFor } from "@testing-library/react";
import User from "./user";
import { act } from "react";

// Define a more specific mock response interface
interface MockResponse {
	json: () => Promise<Array<{ name: string }>>;
}

// Mock user data that can be reused
const mockUsers = [
	{ name: "Humaid Koresi" },
	{ name: "Shahriar Sun" },
	{ name: "Rakib Hossain" },
];

describe("User component", () => {
	// Create a resolvable promise with our specific type
	let resolvePromise: (value: MockResponse) => void;

	beforeEach(() => {
		// Clear mocks between tests
		jest.clearAllMocks();

		// Mock fetch with a promise we can resolve manually
		global.fetch = jest.fn().mockImplementation(
			() =>
				new Promise((resolve) => {
					resolvePromise = resolve;
				})
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
				json: () => Promise.resolve(mockUsers),
			});
		});

		// Wait for the data to appear
		await waitFor(() => {
			expect(screen.getByText("Rakib Hossain")).toBeInTheDocument();
			const listItemLength = screen.getAllByRole("listitem").length;
			expect(listItemLength).toBe(3);
		});

		// Verify fetch was called correctly
		expect(fetch).toHaveBeenCalledWith(
			"https://jsonplaceholder.typicode.com/users"
		);
	});
});
