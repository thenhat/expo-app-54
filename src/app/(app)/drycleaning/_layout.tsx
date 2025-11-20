import { Stack } from "expo-router";

export default function DrycleaningLayout() {
  return (
    <Stack
      initialRouteName="drycleaning"
      screenOptions={{ headerShown: false }}
    />
  );
}
