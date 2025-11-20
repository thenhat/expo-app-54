import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";
const HOCL = require("@/assets/images/HOCL.png");

export default function AboutScreen() {

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
        <HeaderScreen title="" />
        <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: "#fff" }}>
          <View style={styles.container}>
            <Image source={HOCL} resizeMode={'stretch'} style={styles.aboutImage} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  aboutImage: {
    width: '100%',
    height:1100
  }
});
