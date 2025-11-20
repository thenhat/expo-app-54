import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Store from "@/components/appointment/store";
import OptionMap from "@/components/OptionMap";
import Guide from "@/components/drycleaning/Guide";
import LaundryTypes from "@/components/drycleaning/LaundryTypes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";

export default function DrycleaningScreen() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
          <HeaderScreen title="드라이클리닝" backUrl={'/'} />
          <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: "#fff" }}>
            <View style={styles.container}>
              <OptionMap />
              <Guide />
              <View style={styles.line} />
              <LaundryTypes />
            </View>
            {/* <Store /> */}
          </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  line: {
    backgroundColor: "#F4F4F4",
    height: 8,
  },
});
