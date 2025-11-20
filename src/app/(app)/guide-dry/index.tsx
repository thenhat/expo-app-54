import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ImageLoadEventData } from 'expo-image';

import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

const hdsd_dry = require("@/assets/images/hdsd-dry.jpg");
const hdsd_dry_cleaning = require("@/assets/images/hdsd-dry-cleaning.jpg");

export default function GuideDryScreen() {
  const [imageHeight, setImageHeight] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const { cleaning } = useLocalSearchParams<{ cleaning?: string }>();
  const isCleaning = cleaning === 'true';

  const onImageLoad = (event: ImageLoadEventData) => {
    const { width, height } = event.source;
    const aspectRatio = height / width;
    setImageHeight(screenWidth * aspectRatio);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
        <HeaderScreen title="" />
        <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: "#fff" }}>
          <View style={styles.container}>
            <Image
              source={isCleaning ? hdsd_dry_cleaning : hdsd_dry}
              style={{
                width: screenWidth,
                height: imageHeight || 300,
              }}
              contentFit="cover"
              onLoad={onImageLoad}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
