import { Stack } from "expo-router";
import "react-native-reanimated";

export default function AppointmentLayout() {
  return (
    <Stack
      initialRouteName="appointment"
      screenOptions={{ headerShown: false }}
    />
  );
}
