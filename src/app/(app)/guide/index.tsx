import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ImageLoadEventData } from 'expo-image'; // Import thêm ImageLoadEventData
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";
import { useState } from "react"; // Import lại useState
import { useLocalSearchParams } from "expo-router";

const hdsd_wash = require("@/assets/images/hdsd-wash.jpg");
const hdsd_wash_cleaning = require("@/assets/images/hdsd-wash-cleaning.jpg");

export default function GuideScreen() {
  const screenWidth = Dimensions.get('window').width;
  const [imageHeight, setImageHeight] = useState(0);
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
              source={isCleaning ? hdsd_wash_cleaning : hdsd_wash}
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
