import { useRouter } from "expo-router"; // Import useRouter
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ArrowRightImg = require("@/assets/images/my/arrow-right.png");
const AvtImg = require("@/assets/images/my/avt.png");

interface Props {
  data: {
    fullName: string;
  };
}
export default function InfoComp({ data }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push("/mypage/update-info");
  };
  // console.log('')
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.info} className="pb-[20px]">
        <View style={styles.infoLeft}>
          <Text
            className="text-white font-defaultSemiBold text-[19px] leading-[24.7px] mb-[4px]"
            style={styles.infoTextTop}
          >
            {data?.fullName}
          </Text>
        </View>
        <View style={styles.infoRight}>
          <View style={styles.infoTextBottom}>
            <Text className="text-[14px] font-defaultSemiBold leading-[18.2px] text-[#FEA31B]">
              내 정보 보기
            </Text>
            <Image source={ArrowRightImg} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    gap: 16,
  },
  infoLeft: {
    flex: 1,
  },
  infoRight: {},
  infoTextTop: {
    fontFamily: "montserrat700",
  },
  infoTextBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
