import { Text, View, StyleSheet, Image, Animated, Pressable, ScrollView } from "react-native";

import Button from "@/components/Button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import OptionMapMachine from "./appointment/OptionMapMachine";
import { useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";

const MapImage = require("@/assets/images/map.png");

export default function OptionMapScreen() {
  const router = useRouter();
  const { last }: any = useLocalSearchParams<{ user: string }>();

  const arrowAnimation = useRef(new Animated.Value(0)).current; // Initial animation value
  const arrowAnimationTime = useRef(new Animated.Value(0))?.current; // Initial animation value
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisibleTime, setIsDropdownVisibleTime] = useState(false);
  const [isShowOptionMap, setIsShowOptionMap] = useState(false);
  const storeActive = useSelector((state: any) => state.store.storeActive);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    last && handleOpenStore();
  }, [last]);


  const handleSheetChanges = useCallback(

    (index: number) => {

      if (index === -1) {
        if (isDropdownVisible) {
          toggleDropdown();
        }
        if (isDropdownVisibleTime) {
          toggleDropdownTime();
        }
        if (isShowOptionMap) {
          setIsShowOptionMap(false);
        }
        last && router.push('/');
      }
    },
    [isDropdownVisible, isDropdownVisibleTime]
  );

  const handlePresentModalPress = useCallback(() => {
    setIsModalVisible(true);
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

    Animated.timing(arrowAnimationTime, {
      toValue: isDropdownVisibleTime ? 0 : 1, // Rotate back (0) or forward (1)
      duration: 200,
      useNativeDriver: true, // Optimize animation
    }).start();
  }, [arrowAnimationTime, isDropdownVisibleTime]);

  const handleOpenStore = () => {
    handlePresentModalPress();
    setIsShowOptionMap(true);
  }

  return (
    <View style={styles.optionMapWp}>
      <View style={styles.info}>
        <View style={styles.infoText}>
          <Text style={styles.titleText}>{storeActive?.name}</Text>
          <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 60 }}>
            <Text style={styles.desText}>{storeActive?.address?.value}</Text>
          </ScrollView>
          <Pressable onPress={() => router.push({
            pathname: "/stores/find-store",
            params: {
              idStore: storeActive?.id
            }
          })}>
            <Text style={styles.viewMapText}>지도보기</Text>
          </Pressable>
        </View>
        <Image source={MapImage} style={styles.imageMap} />
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <Button
          label={"지점변경"}
          styleButton={{ width: "100%" }}
          size="medium"
          mode="outlined"
          color="primary"
          onPress={handleOpenStore}
        />
      </View>

      <OptionMapMachine
        onChange={handleSheetChanges}
        show={isShowOptionMap}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  optionMapWp: {
    marginBottom: 28,
  },
  info: {
    backgroundColor: "#2F265D",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  infoText: {
    width: "61%",
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
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
    fontSize: 14,
    lineHeight: 19,
    marginTop: 4,
  },
  imageMap: {
    marginTop: 9,
    marginRight: 10,
    width: 115,
    height: 115,
  },

  chooseTime: {
    marginTop: 43,
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
    lineHeight: 19,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "red",
    // height: 0,
  },
  viewMapText: {
    color: "#FEA31B",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    textDecorationLine: "underline",
    marginTop: 16,
  },
});
