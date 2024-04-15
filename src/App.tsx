import "react-native-gesture-handler";
import RNBootSplash from "react-native-bootsplash";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigationContainerRef } from "@react-navigation/native";

import { BottomTabNavigator } from "@navigators/BottomTabNavigator";
import { Debugger } from "@components/Debugger/Debugger";

function App() {
  const navigationContainerRef = useNavigationContainerRef();

  const onNavigationReady = () => {
    RNBootSplash.hide({ fade: true });
  };

  return (
    <>
      <Debugger />
      <NavigationContainer
        ref={navigationContainerRef}
        onReady={onNavigationReady}
      >
        <BottomTabNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
