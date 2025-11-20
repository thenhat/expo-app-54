import formatNumbers from "@/utils/format";
import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

interface Props {
  paymentInfo?: any;
  pointActive?: any;
  cashActive?: any;
}

export default function AmountScreen(props: Props) {
  const { paymentInfo, pointActive, cashActive } = props;
  const { type } = useLocalSearchParams<any>();

  const totalPaymentAmount = type === 'cleaning' 
    ? Number(paymentInfo?.finalTotal) 
    : Math.max(0, Number(paymentInfo?.totalPriceMachine) - paymentInfo?.totalPriceCoupon - Number(pointActive) - Number(cashActive))

  const dataAmount = [
    {
      title: "이용금액",
      value: formatNumbers(
        type === "cleaning" ? paymentInfo?.amount : paymentInfo?.totalPriceMachine
      ) + "원",
    },
    {
      title: "쿠폰사용",
      value: formatNumbers(
        type === "cleaning" ? paymentInfo?.fcCoupon : paymentInfo?.totalPriceCoupon
      ) + "원",
    },
    ...(
      type !== "cleaning"
        ? [
          {
            title: "캐시/포인트사용",
            value: formatNumbers(Number(pointActive) + Number(cashActive)) + "원",
          },
          {
            title: "적립포인트",
            value: formatNumbers(Math.max(0, totalPaymentAmount * 0.05)) + "원",
          },
        ]
        : []
    ),
  ];


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>결제금액</Text>
        <Text style={styles.priceText}>{formatNumbers(totalPaymentAmount)}원</Text>
      </View>

      <View style={styles.infoMachine}>
        {dataAmount?.map((item, index) => {
          return (
            <View
              style={[
                styles.itemMachine,
              ]}
              key={index}
            >
              <Text style={styles.machineText}>{item?.title}</Text>
              <Text style={styles.valueText}>{item?.value}</Text>
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    color: "#000",
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 24.7,
  },
  priceText: {
    color: "#06C164",
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 24.7,
  },
  infoMachine: {
    marginTop: 15,
  },

  itemMachine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  machineText: {
    fontWeight: '400',
    color: "#222222",
    fontSize: 14,
    lineHeight: 35
  },
  valueText: {
    color: "#222222",
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 37.5
  },
});
