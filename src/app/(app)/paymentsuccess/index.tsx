import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";

export default function PaymentSuccess() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
          <HeaderScreen title="예약확인/결제하기" />
          <ScrollView>
            <Text>Payment Success</Text>
          </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
