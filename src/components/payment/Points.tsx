import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, Pressable, Animated, TouchableWithoutFeedback, Modal } from "react-native";
import Button from "@/components/Button";
import { useLocalSearchParams } from "expo-router";
import InputComp from "../Input";

import OptionCoupon from "./OptionCoupon";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import { useSelector } from "react-redux";
import formatNumbers from "@/utils/format";
import moment from "moment";
import ChevronDownIcon from "@/assets/images/svgs/chevron-down.svg";
import MessageErrorModal from "../Modal/MessageError";

interface Props {
  coupon: any;
  paymentInfo?: any;
  pointActive?: any;
  cashActive?: any;
  setCoupon?: any;
  setPaymentInfo?: any;
  setPointActive?: any;
  setCashActive?: any;
  detailDryCleaning?: any;
}

export default function Points(props: Props) {
  const { coupon, paymentInfo, pointActive, cashActive, setCoupon, setPaymentInfo, setPointActive, setCashActive, detailDryCleaning } = props;
  const { optionDryCleaning, storeActive } = useSelector((state: any) => state.store);
  const { oid, startDate, idMachine, options, mode, type } = useLocalSearchParams<any>();
  const modeSelect = JSON.parse(mode || '{}');
  const optionSelect = JSON.parse(options || '{}');
  const [visible, setVisible] = useState('');
  const [pointTotal, setTotalPoint] = useState<any>(0);
  const [cashTotal, setCashTotal] = useState<any>(0);
  const snapPoints = useMemo(() => ["75%", "100%"], []);
  const [coupons, setCoupons] = useState<any>([]);
  const [point, setPoint] = useState<any>(0);
  const [cash, setCash] = useState<any>(0);
  const [isCash, setIsCash] = useState(true);
  const [isPoint, setIsPoint] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [limit, setLimit] = useState<any>(0);

  useEffect(() => {
    fetchListCoupon();
    let payload = {
      oid: oid,
      idCoupon: null,
      point: 0,
      cash: 0,
      payMethod: "CARD"
    }
    if (type !== 'cleaning') {
      fetchTotalPoint();
      fetchTotalCash();
      fetchPaymentInfoOrder(payload);
    }
  }, []);

  useEffect(() => {
    if (type === 'cleaning' && detailDryCleaning?.totalPrice) {
      fcSetCoupon()
    }
  }, [detailDryCleaning?.totalPrice]);

  const fetchListCoupon = async () => {
    const res: any = await sendApiRequest({
      ...apiConfig.order.listCouponCanUse,
      body: {
        idMachine: idMachine,
        options: optionSelect,
        startTime: moment(startDate).format("YYYY-MM-DDTHH:mm:ss"),
        washingMode: modeSelect?.value
      },
    });

    if (res) {
      const convertedCoupon = res?._embedded?.couponThumbBodies?.map((item: any) => ({
        value: item.id,
        label: item.name,
        ...item
      })) || [];
      setCoupons([...convertedCoupon])
    }
  }

  const fetchTotalPoint = async () => {
    const res: any = await sendApiRequest({
      ...apiConfig.order.totalPoint,
      body: {},
    });

    if (res) {
      setTotalPoint(res);
      setPoint(res);
    }
  }

  const fetchTotalCash = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.order.totalCash,
        body: {
          serialNumber: storeActive?.serialNumber
        },
      });

      if (res) {
        setCashTotal(res?.totalCash);
        setCash(res?.totalCash);
      }
    } catch (error) {
      console.log("Login failed:", error);
    }
  }



  const fetchPaymentInfoOrder = async (payload: any) => {
    const res: any = await sendApiRequest({
      ...apiConfig.order.paymentInfoOrder,
      body: payload
    });

    if (res) {
      setPaymentInfo(res);
      const calculatedLimit = Math.max(0, res?.totalPriceMachine - res?.totalPriceCoupon);
      setLimit(calculatedLimit);
      
      // Nếu coupon lớn hơn giá máy, reset point và cash về 0
      if (calculatedLimit === 0) {
        setPointActive(0);
        setCashActive(0);
        setPoint(pointTotal);
        setCash(cashTotal);
      }
    }
  }

  const fetchPaymentInfoOrderDryCleaning = async (payload: any) => {
    const res: any = await sendApiRequest({
      ...apiConfig.order.calculateDiscountDry,
      body: payload
    });

    if (res) {
      console.log('resPaymentInfo: ', res);
      setPaymentInfo(res?.data);
    }
  }

  const fcSetAllCash = () => {
    if (limit <= 0) {
      setCashActive(0);
      setCash(cashTotal);
      setIsCash(false);
      return;
    }
    if (isCash) {
      setCashActive(Math.min(limit - pointActive, cashTotal));
      setCash(cashTotal - Math.min(limit - pointActive, cashTotal));
    } else {
      setCashActive(0);
      setCash(cashTotal);
    }

    setIsCash(!isCash);
  };

  const fcSetAllPoint = () => {
    if (limit <= 0) {
      setPointActive(0);
      setPoint(pointTotal);
      setIsPoint(false);
      return;
    }
    if (isPoint) {
      setPointActive(Math.min(limit - cashActive, pointTotal));
      setPoint(pointTotal - Math.min(limit - cashActive, pointTotal));
    } else {
      setPointActive(0);
      setPoint(pointTotal);
    }

    setIsPoint(!isPoint);
  };

  const fcSetCashActive = (val: any) => {
    if (typeof val !== 'number' && isNaN(val)) {
      return;
    }
    if (paymentInfo && limit > 0) {
      if (limit - Number(pointActive) >= cashTotal) {
        if (val > cashTotal) {
          setCashActive(cashTotal);
          setCash(0);
        } else {
          setCashActive(val);
          setCash(cashTotal - val);
        }
      } else {
        if (val > limit - Number(pointActive)) {
          setCashActive(limit - Number(pointActive));
          setCash(cashTotal - limit + Number(pointActive));
        } else {
          setCashActive(val);
          setCash(cashTotal - val);
        }
      }
    }
  };

  const fcSetPointActive = (val: any) => {
    if (typeof val !== 'number' && isNaN(val)) {
      return;
    }
    if (paymentInfo && limit > 0) {
      // const value = Number(val)
      if (limit - Number(cashActive) >= pointTotal) {
        if (val > pointTotal) {
          setPointActive(pointTotal);
          setPoint(0);
        } else {
          setPointActive(val);
          setPoint(pointTotal - val);
        }
      } else {
        if (val > limit - Number(cashActive)) {
          setPointActive(limit - Number(cashActive));
          setPoint(pointTotal - limit + Number(cashActive));
        } else {
          setPointActive(val);
          setPoint(pointTotal - val);
        }
      }
    }
  };

  const fcSetCoupon = async (e?: any) => {

    if (e?.value) {
      let payloadCheck = {
        id: e?.value,
        idMachine: idMachine,
        options: optionSelect,
        startTime: moment(startDate).format("YYYY-MM-DDTHH:mm:ss"),
        washingMode: modeSelect?.value
      }

      let payloadCheckDryCleaning = {
        id: e?.value,
        idStore: detailDryCleaning?.store?.id,
        typesReqBodies: optionDryCleaning
      }

      const resCheck: any = await sendApiRequest({
        ...(type === 'cleaning' ? apiConfig.order.checkCouponDryCleaning : apiConfig.order.checkCoupon),
        body: type === 'cleaning' ? payloadCheckDryCleaning : payloadCheck
      });
      if (resCheck?.result) {
        setCoupon(e);
        type === 'cleaning' ? callInfoDryCleaning(e) : callInfo(e)
      } else {
        setIsModalVisible(false)
        setVisible(resCheck?.message)
      }
    } else {
      setCoupon(e);
      type === 'cleaning' ? callInfoDryCleaning(e) : callInfo(e)
    }
  }

  const callInfo = (e: any) => {
    let payload = {
      cash: cashActive,
      idCoupon: e?.value,
      oid: oid,
      payMethod: "CARD",
      point: point
    }

    fetchPaymentInfoOrder(payload)
  }

  const callInfoDryCleaning = (e: any) => {
    let payload = {
      idCoupon: e?.value,
      point: point,
      amount: detailDryCleaning?.totalPrice
    }

    fetchPaymentInfoOrderDryCleaning(payload)
  }

  const handlePresentModalPress = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const renderFooter =
    () => (
      <View style={styles.footerContainer}>
        <Button
          styleButton={{ width: "100%" }}
          label="선택완료"
          size="large"
          mode="contained"
          color="primary"
          onPress={() => setIsModalVisible(false)}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{type === 'cleaning' ? '쿠폰' : '쿠폰/캐시/포인트'}</Text>

      <View style={[styles.content]}>


        <View style={[styles.borderBottom]}>
          <Text style={styles.label}>쿠폰</Text>
          <Pressable
            style={{
              ...styles.dropdownButton,
              borderBottomColor: "#DADADA",
              borderBottomWidth: mode === "default" ? 1 : 0,
              height: 50
            }}
            onPress={handlePresentModalPress}
          >
            <Text style={styles.dropdownButtonText}>
              {coupon?.label || '쿠폰선택'}
            </Text>
            <Animated.View>
              <ChevronDownIcon />
            </Animated.View>
          </Pressable>

        </View>
        {/* <SelectPriceBox
            value={coupon}
            options={[]}
            mode="none"
            onSelect={fcSetCoupon}
            label="쿠폰"
            border
          /> */}

        {type !== 'cleaning' && (
          <Fragment>
            <View style={[styles.selectCoupon, { marginTop: 40 }]}>
              <View style={[styles.infoCoupon]}>
                <View style={styles.leftInfoCoupon}>
                  <InputComp
                    value={cashActive > 0 ? cashActive.toString() : ''}
                    label="캐시"
                    placeholder=""
                    onChangeText={(value) => fcSetCashActive(value)}
                    rounded={true}
                    readOnly={Number(cashTotal) <= 0 || limit <= 0}
                    height="auto"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.rightInfoCoupon}>
                  <Button
                    label="모두선택"
                    styleButton={{ width: "100%" }}
                    size="large"
                    mode="outlined"
                    color="primary"
                    disabled={Number(cashTotal) <= 0 || limit <= 0}
                    // onPress={handlePresentModalPress}
                    onPress={fcSetAllCash}
                  />
                </View>
              </View>
              <Text style={styles.footerText}>
                사용 가능 캐시 {formatNumbers(Math.max(0, paymentInfo?.totalPriceMachine - paymentInfo?.totalPriceCoupon - Number(pointActive)))} / 보유캐시 {formatNumbers(cash)}
              </Text>
            </View>

            <View style={[styles.selectCoupon]}>
              <View style={[styles.infoCoupon]}>
                <View style={styles.leftInfoCoupon}>
                  <InputComp
                    value={pointActive > 0 ? pointActive.toString() : ''}
                    label="포인트"
                    placeholder=""
                    onChangeText={(value) => fcSetPointActive(value)}
                    rounded={true}
                    readOnly={Number(pointTotal) <= 0 || limit <= 0}
                    height="auto"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.rightInfoCoupon}>
                  <Button
                    styleButton={{ width: "100%" }}
                    label="모두선택"
                    size="large"
                    mode="outlined"
                    color="primary"
                    disabled={Number(pointTotal) <= 0 || limit <= 0}
                    onPress={fcSetAllPoint}
                  />
                </View>
              </View>
              <Text style={styles.footerText}>
                사용 가능 포인트 {formatNumbers(Math.max(0, paymentInfo?.totalPriceMachine - paymentInfo?.totalPriceCoupon - Number(cashActive)))} / 보유 포인트 {formatNumbers(point)}
              </Text>
            </View>
          </Fragment>
        )}
      </View>

      <MessageErrorModal message={visible}
        visible={Boolean(visible)}
        handleCloseModal={() => setVisible('')}
      />

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.contentContainer}>
                <OptionCoupon onClose={() => setIsModalVisible(false)}
                  value={coupon}
                  options={coupons}
                  onSelect={fcSetCoupon} />
                {renderFooter()}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 40,
    marginTop: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(47, 38, 93, 0.85)",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#DADADA'
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: -10,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: "#222222",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    gap: 8
  },
  titleText: {
    color: "#222222",
    fontWeight: "600",
    fontSize: 19,
    lineHeight: 24.7,
  },
  content: {
    marginTop: 20,
    zIndex: 1,
  },
  selectCoupon: {
    marginTop: 25,
  },
  infoCoupon: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
  },
  leftInfoCoupon: {
    flex: 1,
  },
  rightInfoCoupon: {
    width: 100,
  },
  footerText: {
    color: "#666666",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 23.4,
    marginTop: 10,
  },

  contentContainer: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    width: "100%",
    height: "85%",
    paddingBottom: 50
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
});
