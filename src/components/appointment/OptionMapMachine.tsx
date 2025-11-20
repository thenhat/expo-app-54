import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Linking,
  TouchableWithoutFeedback,
  Modal,
  Platform,
} from "react-native";
import CloseIcon from "@/assets/images/svgs/close.svg";
import MapIcon from "@/assets/images/svgs/map.svg";
import SearchIcon from "@/assets/images/svgs/search.svg";

import Input from "../Input";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { setListStore, setStoreActive } from "@/store/slice/storeSlice";
import Button from "../Button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList } from "react-native-gesture-handler";

export default function OptionMapMachine({ onChange, show, isModalVisible, setIsModalVisible, isMap }: any) {
  const { last }: any = useLocalSearchParams<{ user: string }>();
  const [isActive, setIsActive] = useState(2);
  const [openSheetMap, setOpenSheetMap] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const snapPoints = useMemo(() => ["75%", "100%"], []);
  const snapPointsLast = useMemo(() => ["95%"], []);
  const snapPointsMaps = useMemo(() => ["25%"], []);

  const router = useRouter();

  const dispatch = useDispatch();
  const { listStore, geolocation, storeActive } = useSelector((state: any) => state.store);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    storeActive?.id && setIsActive(storeActive?.id);
  }, [storeActive]);

  useEffect(() => {
    fetchListStore()
  }, [debouncedSearch, geolocation]);

  const fetchListStore = async () => {
    const res: any = await sendApiRequest({
      ...apiConfig.store.getStoreList,
      body: {
        query: debouncedSearch,
        latitude: geolocation?.latitude,
        longitude: geolocation?.longitude
      },
    });

    if (res?.msg === "success") {
      dispatch(setListStore(res?.data));
    }
  };

  const handleChange = (value: any) => {
    dispatch(setStoreActive(value));
    // setIsActive(value?.id);
  };

  const openNaverMap = async () => {
    const startLocation = geolocation?.longitude
      ? `slat=${geolocation?.latitude}&slng=${geolocation?.longitude}&sname=출발지`
      : '';
    const destination = `dlat=${storeActive?.latitude}&dlng=${storeActive?.longitude}&dname=${storeActive?.name}`;

    const naverMapDeepLink = geolocation?.longitude
      ? `nmap://route/walk?${startLocation}&${destination}&package=com.nhn.android.nmap`
      : `nmap://route/walk?${destination}&package=com.nhn.android.nmap`;

    const naverMapWebUrl = geolocation?.longitude
      ? `http://map.naver.com/index.nhn?${startLocation}&elng=${storeActive?.longitude}&elat=${storeActive?.latitude}&pathType=3&showMap=true&etext=${storeActive?.name}&menu=route`
      : `http://map.naver.com/index.nhn?elng=${storeActive?.longitude}&elat=${storeActive?.latitude}&pathType=3&showMap=true&etext=${storeActive?.name}&menu=route`;

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
      ? `kakaomap://route?sp=${geolocation?.latitude},${geolocation?.longitude}&ep=${storeActive?.latitude},${storeActive?.longitude}&by=FOOT&package=net.daum.android.map`
      : `kakaomap://route?ep=${storeActive?.latitude},${storeActive?.longitude}&by=FOOT&package=net.daum.android.map`;

    const kakaoMapWebUrl = `https://map.kakao.com/link/to/${storeActive?.name},${storeActive?.latitude},${storeActive?.longitude}`;

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

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Button
        styleButton={{ width: "100%" }}
        label="선택완료"
        size="large"
        mode="contained"
        color="primary"
        onPress={() => {
          last && router.push('/');
          setIsModalVisible(false);
          setOpenSheetMap(false);
          isMap && router.push({
            pathname: "/stores/find-store",
            params: {
              idStore: storeActive?.id
            }
          })
        }}
      />
    </View>
  );

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          styles.shadowProp,
          isActive === item?.id ? styles.itemActive : {},
        ]}
        onPress={() => handleChange(item)}
      >
        <MapIcon style={{ minWidth: 42 }} />
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.itemText,
              isActive === item?.id ? styles.itemTextActive : {},
            ]}
          >
            {item?.name}
          </Text>
          <Text
            style={[
              styles.desText,
              isActive === item?.id ? styles.itemTextActive : {},
            ]}
          >
            {item?.address?.value}
          </Text>
        </View>
        <View style={{ flexDirection: 'column', gap: 7 }}>
          <Pressable
            onPress={() => {
              handleChange(item);
              setIsModalVisible(false);
              setOpenSheetMap(false);
              router.push('/appointment?type=PAYMENT');
            }}
            style={[
              styles.btnMap,
              { backgroundColor: isActive === item?.id ? '#FFFFFF' : 'rgba(0, 0, 0, 0.05)' }
            ]}>
            <Text style={[styles.itemTextMap]}>사용현황</Text></Pressable>
          <Pressable
            onPress={() => {
              handleChange(item),
                setOpenSheetMap(true)
            }}
            style={[styles.btnMap, { backgroundColor: isActive === item?.id ? '#FFFFFF' : '#FEA31B1A' }]}
          ><Text style={[styles.itemTextMap, { color: '#FEA31B' }]}>길찾기</Text></Pressable>
        </View>

      </TouchableOpacity>
    )
  }

  return (
    // <BottomSheetModal
    //   ref={bottomSheetModalRef}
    //   onChange={onChange}
    //   snapPoints={openSheetMap ? snapPointsMaps : (last ? snapPointsLast : snapPoints)}
    //   enableDynamicSizing={false}
    //   backdropComponent={renderBackdrop}
    //   onDismiss={() => setOpenSheetMap(false)}
    //   handleIndicatorStyle={{ backgroundColor: "transparent" }}
    //   footerComponent={openSheetMap ? renderFooter2 : renderFooter}
    // >
    //   <BottomSheetView style={styles.contentContainer}>
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <TouchableWithoutFeedback onPress={() => {
        setIsModalVisible(false);
        setOpenSheetMap(false);
        if (search) {
          setDebouncedSearch('');
        }
      }}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.contentContainer, openSheetMap ? { height: '25%' } : (last ? { height: Platform.OS === "ios" ? '95%' : '100%' } : { height: '85%' })]}>
              {show && !openSheetMap && (
                <View style={styles.container}>
                  <View style={styles.header}>
                    <Text style={styles.titleText}>지점 변경</Text>
                    <TouchableOpacity onPress={() => {
                      last && router.push('/');
                      setOpenSheetMap(false);
                      setIsModalVisible(false);
                    }}>
                      <CloseIcon />
                    </TouchableOpacity>
                  </View>

                  <Input
                    placeholder="지점 변경"
                    keyboardType="default"
                    rounded={true}
                    onChangeText={setSearch}
                    mode="flat"
                    right={
                      <TouchableOpacity style={styles.searchBtn}>
                        <SearchIcon />
                      </TouchableOpacity>
                    }
                  />
                  <FlatList
                    data={listStore}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={1}
                    style={{
                      flex: 1, marginTop: 20,
                      gap: 8,
                      marginBottom: 78
                    }}
                  />
                  {renderFooter()}
                </View>
              )}
              {openSheetMap && (
                <View style={[styles.container]}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.itemText, { fontSize: 18, lineHeight: 24 }
                      ]}
                    >
                      {storeActive?.name}
                    </Text>
                    <Text
                      style={[
                        styles.desText, { fontSize: 14, lineHeight: 20 }
                      ]}
                    >
                      {storeActive?.address?.value}
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 12, width: "100%", marginTop: 25 }}>
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
              )}
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
    flex: 1,
    width: "100%",
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    paddingTop: 10,
    paddingBottom: 10,
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
