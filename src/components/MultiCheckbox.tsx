import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Use any icon library you prefer
import CheckEmptyIcon from "@/assets/icons/check-empty.svg";
import CheckBoldIcon from "@/assets/icons/check-bold.svg";

export type Item = {
  id: string;
  label: string;
};

type MultiCheckboxProps = {
  label: string;
  items: Item[];
  onChange: (selectedItems: string[]) => void;
  errors?: any;
  touched?: any;
};

const MultiCheckbox: React.FC<MultiCheckboxProps> = ({
  items,
  label,
  errors,
  touched,
  onChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const toggleItem = (id: string) => {
    let updatedSelected: string[];
    if (selectedItems.includes(id)) {
      updatedSelected = selectedItems.filter((item) => item !== id);
    } else {
      updatedSelected = [...selectedItems, id];
    }
    setSelectedItems(updatedSelected);
    setIsAllChecked(updatedSelected.length === items.length);
    onChange(updatedSelected);
  };

  const toggleAll = () => {
    if (isAllChecked) {
      setSelectedItems([]);
      setIsAllChecked(false);
      onChange([]);
    } else {
      const allIds = items.map((item) => item.id);
      setSelectedItems(allIds);
      setIsAllChecked(true);
      onChange(allIds);
    }
  };

  return (
    <View className="w-full">
      {/* Check All */}
      <TouchableOpacity
        className="flex-row items-center space-x-2 mb-2"
        onPress={toggleAll}
      >
        {isAllChecked ? <CheckBoldIcon /> : <CheckEmptyIcon />}
        <Text
          className={`text-[14px] font-defaultMedium ${isAllChecked ? "text-[#222]" : "text-[#888]"}`}
        >
          {label}
        </Text>
      </TouchableOpacity>

      {/* Items */}
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          className="flex-row items-center space-x-2 ml-6 mb-2"
          onPress={() => toggleItem(item.id)}
        >
          {selectedItems.includes(item.id) ? (
            <CheckBoldIcon />
          ) : (
            <CheckEmptyIcon />
          )}
          <Text
            className={`text-[14px] font-defaultMedium ${selectedItems.includes(item.id) ? "text-[#222]" : "text-[#888]"}`}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
      {touched && errors && (
        <Text className="text-[#DF1519] text-[13px] mt-[8px]">{errors}</Text>
      )}
    </View>
  );
};

export default MultiCheckbox;
