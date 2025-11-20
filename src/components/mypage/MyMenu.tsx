import { Href, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import MenuIcon1 from "@/assets/icons/my/menu/menu-1-icon.svg";
import MenuIcon10 from "@/assets/icons/my/menu/menu-10-icon.svg";
import MenuIcon2 from "@/assets/icons/my/menu/menu-2-icon.svg";
import MenuIcon3 from "@/assets/icons/my/menu/menu-3-icon.svg";
import MenuIcon4 from "@/assets/icons/my/menu/menu-4-icon.svg";
import MenuIcon5 from "@/assets/icons/my/menu/menu-5-icon.svg";
import MenuIcon6 from "@/assets/icons/my/menu/menu-6-icon.svg";
import MenuIcon7 from "@/assets/icons/my/menu/menu-7-icon.svg";
import MenuIcon8 from "@/assets/icons/my/menu/menu-8-icon.svg";
import MenuIcon9 from "@/assets/icons/my/menu/menu-9-icon.svg";
import LaundryTip from "@/assets/icons/my/menu/LaundryTip.svg";

// import

type MenuItemType = {
  icon: any;
  label: string;
  route: Href<string>;
};

const menuItems: MenuItemType[] = [
  {
    icon: <MenuIcon1 />,
    label: "이용내역",
    route: "/mypage/usage-history",
  },
  {
    icon: <MenuIcon2 />,
    label: "캐시 적립/사용 내역",
    route: "/mypage/cash-history",
  },
  {
    icon: <MenuIcon3 />,
    label: "포인트내역",
    route: "/mypage/point-history",
  },
  {
    icon: <MenuIcon4 />,
    label: "쿠폰내역",
    route: "/mypage/coupon-history",
  },
  {
    icon: <MenuIcon5 />,
    label: "단골가게 관리",
    route: "/mypage/favorite-place-management",
  },
  {
    icon: <MenuIcon6 />,
    label: "리뷰 관리",
    route: "/mypage/review-management",
  },
  {
    icon: <MenuIcon7 />,
    label: "공지사항/이벤트",
    route: "/mypage/announcement",
  },
  {
    icon: <MenuIcon8 />,
    label: "이용안내",
    route: "/usage",
  },
  {
    icon: <LaundryTip />,
    label: "세탁꿀팁",
    route: "/mypage/laundry-tips",
  },
  {
    icon: <MenuIcon9 />,
    label: "1:1문의",
    route: "/mypage/question",
  },
  {
    icon: <MenuIcon10 />,
    label: "이용약관/개인정보처리방침",
    route: "/mypage/user-term-privacy-policy",
  },
];

export default function MyMenuComp() {
  const router = useRouter();

  const goToPage = (route: Href<string>) => {
    router.push(route);
  };

  return (
    <View className="flex-1 bg-[#fff] px-[16px] pt-[16px]">
      {menuItems?.map((item: MenuItemType, index: number) => (
        <View key={index}>
          <TouchableOpacity onPress={() => goToPage(item.route)}>
            <View className="flex-row gap-[12px] py-[8px]">
              {item.icon}
              <Text className="text-[15px] leading-[27px] font-defaultRegular text-[#222]">
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
          {index === 5 && (
            <View className="mx-[-16px] h-[4px] bg-[#F4F4F4] block my-[16px]" />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
