import { fireEvent, render, screen } from "@testing-library/react-native";
import * as useFetchFn from "@hooks/useFetch";

import { ListOfMovies } from "../ListOfMovies";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock("@react-navigation/native-stack", () => ({
  createNativeStackNavigator: () => jest.fn,
}));

jest.mock("@react-navigation/bottom-tabs", () => ({
  createBottomTabNavigator: () => jest.fn,
}));

jest.spyOn(useFetchFn, "useFetch").mockImplementation(() => ({
  data: {
    results: movieMocksResults,
  },
  loading: false,
  error: null,
}));

const movieMocksResults = [
  {
    id: "0",
    title: "Star Wars",
    poster_path: "the new one",
  },
  {
    id: "1",
    title: "The last samuarai",
    poster_path: "the one with the sword",
  },
  {
    id: "2",
    title: "Wall-e",
    poster_path: "the cool robot one",
  },
];

describe("MovieList", () => {
  test("renders the right number of movies", async () => {
    render(<ListOfMovies data={movieMocksResults} loading={false} />);

    await screen.getByText(movieMocksResults[0].title);

    expect(screen.getAllByRole("button")).toHaveLength(
      movieMocksResults.length,
    );
  });

  test("should render titles and images on buttons", async () => {
    render(<ListOfMovies data={movieMocksResults} loading={false} />);

    await movieMocksResults.map((movie) => {
      expect(screen.getByText(movie.title)).toBeTruthy();
    });
  });

  test("should navigate", async () => {
    render(<ListOfMovies data={movieMocksResults} loading={false} />);

    fireEvent.press(screen.getByText(movieMocksResults[1].title));

    expect(mockNavigate).toHaveBeenCalledWith("MovieDetail", { id: "1" });
  });
});
