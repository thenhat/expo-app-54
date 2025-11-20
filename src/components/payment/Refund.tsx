import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Button from "@/components/Button";
import Checkbox from "../Checkbox";
import MessageErrorModal from "../Modal/MessageError";

const theadTable = ["예약시간기준", "취소수수료"];
const colTable = [
  {
    label: "30분 이전",
    value: "무료",
  },
  {
    label: "예약시간 30분 이내",
    value: "10%",
  },
  {
    label: "예약시간 초과시",
    value: "20%",
  },
];

interface Props {
  onSubmit?: any;
}

export default function Refund(props: Props) {
  const { onSubmit } = props;
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    if (!selectedCheckbox) {
      setVisible(true);
    } else {
      onSubmit()
    }
  }

  const handleCloseModal = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>환불규정</Text>
      <Text style={styles.desText}>
        예약시간으로부터 5분 경과 후 자동취소됩니다.
      </Text>

      <View style={[styles.content]}>
        <View style={[styles.rowTable]}>
          {theadTable?.map((item, index) => {
            return (
              <Text style={styles.theadTable} key={index}>
                {item}
              </Text>
            );
          })}
        </View>

        {colTable?.map((item, index) => {
          return (
            <View
              style={[styles.rowTable, index % 2 === 0 ? styles.rowOdd : {}]}
              key={index}
            >
              <Text style={styles.tdTable}>{item.label}</Text>
              <Text style={styles.tdTable}>{item.value}</Text>
            </View>
          );
        })}
      </View>

      <View style={{ marginBottom: 40 }}>
        <Checkbox
          checked={selectedCheckbox}
          onPress={() => setSelectedCheckbox((prev) => !prev)}
          label={"상품,결제, 주문정보를 확인했으며 동의합니다."}
        />
      </View>
      {/* <Link href={"/payment/payment-detail/1" as Href} asChild> */}
      <Button
        label="결제하기"
        size="large"
        mode="contained"
        color="primary"
        styleButton={{ width: "100%" }}
        onPress={handleSubmit}
      />
      {/* </Link> */}

      <MessageErrorModal message={"주문하실 상품 및 결제, 주문정보 확인 동의를 체크해주세요."}
        visible={visible}
        handleCloseModal={handleCloseModal}
      />
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

  titleText: {
    color: "#000",
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 24.7,
  },
  desText: {
    color: "#000",
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 27,
    marginTop: 4,
  },
  content: {
    marginVertical: 15,

    zIndex: 1,
  },

  rowTable: {
    flexDirection: "row",
  },
  rowOdd: {
    backgroundColor: "#F4F4F4",
  },
  theadTable: {
    color: "#666666",
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 23.4,
    flex: 1,
    textAlign: "center",
  },
  tdTable: {
    color: "#222222",
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 50.4,
    flex: 1,
    textAlign: "center",
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
});
