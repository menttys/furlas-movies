import "react-native-gesture-handler";
import { MMKV } from "react-native-mmkv";

import { MainStackNavigator } from "@navigators/";

export const storage = new MMKV();

function App() {
  return <MainStackNavigator />;
}

export default App;
