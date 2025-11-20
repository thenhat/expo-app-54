import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import ButtonGroup from "@/components/ButtonGroup";
import StoreCard from "@/components/CardStores";
import Header from "@/components/Header";
import ImageCarousel from "@/components/ImageCarousel";
import { Image } from "expo-image";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Banner from "@/components/Banner";
import InfoWash from "@/components/InfoWash";
import { apiConfig } from "@/constants/apiConfig";
import { useAuthContext } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import sendApiRequest from "@/utils/api";
import MessageErrorModal from "@/components/Modal/MessageError";
import MessageSuccessPayment from "@/components/Modal/MessageSuccessPayment";
import { StatusBar } from "expo-status-bar";
import { setTimeOrder } from "@/store/slice/storeSlice";
import { setProcessedPaymentId } from "@/store/slice/globalSlice";

const About3 = require("@/assets/images/about3.jpg");
const PlaceholderImage = require("@/assets/images/about1.png");
const About2 = require("@/assets/images/about2.png");

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ArrowImg = require("@/assets/images/chevron-right.png");
const MarketIcon = require("@/assets/images/icon_market.png");

const dataDefault = [
  {
    user: "",
    orderStatus: "appointment",
    typeWash: "",
    time: "",
    link: "/auth/login",
    progress: 0,
  },
];

const dataNoLogin = [
  {
    user: "",
    orderStatus: "no-login",
    typeWash: "세탁기 20KG – 101호",
    time: "11:30PM",
    link: "/auth/login",
    progress: 0,
  },
];

