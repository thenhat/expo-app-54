import { Stack } from "expo-router";
export default function SroreLayout() {
  return (
    <Stack
      initialRouteName="find-store"
      screenOptions={{ headerShown: false }}
    />
  );
}
