import 'react-native-gesture-handler';
// @ts-ignore
import messaging from "expo-firebase-messaging";
import { Alert } from "react-native";
import Loading from "@/components/Loading";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAppSelector } from "@/store/hook";
import { isLoadingSelecter } from "@/store/slice/globalSlice";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import "react-native-reanimated";

function AppLayout() {
  const { colorScheme } = useColorScheme();
  const { isAuthenticated } = useAuthContext();
  const isLoading = useAppSelector(isLoadingSelecter);

  const shouldRedirect = React.useMemo(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
      return true;
    }
    return false;
  }, [isAuthenticated]);

  if (shouldRedirect) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {isLoading && <Loading />}
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerShown: false,
        }}
      >
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
      </Stack>
    </ThemeProvider>
    // </ModalProvider>
  );
}

export default AppLayout;
