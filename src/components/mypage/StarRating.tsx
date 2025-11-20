import StarEmpty from "@/assets/icons/my/Star-14-Gray.svg";
import StarBold from "@/assets/icons/my/Star-14-Violet.svg";
import React from "react";
import { View } from "react-native";

type StarRatingProps = {
  rating: 1 | 2 | 3 | 4 | 5;
};

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <View className="flex flex-row items-center gap-[3px]">
      {stars.map((isFilled, index) => (
        <View key={index}>{isFilled ? <StarBold /> : <StarEmpty />}</View>
      ))}
    </View>
  );
};

export default StarRating;
