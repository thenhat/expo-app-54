import { convertToDay } from "@/utils/dateCalculator";
import formatNumbers from "@/utils/format";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { Text, View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
const washingMachine = require("@/assets/images/washing-machine.png");

export default function InfoMachineScreen({ detailDryCleaning }: { detailDryCleaning: any }) {
  const storeActive = useSelector((state: any) => state.store.storeActive);
  const { startDate, endDate, options, machineActive, mode, totalPrice, type, oid } = useLocalSearchParams<any>();

  const machine = JSON.parse(machineActive || '{}');
  const modeSelect = JSON.parse(mode || '{}');
  const optionSelect = JSON.parse(options || '{}');

  const timeText =
    convertToDay(startDate) +
    " - " +
    moment(endDate).format("HH:mm");

  const renderTitleOption = () => {
    let titleOption: any = [];
    machine?.options?.forEach((item: any) => {
      if (optionSelect?.some((el: any) => el.key === item.key)) {
        if (item?.max_count > 1) {
          titleOption = [
            ...titleOption,
            item.title +
            `: ${optionSelect.find((el: any) => el.key === item.key).count}회`,
          ];
        } else {
          titleOption = [...titleOption, item.title];
        }
      }
    });

    return titleOption?.length > 0 ? titleOption.join(", ") : '없음';
  }

  const renderSummary = () => {
    const orderDetails = detailDryCleaning?.orderDetails;

    return (
      <View>
        <View style={[styles.itemMachine]}>
          <Text style={styles.machineText}>
            주문번호
          </Text>
          <Text style={[styles.valueText, { fontWeight: 600 }]}>
            {oid}
          </Text>
        </View>
        {orderDetails?.map((option: any, index: number) => {
          const totalQuantity = option.orderDetailTypes.reduce(
            (sum: number, item: any) => sum + item.quantity,
            0
          );

          const totalAmount = option.orderDetailTypes.reduce(
            (sum: number, item: any) => sum + (item.quantity * item.price),
            0
          );

          return (
            <View key={index} style={[
              styles.itemMachine,
            ]}>
              <Text style={styles.machineText}>
                {option?.type?.name} {totalQuantity}개
              </Text>
              <Text style={[styles.valueText, { fontWeight: 600 }]}>
                {formatNumbers(totalAmount)}원
              </Text>
            </View>
          );
        })}
        <View style={[styles.itemMachine]}>
          <Text style={styles.machineText}>
            주문금액
          </Text>
          <Text style={[styles.valueText, { fontWeight: 600 }]}>
            {formatNumbers(detailDryCleaning?.totalPrice)}원
          </Text>
        </View>

      </View>
    );
  };

  let dataMachine = [
    {
      title: "주문번호",
      value: oid,
    },
    {
      title: "세탁옵션",
      value: modeSelect?.label,
    },

    {
      title: "기타옵션",
      value: renderTitleOption(),
    },

    {
      title: "이용시간",
      value: timeText,
    },
    {
      title: "금액",
      value: formatNumbers(Number(totalPrice)) + "원",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image source={washingMachine} style={{ width: 75, height: 64 }} />
        <View style={styles.infoText}>
          <Text style={styles.branchText}>{storeActive?.name}</Text>
          <Text style={styles.titleText}>{type === 'cleaning' ? '드라이 클리닝' : machine?.name}</Text>
        </View>
      </View>

      <View style={styles.infoMachine}>
        {type === 'cleaning' ? (
          renderSummary()
        ) : (
          dataMachine?.map((item, index) => {
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
            )
          }))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  info: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    backgroundColor: "#F1F1F1",
    borderRadius: 15,
    flexDirection: "row",
    marginBottom: 6,
    alignItems: 'center',
    gap: 20
  },
  infoText: {

  },
  titleText: {
    color: "#222222",
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 24.7,
  },
  branchText: {
    color: "#222222",
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 19.5,
    marginBottom: 3,
  },
  infoMachine: {
    marginTop: 36,
    marginBottom: 30,
  },

  itemMachine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },

  machineText: {
    fontWeight: '400',
    color: "#222222",
    fontSize: 14,
    lineHeight: 28,
    minWidth: 100
  },
  valueText: {
    color: "#222222",
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 28,
    textAlign: 'right'
  },
});
