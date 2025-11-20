import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import ChevronDownIcon from "@/assets/images/svgs/chevron-down.svg";
import formatNumbers from "@/utils/format";

type SelectItemType = {
  value: string;
  label: React.ReactNode;
  price?: any,
};

type SelectBoxProps = {
  value: any;
  label?: string;
  options: Array<SelectItemType>;
  onSelect: Function;
  placeholder?: string;
  mode?: "default" | "none"
  zIndex?: number
  border?: boolean
};

const SelectPriceBox = ({
  value,
  label,
  options = [],
  onSelect,
  placeholder,
  mode = "default",
  zIndex = 10,
  border = false,
}: SelectBoxProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // const [selectedItem, setSelectedItem] = useState<SelectItemType>();
  const arrowAnimation = useRef(new Animated.Value(0)).current; // Initial animation value  

  // Function to toggle dropdown and animate the arrow
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);

    // Start arrow animation
    Animated.timing(arrowAnimation, {
      toValue: isDropdownVisible ? 0 : 1, // Rotate back (0) or forward (1)
      duration: 200,
      useNativeDriver: true, // Optimize animation
    }).start();
  };

  const onBlur = () => {
    setIsDropdownVisible((prev) => false);

    // Start arrow animation
    Animated.timing(arrowAnimation, {
      toValue: isDropdownVisible ? 0 : 1, // Rotate back (0) or forward (1)
      duration: 200,
      useNativeDriver: true, // Optimize animation
    }).start();
  };

  // Rotate animation interpolation
  const rotateArrow = arrowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"], // Rotate from 0° to 180°
  });

  const handleSelect = (item: any) => {
    onSelect(item);
    toggleDropdown();
  };

  return (
    <View style={[styles.container, border ? styles.borderBottom : {}, { zIndex: zIndex }]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {/* Dropdown button */}
      <Pressable
        style={{
          ...styles.dropdownButton,
          borderBottomColor: isDropdownVisible ? "#222" : "#DADADA",
          borderBottomWidth: mode === "default" ? 1 : 0,
          height: label && label === "" ? 32 : 50
        }}
        onPress={toggleDropdown}
      // onBlur={onBlur}
      >
        <Text style={styles.dropdownButtonText}>
          {value?.label || placeholder}
        </Text>
        {(value?.price || value?.price === 0) && <Text style={styles.price}>{formatNumbers(value?.price)}</Text>}
        <Animated.View style={{ transform: [{ rotate: rotateArrow }] }}>
          <ChevronDownIcon />
        </Animated.View>
      </Pressable>

      {/* Dropdown Modal */}
      {isDropdownVisible && (
        <View style={{ ...styles.dropdown, top: mode === "none" ? 50 : 67 }}>
          <ScrollView nestedScrollEnabled={true}>
            {options?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownRow}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[
                    styles.dropdownRowText,
                    item.value === value?.value &&
                    styles.selectedRowText,
                  ]}
                >
                  {item.label}
                </Text>

                {(value?.price || value?.price === 0) && <Text style={styles.price}>{formatNumbers(item?.price)}</Text>}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#DADADA'
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: -10,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: "#222222",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    gap: 8
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
  },
  placeholderButtonText: {
    fontSize: 16,
    color: "#888",
  },
  dropdownIcon: {
    fontSize: 16,
    color: "#777",
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    minWidth: 90,
    top: 67,
    paddingVertical: 6,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    maxHeight: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 99,
  },
  dropdownRow: {
    padding: 5,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dropdownRowText: {
    fontSize: 16,
    color: "#777",
  },
  selectedRowText: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default SelectPriceBox;
