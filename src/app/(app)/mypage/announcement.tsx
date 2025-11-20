import RightArrowIcon from "@/assets/icons/my/CaretRight-24.svg";
import Wrapper from "@/components/Wrapper";
import { apiConfig } from "@/constants/apiConfig";
import PageName from "@/constants/PageName";
import sendApiRequest from "@/utils/api";
import { Href, useRouter } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// const dataFake: any = [
//   {
//     id: "1",
//     title: "[공지] 공지사항 1번입니다.",
//     createdAt: "2024.08.01",
//   },
//   {
//     id: "2",
//     title: "[이벤트] 이벤트도 있어요.",
//     createdAt: "2024.08.01",
//   },
//   {
//     id: "3",
//     title: "[이벤트] 이벤트도 있어요.",
//     createdAt: "2024.08.01",
//   },
// ];

const Announcement: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any>();

  const gotoDetail = (id: string) => {
    const route: Href<string> = {
      pathname: "/mypage/announcement-detail/[id]",
      params: { id },
    };
    router.push(route);
  };

  const getAnnouncement = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.my.announcement,
        requiredToken: false,
        // body: {},
      });
      if (res) {
        setData(res?._embedded?.announcements);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getAnnouncement();
  }, []);

  return (
    <Wrapper
      backUrl={"/(tabs)/mypage"}
      headerType="BACK"
      headerScreenName={PageName.ANNOUNCEMENT}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View className="px-[16px]">
          {data?.map((item: any, index: number) => (
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
                <Text className="text-[13px] text-[#888] leading-[20.8px] mt-[4px] font-defaultRegular">
                  {moment(item.executeDate).format("YYYY.MM.DD")}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Announcement;
