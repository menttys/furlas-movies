import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

import type { Route } from "@react-navigation/native";

export const getLabel = (options: BottomTabNavigationOptions, route: Route<string>) => {
  if (options.tabBarLabel !== undefined) {
    return options.tabBarLabel;
  }

  if (options.title !== undefined) {
    return options.title;
  }

  return route.name;
};
