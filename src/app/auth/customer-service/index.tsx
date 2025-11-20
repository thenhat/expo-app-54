import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";
import { useAppSelector } from "@/store/hook";
import { useDispatch } from "react-redux";
import { setStoreActive } from "@/store/slice/storeSlice";
import { useRouter } from "expo-router";
const HOCL = require("@/assets/images/bg-customer-service.png");

export default function CustomerServiceScreen() {
  const { storeLastUsed } = useAppSelector((state: any) => state.store);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCheckStore = () => {
    if (storeLastUsed?.id) {
      dispatch(setStoreActive(storeLastUsed));
    }
    router.push("/appointment?type=PAYMENT")
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
        <HeaderScreen title="" />
        <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: "#fff" }}>
          <View style={styles.container}>
            <Image source={HOCL} resizeMode={'stretch'} style={styles.aboutImage} />

            <View className=" absolute top-[8.5%] left-0 right-0 m-auto flex items-center">
              <TouchableOpacity className="bg-[#6BA2BE] flex items-center justify-center cursor-pointer rounded-full h-[30px] w-[200px] m-auto"
                onPress={() => router.push('/mypage/question')}
              >
                <Text className="text-[#fff] xs:text-[16px] text-[14px]">1:1 문의 바로이동</Text>
              </TouchableOpacity>
            </View>

            <View className=" absolute top-[17%] left-0 right-0 m-auto flex items-center">
              <TouchableOpacity className="bg-[#6BA2BE] flex items-center justify-center cursor-pointer rounded-full h-[30px] w-[200px] m-auto"
                onPress={handleCheckStore}
              >
                <Text className="text-[#fff] xs:text-[16px] text-[14px]">내 장비 페이지로 바로이동</Text>
              </TouchableOpacity>
            </View>

            <View className=" absolute top-[33%] left-0 right-0 m-auto flex items-center">
              <TouchableOpacity className="bg-[#6BA2BE] flex items-center justify-center cursor-pointer rounded-full h-[30px] w-[200px] m-auto">
                <Text className="text-[#fff] xs:text-[16px] text-[14px]">내 장비 페이지로 바로이동</Text>
              </TouchableOpacity>
            </View>

            <View className=" absolute top-[60.5%] left-0 right-0 m-auto flex items-center">
              <TouchableOpacity className="bg-[#6BA2BE] flex items-center justify-center cursor-pointer rounded-full h-[30px] w-[200px] m-auto"
              onPress={() => router.push('/mypage/usage-history')}
              >
                <Text className="text-[#fff] xs:text-[16px] text-[14px]">이용내역 페이지로 바로이동</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    position: 'relative',
  },
  aboutImage: {
    width: '100%',
    height: 1300
  }
});
