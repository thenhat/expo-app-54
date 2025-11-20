import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
// const Credit_card = require("@/assets/images/Credit_card.png");
// const kakaoPay = require("@/assets/images/kakao-pay.png");
// const naverPay = require("@/assets/images/naver-pay.png");
import PaymentCardIcon from "@/assets/icons/payment_method_card.svg";
import PaymentKakaoIcon from "@/assets/icons/payment_method_kakao.svg";
import PaymentNaverIcon from "@/assets/icons/payment_method_naver.svg";

const methodData = [
  {
    id: "CARD",
    title: "신용/체크카드 ",
    icon: <PaymentCardIcon />,
  },
  {
    id: "KAKAO_PAY",
    title: "카카오페이",
    icon: <PaymentKakaoIcon />,
  },
  {
    id: "NAVER_PAY",
    title: "네이버페이",
    icon: <PaymentNaverIcon />,
  },
];

interface Props {
  method: any;
  setMethod?: any;
}

export default function CardOptions(props: Props) {
  const { method, setMethod } = props;

  const handleChange = (value: any) => {
    console.log("value :>> ", value);
    setMethod(value?.id);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>결제수단</Text>

      <View style={styles.listMachine}>
        {methodData?.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.itemMachine,
                styles.shadowProp,
                method === item?.id ? styles.itemMachineActive : {},
              ]}
              key={index}
              onPress={() => handleChange(item)}
            >
              <View>{item.icon}</View>

              <Text
                style={[
                  styles.machineText,
                  item?.id === "CARD" ? { color: "#9191F5" } : {},
                  item?.id === "NAVER_PAY" ? { color: "#48BE4A" } : {},
                ]}
              >
                {item?.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
    color: "#000",
    fontWeight: "600",
    fontSize: 19,
    lineHeight: 24.7,
  },
  desText: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 19.5,
    marginTop: 4,
  },
  listMachine: {
    marginTop: 20,
    gap: 8,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  itemMachine: {
    flexDirection: "row",
    color: "#888888",
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#0000001A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 15,
  },
  itemMachineActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#2F265D",
    color: "#2F265D",
  },
  itemImage: {
    width: 90,
    height: 40,
  },
  machineText: {
    width:108,
    fontWeight: "700",
    color: "#594C3C",
    fontSize: 16,
    lineHeight: 29,
  },
});
