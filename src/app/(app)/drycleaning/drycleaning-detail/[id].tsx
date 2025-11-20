import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Business from "@/components/drycleaning/Business";
import HeaderScreen from "@/components/HeaderScreen";
import { useSelector } from "react-redux";

const MapImage = require("@/assets/images/map.png");

export default function DrycleaningDetailScreen() {
  const storeActive = useSelector((state: any) => state.store.storeActive);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
        <HeaderScreen title="예약하기" />
        <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: "#fff" }}>
          <SafeAreaView className="flex-1 pt-2 items-center justify-start bg-white dark:bg-black">
            <View style={styles.container}>
              <View style={styles.info}>
                <View style={styles.infoText}>
                  <Text style={styles.titleText}>{storeActive?.name}</Text>
                  <Text style={styles.desText}>{storeActive?.address?.value}</Text>
                </View>
                <Image source={MapImage} style={styles.imageMap} />
              </View>

              <Business />
            </View>
            {/* <Store /> */}
          </SafeAreaView>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  info: {
    backgroundColor: "#2F265D",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoText: {
    width: "61%",
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
  },
  titleText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 26,
  },
  desText: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 19.5,
    marginTop: 4,
  },
  imageMap: {
    marginTop: 9,
    marginRight: 10,
    width: 115,
    height: 115,
  },

  line: {
    backgroundColor: "#F4F4F4",
    height: 8,
  },
});
