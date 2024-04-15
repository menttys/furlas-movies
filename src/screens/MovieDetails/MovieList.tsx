import React from "react";
import { Text, View } from "react-native";

import { useFetch } from "@hooks/useFetch";
import { getPopularMovies } from "@services/client";
import { ListOfMovies } from "@components/ListOfMovies/ListOfMovies";

import type { MovieResponse, Movie } from "../../types/client";

export const MOVIE_LIST_TEST_ID = "movielist-test-id";
export const BUTTON_A11Y_LABEL = "movie button to:";

export const MovieList = () => {
  const { data, loading, error } = useFetch<MovieResponse>(() =>
    getPopularMovies(),
  );

  if (error) {
    return (
      <View>
        <Text>{`Error: not sure but something weird happened`}</Text>
      </View>
    );
  }

  return <ListOfMovies data={data?.results} loading={loading} />;
};
