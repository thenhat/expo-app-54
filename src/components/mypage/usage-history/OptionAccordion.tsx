import React, { useState } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation } from "react-native";
import IconUp from "@/assets/icons/chevron-up.svg";
import IconDown from "@/assets/icons/chevron-down.svg";

interface AccordionProps {
  data: any;
}

const OptionAccordion: React.FC<AccordionProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="py-2">
      <TouchableOpacity
        className="flex-row justify-between items-center"
        onPress={toggleAccordion}
      >
        <Text className="text-[#222222] text-[14px] font-defaultRegular">
          세탁옵션
        </Text>
        {isExpanded ? <IconUp /> : <IconDown />}
      </TouchableOpacity>
      {isExpanded && (
        <View>
          {data?.map((el: any, i: number) => (
            <View key={el.key}>
              {/* <View className="flex-row justify-between items-center">
                <Text className="text-[#222222] text-[14px] font-defaultRegular">
                  Type name
                </Text>
                <Text className="text-[#222222] text-[15px] font-defaultSemiBold">
                  {el.type?.name}
                </Text>
              </View> */}
              {el?.orderDetailTypes?.map((item: any) => (
                <View
                  key={item.id}
                  className="border-b border-[#DADADA] py-[12px]"
                >
                  <View className="flex-row justify-between items-center py-1">
                    <Text className="text-[#222222] text-[14px] font-defaultRegular">
                      Name
                    </Text>
                    <Text className="text-[#222222] text-[15px] font-defaultSemiBold">
                      {item?.name}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center py-1">
                    <Text className="text-[#222222] text-[14px] font-defaultRegular">
                      Quantity
                    </Text>
                    <Text className="text-[#222222] text-[15px] font-defaultSemiBold">
                      {item?.quantity}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center py-1">
                    <Text className="text-[#222222] text-[14px] font-defaultRegular">
                      Price
                    </Text>
                    <Text className="text-[#222222] text-[15px] font-defaultSemiBold">
                      {item?.price}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default OptionAccordion;
