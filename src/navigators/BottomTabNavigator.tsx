import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Favourite } from "@screens/Favourites";
import { MainStackNavigator } from "./MainStackNavigator";
import { TabBar } from "./components/TabBar";

export enum BOTTOM_TAB_ROUTES {
  movie_list = "Movie list",
  fav = "favourites",
}

export type bottomTabParamsList = {
  [BOTTOM_TAB_ROUTES.movie_list]: undefined;
  [BOTTOM_TAB_ROUTES.fav]: undefined;
};

const Tab = createBottomTabNavigator<bottomTabParamsList>();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name={BOTTOM_TAB_ROUTES.movie_list}
        component={MainStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name={BOTTOM_TAB_ROUTES.fav} component={Favourite} />
    </Tab.Navigator>
  );
}
