import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

export {
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack initialRouteName="about">
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
