import SignOut from "@/assets/icons/my/SignOut.svg";
import BellIcon from "@/assets/images/svgs/bell.svg";
import HeadphoneIcon from "@/assets/images/svgs/headphone.svg";
import InfoComp from "@/components/mypage/Info";
import MyMenuComp from "@/components/mypage/MyMenu";
import SummaryComp from "@/components/mypage/Summary";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useAppDispatch } from "@/store/hook";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { profile }: any = useProfile();
  const dispatch = useAppDispatch();

  // console.log("myInfo", profile);

  const handleLogout = async () => {
    try {
      await signOut();
      // await new Promise(resolve => setTimeout(resolve, 100));
      router.replace("/auth/login");
    } catch (error) {
      console.log("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <PrivateRoute>
      <SafeAreaView className="bg-[#fff] flex-1">
        {/* Nội dung không cuộn (Header, Info, Summary, Link) */}
        <View className="bg-[#2F265D] px-[16px] pb-[16px] rounded-b-[25px]">
          <View style={styles.header}>
            <Text style={styles.headerText}>MY</Text>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity onPress={() => router.push("/auth/customer-service")}>
              <HeadphoneIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/mypage/notification");
              }}
            >
              <BellIcon />
            </TouchableOpacity>
          </View>
          <View className="block">
            <InfoComp data={{ fullName: profile?.fullName }} />
          </View>
          <View>
            <SummaryComp
              data={{
                totalCash: profile?.totalCash,
                totalPoint: profile?.totalPoint,
                totalCoupon: profile?.totalCoupon,
              }}
            />
          </View>
          <TouchableOpacity onPress={() => router.push("/(tabs)/qrcode")}>
            <View className="bg-[#2F265D] h-[40px] w-full px-[16px] border border-[#fff] rounded-full">
              <Text
                className="font-defaultSemiBold color-[#fff] text-[14px] leading-[40px] text-center"
              >
                MY QR 보기
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <StatusBar
          style={Platform.OS === "ios" ? "dark" : "auto"}
          backgroundColor="#2F265D"
        />

        {/* Nội dung cuộn */}
        <ScrollView>
          <MyMenuComp />
          <View className="flex-row justify-between py-[25px] px-[16px]">
            <Text className="text-[#888888] text-[13px] font-defaultRegular">
              v 1.4.3
            </Text>
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row gap-[6px]"
            >
              <SignOut />
              <Text className="text-[14px] font-defaultSemiBold text-[#DF1519] underline">
                LOGOUT
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PrivateRoute>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2F265D",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 16,
    gap: 24,
  },
  headerText: {
    color: "#FFF",
    fontSize: 17,
    lineHeight: 18,
    fontWeight: "600",
  },
});
