import { render, screen } from "@testing-library/react";
import Home from "@/pages/susanIndex";

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<Home />);
  });

  test("Check if Home component contains specific text", () => {
    render(<Home />);
    const linkElement = screen.getByText(/specific text/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Check if Home component has a button", () => {
    render(<Home />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test("Check if Home component matches snapshot", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});

// We recommend installing an extension to run jest tests.
