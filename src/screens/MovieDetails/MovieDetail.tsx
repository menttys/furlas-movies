import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { storageNames } from "@constants/index";
import { Poster } from "@components/Poster";
import { FlexShrink } from "@components/Spacing";
import { useFetch, useStorage } from "@hooks/index";
import { paramsList, MAIN_STACK_ROUTES } from "@navigators/MainStackNavigator";
import { getMovie } from "@services/client";

import type { MovieDetails } from "../../types/client";

export const MovieDetail = ({
  route,
}: NativeStackScreenProps<paramsList, MAIN_STACK_ROUTES.MovieDetail>) => {
  const { setOptions } = useNavigation();
  const { id } = route.params;

  const {
    data: movie,
    loading,
    error,
  } = useFetch<MovieDetails>(() => getMovie(id));

  const { bottom } = useSafeAreaInsets();
  const { setListItems, getListItem, removeItemFromList } = useStorage();

  const [isMovieInfavourites, setIsMovieInfavourites] =
    useState<boolean>(false);

  const {
    favouriteButton,
    poster,
    overview,
    overviewHeader,
    movieContainer,
    releaseTag,
    screenBackground,
  } = styles(bottom);

  useEffect(() => {
    if (!movie) {
      return;
    }
    setOptions({
      title: movie.title,
    });
  }, [movie]);

  useEffect(() => {
    const isItemInFav = getListItem(storageNames.favourites, +id);
    if (isItemInFav) {
      setIsMovieInfavourites(true);
    }
  }, []);

  if (loading) {
    <View>
      <Text>Loading</Text>
    </View>;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  if (!movie) {
    return <Text>Movie not found: something really weird happened</Text>;
  }

  const handleAddTofavourites = () => {
    setIsMovieInfavourites(true);
    setListItems(storageNames.favourites, {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    });
  };

  const handleRemoveFromfavourites = () => {
    if (!isMovieInfavourites) {
      return;
    }
    setIsMovieInfavourites(false);
    removeItemFromList(storageNames.favourites, movie.id);
  };

  return (
    <>
      <Image
        source={require("@assets/images/background.jpg")}
        style={screenBackground}
        resizeMode="repeat"
      />

      <ScrollView contentContainerStyle={movieContainer}>
        <View style={overviewHeader}>
          <TouchableHighlight
            onPress={handleAddTofavourites}
            onLongPress={handleRemoveFromfavourites}
            underlayColor="#3602b9d3"
            style={{ borderRadius: 8, backgroundColor: "#3602b9" }}
          >
            <Text style={[favouriteButton]}>
              {isMovieInfavourites ? "♥" : "♡"}
            </Text>
          </TouchableHighlight>
          <Text style={releaseTag}>{movie?.status}</Text>
        </View>
        <FlexShrink basis={16} />
        <Text style={overview}>{movie?.overview}</Text>
        <FlexShrink basis={24} />
        <Poster
          style={poster}
          poster_path={movie.poster_path}
          resizeMode="contain"
        />
      </ScrollView>
    </>
  );
};

const styles = (bottom: number) =>
  StyleSheet.create({
    screenBackground: {
      width: "100%",
      height: "100%",
      opacity: 0.05,
      position: "absolute",
    },
    movieContainer: {
      flex: 1,
      width: "100%",
      marginBottom: bottom,
      padding: 24,

      alignItems: "center",
    },
    overviewHeader: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    poster: {
      width: "80%",
      height: "40%",
      marginBottom: 8,
    },
    overview: {
      fontSize: 16,
      lineHeight: 22,
      textAlign: "left",
      color: "#494a4e",
      marginBottom: 8,
    },
    releaseTag: {
      fontSize: 12,
      textAlign: "center",
      alignSelf: "flex-end",
      color: "#1c1d1f",
      backgroundColor: "#f4d259",
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      overflow: "hidden",
    },
    favouriteButton: {
      fontSize: 24,
      color: "white",
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });
