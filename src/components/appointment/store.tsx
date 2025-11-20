import {
  Text,
  View,
  StyleSheet,
  Animated,
  Pressable,
  Platform,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import Button from "@/components/Button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChevronDownIcon from "@/assets/images/svgs/chevron-down.svg";
import ChooseMachine from "./chooseMachine";
import LaundryOptions from "./LaundryOptions";
import OptionMapMachine from "./OptionMapMachine";
import OptionMap from "../OptionMap";
import DateTimePicker from "@react-native-community/datetimepicker";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { roundTimeQuarterHour } from "@/utils/format";
import { setOrderType, setTimeOrder } from "@/store/slice/storeSlice";
import { useColorScheme } from "react-native";
import { useProfile } from "@/hooks/useProfile";

export default function AppointmentScreen() {

  const router = useRouter();
  const scrollViewRef = useRef<any>(null);
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const textColor = 'black';
  const { type }: any = useLocalSearchParams<{ user: string }>();
  const { profile }: any = useProfile();

  const arrowAnimation = useRef(new Animated.Value(0)).current; // Initial animation value
  const arrowAnimationTime = useRef(new Animated.Value(0))?.current; // Initial animation value
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisibleTime, setIsDropdownVisibleTime] = useState(false);
  const [isShowOptionMap, setIsShowOptionMap] = useState(false);

  const isBooking = (type === "BOOKING") || (type === "DRY_BOOKING");
  const isPayment = (type === "PAYMENT") || type === "DRYCLEANING";
  const isDryCleaning = (type === "DRYCLEANING");

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [style, setStyle] = useState<any>([]);
  const [mode, setMode] = useState<any>({});
  const [dateTime, setDateTime] = useState(moment(roundTimeQuarterHour(new Date()))
    .add(60, "m")
    .toDate()
  );
  const [startTimeBooking, setStartTimeBooking] = useState<any>('');
  const [startTimeLineup, setStartTimeLineup] = useState<any>('');
  const [showTime, setShowTime] = useState(false);
  const [isLineup, setLineup] = useState(false);
  const [listDataMachine, setListDataMachine] = useState<any>([]);
  const [machineActive, setMachineActive] = useState<any>({});
  const [priceMachine, setPriceMachine] = useState<any>({});
  const [isModalVisibleOption, setIsModalVisibleOption] = useState<boolean>(false);

  const [isModalVisibleLaudry, setIsModalVisibleLaudry] = useState<boolean>(false);

  const [isModalVisibleIos, setIsModalVisibleIos] = useState<boolean>(false);

  const { storeActive, timeOrder } = useSelector((state: any) => state.store);

  const radioOptions = [
    { value: 0, label: '바로 사용하기' },
    { value: 1, label: '예약하기' },
  ];


  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    if (timeOrder) {
      setDateTime(moment(timeOrder).toDate());
    }
  }, [timeOrder]);

  useEffect(() => {
    if (machineActive?.id) {
      handlePresentOptionPress();
    }
  }, [machineActive]);

  useEffect(() => {
    if (machineActive?.id) {
      const isWashing = machineActive?.typeCode.includes('WASHING_');
      setLineup(isPayment && machineActive?.state?.key === 2 && isWashing);

      if (isPayment && machineActive?.state?.key === 2 && isWashing) {
        fetchLineup();
      }
    }
  }, [isPayment, machineActive]);

  const fetchLineup = async () => {
    try {
      const resLinedUp: any = await sendApiRequest({
        ...apiConfig.order.timeOrderLinedUp,
        body: {
          idMachine: machineActive.id,
          washingMode: "DEFAULT"
        },
      });
      if (resLinedUp) {
        setStartTimeLineup(moment(resLinedUp?.startTime).toDate());
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    storeActive?.id && fetchInfoStore(storeActive?.id)
  }, [storeActive, date, dateTime, profile]);

  const convertDateUse = () => {
    let startDateUse: any;
    let endDateUse: any;

    if (isLineup) {
      startDateUse = startTimeLineup;
    } else if (isPayment) {
      startDateUse = moment(new Date()).add(1, "m").toDate();
    } else {
      startDateUse = startTimeBooking;
    }
    endDateUse = moment(startDateUse).add(priceMachine?.timeWash, "m").toDate();

    return {
      startDateUse,
      endDateUse
    }
  }

  const handleClickMachine = async (e: any) => {
    setMachineActive(e);
    scrollToBottom();
  }

  const currentDate = new Date();
  const minimumDateTime = new Date(currentDate.getTime() + 60 * 60 * 1000);

  const calculateEndTime = (startTime: Date, duration: number) => {
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + duration);
    return endTime;
  };

  const fetchInfoStore = async (id: number) => {
    let time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const isBooking = type === "BOOKING";
    const isDryBooking = type === "DRY_BOOKING";
    const isPayment = type === "PAYMENT";
    const isDryCleaning = type === "DRYCLEANING";

    if (isBooking || isDryBooking) {
      const momentDate = moment(date);
      const momentTime = moment(dateTime);

      time =
        momentDate.format("YYYY-MM-DD") + " " + momentTime.format("HH:mm:ss");
      const formattedStartTime =
        momentDate.format("YYYY-MM-DD") + "T" + momentTime.format("HH:mm:ss");
      setStartTimeBooking(formattedStartTime);
    }

    const res: any = await fetchApiStore(id, time);
    if (res?.msg === "success") {
      let filteredMachines = res?.data?.machineTimeResBodies;

      if (isPayment) {
        filteredMachines = res?.data?.machineTimeResBodies;
      } else if (isBooking) {
        filteredMachines = res?.data?.machineTimeResBodies?.filter((item: any) =>
          item.typeCode.includes("WASHING_")
        );
      } else if (isDryCleaning) {
        filteredMachines = res?.data?.machineTimeResBodies?.filter((item: any) =>
          item.modes.some(
            (mode: any) =>
              mode.key === "WET_CLEANING_DRY" || mode.key === "WET_CLEANING"
          )
        );
      } else if (isDryBooking) {
        filteredMachines = res?.data?.machineTimeResBodies?.filter((item: any) =>
          item.modes.some((mode: any) => mode.key === "WET_CLEANING")
        );
      }

      const selectedEndTime = calculateEndTime(
        isBooking || isDryBooking ? dateTime : new Date(),
        60
      );

      const finalList = filteredMachines.filter((item: any) => {
        const isActive = item.activeOrder;
        const isTimeAvailable = !item?.orderTimeResBodies?.some(
          (orderTime: any) => {
            const orderStartTime = new Date(orderTime.startTime);
            const orderEndTime = new Date(orderTime.endTime);
            const selectedTime = isBooking || isDryBooking ? dateTime : new Date();
            return (
              orderStartTime < selectedEndTime && orderEndTime > selectedTime
            );
          }
        );

        return (isBooking || isDryBooking) ? (isActive && isTimeAvailable) : isActive;;
      });

      setListDataMachine(finalList);
    }
  };

  const fetchApiStore = async (id: number, time: string) => {
    const respon = await sendApiRequest({
      ...apiConfig.store.getStoreInfo,
      endPoint: `/stores/${id}`,
      body: {
        time: time
      },
    });
    return respon
  }

  const handleOrder = async () => {
    try {
      let check = isBooking ? { useQRCode: true } : {};
      const res: any = await sendApiRequest({
        ...apiConfig.order.createOrder,
        body: {
          idMachine: machineActive?.id,
          startTime: moment(convertDateUse()?.startDateUse).format("YYYY-MM-DDTHH:mm:ss"),
          endTime: moment(convertDateUse()?.endDateUse).format("YYYY-MM-DDTHH:mm:ss"),
          moreDry: machineActive?.badge === "사용중",
          options: style,
          orderDevice: "MOBILE",
          orderLineup: isLineup,
          payMethod: "CARD",
          priceCoupon: 0,
          priceMachine: priceMachine?.priceMachine,
          pricePoint: 0,
          ...check,
          washingMode: mode?.value
        },
      });

      if (res?.msg === "success") {
        const data = res?.data;
        dispatch(setTimeOrder(moment(convertDateUse()?.startDateUse).format("YYYY-MM-DDTHH:mm:ss")));
        (type === "DRYCLEANING" || type === "DRY_BOOKING") ? dispatch(setOrderType('cleaning')) : dispatch(setOrderType('machine'));
        setIsModalVisibleLaudry(false);
        router.push({
          pathname: "/payment",
          params: {
            oid: data.oid,
            startDate: convertDateUse()?.startDateUse,
            endDate: convertDateUse()?.endDateUse,
            machineActive: JSON.stringify(machineActive),
            idMachine: machineActive?.id,
            washingMode: mode?.value,
            options: JSON.stringify(style),
            mode: JSON.stringify(mode),
            totalPrice: priceMachine?.priceMachine
          },
        })
      }
    } catch (error: any) {
      console.log("Create order failed:", error?.response?.data?.message);
      Alert.alert(
        "알림",
        error?.response?.data?.message,
        [{ text: "확인" }]
      );
    }
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onChangeTime = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowTime(Platform.OS === "ios");
    setDateTime(currentDate);
  };

  const snapPoints = useMemo(() => ["25%", "50%", "75%", "100%"], []);
  const snapPointsOption = useMemo(() => ["60%"], []);
  const snapPointsDate = useMemo(() => ["48%"], []);

  const handleSheetChanges = () => {
    if (isDropdownVisible) {
      toggleDropdown();
    }
    if (isDropdownVisibleTime) {
      toggleDropdownTime();
    }
    if (isShowOptionMap) {
      setIsShowOptionMap(false);
    }
  }

  const handleSheetChangesOption = () => {
    setMachineActive({});
  }

  const handleSheetChangesDate = () => {
    show && setShow(false);
    showTime && setShowTime(false);
  };

  const renderFooter =
    () => (
      <View style={styles.footerContainer}>
        <Button
          styleButton={{ width: "100%" }}
          label="선택완료"
          size="large"
          mode="contained"
          color="primary"
          onPress={() => { }}
        />
      </View>
    );

  const handlePresentModalPress = useCallback(() => {
    setIsModalVisibleOption(true)
  }, []);

  const handlePresentOptionPress = useCallback(() => {
    setIsModalVisibleLaudry(true)
  }, []);

  const handlePresentDatePress = useCallback(() => {
    setIsModalVisibleIos(true)
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible((prev) => {
      if (!prev) handlePresentModalPress();
      return !prev;
    });
    // Start arrow animation
    Animated.timing(arrowAnimation, {
      toValue: isDropdownVisible ? 0 : 1, // Rotate back (0) or forward (1)
      duration: 200,
      useNativeDriver: true, // Optimize animation
    }).start();
  }, [arrowAnimation, isDropdownVisible]);

  const toggleDropdownTime = useCallback(() => {
    setIsDropdownVisibleTime((prev) => {
      if (!prev) handlePresentModalPress();
      return !prev;
    });
    // Start arrow animation
    Animated.timing(arrowAnimationTime, {
      toValue: isDropdownVisibleTime ? 0 : 1, // Rotate back (0) or forward (1)
      duration: 200,
      useNativeDriver: true, // Optimize animation
    }).start();
  }, [arrowAnimationTime, isDropdownVisibleTime]);

  const rotateArrow = useMemo(
    () =>
      arrowAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"], // Rotate from 0° to 180°
      }),
    [arrowAnimation]
  );

  const rotateArrowTime = useMemo(
    () =>
      arrowAnimationTime.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"], // Rotate from 0° to 180°
      }),
    [arrowAnimationTime]
  );

  return (
    <View>
      <ScrollView ref={scrollViewRef} nestedScrollEnabled={true}>
        <View style={styles.container}>
          <OptionMap />
          {(isBooking) &&
            <View style={styles.chooseTime}>
              <Text style={styles.chooseTimeTitle}>이용일자/시간</Text>
              <View style={styles.listChoose}>
                <Pressable
                  style={styles.dropdownButton}
                  // onPress={toggleDropdown}
                  onPress={() => (setShow(true), handlePresentDatePress())}
                >
                  <Text style={styles.chooseText}>
                    {/* {date.toLocaleDateString("en-GB")} */}
                    {moment(date).format("YYYY/MM/DD")}
                  </Text>
                  <Animated.View style={{ transform: [{ rotate: rotateArrow }] }}>
                    <ChevronDownIcon />
                  </Animated.View>
                </Pressable>

                <Pressable
                  style={styles.dropdownButton}
                  // onPress={toggleDropdownTime}
                  onPress={() => (setShowTime(true), handlePresentDatePress())}
                >
                  <Text style={styles.chooseText}>
                    {`${dateTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${calculateEndTime(dateTime, priceMachine?.timeWash || 0).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`}
                  </Text>
                  <Animated.View
                    style={{ transform: [{ rotate: rotateArrowTime }] }}
                  >
                    <ChevronDownIcon />
                  </Animated.View>
                </Pressable>
              </View>
            </View>
          }
        </View>

        <Modal animationType="slide" transparent={true} visible={isModalVisibleOption}>
          <TouchableWithoutFeedback onPress={() => { setIsModalVisibleOption(false), handleSheetChanges() }}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <View style={styles.contentContainerOption}>
                  <Text>{isDropdownVisible && "isDropdownVisible"}</Text>
                  <Text>{isDropdownVisibleTime && "isDropdownVisibleTime"}</Text>
                  {isShowOptionMap && <OptionMapMachine />}
                  {renderFooter()}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <ChooseMachine
          dataMachine={listDataMachine}
          machineActive={machineActive}
          setMachineActive={handleClickMachine}
          useTime={dateTime}
          useDate={date}
        />

        {/* <BottomSheetModal
          ref={bottomSheetOptionRef}
          onChange={handleSheetChangesOption}
          snapPoints={snapPointsOption}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ backgroundColor: "transparent" }}
          enableDynamicSizing={false}
        > */}
        <Modal animationType="slide" transparent={true} visible={isModalVisibleLaudry}>
          <TouchableWithoutFeedback onPress={() => (setIsModalVisibleLaudry(false), handleSheetChangesOption())}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <View style={styles.contentContainerLaudry}>
                  <LaundryOptions dataMachine={listDataMachine}
                    machineActive={machineActive}
                    priceMachine={priceMachine}
                    mode={mode}
                    isLineup={isLineup}
                    setMode={setMode}
                    style={style}
                    setStyle={setStyle}
                    setPriceMachine={setPriceMachine}
                    onCreate={handleOrder}
                    startDate={convertDateUse()?.startDateUse}
                    endDate={convertDateUse()?.endDateUse}
                    setIsModalVisibleLaudry={setIsModalVisibleLaudry}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {show && Platform.OS !== "ios" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            minimumDate={currentDate}
            textColor={textColor}
          />
        )}

        {showTime && Platform.OS !== "ios" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTime}
            mode="time"
            minuteInterval={10}
            display="spinner"
            onChange={onChangeTime}
            minimumDate={minimumDateTime}
            textColor={textColor}
          />
        )}

        {Platform.OS === "ios" && (
          // <BottomSheetModal
          //   ref={bottomSheetDateRef}
          //   onChange={handleSheetChangesDate}
          //   snapPoints={snapPointsDate}
          //   backdropComponent={renderBackdrop}
          //   handleIndicatorStyle={{ backgroundColor: "transparent" }}
          //   enableDynamicSizing={false}
          // >
          <Modal animationType="slide" transparent={true} visible={isModalVisibleIos}>
            <TouchableWithoutFeedback onPress={() => { setIsModalVisibleIos(false), handleSheetChangesDate() }}>
              <View style={styles.overlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.contentContainerIos}>
                    {show &&
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={onChange}
                        minimumDate={currentDate}
                        textColor={textColor}
                      />
                    }
                    {showTime && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={dateTime}
                        mode="time"
                        minuteInterval={10}
                        display="spinner"
                        onChange={onChangeTime}
                        minimumDate={minimumDateTime}
                        textColor={textColor}
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(47, 38, 93, 0.85)",
  },
  info: {
    backgroundColor: "#2F265D",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoText: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  titleText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 26,
  },
  desText: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 19.5,
    marginTop: 4,
  },
  imageMap: {
    marginTop: 9,
  },

  chooseTime: {
    marginBottom: 30,
  },
  chooseTimeTitle: {
    color: "#222222",
    fontWeight: "600",
    fontSize: 19,
    lineHeight: 24.7,
  },
  listChoose: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 20,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    gap: 8,
  },
  chooseText: {
    color: "#222222",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 19.5,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  contentContainerLaudry: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    height: "60%",
  },
  contentContainerOption: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  contentContainerIos: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
    height: "48%",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
});
