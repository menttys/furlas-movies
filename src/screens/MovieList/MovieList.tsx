import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Poster } from "@components/Poster";
import { useFetch } from "@hooks/useFetch";
import { paramsList, MAIN_STACK_ROUTES } from "@navigators/MainStackNavigator";
import { getPopularMovies } from "@services/client";

import type { MovieResponse, Movie } from "../../types/client";
import { LoadingState } from "./components/LoadingState";

export const MOVIE_LIST_TEST_ID = "movielist-test-id";
export const BUTTON_A11Y_LABEL = "movie button to:";

export const MovieList = ({ navigation }: NativeStackScreenProps<paramsList>) => {
  const { data, loading, error } = useFetch<MovieResponse>(() => getPopularMovies());

  const handleClick = (id: string) => {
    navigation.navigate(MAIN_STACK_ROUTES.MovieDetail, { id: id });
  };
  const renderItem = useCallback(
    ({ item: { id, title, poster_path } }: { item: Movie }) => (
      <Pressable
        style={styles.row}
        onPress={() => handleClick(id)}
        aria-label={`${BUTTON_A11Y_LABEL} ${title}`}
        role="button"
      >
        <Poster style={styles.image} poster_path={poster_path} />
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    ),
    [handleClick],
  );

  const keyExtractor = useCallback((item: Movie) => {
    return item.id;
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <FlatList
      data={data?.results}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      testID={MOVIE_LIST_TEST_ID}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "white",
    marginHorizontal: 10,
    alignItems: "center",
  },
  container: {
    marginHorizontal: 10,
    backgroundColor: "grey",
  },
  image: {
    width: 70,
    height: 100,
  },
  text: {
    marginHorizontal: 10,
  },
});
