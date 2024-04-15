import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator } from "./MainStackNavigator";

export enum BOTTOM_TAB_ROUTES {
  main = "MovieList",
  saved = "Saved",
  search = "Search",
}

export type bottomTabParamsList = {
  [BOTTOM_TAB_ROUTES.main]: undefined;
  [BOTTOM_TAB_ROUTES.saved]: undefined;
  [BOTTOM_TAB_ROUTES.search]: undefined;
};

const Tab = createBottomTabNavigator<bottomTabParamsList>();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={BOTTOM_TAB_ROUTES.main} component={MainStackNavigator} />
      <Tab.Screen name={BOTTOM_TAB_ROUTES.saved} component={SecondTab} />
      <Tab.Screen name={BOTTOM_TAB_ROUTES.search} component={SearchTab} />
    </Tab.Navigator>
  );
}

const SecondTab = () => {
  return null;
};

const SearchTab = () => {
  return null;
};
