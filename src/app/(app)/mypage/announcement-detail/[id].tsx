import Wrapper from "@/components/Wrapper";
import { apiConfig } from "@/constants/apiConfig";
import PageName from "@/constants/PageName";
import sendApiRequest from "@/utils/api";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";

const AnnouncementDetail: React.FC = () => {
  const { id } = useGlobalSearchParams();
  const router = useRouter();
  const [data, setData] = useState<any>();

  const getAnnouncementDetail = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.my.announcement,
        endPoint: `/announcement/${id}`,
        requiredToken: false,
        // body: {},
      });
      if (res) {
        setData(res);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getAnnouncementDetail();
  }, []);
  const { width } = useWindowDimensions();
  return (
    <Wrapper headerType="BACK" headerScreenName={PageName.ANNOUNCEMENT}>
      {/* <Stack.Screen
        options={{
          title: PageName.ANNOUNCEMENT,
        }}
      /> */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View className="py-[24px] px-[16px]">
          <Text className="text-[19px] leading-[24.7px] font-defaultSemiBold text-[#222]">
            [공지] {data?.title}
          </Text>
          <Text className="text-[13px] text-[#888] leading-[20.8px] mt-[4px] font-defaultRegular">
            {moment(data?.executeDate).format("YYYY.MM.DD")}
          </Text>
          <View className="bg-[#DADADABF] h-[1px] block my-[20px]" />
          <RenderHTML
            contentWidth={width}
            source={{ html: data?.content }}
            tagsStyles={tagsStyles}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="mx-[16px] text-center h-[50px] px-[16px] rounded-full bg-[#2F265D] text-[#fff] text-[14px] font-defaultSemiBold leading-[50px] mb-[30px]">
          목록으로
        </Text>
      </TouchableOpacity>
    </Wrapper>
  );
};

const tagsStyles = {
  div: {
    color: "#888",
    fontSize: 15,
    fontFamily: "montserrat500",
  },
  p: {
    color: "#888",
    fontSize: 15,
    fontFamily: "montserrat500",
  },
};

export default AnnouncementDetail;
