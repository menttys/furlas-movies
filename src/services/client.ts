import Axios, { AxiosPromise } from "axios";
import Config from "react-native-config";
import { MovieResponse, MovieDetails } from "@/types/client";

const client = Axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    Authorization: `Bearer ${Config.TOKEN}`,
  },
});

export const getPopularMovies = (): AxiosPromise<MovieResponse> =>
  client.get("movie/popular");
export const getMovie = (id: string): AxiosPromise<MovieDetails> =>
  client.get(`movie/${id}`);
