import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MovieDetail } from "@/screens/MovieDetails/MovieDetail";
import { BottomTabNavigator } from "./BottomTabNavigator";

import type { Movie } from "../types/client";

export enum MAIN_STACK_ROUTES {
  BottomTabNavigation = "BottomTabNavigation",
  MovieDetail = "MovieDetail",
}
export type paramsList = {
  [MAIN_STACK_ROUTES.BottomTabNavigation]: undefined;
  [MAIN_STACK_ROUTES.MovieDetail]: { id: Movie["id"] };
};

const StackNavigator = createNativeStackNavigator<paramsList>();

export const MainStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={MAIN_STACK_ROUTES.BottomTabNavigation}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
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
