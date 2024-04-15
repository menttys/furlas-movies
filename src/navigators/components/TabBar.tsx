import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { BottomTabBarProps as RNBottomTabBarProps } from "@react-navigation/bottom-tabs";

import { getLabel } from "@utils/index";
import MovieFolder from "@assets/svg/movie-folder.svg";
import MovieRoll from "@assets/svg/movie-roll.svg";

import { BOTTOM_TAB_ROUTES } from "../BottomTabNavigator";

const getIcon = (label: BOTTOM_TAB_ROUTES, color: string) => {
  switch (label) {
    case BOTTOM_TAB_ROUTES.movie_list:
      return <MovieRoll style={{ color: color }} />;
    case BOTTOM_TAB_ROUTES.fav:
      return <MovieFolder style={{ color: color }} />;
    default:
      return <MovieFolder />;
  }
};

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: RNBottomTabBarProps) => (
  <View style={styles(false).Tab}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label = getLabel(options, route);

      const isFocused = state.index === index;

      const onPress = () => {
        if (!isFocused) {
          navigation.navigate(route.name, route.params);
        }
      };

      const { container, icon, labelText } = styles(isFocused);

      return (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          onPress={onPress}
          style={container}
          key={route.key}
        >
          <>
            <View style={icon}>
              {getIcon(
                label as BOTTOM_TAB_ROUTES,
                isFocused ? "#3602b9" : "#01083a",
              )}
            </View>
            <Text style={labelText}>{label.toString()}</Text>
          </>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = (isFocused: boolean) =>
  StyleSheet.create({
    Tab: {
      flexDirection: "row",
      height: 80,
      backgroundColor: "#fff",
      shadowColor: "#01083a",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 2,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      height: 24,
      width: 16,
    },
    labelText: {
      fontSize: 12,
      color: isFocused ? "#3602b9" : "#01083a",
      fontWeight: isFocused ? "600" : "400",
    },
  });
