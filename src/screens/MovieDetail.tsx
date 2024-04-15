import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { Poster } from "@components/Poster";
import { useFetch } from "@hooks/index";
import { paramsList, MAIN_STACK_ROUTES } from "@navigators/MainStackNavigator";
import { getMovie } from "@services/client";
import { FlexShrink } from "@components/Spacing";

import type { MovieDetails } from "../types/client";

export const MovieDetail = ({
  route,
}: NativeStackScreenProps<paramsList, MAIN_STACK_ROUTES.MovieDetail>) => {
  const { setOptions } = useNavigation();
  const { id } = route.params;
  const { data: movie, loading, error } = useFetch<MovieDetails>(() => getMovie(id));
  const { bottom } = useSafeAreaInsets();
  const { movieContainer, poster, overview, releaseTag, screenBackground } = styles(bottom);

  React.useEffect(() => {
    if (!movie) {
      return;
    }
    setOptions({
      title: movie.original_title,
    });
  }, [movie]);

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

  return (
    <>
      <Image
        source={require("../../assets/images/background.jpg")}
        style={screenBackground}
        resizeMode="repeat"
      />

      <ScrollView contentContainerStyle={movieContainer}>
        <Text style={releaseTag}>{movie?.status}</Text>
        <FlexShrink basis={16} />
        <Text style={overview}>{movie?.overview}</Text>
        <FlexShrink basis={24} />
        <Poster style={poster} poster_path={movie.poster_path} resizeMode="contain" />
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
  });
