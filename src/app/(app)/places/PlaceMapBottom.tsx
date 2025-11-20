import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Linking,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";

import { useSelector } from "react-redux";

export default function PlaceMapBottom({ onChange, isModalVisibleMap, setIsModalVisibleMap, data }: any) {
  const { geolocation } = useSelector((state: any) => state.store);

  const openNaverMap = async () => {
    const startLocation = geolocation?.longitude
      ? `slat=${geolocation?.latitude}&slng=${geolocation?.longitude}&sname=출발지`
      : '';
    const destination = `dlat=${data?.latitude}&dlng=${data?.longitude}&dname=${data?.name}`;

    const naverMapDeepLink = geolocation?.longitude
      ? `nmap://route/walk?${startLocation}&${destination}&package=com.nhn.android.nmap`
      : `nmap://route/walk?${destination}&package=com.nhn.android.nmap`;

    const naverMapWebUrl = geolocation?.longitude
      ? `http://map.naver.com/index.nhn?${startLocation}&elng=${data?.longitude}&elat=${data?.latitude}&pathType=3&showMap=true&etext=${data?.name}&menu=route`
      : `http://map.naver.com/index.nhn?elng=${data?.longitude}&elat=${data?.latitude}&pathType=3&showMap=true&etext=${data?.name}&menu=route`;

    try {
      const canOpen = await Linking.canOpenURL(naverMapDeepLink);
      if (canOpen) {
        await Linking.openURL(naverMapDeepLink);
      } else {
        await Linking.openURL(naverMapWebUrl);
      }
    } catch (error) {
      console.error('Error open Naver Map:', error);
      await Linking.openURL(naverMapWebUrl);
    }
  };

  const openKakaoMap = async () => {
    const kakaoMapDeepLink = geolocation?.longitude
      ? `kakaomap://route?sp=${geolocation?.latitude},${geolocation?.longitude}&ep=${data?.latitude},${data?.longitude}&by=FOOT&package=net.daum.android.map`
      : `kakaomap://route?ep=${data?.latitude},${data?.longitude}&by=FOOT&package=net.daum.android.map`;

    const kakaoMapWebUrl = `https://map.kakao.com/link/to/${data?.name},${data?.latitude},${data?.longitude}`;

    try {
      const canOpen = await Linking.canOpenURL(kakaoMapDeepLink);
      if (canOpen) {
        await Linking.openURL(kakaoMapDeepLink);
      } else {
        await Linking.openURL(kakaoMapWebUrl);
      }
    } catch (error) {
      console.error('Error open Kakao Map:', error);
      await Linking.openURL(kakaoMapWebUrl);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisibleMap}>
      <TouchableWithoutFeedback onPress={() => setIsModalVisibleMap(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.contentContainer, { height: '25%' }]}>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.itemText, { fontSize: 18, lineHeight: 24 }
                  ]}
                >
                  {data?.name}
                </Text>
                <Text
                  style={[
                    styles.desText, { fontSize: 14, lineHeight: 20, flex: 1 }
                  ]}
                >
                  {data?.address?.value}
                </Text>
                <View style={{ flexDirection: 'row', gap: 12, width: "100%", marginTop: 25, marginBottom: 10 }}>
                  <Pressable
                    onPress={openNaverMap}
                    style={[
                      styles.btnMap2,
                      { backgroundColor: '#03c75a' }
                    ]}>
                    <Text style={[styles.itemTextMap, { fontSize: 14 }]}>네이버</Text></Pressable>
                  <Pressable
                    onPress={openKakaoMap}
                    style={[styles.btnMap2, { backgroundColor: '#fae100' }]}
                  ><Text style={[styles.itemTextMap, { fontSize: 14 }]}>카카오</Text></Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "relative",
    width: "100%",
    paddingHorizontal: 13,
    paddingBottom: 16,
    height: '25%'
  },
  contentContainer: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(47, 38, 93, 0.85)",
  },
  footerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 13,
  },
  btnMap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 0,
    // width: 60,
    height: 25,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 8,
    alignSelf: "stretch",
    flexGrow: 0
  },
  btnMap2: {
    width: '48%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 0,
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 20,
  },
  titleText: {
    color: "#222222",
    fontWeight: "700",
    fontSize: 23,
    lineHeight: 30,
    textAlign: "center",
    flex: 1,
  },
  itemText: {
    color: "#222222",
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 18,
  },
  itemTextMap: {
    color: "#222222",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 18,
  },

  desText: {
    color: "#888888",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  searchBtn: {
    height: 20,
    width: 20,
  },
  listMachine: {
    marginTop: 20,
    gap: 8,
    marginBottom: 78
  },
  shadowProp: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    // Android
    elevation: 5,
  },
  item: {
    flexDirection: "row",
    color: "#888888",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    gap: 10,
    marginBottom: 8,
  },
  itemActive: {
    borderColor: "#2F265D",
    color: "#2F265D",
    backgroundColor: '#2F265DF7'
    // boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
  },
  itemTextActive: {
    color: "#FFFFFF",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
});
