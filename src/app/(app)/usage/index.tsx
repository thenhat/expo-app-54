import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";
import { useRouter } from "expo-router";

const bannerhdsd = require("@/assets/images/usage/banner-hdsd.jpg");
const hdsd1 = require("@/assets/images/usage/hdsd-1.png");
const hdsd2 = require("@/assets/images/usage/hdsh-2.png");
const hdsd3 = require("@/assets/images/usage/hdsd-3.png");
const hdsd4 = require("@/assets/images/usage/hdsd-4.png");
const hdsd5 = require("@/assets/images/usage/hdsd-5.png");
const hdsd6 = require("@/assets/images/usage/hdsd-6.png");

export default function UsageScreen() {
  const router = useRouter();
const windowHeight = Dimensions.get('window').height;

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
        <HeaderScreen title="" />
        <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: "#fff", zIndex: 9 }}>
          <View style={styles.container}>
            <Image source={bannerhdsd} resizeMode={'stretch'} style={[styles.aboutImage, {height: windowHeight}]} />
            <View className="absolute flex-row justify-center flex-wrap top-[10%] text-center text-[20px] font-bold gap-x-[10px] gap-y-[38px] w-full p-[45px] md:p-[55px] mt-[20px]">
              <View className="flex items-center justify-start w-[46%] flex-col ">
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/usage/detail/[id]",
                      params: { id: 'washing' },
                    })
                  }
                  className="z-10"
                >
                  <Image
                    source={hdsd1}
                    resizeMode={'stretch'}
                    className="w-[90px] h-[112.5px] mb-[5px]"
                  />
                </Pressable>

                <Text className="text-[14px] font-defaultSemiBold text-[#2F265D] text-center">
                  세탁기 사용방법
                </Text>
              </View>
              <View className="flex items-center justify-start w-[46%] flex-col">
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/usage/detail/[id]",
                      params: { id: 'dryer' },
                    })
                  }
                >
                  <Image
                    source={hdsd2}
                    resizeMode={'stretch'}
                    className="w-[90px] h-[112.5px] mb-[5px]"
                  />
                </Pressable>
                <Text className="text-[14px] font-defaultSemiBold text-[#2F265D] text-center">
                  건조기 사용방법
                </Text>
              </View>
              <View className="flex items-center justify-end pt-1 w-[46%] flex-col">
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/usage/detail/[id]",
                      params: { id: 'shoes-washing-drying' },
                    })
                  }
                >
                  <Image
                    source={hdsd3}
                    resizeMode={'stretch'}
                    className="w-[90px] h-[112.5px] mb-[5px]"
                  />
                </Pressable>
                <Text className="text-[14px] font-defaultSemiBold tracking-tighter whitespace-nowrap text-[#2F265D] text-center">
                  운동화세탁건조기 사용방법
                </Text>
              </View>
              <View className="flex items-center justify-start w-[46%] flex-col">
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/usage/detail/[id]",
                      params: { id: 'coupon' },
                    })
                  }
                >
                  <Image
                    source={hdsd4}
                    resizeMode={'stretch'}
                    className="w-[90px] h-[120px] mb-[5px]"
                  />
                </Pressable>
                <Text className="text-[14px] font-defaultSemiBold text-[#2F265D] text-center">
                  쿠폰 사용방법
                </Text>
              </View>
              <View className="flex items-center justify-start w-[46%] flex-col">
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/usage/detail/[id]",
                      params: { id: 'washing-drycleaning' },
                    })
                  }
                >
                  <Image
                    source={hdsd5}
                    resizeMode={'stretch'}
                    className="w-[90px] h-[112.5px] mb-[5px]"
                  />
                </Pressable>
                <Text className="text-[14px] font-defaultSemiBold text-[#2F265D] text-center">
                  드라이클리닝 세탁
                </Text>
              </View>
              <View className="flex items-center justify-start w-[46%] flex-col">
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/usage/detail/[id]",
                      params: { id: 'dryer-drycleaning' },
                    })
                  }
                >
                  <Image
                    source={hdsd6}
                    resizeMode={'stretch'}
                    className="w-[90px] h-[112.5px] mb-[5px]"
                  />
                </Pressable>
                <Text className="text-[14px] font-defaultSemiBold text-[#2F265D] text-center">
                  드라이클리닝 건조
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height : '100%',
  },
  aboutImage: {
    width: '100%',
  }
});
