import { TouchableOpacity, View, Text } from "react-native";
import LeftIconArrow from "@/assets/icons/arrow-left-gray-22.svg";
import RightIconArrow from "@/assets/icons/arrow-right-gray-22.svg";
import { useState } from "react";

interface Props {
  onChange: (page: number) => void;
  totalPage: number;
}

const Panagition: React.FC<Props> = ({ totalPage = 1, onChange }) => {
  const [page, setPage] = useState(0);

  const handlePressPrev = () => {
    setPage((prev) => {
      const newPage = Math.max(prev - 1, 0);
      onChange(newPage);
      return newPage;
    });
  };
  const handlePressNext = () => {
    if (page < totalPage - 1) {
      setPage((prev) => {
        const newPage = prev + 1;
        onChange(newPage);
        return newPage;
      });
    }
  };
  return (
    <View>
      <View className="bg-[#F4F4F4] h-[8px] mx-[-16px]"></View>
      <View className="px-[16px] pb-[30px] pt-[20px] flex-row justify-between">
        <TouchableOpacity
          onPress={handlePressPrev}
          className={`flex-row items-center ${
            page === 0 ? "opacity-40" : "opacity-100"
          }`}
        >
          <LeftIconArrow width={22} height={22} />
          <Text className="uppercase text-[14px] text-[#999]">이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressNext}
          className={`flex-row items-center ${page < totalPage - 1 ? "opacity-100" : "opacity-40"}`}
        >
          <Text className="uppercase text-[14px] text-[#999]">다음</Text>
          <RightIconArrow width={22} height={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Panagition;
