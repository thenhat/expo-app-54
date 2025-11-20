import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoMachine from "@/components/payment/InfoMachine";
import Points from "@/components/payment/Points";
import CardOptions from "@/components/payment/CardOptions";
import Refund from "@/components/payment/Refund";
import Amount from "@/components/payment/Amount";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import HeaderScreen from "@/components/HeaderScreen";

export default function PaymentScreen() {
  const { id } = useLocalSearchParams();

  console.log("id payment:>> ", id);
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
          <HeaderScreen title="예약확인/결제하기" />
          <ScrollView>
            <InfoMachine />
            <Points />
            <Amount />
            <CardOptions />
            <Refund />
          </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
