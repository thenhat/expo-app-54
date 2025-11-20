import { useColorScheme } from "nativewind";

import Colors from "@/constants/Colors";
import { Link, Tabs, useRouter } from "expo-router";

import HomeIcon from "@/components/Icon/HomeIcon";
import MyIcon from "@/components/Icon/MyIcon";
import StoreIcon from "@/components/Icon/StoreIcon";
import WashIcon from "@/components/Icon/WashIcon";
import { useAuthContext } from "@/contexts/AuthContext";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import QRIcon from "@/assets/icons/qr-icon.svg";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";

export function withAuthGuard(isAuthenticated: boolean) {
  const router = useRouter();

  return {
    listeners: {
      tabPress: (e: any) => {
        if (!isAuthenticated) {
          e.preventDefault();
          router.push("/auth/login");
        }
      },
    },
  };
}

function CustomTabBar(props: BottomTabBarProps) {
  return <BottomTabBar {...props} />;
}

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const { isAuthenticated } = useAuthContext();
  // console.log("openNotiModal", openNotiModal);

  return (
    <React.Fragment>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarActiveTintColor: "#2F265D",
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: false,
          unmountOnBlur: true,
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "홈",
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
            headerRight: () => (
              <Link href="/(app)/modal">
                <Pressable>
                  {({ pressed }) => (
                    <Feather
                      name="home"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="stores"
          options={{
            title: "매장",
            tabBarIcon: ({ color }) => <WashIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="places"
          options={{
            title: "주변가게",
            tabBarIcon: ({ color }) => <StoreIcon color={color} />,
          }}
          {...withAuthGuard(isAuthenticated)}
        />
        <Tabs.Screen
          name="mypage"
          options={{
            title: "MY",
            tabBarIcon: ({ color }) => <MyIcon color={color} />,
            tabBarButton: (props) => (
              <View style={styles.tabButtonWithDivider}>
                <TouchableOpacity {...props} activeOpacity={0.7} />
                <View style={styles.divider} />
              </View>
            ),
          }}
          // {...withAuthGuard(isAuthenticated)}
          // listeners={{
          //   tabPress: (e) => {
          //     if (!isAuthenticated) {
          //       e.preventDefault(); // Ngăn chuyển hướng mặc định
          //       router.push("/auth/login"); // Chuyển hướng đến trang đăng nhập
          //     }
          //   },
          // }}
        />
        <Tabs.Screen
          name="qrcode"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <QRIcon
                style={{ width: 38, height: 38, marginTop: 15 }}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  tabButtonWithDivider: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: "60%",
    backgroundColor: "#E0E0E0",
    marginRight: 0,
  },
});
