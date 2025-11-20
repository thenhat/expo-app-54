import { Text, View, StyleSheet } from "react-native";
import Button from "@/components/Button";

export default function StatusScreen({ status }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>결제방식</Text>
      <View style={styles.statusPayment}>
        <Text style={styles.desText}>카카오페이</Text>
        {status === "complete" ? (
          <Text style={styles.statusText}>결제완료</Text>
        ) : (
          <Text style={[styles.statusText, styles.statusFail]}>결제실패</Text>
        )}
      </View>
      {status === "complete" ? (
        <View style={styles.listBtn}>
          <View className="flex-1">
            <Button
              label="홈으로"
              size="large"
              mode="outlined"
              color="primary"
              styleButton={{width: "100%"}}
            />
          </View>
          <View className="flex-1">
            <Button
              label="이용내역 확인"
              size="large"
              mode="contained"
              color="primary"
              styleButton={{width: "100%"}}
            />
          </View>
        </View>
      ) : (
        <Button
          label="결제 재시도"
          size="large"
          mode="contained"
          color="primary"
          styleButton={{width: "100%"}}
          />
      )}
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
    fontWeight:  '400',
    fontSize: 15,
    lineHeight: 27,
    marginTop: 4,
  },
  statusPayment: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  statusText: {
    color: "#0A9EE8",
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 37.5,
  },
  statusFail: {
    color: "#DF1519",
  },
  listBtn: {
    flexDirection: "row",
    gap: 13,
  },
});
