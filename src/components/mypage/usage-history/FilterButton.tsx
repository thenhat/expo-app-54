import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import VectorIcon from "@/assets/icons/my/Vector.svg";
import WindIcon from "@/assets/icons/my/Wind.svg";
import StoreIcon from "@/assets/icons/my/Store.svg";

interface FilterProps {
  onFilterChange?: (selectedFilterId: string) => void;
  active?: string;
}

interface FilterOption {
  id: string;
  filter: string;
  icon: React.ReactNode;
  activeColor: string;
}

const filterOptions: FilterOption[] = [
  {
    id: "TYPE_A",
    filter: "일반세탁",
    icon: <VectorIcon />,
    activeColor: "bg-blue15",
  },
  {
    id: "TYPE_B",
    filter: "드라이클리닝",
    icon: <WindIcon />,
    activeColor: "bg-green15",
  },
  {
    id: "TYPE_C",
    filter: "주변가게",
    icon: <StoreIcon />,
    activeColor: "bg-pink1",
  },
];

const FilterButton: React.FC<FilterProps> = ({ onFilterChange, active }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(
    filterOptions[0].id
  );

  useEffect(() => {
    active && setSelectedFilter(active);
  }, [active]);

  const handlePress = (id: string) => {
    setSelectedFilter(id);
    onFilterChange?.(id);
  };

  return (
    <View className="flex-row gap-[10px] justify-between">
      {filterOptions.map(({ id, filter, icon, activeColor }) => (
        <TouchableOpacity
          key={id}
          onPress={() => handlePress(id)}
          className={`flex-row items-center justify-center flex-1 px-[15px] rounded-full border border-[#E1E1E1] h-[32px] ${selectedFilter === id ? `${activeColor} border-[#888888]` : ""
            }`}
        >
          <View className="mr-2">{icon}</View>
          <Text className="text-[#222222] text-[14px] font-defaultSemiBold">
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterButton;
