import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Store from "@/components/appointment/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import HeaderScreen from "@/components/HeaderScreen";

export default function AppointmentScreen() {
  const { type }: any = useLocalSearchParams<{ user: string }>();

  const isBooking = (type === "BOOKING") || (type === "DRY_BOOKING");
  const isPayment = (type === "PAYMENT") || type === "DRYCLEANING";
  const isDryCleaning = (type === "DRYCLEANING");

  const renderTitle = () => {
    if (isBooking) return '예약';
    if (isDryCleaning) return '드라이클리닝결제';
    if (isPayment) return '일반세탁결제';
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
        <HeaderScreen title={renderTitle()} backUrl={'/'}/>
          <ScrollView>
            <Store />
          </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
