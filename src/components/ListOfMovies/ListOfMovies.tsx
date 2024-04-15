import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, Pressable } from "react-native";
import {
  useNavigation,
  NavigationProp,
  CompositeNavigationProp,
} from "@react-navigation/native";

import { Poster } from "@components/Poster";
import { MAIN_STACK_ROUTES, paramsList } from "@navigators/MainStackNavigator";

import { LoadingState } from "./components/LoadingState";
import type { Movie } from "../../types/client";

export const MOVIE_LIST_TEST_ID = "movielist-test-id";
export const BUTTON_A11Y_LABEL = "movie button to:";

type CompositeNavigationPropNavigationProp = CompositeNavigationProp<
  NavigationProp<paramsList, MAIN_STACK_ROUTES.MovieList>,
  NavigationProp<paramsList>
>;

type ListOfMoviesProps = {
  data?: Movie[];
  loading: boolean;
};

export const ListOfMovies = ({ data, loading }: ListOfMoviesProps) => {
  const { navigate } = useNavigation<CompositeNavigationPropNavigationProp>();

  const keyExtractor = useCallback((item: Movie) => {
    return item.id;
  }, []);

  const handleClick = (id: string) => {
    navigate(MAIN_STACK_ROUTES.MovieDetail, { id: id });
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

  if (loading) {
    return <LoadingState />;
  }

  return (
    <FlatList
      data={data}
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
  image: {
    width: 70,
    height: 100,
  },
  text: {
    marginHorizontal: 10,
  },
});
