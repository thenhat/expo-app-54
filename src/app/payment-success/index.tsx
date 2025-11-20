import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";
import { Link } from "expo-router";
const Payment_Success = require("@/assets/images/payment-success.png");

export default function PaymentSuccess() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
          <HeaderScreen title="결제완료" />
          <ScrollView>
            <View style={styles.container}>
              <Image source={Payment_Success} />
              <Text style={styles.title}>결제완료</Text>
              <Text style={styles.content}>홈페이지로 이동</Text>
            </View>

          </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 450,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    color: '#6350C3',
    fontWeight: '700'
  },
  title: {
    marginTop: 25,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 16,
  }
});
