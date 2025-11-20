import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ImageCarouselProps {
  items: any[];
}
const { width } = useWindowDimensions();
const renderItem = ({ item }: any) => {
  return (
    <View
      key={item?.id}
      style={{
        width: "100%",
        height: 220,
      }}
    >
      <View className="mr-[10px]">
        <View className="mb-[10px]">
          <Image
            source={{
              uri: item?.image,
            }}
            style={{ width: "100%", height: 115, objectFit: "cover" }}
          />
        </View>
        <View>
          <Text className="text-[15px] leading-[20px] font-semibold">
            {item?.title}
          </Text>
          <Text
            style={{
              color: "#888",
              fontSize: 14,
              fontFamily: "montserrat400",
            }}
          >
            <RenderHTML
              contentWidth={width}
              source={{ html: item?.content }}
              tagsStyles={tagsStyles}
            />
          </Text>
        </View>
      </View>
    </View>
  );
};

const EventCarousel: React.FC<ImageCarouselProps> = ({ items }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleDotPress = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* ScrollView Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {items.map((item, index) => (
          <View
            key={item?.id}
            style={{
              width: "100%",
              height: 220,
            }}
          >
            <View className="mr-[10px]">
              <View className="mb-[10px]">
                <Image
                  source={{
                    uri: item?.image,
                  }}
                  style={{ width: "100%", height: 115, objectFit: "cover" }}
                />
              </View>
              <View>
                <Text className="text-[15px] leading-[20px] font-semibold">
                  {item?.title}
                </Text>
                <Text
                  style={{
                    color: "#888",
                    fontSize: 14,
                    fontFamily: "montserrat400",
                  }}
                >
                  <RenderHTML
                    contentWidth={width}
                    source={{ html: item?.content }}
                    tagsStyles={tagsStyles}
                  />
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Custom Pagination */}
      <View style={styles.pagination}>
        {items.map((_, i) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [
              (i - 1) * SCREEN_WIDTH,
              i * SCREEN_WIDTH,
              (i + 1) * SCREEN_WIDTH,
            ],
            outputRange: [7, 30, 7],
            extrapolate: "clamp",
          });

          const dotOpacity = scrollX.interpolate({
            inputRange: [
              (i - 1) * SCREEN_WIDTH,
              i * SCREEN_WIDTH,
              (i + 1) * SCREEN_WIDTH,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <TouchableOpacity key={i} onPress={() => handleDotPress(i)}>
              <Animated.View
                style={[styles.dot, { width: dotWidth, opacity: dotOpacity }]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default EventCarousel;

const tagsStyles = {
  div: {
    color: "#888",
    fontSize: 15,
    fontFamily: "montserrat500",
  },
  p: {
    color: "#888",
    fontSize: 15,
    fontFamily: "montserrat500",
  },
};

const styles = StyleSheet.create({
  container: {
    height: 251,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    position: "absolute",
    bottom: 12,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    backgroundColor: "#FFFFFF",
    height: 7,
    borderRadius: 7,
    marginHorizontal: 3,
  },
});