export default function HomePage(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const screenWidth = Dimensions.get('window').width;

  const { storeActive, orderType } = useAppSelector((state: any) => state.store);
  const { processedPaymentId } = useAppSelector((state: any) => state.global);

  const { profile }: any = useProfile();
  const [placeData, setPlaceData] = useState<any>();
  const { isAuthenticated } = useAuthContext();
  const [dataSlider, setDataSlider] = useState(dataNoLogin);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const { isError, isSuccess, id, paymentId } = useLocalSearchParams<any>();

  useEffect(() => {
    if (isError && paymentId && paymentId !== processedPaymentId) {
      dispatch(setProcessedPaymentId(paymentId));
      setOpenError(true);
      setTimeout(() => {
        router.replace('/');
      }, 100);
    }
  }, [isError, paymentId, processedPaymentId, dispatch]);

  useEffect(() => {
    if (isSuccess && paymentId && paymentId !== processedPaymentId) {
      dispatch(setProcessedPaymentId(paymentId));
      setOpenSuccess(true);
      setTimeout(() => {
        router.replace('/');
      }, 100);
    }
  }, [isSuccess, paymentId, processedPaymentId, dispatch]);

  const fetchListLaundry = async () => {
    const res: any = await sendApiRequest({
      ...apiConfig.order.orderByLaundry,
      body: { orderStatuses: "V_READY,RUNNING" },
    });
    if (res?._embedded) {
      setDataSlider([...res?._embedded?.orders]);
    } else {
      setDataSlider(dataDefault);
    }
  };

  const getPlacesData = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.places.getListPlace,
        body: {
          sort: storeActive?.longitude ? "distance,asc" : undefined,
          longitude: storeActive?.longitude,
          latitude: storeActive?.latitude,
          idStore: storeActive?.id,
        },
        requiredToken: false,
      });
      if (res?.data) {
        const data = res?.data?.content;
        setPlaceData(data);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    if (storeActive?.longitude) {
      getPlacesData();
    }
  }, [storeActive]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchListLaundry();
    } else {
      setDataSlider(dataNoLogin);
    }
  }, [isAuthenticated]);

  const handleOpenBottomSheet = (index: number) => {
    if (index === 0) return router.push("/appointment?type=PAYMENT");
    // if (index === 1) return router.push("/appointment?type=BOOKING");
    if (index === 2) {
      router.push("/appointment?type=DRYCLEANING");
      // setIsBottomSheetOpen(true);
    }
  };

  const handleOpenListStore = () => {
    dispatch(setTimeOrder(''));
    router.push("/appointment?type=BOOKING&last=true");
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style={Platform.OS === "ios" ? "dark" : "auto"}
        backgroundColor="#2F265D"
      />
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <View style={styles.homepage}>
          {/* Single Menu Section */}
          <Banner>
            <Header />

            {/* Timer Section */}
            <ImageCarousel
              items={dataSlider?.map((item: any, index) => {
                const dataId = { idStore: item?.id }
                let checkWashActive = false;
                if (
                  item?.orderStatus === "RUNNING" ||
                  item?.orderStatus === "V_READY"
                )
                  checkWashActive = true;
                return (
                  <View className="min-w-full px-1">
                    <View style={styles.tagsWrapper}>
                      <Link href={"/mypage"} style={styles.userName}>
                        {profile?.fullName}
                      </Link>
                      <View>
                        <Pressable style={styles.statusContainer} onPress={() => !checkWashActive ? handleOpenListStore() : {}}>
                          {/* <Text style={styles.statusText}>
                            {ConvertStatus(item?.orderStatus)}
                          </Text> */}

                          {(storeActive?.name || storeActive?.store) && !id &&
                            (item?.orderStatus === "V_READY" ? (
                              <View style={styles.headerContainer}>
                                <Image
                                  source={MarketIcon}
                                  style={styles.headerIcon}
                                />
                                <Text style={[styles.headerText, { fontSize: screenWidth < 375 ? 11 : 14, paddingBottom: 1 }]}>{storeActive?.store?.name || storeActive?.name}</Text>
                              </View>
                            ) : (
                              <View style={styles.headerContainer}>
                                <Image
                                  source={MarketIcon}
                                  style={styles.headerIcon}
                                />
                                <Text style={[styles.headerText, styles.textDefault, { fontSize: screenWidth < 375 ? 11 : 14, paddingBottom: 1 }]}>
                                  {storeActive?.store?.name || storeActive?.name}
                                </Text>
                              </View>
                            ))}
                          {!checkWashActive && (
                            <Image
                              source={ArrowImg}
                              style={styles.statusIcon}
                            />
                          )}
                        </Pressable>
                      </View>
                    </View>
                    <InfoWash key={index} {...item} {...dataId} />
                  </View>
                );
              })}
            />
          </Banner>
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.buttonGroup}>
            <ButtonGroup
              labels={["일반세탁결제", "예약", "드라이클리닝결제"]}
              selectedIndex={1}
              onSelect={(index) => handleOpenBottomSheet(index)}
              disabled={!storeActive?.wetCleaning}
            />
          </View>
          <View style={styles.aboutSection}>
            <Text style={styles.aboutText}>About Hotel Laundry</Text>
            <View style={styles.aboutSliderContainer}>
              <ScrollView nestedScrollEnabled={true} horizontal>
                <View style={styles.aboutSlider}>
                  <Link href={"/usage"}>
                    <Image source={About3} style={[styles.aboutImage, { width: screenWidth - 28 }]} />
                  </Link>
                  <Link href={"/about"}>
                    <Image
                      source={PlaceholderImage}
                      style={[styles.aboutImage, { width: screenWidth - 28 }]}
                    />
                  </Link>
                  {/* <Link href={"http://hotel-laundry.co.kr"}>
                    <Image source={About2} style={[styles.aboutImage, { width: screenWidth - 28 }]} />
                  </Link> */}
                  {/* <Image source={PlaceholderImage} style={styles.aboutImage} />
                  <Image source={PlaceholderImage} style={styles.aboutImage} /> */}
                </View>
              </ScrollView>
            </View>
          </View>

          <View style={styles.cashSection}>
            <View style={styles.cashSectionTitle}>
              <Text style={styles.cashText}>
                우리동네 주변가게를 응원합니다!
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/places",
                    params: { filter: "near" },
                  })
                }
              >
                <ArrowRightIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.cashSliderContainer}>
              <ScrollView
                nestedScrollEnabled={true}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.cashSlider}>
                  {(!placeData || placeData.length === 0) ? (
                    <View style={styles.emptyPlacesContainer}>
                      <Text style={styles.emptyPlacesText}>
                        해당 주변가게가 없습니다
                      </Text>
                    </View>
                  ) : (
                    placeData?.map((el: any) => (
                      <View key={el.id}>
                        <StoreCard
                          id={el.id}
                          name={el.name}
                          distance={`${Math.floor(+el.distance * 1000)}M`}
                          imageUrl={el.image1}
                          cash={el.cashPlace}
                          event={el.event}
                        />
                      </View>
                    ))
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>

      <MessageErrorModal
        visible={openError}
        handleCloseModal={() => setOpenError(false)}
        message="결제 실패했습니다."
      />
      <MessageSuccessPayment
        visible={openSuccess}
        handleCloseModal={() => setOpenSuccess(false)}
        message="결제완료"
        onAction={() => {
          setOpenSuccess(false);
          router.push({
            pathname: "/mypage/usage-history",
            params: {
              statusParam: "pending",
              filterParam: orderType === 'machine' ? 'TYPE_A' : 'TYPE_B',
            }
          });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  contentContainer: { flex: 1, alignItems: "center" },
  bottomSheetContent: { padding: 16 },
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  homepage: {
    flex: 1,
    maxWidth: "100%",
    alignSelf: "center",
    width: "100%",
    position: "relative",
    borderBottomEndRadius: 30,
  },
  header: {
    // Header styles
  },
  statusBar: { backgroundColor: "#2F265D", height: 35 },
  contentWrapper: { paddingHorizontal: 14, marginBottom: 20, marginTop: 20 },
  statusBarInner: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 18,
  },
  statusBarImage1: { width: 54, height: 21, resizeMode: "contain" },
  statusBarImage2: { width: 66, height: 11, resizeMode: "contain" },
  singleMenu: {
    backgroundColor: "rgba(47, 38, 93, 1)",
    flexDirection: "row",
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  menuIcon: { width: 24, height: 24, resizeMode: "contain" },
  menuText: { color: "rgb(241, 241, 241)", fontSize: 17, fontWeight: "500" },
  phoneIcon: { width: 24, height: 24 },
  textDefault: {
    color: "#2f265d",
  },
  timerSection: {
    flexDirection: "row",
    gap: 19,
    marginTop: 80,
    height: SCREEN_WIDTH * 0.853,
  },
  timerImage: { width: "100%", height: "100%", resizeMode: "contain" },
  timerInfo: { justifyContent: "center", height: 133 },
  remainingTime: { color: "white", fontSize: 32, fontWeight: "700" },
  endTime: {
    color: "rgb(96, 241, 174)",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 19,
  },
  buttonGroup: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  aboutSection: { justifyContent: "center", alignItems: "center" },
  aboutText: {
    color: "#222222",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "left",
    width: "100%",
    marginBottom: 10,
  },
  aboutSliderContainer: { width: "100%" },
  aboutSlider: { flexDirection: "row", gap: 10 },
  aboutImage: { height: 120, resizeMode: "stretch", borderRadius: 5 },
  cashSection: { justifyContent: "center", alignItems: "center" },
  cashSectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    // width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  cashSliderContainer: { width: "100%" },
  cashSlider: { flexDirection: "row", gap: 10, paddingBottom: 10 },
  cashText: {
    color: "#222222",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "left",
    width: "100%",
  },
  emptyPlacesContainer: {
    width: SCREEN_WIDTH - 28,
    minWidth: SCREEN_WIDTH - 28,
    paddingVertical: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyPlacesText: {
    color: "#9B9B9B",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  processWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 145,
  },
  timerImageContainer: {
    width: 133,
    height: 133,
    borderWidth: 6,
    borderRadius: 100,
    borderColor: "#60F1AE",
    borderRightColor: "#FFFFFF4D",
    borderTopColor: "#FFFFFF4D",
    borderLeftColor: "#FFFFFF4D",
  },
  orderContent: { alignItems: "flex-start" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderRadius: 20,
    // padding: 8,
    // paddingHorizontal: 15,
    color: "#fff",
    gap: 8,
    paddingRight: 5,
    // borderWidth: 1,
    // borderColor: "#000000",
  },
  headerIcon: { width: 13, height: 13, resizeMode: "contain" },
  headerText: { color: "rgba(47, 38, 93, 1)", fontSize: 14, fontWeight: "500" },
  reservationInfo: { width: "100%", marginTop: 15 },
  timeContainer: { justifyContent: "center" },
  todayText: { color: "white", fontSize: 16, fontWeight: "700" },
  reservationTime: { color: "white", fontSize: 30, fontWeight: "700" },
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
  qrIcon: { width: 22, height: 22, resizeMode: "contain" },
  tagsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingLeft: 20,
    marginTop: 15,
    // paddingVertical: 10,
  },
  userName: {
    color: "#000000BF",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    color: "#000000BF",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  statusIcon: { width: 18, height: 18, resizeMode: "contain" },
});

const ConvertStatus = (type: any) => {
  switch (type) {
    case "RUNNING":
      return "세탁중이에요";
    case "V_READY":
      return "세탁 예정이에요";
    case "appointment":
      return "세탁이 필요할 땐 호텔 런드리";

    case "no-login":
      return "로그인하고 세탁서비스를 예약하세요";
    default:
      break;
  }
};
