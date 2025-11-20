import formatNumbers from "@/utils/format";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import CashIcon from "@/assets/icons/my/cash-icon.svg";
import CounponIcon from "@/assets/icons/my/coupon-icon.svg";
import PointIcon from "@/assets/icons/my/point-icon.svg";
import { useRouter } from "expo-router";

type SummaryType = {
  name: string;
  total: string;
  icon: any;
  route?: any;
};

type DataType = {
  totalPoint: string;
  totalCash: string;
  totalCoupon: string;
};

interface Props {
  data: DataType;
}

export default function SummaryComp({ data }: Props) {
  const router = useRouter();

  const summaryData: SummaryType[] = [
    {
      name: "캐시",
      total: formatNumbers(data?.totalCash),
      icon: <CashIcon />,
      route: "/mypage/cash-history",
    },
    {
      name: "포인트",
      total: formatNumbers(data?.totalPoint),
      icon: <PointIcon />,
      route: "/mypage/point-history",
    },
    {
      name: "쿠폰",
      total: formatNumbers(data?.totalCoupon),
      icon: <CounponIcon />,
      route: "/mypage/coupon-history",
    },
  ];
  return (
    <View className="bg-[#2F265D] flex-row gap-[12px] pb-[16px]">
      {summaryData.map((el: SummaryType, i: number) => (
        <Pressable className="flex-1 bg-white25 p-[12px] rounded-[12px]" key={i} onPress={() => router.push(el.route)}>
          <Text className="text-[13px] leading-[15.85px] font-defaultRegular mb-[4px] text-[#fff]">
            {el.name}
          </Text>
          <View className="flex-row gap-[5px] items-center">
            {el.icon}
            <Text className="text-[17px] leading-[20.72px] font-defaultSemiBold text-[#fff]">
              {el.total}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
