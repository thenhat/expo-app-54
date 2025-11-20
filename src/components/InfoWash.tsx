import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ArrowRightIcon from "@/assets/images/svgs/arrow-right.svg";

import CircularProgress from "./CircularProgress";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import { useAppSelector } from "@/store/hook";
import { useDispatch } from "react-redux";
import { setTimeOrder } from "@/store/slice/storeSlice";

interface Props {
  orderStatus?:
  | "RUNNING"
  | "V_READY"
  | "success"
  | "appointment"
  | "no-login"
  | undefined;
  address?: string;
  typeWash?: string;
  time?: string;
  endTime?: string;
  footer?: boolean;
  key?: number;
  custom?: any;
  progress?: number;
  relativeOrderMachine?: any;
  store?: any;
  timeScannedQR?: any;
  idStore?: any;
}

const InfoWash: React.FC = (props: any) => {
  const { orderStatus,
    footer = true,
    custom,
    progress,
    store,
    relativeOrderMachine,
    timeScannedQR, idStore } = props;
  const { id } = useLocalSearchParams();
  const { storeActive } = useAppSelector((state: any) => state.store);
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');

  const router = useRouter();
  const [coundown, setCoundown] = useState(0);

  useEffect(() => {
    if (progress) {
      setCoundown(progress)
    } else {
      if (relativeOrderMachine?.endTime && timeScannedQR) {
        const currentTime = moment().valueOf();
        const endTime = moment(relativeOrderMachine?.endTime).valueOf();
        const scannedTime = moment(timeScannedQR).valueOf();

        const progress = (endTime - currentTime) / (endTime - scannedTime);
        setCoundown(progress);
      } else {
        setCoundown(0);
      }
    }
  }, [progress, relativeOrderMachine, timeScannedQR]);

  const handleDetail = () => {
    if (checkWashActive) {
      // router.push(`/machine-detail/${id || idStore}`)
      if (relativeOrderMachine?.washingMode?.includes("WET_CLEANING")) {
        router.push("/mypage/usage-history");
        router.push({
          pathname: "/mypage/usage-history",
          params: {
            statusParam: "pending",
            filterParam: 'TYPE_B',
          },
        });
      } else {
        router.push("/mypage/usage-history");
      }
    } else {
      router.push("/appointment")
    }
  }

  let checkWashActive = false;
  let checkSuccess = false;

  if (orderStatus === "RUNNING" || orderStatus === "V_READY") checkWashActive = true;
  if (moment().valueOf() > moment(relativeOrderMachine?.endTime).valueOf() && orderStatus === "RUNNING") checkSuccess = true;

  return (
    <View style={styles.wrapper}>
      <View style={styles.timerSection}>
        {!custom ? (
          <>
            <View className="flex flex-col gap-3 items-center">
              <Pressable className="w-[110px] h-[15px] flex items-center justify-center">
              </Pressable>
              <Pressable style={styles.processWrapper}
                onPress={() =>
                  router.push({
                    pathname: "/store-detail/[id]",
                    params: { id: store?.id || storeActive?.id },
                  })
                }>
                <CircularProgress size={145} strokeWidth={6} progress={coundown > 1 ? 1 : coundown} />
              </Pressable>
              {/* <Pressable className="cursor-pointer w-[110px] h-[32px] bg-[#FFFFFF] flex items-center justify-center rounded-full leading-[20px]"
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/qrcode",
                    params: { open: 'true' },
                  })
                }
              >
                <Text className="text-[#2F265D] text-[13px] font-montserrat600">원격복구촬영</Text>
              </Pressable> */}
            </View>

            <View style={styles.timerInfo}>
              <View style={styles.orderContent}>
                {id && (
                  <View style={{ height: 30 }}>

                  </View>
                )}
                {/* Phần header với logo */}
                {/* {(storeActive?.name || store) && !id &&
                  (orderStatus === "V_READY" ? (
                    <Pressable style={styles.headerContainer} onPress={() => (dispatch(setTimeOrder('')), router.push("/appointment?type=BOOKING&last=true"))}>
                      <Image
                        source={{
                          uri: "https://i.ibb.co/hJPRJ0wq/icon-market.png",
                        }}
                        style={styles.headerIcon}
                      />
                      <Text style={[styles.headerText, { fontSize: width < 375 ? 11 : 13 }]}>{store?.name || storeActive?.name}</Text>
                    </Pressable>
                  ) : (
                    <Pressable style={styles.headerContainer} onPress={() => (dispatch(setTimeOrder('')), router.push("/appointment?type=BOOKING&last=true"))}>
                      <Image
                        source={{
                          uri: "https://i.ibb.co/hJPRJ0wq/icon-market.png",
                        }}
                        style={styles.headerIcon}
                      />
                      <Text style={[styles.headerText, styles.textDefault, { fontSize: width < 375 ? 11 : 13 }]}>
                        {store?.name || storeActive?.name}
                      </Text>
                    </Pressable>
                  ))} */}

                {/* Phần thông tin đặt chỗ */}
                {checkWashActive && (!id || !checkSuccess) && (
                  <View style={styles.reservationInfo}>
                    <View style={styles.timeContainer}>
                      {orderStatus == "V_READY" && (
                        <Text style={styles.todayText}>오늘</Text>
                      )}
                      <Text style={[styles.reservationTime, { fontSize: width < 375 ? 22 : 28 }]}>
                        {RenderTypeTime(orderStatus, relativeOrderMachine?.startTime, relativeOrderMachine?.endTime)} {StatusTime(orderStatus)}
                      </Text>
                    </View>
                    {!id && <Text style={styles.machineInfo}>{relativeOrderMachine?.machineNameStandard}</Text>}
                  </View>
                )}
                {checkSuccess && id && (
                  <View style={styles.reservationInfo}>
                    <View style={styles.timeContainer}>
                      <Text style={styles.reservationTime}>세탁종료</Text>
                      <Text style={styles.desText}>세탁물을 꺼내주세요.</Text>
                    </View>
                  </View>
                )}

                {relativeOrderMachine?.endTime && id && !checkSuccess && (
                  <View style={styles.scheduled}>
                    <Text style={styles.endTime}>종료 예정 {moment(relativeOrderMachine?.endTime).format("HH:mm")}</Text>
                  </View>
                )}

                {/* Phần QR code */}
                {footer && checkWashActive && (
                  <TouchableOpacity
                    style={styles.qrContainer}
                    onPress={handleDetail}
                  >
                    <View>
                      <Text style={styles.qrText}>
                        {"자세히보기"}
                      </Text>
                    </View>
                    <ArrowRightIcon />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        ) : (
          custom
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 230,
    paddingHorizontal: 12,
    paddingBottom: 40,
    position: "relative",
  },
  scheduled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50
  },
  contentContainer: { flex: 1, alignItems: "center" },
  footerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  userName: {
    color: "#000000BF",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    position: "relative",
  },
  timerSection: {
    flexDirection: "row",
    gap: 15,
    marginTop: 0,
    position: "relative",
    minHeight: 145,
    width: "100%",
    // height: SCREEN_WIDTH * 0.853,
  },
  processWrapper: {
    // justifyContent: "center",
    // alignItems: "center",
    // height: 145,
    marginTop: 25
  },
  timerInfo: {
    marginTop: 20,
    justifyContent: "center",
    // height: 133,
  },
  orderContent: {
    alignItems: "flex-start",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 15,
    color: "#fff",
    gap: 8,
    borderWidth: 1,
    borderColor: "#000000",
  },
  headerContainerSchedule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(96, 241, 174, 1)",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 15,
    gap: 8,
  },
  headerIcon: {
    width: 13,
    height: 12,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 13,
    color: "rgba(47, 38, 93, 1)",
    fontWeight: "700",
  },
  textDefault: {
    color: "#000000",
  },
  reservationInfo: {
    width: "100%",
    marginTop: 12,
  },
  timeContainer: {
    justifyContent: "center",
  },
  desText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  todayText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 0,
    textShadowColor: 'rgba(7,53,115,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  appointmentText: {
    color: "white",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 10,
    fontWeight: "700",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  reservationTime: {
    color: "white",
    fontSize: 28,
    lineHeight: 35,
    marginBottom: 5,
    fontWeight: "700",
    textShadowColor: 'rgba(7,53,115,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  machineInfo: {
    color: "white",
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "300",
    marginTop: 5,
    textShadowColor: 'rgba(7,53,115,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  qrContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    gap: 5,
  },
  qrText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
    textShadowColor: 'rgba(7,53,115,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  qrIcon: {
    width: 22,
    height: 22,
    resizeMode: "cover",
  },
  remainingTime: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
  },
  endTime: {
    color: "#FEA31B",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default InfoWash;

const StatusTime = (type: any) => {
  switch (type) {
    case "RUNNING":
      return "남음";
    case "V_READY":
      return "예약";
    default:
      break;
  }
};

const RenderTypeTime = (type: any, startTine: any, endTime?: any) => {
  switch (type) {
    case "RUNNING":
      return moment(endTime).diff(moment(), 'minutes') > 0 ? moment.utc(moment(endTime).diff(moment())).format("HH:mm") : "00:00";
    case "V_READY":
      return moment(startTine).format("HH:mm A");
    default:
      break;
  }
};
