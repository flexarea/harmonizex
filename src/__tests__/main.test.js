import { render } from "@testing-library/react";
import Home from "@/pages/susanIndex";

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<Home />);
  });
});
