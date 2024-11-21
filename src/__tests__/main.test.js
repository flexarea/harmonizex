import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import MainPage from "../components/MainPage";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("MainPage Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: mockPush,
      pathname: "/",
      query: {},
    });
  });

  test("renders correctly", () => {
    const currentUser = { id: "1", name: "Jane Doe", age: 25 };

    render(<MainPage currentUser={currentUser} />);

    expect(screen.getByText(/Welcome, Jane Doe!/i)).toBeInTheDocument();
  });

  test("navigates to the swipe page on button click", () => {
    const currentUser = { id: "1", name: "Susan", age: 25 };

    render(<MainPage currentUser={currentUser} />);

    const swipeButton = screen.getByRole("button", { name: /Start Swiping/i });
    fireEvent.click(swipeButton);

    expect(mockPush).toHaveBeenCalledWith("/swipe");
  });
});
