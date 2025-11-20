import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import CloseIcon from "@/assets/images/svgs/close.svg";
import StoreCard from "@/components/CardStores";
import InfoWash from "@/components/InfoWash";
import Banner from "@/components/Banner";
import ModalConfirm from "@/components/ModalConfirm";
import moment from "moment";
import { useAppSelector } from "@/store/hook";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
const PlaceholderImage = require("@/assets/images/about1.png");
const About2 = require("@/assets/images/about2.png");
const StartBtn = require("@/assets/images/start.png");
import Calender from "@/assets/images/svgs/calender.svg";
import Clock from "@/assets/images/svgs/clock.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageErrorModal from "@/components/Modal/MessageError";
import MessageSuccessModal from "@/components/Modal/MessageSuccess";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slice/globalSlice";
import ModalStart from "@/components/mypage/ModalStart";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function MachineDetailPage() {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const { storeActive } = useAppSelector((state: any) => state.store);
  const [placeData, setPlaceData] = useState<any>();
  const [detaiOrder, setDetaiOrder] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleStart, setModalVisibleStart] = useState(false);

  const [visibleSuccess, setVisibleSuccess] = useState("");
  const [visibleError, setVisibleError] = useState("");

  const router = useRouter();

  const getOrderDetail = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.order.orderById,
        endPoint: `/orders/get/${id}`,
      });
      if (res) {
        setDetaiOrder(res?.order);
      }
    } catch (error) {
      console.error("Get me failed:", error);
    }
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  const getPlacesData = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.places.getListPlace,
        body: {
          sort: storeActive?.longitude ? "distance,asc" : undefined,
          longitude: storeActive?.longitude,
          latitude: storeActive?.latitude,
          idStore: storeActive?.id,
          cashPlace: true,
          size: 10,
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

  const handleCancel = async () => {
    dispatch(setLoading(true));
    try {
      const res: any = await sendApiRequest({
        ...(detaiOrder?.typeOrder === "ORDER_DRY_CLEANING"
          ? apiConfig.order.cancelOrderDryclearning
          : apiConfig.order.cancelOrder),
        body: {
          oid: detaiOrder?.oid,
        },
      });
      if (res) {
        // alert("예약 취소 완료되었습니다");
        setVisibleSuccess("예약 취소 완료되었습니다");
        router.push("/");
      }
    } catch (error) {
      setVisibleError("에러가 나거나 취소할 수 없습니다");
      // alert("에러가 나거나 취소할 수 없습니다");
    }
    dispatch(setLoading(false));
  };

  const handleStart = async (oid: string) => {
    dispatch(setLoading(true));
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.order.startMachineOrderApp,
        body: { oid },
      });
      if (res?.success) {
        dispatch(setLoading(false));
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
      else {
        dispatch(setLoading(false));
      }
    } catch (error: any) {
      console.error("error:", error);
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <View style={styles.homepage}>
          <View style={styles.singleMenu}>
            <Pressable onPress={() => router.push("/")}>
              <CloseIcon />
            </Pressable>
            <Text style={styles.menuText}>{detaiOrder?.machine?.name}</Text>
            <View style={styles.phoneIcon} />
          </View>

          {/* Timer Section */}
          <Banner>
            {detaiOrder?.orderStatus === "RUNNING" && (
              <View>
                <InfoWash {...detaiOrder} footer={false} />
              </View>
            )}
            {detaiOrder?.orderStatus === "V_READY" && (
              <InfoWash
                footer={false}
                custom={
                  <View style={styles.wrapperQr}>
                    <View style={styles.processWrapper}>
                      <Image source={StartBtn} style={styles.imageQr} resizeMode={'contain'} />
                    </View>
                    <View style={styles.infoQR}>
                      <View style={styles.infoRow}>
                        {/* <Image
                        source={{
                          uri: "https://i.ibb.co/DGqLqTq/Group-1000004195.png",
                        }}
                        style={styles.qrIcon}
                      /> */}
                        <Calender />
                        <Text style={styles.timeText}>
                          {moment(
                            detaiOrder?.relativeOrderMachine?.startTime
                          ).format("YYYY-MM-DD")}
                        </Text>
                      </View>
                      <View style={styles.infoRow}>
                        {/* <Image
                        source={{
                          uri: "https://i.ibb.co/LRmDy5L/clock.png",
                        }}
                        style={styles.qrIcon}
                      /> */}
                        <Clock />
                        <Text style={styles.timeText}>
                          {moment(
                            detaiOrder?.relativeOrderMachine?.startTime
                          ).format("HH:mm")}
                          ~
                          {moment(
                            detaiOrder?.relativeOrderMachine?.endTime
                          ).format("HH:mm")}
                        </Text>
                      </View>
                      <View style={styles.actionBtn}>
                        <Pressable style={styles.actionBtn1} onPress={() => setModalVisibleStart(true)}>
                          <Text style={[styles.cancelText, { color: '#FEA31B' }]}>바로 사용하기</Text>
                        </Pressable>
                        <Pressable style={styles.actionBtn2} onPress={() => setModalVisible(true)}>
                          <Text style={styles.cancelText}>예약취소</Text>
                        </Pressable>
                      </View>

                    </View>
                  </View>
                }
              />
            )}
          </Banner>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.aboutSection}>
            <Text style={styles.aboutText}>기다리는 동안, 읽어보세요!</Text>
            <View style={styles.aboutSliderContainer}>
              <ScrollView nestedScrollEnabled={true} horizontal>
                <View style={styles.aboutSlider}>
                  <Link
                    // className="border border-[#ff0000] border-solid block w-[325px] h-[108px] items-center justify-center"
                    href={"/about"}
                  >
                    <View>
                      <Image
                        source={PlaceholderImage}
                        style={[styles.aboutImage]}
                      />
                    </View>
                  </Link>

                  <Link
                    // className="block w-[325px] h-[108px]"
                    href={"http://hotel-laundry.co.kr"}
                  >
                    <View>
                      <Image source={About2} style={styles.aboutImage} />
                    </View>
                  </Link>
                </View>
              </ScrollView>
            </View>
          </View>

          <View style={styles.cashSection}>
            <View style={styles.cashSectionTitle}>
              <Text style={styles.cashText}>캐시를 모을 수 있는 주변가게</Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/places",
                    params: { filter: "nearCash" },
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
                  {placeData?.map((el: any) => (
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
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <ModalConfirm
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          onConfirm={handleCancel}
        />

        <ModalStart
          setModalVisible={setModalVisibleStart}
          modalVisible={modalVisibleStart}
          onConfirm={() => handleStart(detaiOrder?.oid)}
          title={`${detaiOrder?.machine?.name} 바로 사용하시겠어요?`}
        />

        <MessageSuccessModal
          message={visibleSuccess}
          visible={Boolean(visibleSuccess)}
          handleCloseModal={() => setVisibleSuccess("")}
        />

        <MessageErrorModal
          message={visibleError}
          visible={Boolean(visibleError)}
          handleCloseModal={() => setVisibleError("")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    gap: 7
  },
  actionBtn1: {
    width: 102,
    height: 32,
    backgroundColor: '#222222',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionBtn2: {
    width: 72,
    height: 32,
    backgroundColor: '#00000073',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  machineId: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  machineInfo: {
    gap: 16,
  },
  additionalStyle: {
    borderBottomEndRadius: 20,
  },
  machineImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  label: {
    width: 80,
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
  },
  homepage: {
    flex: 1,
    maxWidth: "100%",
    alignSelf: "center",
    width: "100%",
    borderBottomEndRadius: 30,
  },
  header: {
    // Header styles
  },
  statusBar: {
    backgroundColor: "#2F265D",
    height: 35,
  },
  // Thêm các styles khác...
  contentWrapper: {
    paddingHorizontal: 14,
    marginBottom: 20,
    marginTop: 20,
  },
  statusBarInner: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 18,
  },
  statusBarImage1: {
    width: 54,
    height: 21,
    resizeMode: "contain",
  },
  statusBarImage2: {
    width: 66,
    height: 11,
    resizeMode: "contain",
  },
  singleMenu: {
    backgroundColor: "rgba(47, 38, 93, 1)",
    flexDirection: "row",
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  menuText: {
    color: "rgb(241, 241, 241)",
    fontSize: 17,
    fontWeight: "500",
  },
  phoneIcon: {
    width: 24,
    height: 24,
  },
  timerSection: {
    flexDirection: "row",
    gap: 19,
    marginTop: 0,
    height: SCREEN_WIDTH * 0.853,
  },
  timerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  timerInfo: {
    justifyContent: "center",
    height: 133,
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
  processWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: -15
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
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderBottomEndRadius: 30,
  },
  aboutSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  aboutText: {
    color: "#222222",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "left",
    width: "100%",
    marginBottom: 10,
  },
  aboutSliderContainer: {
    width: "100%",
  },
  aboutSlider: {
    flexDirection: "row",
    gap: 10,
  },
  aboutImage: {
    width: 325,
    height: 108,
    // resizeMode: "contain",
  },
  cashSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  cashSectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  cashSliderContainer: {
    width: "100%",
  },
  cashSlider: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 10,
  },
  cashText: {
    color: "#222222",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "left",
    width: "100%",
  },
  wrapperQr: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 8,
    gap: 19,
  },
  imageQr: {
    width: 151,
    height: 157,
  },
  infoQR: {
    justifyContent: "flex-end",
  },
  qrIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  timeText: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
  },
  cancelText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    // textDecorationLine: "underline",
    // marginTop: 5
  },
});
