import Logo from "@/assets/icons/logo.svg";
import BellIcon from "@/assets/images/svgs/bell.svg";
import HeadphoneIcon from "@/assets/images/svgs/headphone.svg";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
const Header: React.FC = () => {
  const router = useRouter();
  const { listNotice } = useSelector((state: any) => state.notices);

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => router.push("/auth/customer-service")}>
          <HeadphoneIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notiWrapper} onPress={() => router.push("/mypage/notification")}>
          {listNotice?.newNotice && <View style={styles.notiDot}></View>}
          <BellIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2F265D",
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: "100%",
    gap: 100,
    paddingTop: 30,
  },
  mainImage: {
    width: 63,
    aspectRatio: 1.57,
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  icon: {
    width: 24,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  notiWrapper: {
    position: 'relative'
  },
  notiDot: {
    position: 'absolute',
    right: 0,
    width: 5,
    aspectRatio: 1,
    resizeMode: "contain",
    backgroundColor: 'red',
    borderRadius: 100
  },
});

export default Header;
