import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";

const bg_top = require("@/assets/images/bg_top.png");

const Banner: React.FC<any> = ({children}) => {
  return (
    <View style={styles.bannerWp}>
      <ImageBackground source={bg_top} resizeMode="stretch" style={styles.image}>
      <View style={[styles.image]}>
      
        {children}
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerWp: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
  },

  machineInfo: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    marginTop: 5,
  },
  qrContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
  },
  qrText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  qrIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  remainingTime: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
  },
  endTime: {
    color: "rgb(96, 241, 174)",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 19,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  imageBgr: {
    flex: 1,
    width: "100%",
    minHeight: 200,
    justifyContent: "center",
    // objectFit: "contain",
    bottom: 0,
    position: "absolute",
    resizeMode: 'cover',
    zIndex: -1,
  },
});

export default Banner;


const ConvertStatus = (type: any) => {
  switch (type) {
    case "RUNNING":
      return "세탁중이에요";
    case "V_READY":
      return "세탁시간이 있어요";
    case "appointment":
      return "세탁이 필요할 땐 호텔 런드리";

    case "login":
      return "로그인하고 세탁서비스를 예약하세요";
    default:
      break;
  }
};