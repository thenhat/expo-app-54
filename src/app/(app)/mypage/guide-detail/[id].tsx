import Wrapper from "@/components/Wrapper";
import PageName from "@/constants/PageName";
import { Stack } from "expo-router";
import { SafeAreaView, ScrollView, View, Text } from "react-native";

const GuideDetail: React.FC = () => {
  return (
    <Wrapper headerType="BACK" headerScreenName={PageName.GUIDE}>
      <View className="py-[24px] px-[16px]">
        <Text className="text-[19px] leading-[24.7px] font-defaultSemiBold text-[#222]">
          현장 결제 이용 방법
        </Text>
        <Text className="text-[13px] text-[#888] leading-[20.8px] mt-[4px] font-defaultRegular">
          2024.08.01
        </Text>
        <View className="bg-[#DADADABF] h-[1px] block my-[20px]" />
        <ScrollView
          className="p-[16px] rounded-[10px] border border-[#DADADABF] max-h-[400px]"
          contentContainerStyle={{
            paddingBottom: 24, // Đảm bảo khoảng cách 24px bên dưới
          }}
          // contentContainerStyle={{
          //   paddingHorizontal: 16,
          //   paddingVertical: 20,
          //   borderRadius: 10, // Đảm bảo góc bo tròn
          //   shadowColor: "#000",
          //   shadowOffset: { width: 0, height: 0 },
          //   shadowOpacity: 0.1,
          //   shadowRadius: 1,
          //   elevation: 4, // Thêm độ sâu cho shadow
          // }}
        >
          <Text className="text-[15px] leading-[27px] font-defaultRegular text-[#222]">
            1. 이렇게 사용한다음{"\n"}
            2. 이렇게 사용하고{"\n"}
            3. 저렇게 사용하세요
          </Text>
          <View className="h-[24px]" />
        </ScrollView>
      </View>
    </Wrapper>
  );
};
export default GuideDetail;
