import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoMachine from "@/components/payment/InfoMachine";
import Status from "@/components/payment/Status";
import Amount from "@/components/payment/Amount";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";

export default function MachineDetailPage() {
  const { id } = useLocalSearchParams();

  const status = "complete";
  // console.log("id :>> ", id);
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
          <HeaderScreen title="결제완료" />
          <ScrollView>
            <InfoMachine />
            <Amount />
            <Status status={status} />
          </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
