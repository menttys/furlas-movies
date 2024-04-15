import { fireEvent, render, screen } from "@testing-library/react-native";
import * as useFetchFn from "@hooks/useFetch";
import { MovieList } from "../MovieList";

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

jest.spyOn(useFetchFn, "useFetch").mockImplementation(() => ({
  data: {
    results: movieMocksResults,
  },
  loading: false,
  error: null,
}));

const navigation = {
  navigate: jest.fn,
};

jest.spyOn(navigation, "navigate");

describe("MovieList", () => {
  test("renders the right number of movies", async () => {
    render(<MovieList navigation={navigation} />);

    await screen.getByText(movieMocksResults[0].title);

    expect(screen.getAllByRole("button")).toHaveLength(movieMocksResults.length);
  });

  test("should render titles and images on buttons", async () => {
    render(<MovieList navigation={navigation} />);

    await movieMocksResults.map((movie) => {
      expect(screen.getByText(movie.title)).toBeTruthy();
    });
  });

  test("should navigate", async () => {
    render(<MovieList navigation={navigation} />);

    fireEvent.press(screen.getByText(movieMocksResults[1].title));

    expect(navigation.navigate).toHaveBeenCalledWith("MovieDetail", {
      id: movieMocksResults[1].id,
    });
  });
});
