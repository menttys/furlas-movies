import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MovieDetail } from "@screens/MovieDetail";
import { MovieList } from "@screens/MovieDetails/MovieList";

import type { Movie } from "../types/client";

export enum MAIN_STACK_ROUTES {
  MovieList = "MovieList",
  MovieDetail = "MovieDetail",
}
export type paramsList = {
  [MAIN_STACK_ROUTES.MovieList]: undefined;
  [MAIN_STACK_ROUTES.MovieDetail]: { id: Movie["id"] };
};

const StackNavigator = createNativeStackNavigator<paramsList>();

export const MainStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={MAIN_STACK_ROUTES.MovieList}
        component={MovieList}
        options={{
          title: "Movies",
          headerBackTitleVisible: false,
        }}
      />
      <StackNavigator.Screen
        name={MAIN_STACK_ROUTES.MovieDetail}
        component={MovieDetail}
        options={{
          title: "",
          headerBackTitleVisible: false,
        }}
      />
    </StackNavigator.Navigator>
  );
};
