import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";
import { StyleSheet } from "react-native";

export default function PaymentFailed() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
          <HeaderScreen title="결제완료" backUrl={'/'} />
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>Payment Failed</Text>
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
