import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DiamondIcon from "@/assets/images/svgs/diamond-icon.svg";
import CalendarIcon from "@/assets/images/svgs/calendar-icon.svg";

interface PlaceItemProps {
  isPremium?: boolean;
  title: string;
  status: "영업중" | "닫힘";
  rating: number;
  reviewsCount: number;
  images: string[];
  onFavoritePress: () => void;
  showDetail: () => void;
  isFavorited: boolean;
}

const TagComponent: React.FC<{ tag: 0 | 1 }> = ({ tag }) => {
  if (tag === 0) {
    return (
      <View style={{ ...styles.badge, backgroundColor: "#FFF2DE" }}>
        <DiamondIcon />
        <Text style={styles.badgeText}>캐시매장</Text>
      </View>
    );
  }

  return (
    <View style={{ ...styles.badge, backgroundColor: "#E7FFEF" }}>
      <CalendarIcon />
      <Text style={styles.badgeText}>이벤트</Text>
    </View>
  );
};

const PlaceItem: React.FC<PlaceItemProps> = ({
  isPremium = false,
  title,
  status,
  rating,
  reviewsCount,
  images,
  onFavoritePress,
  showDetail,
  isFavorited,
}) => {
  return (
    <View style={styles.container}>
      {/* Premium Badge */}
      <View style={styles.tags}>
        <TagComponent tag={0} />
        <TagComponent tag={1} />
      </View>

      {/* Title and Actions */}
      <View style={styles.header}>
        <View>
          <TouchableWithoutFeedback onPress={showDetail}><Text style={styles.title}>{title}</Text></TouchableWithoutFeedback>
          {/* Status, Rating, and Reviews */}
          <View style={styles.info}>
            <Text
              style={[
                styles.status,
                // status === "영업중" ? styles.open : styles.closed,
              ]}
            >
              {status}
            </Text>
            <Text style={styles.rating}>{rating} <AntDesign name="star" color={"#FFC529"} /></Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.reviews}>{`${reviewsCount} 리뷰`}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={onFavoritePress}>
          <Ionicons
            name={"heart-circle"}
            size={28}
            color={isFavorited ? "#F33571" : "#EDEDED"}
          />
        </TouchableOpacity>
      </View>

      {/* Image Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageCarousel}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={[styles.image, {marginLeft: !index ? 16 : 0}]} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 24,
    borderBottomWidth: 8,
    borderColor: "#F4F4F4" 
  },
  tags: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    marginBottom: 4,
    marginHorizontal: 16
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
    paddingHorizontal: 16,
    height: 28,
    borderRadius: 28,
  },
  badgeText: {
    lineHeight: 18.2,
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 19,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0A9EE8"
  },
  open: {
    color: "#4CAF50",
  },
  closed: {
    color: "#F44336",
  },
  rating: {
    fontSize: 13,
    color: "#222",
    marginLeft: 16,
    fontWeight: "600",
  },
  reviews: {
    fontSize: 12,
    color: "#888888",
  },
  dot: {
    marginHorizontal: 6,
    color: "#DADADA",
    fontSize: 22,
  },
  imageCarousel: {
    flexDirection: "row",
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 8,
    marginRight: 16,
  },
});

export default PlaceItem;
