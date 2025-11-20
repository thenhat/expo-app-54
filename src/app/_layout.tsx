import 'react-native-gesture-handler';
import 'global.css';
import { AuthProvider } from "@/contexts/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext";
import store from "@/store/store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};
export default function Root() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    montserrat700: require("../assets/fonts/Montserrat-Bold.ttf"),
    montserrat600: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    montserrat500: require("../assets/fonts/Montserrat-Medium.ttf"),
    montserrat400: require("../assets/fonts/Montserrat-Regular.ttf"),
    oswald600: require("../assets/fonts/Oswald-SemiBold.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <ModalProvider>
          <Slot />
        </ModalProvider>
      </AuthProvider>
    </Provider>
  );
}
