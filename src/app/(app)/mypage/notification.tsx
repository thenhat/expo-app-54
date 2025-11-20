import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import { convertToDay } from "@/utils/dateCalculator";
import HeaderScreen from "@/components/HeaderScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const NotificationScreen: React.FC = () => {
  const router = useRouter();
  const [listNoti, setListNoti] = useState<any>();
  // const isOpenNoti = useAppSelector(isOpenNoticesSelecter);
  const { listNotice } = useSelector((state: any) => state.notices);

  const getNoticeData = async (data: any) => {
    try {
      if (data) {
        const dataMap = data.map((item: any) => {
          const typeConfig: any = {
            OTHER: { label: "기타", bg: "#FDEDFF", color: "#F66BDD" },
            APPOINTMENT: { label: "예약", bg: "#E2FFF1", color: "#06C164" },
            WASH: { label: "세탁", bg: "#F2FBFF", color: "#0A9EE8" },
            DRY: { label: "건조기", bg: "#F8F6FF", color: "#6F62B6" },
            EVENT_PLACE: { label: "이벤트", bg: "#D7FEFF", color: "#08B7A8" },
            MENU_PLACE: { label: "메뉴", bg: "#F3357126", color: "#DF1519" },
            CASH: { label: "캐시", bg: "#FFF6E8", color: "#FEA31B" },
            DRY_CLEANING: { label: "드라이", bg: "#3cddcd26", color: "#3cddcd" },
          };

          const { label, bg, color } =
            typeConfig[item.type] || typeConfig.default;

          return {
            label,
            title: item.title,
            content: item.content,
            time: item.executeDate,
            bg,
            color,
          };
        });

        setListNoti(dataMap);
      }
    } catch (error) {
      console.log("Noti failed:", error);
    }
  };

  const readAllNotice = async () => {
    try {
      await sendApiRequest({
        ...apiConfig.notices.readAllNotice,
      });
    } catch (error) {
      console.log("Noti failed:", error);
    }
  };

  useEffect(() => {
    if (listNotice?.notices?.content?.length > 0) {
      getNoticeData(listNotice?.notices?.content);
      readAllNotice();
    }
  }, [listNotice]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <View className="bg-[#fff] flex-1">
        {/* <View className="h-[60px] flex-row items-center justify-center relative mx-[16px]">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/mypage")}
            className="absolute top-[22px] left-0"
          >
            <CloseIcon />
          </TouchableOpacity>
          <Text className="text-[#222] text-[17px] leading-[18px] font-defaultSemiBold">
            알림
          </Text>
        </View> */}
        <HeaderScreen title="알림" />
        <ScrollView
          nestedScrollEnabled={true}
          className="flex-1 bg-[#F8F6FF] pl-[10px]"
          contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 16}}
        >
          {listNoti?.map((item: any, index: number) => (
            <View
              key={index}
              // style={{ borderRadius: 15 }}
              className={`py-[20px] pr-[16px] rounded-[15px] flex-row items-start bg-[#fff] gap-x-[10px] ${index > 0 ? "mt-[13px]" : ""}`}
            >
              <Text
                style={{
                  backgroundColor: item.bg,
                  color: item.color,
                }}
                className="w-[56px] rounded-r-full h-[28px] leading-[28px] text-[14px] font-defaultBold text-center"
              >
                {item.label}
              </Text>
              <View className="flex-1">
                <Text className="text-[14px] leading font-defaultBold mb-[2px]">
                  {item.title}
                </Text>
                <Text className="text-[14px] leading font-defaultMedium">
                  {item.content}
                </Text>
                <Text className="text-[13px] leading-[23.4px] mt-[4px] font-defaultRegular">
                  {convertToDay(item.time)}
                </Text>
              </View>
            </View>
          ))}
          <View className="h-[30px]" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
