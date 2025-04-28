### Notes for React Testing Libray and JEST

# Types of test

1. Unit test
2. Integration test
3. End to End test

# RTL Queries

1. getBy and getAllBy
2. queryBy and queryAllBy
3. findBy and findAllBy
4. manual queries

| Query Type      | Return Value      | No Match            | Multiple Matches  | Async | Use Case                                     |
| --------------- | ----------------- | ------------------- | ----------------- | ----- | -------------------------------------------- |
| `getBy...`      | Element           | Throws error        | Throws error      | No    | When element should be in the DOM            |
| `getAllBy...`   | Array of elements | Throws error        | Returns array     | No    | When multiple elements should be in the DOM  |
| `queryBy...`    | Element           | Returns null        | Throws error      | No    | When element might not be in the DOM         |
| `queryAllBy...` | Array of elements | Returns empty array | Returns array     | No    | When elements might not be in the DOM        |
| `findBy...`     | Promise<Element>  | Rejects             | Rejects           | Yes   | When element appears asynchronously          |
| `findAllBy...`  | Promise<Array>    | Rejects             | Returns array     | Yes   | When multiple elements appear asynchronously |
| Manual queries  | Element(s)        | Depends on method   | Depends on method | No    | Custom queries using DOM methods             |

## Debugging tool

1. debug()
2. logRoles

### Debugging Tools Explained

#### 1. debug()

The `debug()` function prints the current DOM structure to the console, making it easier to visualize what's being rendered and troubleshoot issues with your tests.

<details>
<summary>Click to see example code</summary>

```javascript
import { render, screen } from "@testing-library/react";

test("using debug", () => {
	render(<MyComponent />);

	// Prints the entire rendered DOM
	screen.debug();

	// Prints a specific element
	const button = screen.getByRole("button");
	screen.debug(button);
});
```

</details>

#### 2. logRoles()

The `logRoles()` function prints all accessibility roles in the rendered component, helping you identify the correct roles to use in your queries.

<details>
<summary>Click to see example code</summary>

```javascript
import { render } from "@testing-library/react";
import { logRoles } from "@testing-library/dom";

test("using logRoles", () => {
	const { container } = render(<MyComponent />);

	// Prints all roles in the component
	logRoles(container);

	// Output example:
	// button:
	//   Name "Submit": <button>Submit</button>
	// heading:
	//   Name "Welcome": <h1>Welcome</h1>
});
```

</details>

This helps you write more accessible tests by using the correct role selectors with methods like `getByRole()`.

### User Interaction

1. Mouse interaction
2. Keyboard interaction

### Mouse and Keyboard Interaction Functions

#### Mouse Interaction Functions

The `@testing-library/user-event` library provides several methods for simulating mouse events:

<details>
<summary>Click to see mouse interaction functions</summary>

```javascript
import userEvent from "@testing-library/user-event";

// Click events
userEvent.click(element); // Simple click
userEvent.dblClick(element); // Double click
userEvent.tripleClick(element); // Triple click
userEvent.hover(element); // Hover over element
userEvent.unhover(element); // Stop hovering

// Mouse button options
userEvent.click(element, { button: 0 }); // Left click (default)
userEvent.click(element, { button: 1 }); // Middle click
userEvent.click(element, { button: 2 }); // Right click

// With modifier keys
userEvent.click(element, { ctrlKey: true }); // Ctrl+click
userEvent.click(element, { shiftKey: true }); // Shift+click
userEvent.click(element, { altKey: true }); // Alt+click
```

</details>

#### Keyboard Interaction Functions

For keyboard events, `@testing-library/user-event` provides these functions:

<details>
<summary>Click to see keyboard interaction functions</summary>

```javascript
import userEvent from "@testing-library/user-event";

// Typing text
userEvent.type(element, "Hello, world!"); // Type text
userEvent.type(element, "Hello", { delay: 100 }); // Type with delay

// Special keypresses
userEvent.keyboard("{Shift>}A{/Shift}"); // Shift+A
userEvent.keyboard("{Control>}c{/Control}"); // Ctrl+C (copy)
userEvent.keyboard("{Control>}v{/Control}"); // Ctrl+V (paste)

// Common actions
userEvent.clear(inputElement); // Clear input field
userEvent.tab(); // Press Tab key
userEvent.keyboard("{Enter}"); // Press Enter
userEvent.keyboard("{Backspace}"); // Press Backspace
userEvent.keyboard("{Escape}"); // Press Escape

// Arrow keys
userEvent.keyboard("{ArrowUp}");
userEvent.keyboard("{ArrowDown}");
userEvent.keyboard("{ArrowLeft}");
userEvent.keyboard("{ArrowRight}");
```

</details>

These functions help simulate realistic user interactions in your tests, ensuring your components respond correctly to both mouse and keyboard events.

# Test the component that wrapped with provider

    - implement and testing this in the code "@/component/theme"
    	- for a root level provider we can set the wrapper as global and then test
    		- implement also this technic in the same component

# Test Custom React hook

    - render the hook using **renderHook method**
    - update state using act utility

# Mock Functions

    - test the functions which can be passed from the parent element to child element as a props
    	 - use the jest.fn() for mocking

# Mock http handlers - MSW
