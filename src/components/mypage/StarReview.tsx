import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface ReviewProps {
  onStarChange?: (star: number) => void;
  starBold: any;
  emptyStar: any;
  defaultStar: number;
  starSpacing?: number;
}

const StarReview: React.FC<ReviewProps> = ({
  onStarChange,
  starBold,
  emptyStar,
  defaultStar,
  starSpacing = 4,
}) => {
  const [selectedStars, setSelectedStars] = useState<number>(defaultStar);

  const handleStarPress = (star: number) => {
    setSelectedStars(star);
    onStarChange?.(star);
  };

  const renderStar = (star: number, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => handleStarPress(star)}
        key={star}
        className="p-1"
      >
        <View>{star <= selectedStars ? starBold : emptyStar}</View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-row items-center">
      {Array.from({ length: 5 }, (_, index) => (
        <View
          key={index}
          style={{
            marginRight: index < 4 ? starSpacing : 0,
          }}
        >
          {renderStar(index + 1, index)}
        </View>
      ))}
    </View>
  );
};

export default StarReview;
