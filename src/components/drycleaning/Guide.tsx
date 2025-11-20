import { Text, View, StyleSheet } from "react-native";

export default function GuideScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>드라이클리닝 서비스 이용안내</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>드라이클리닝 서비스는 호텔런드리가 따로 수거하여 클리닝한 후 제공하는 서비스입니다.</Text>
        <Text style={styles.contentText}>원하는 세탁물을 선택하신 후, 매장에 오셔서 키오스크에서 드라이클리닝 주문내역 QR코드를 스캔하고 세탁물을 접수증과 함께 봉투에 담아 드라이클리닝 보관함에 입고해주세요. 
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F2FF",
    paddingHorizontal: 13,
    paddingVertical: 30,
    marginTop: 5,
    marginBottom: 30,
    borderRadius: 15
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
  titleText: {
    color: "#2F265D",
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 22.1,
  },

  content: {
    marginTop: 12,
  },
  contentText: {
    color: "#2F265D",
    fontWeight:  '400',
    fontSize: 15,
    lineHeight: 27,
  },
  
});
