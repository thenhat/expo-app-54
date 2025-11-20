import PageName from "@/constants/PageName";
import { Href, Stack, useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import RightArrowIcon from "@/assets/icons/my/CaretRight-24.svg";
import Wrapper from "@/components/Wrapper";

const dataFake: any = [
  {
    id: "1",
    title: "현장결제 이용 방법",
  },
  {
    id: "2",
    title: "내가 원하는 매장 찾기",
  },
  {
    id: "3",
    title: "현장결제 이용 방법",
  },
];
const Guide: React.FC = () => {
  const router = useRouter();

  const gotoDetail = (id: string) => {
    const route: Href<string> = {
      pathname: "/mypage/guide-detail/[id]",
      params: { id },
    };
    router.push(route);
  };

  return (
    <Wrapper
      backUrl={"/(tabs)/mypage"}
      headerType="BACK"
      headerScreenName={PageName.GUIDE}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View className="py-[24px] px-[16px]">
          {dataFake?.map((item: any, index: number) => (
            <View key={index}>
              {index > 0 && (
                <View className="block h-[8px] bg-[#F4F4F4] mx-[-16px]" />
              )}
              <View className="py-[24px]">
                <TouchableOpacity
                  onPress={() => gotoDetail(item.id)}
                  className="flex-row gap-[10px] justify-between items-center"
                >
                  <Text className="text-[19px] leading-[24.7px] font-defaultSemiBold text-[#222]">
                    {item.title}
                  </Text>
                  <RightArrowIcon />
                </TouchableOpacity>
                {/* <Text className="text-[13px] text-[#888] leading-[20.8px] mt-[4px] font-defaultRegular">
                  {item.createdAt}
                </Text> */}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Guide;
