import { Dimensions, ScrollView, StyleSheet, View, Image as RNImage } from "react-native";
import { Image, ImageLoadEventData } from 'expo-image';
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

const usagedetail1 = require("@/assets/images/usage/usage-detail-1.jpg");
const usagedetail2 = require("@/assets/images/usage/usage-detail-2.jpg");
const usagedetail3 = require("@/assets/images/usage/usage-detail-3.jpg");
const usagedetail4 = require("@/assets/images/usage/usage-detail-4.jpg");
const usagedetail5 = require("@/assets/images/usage/usage-detail-5.jpg");
const usagedetail6 = require("@/assets/images/usage/usage-detail-6.jpg");

export default function UsageDetailPage() {
  const { id } = useLocalSearchParams();
  const [imageHeight, setImageHeight] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const getImg = (id: any) => {
    switch (id) {
      case "washing":
        return usagedetail1;
      case "dryer":
        return usagedetail2;
      case "shoes-washing-drying":
        return usagedetail3;
      case "coupon":
        return usagedetail4;
      case "washing-drycleaning":
        return usagedetail5;
      case "dryer-drycleaning":
        return usagedetail6;
    }
  }

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
              source={getImg(id)}
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
    // Căn giữa ảnh nếu cần
    // alignItems: 'center',
  },
  // Không cần style aboutImage nữa
});