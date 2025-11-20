import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Href, useRouter } from "expo-router";
import CloseIcon from "@/assets/images/svgs/close.svg";
import BackLeftIcon from "@/assets/icons/back-left-icon.svg";

interface Props {
  type?: "CLOSE" | "BACK";
  title?: string;
  theme?: "dark" | "light";
  backUrl?: Href<string>;
}

const HeaderScreen: React.FC<Props> = ({
  title,
  type = "CLOSE",
  theme = "light",
  backUrl,
}) => {
  const router = useRouter();
  const isDark = theme === "dark";

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
      return;
    }
    router.back();
  };

  return (
    <View
      style={[styles.row, { backgroundColor: isDark ? "#2F265D" : "#fff" }]}
    >
      <TouchableOpacity style={styles.iconLeft} onPress={handleBack}>
        {type === "CLOSE" ? <CloseIcon /> : <BackLeftIcon />}
      </TouchableOpacity>
      <Text style={[styles.title, { color: isDark ? "#C0BDCE" : "#222222" }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    // paddingVertical: 30,
    height: 54,
    paddingTop: 20,
    position: "relative",
  },
  title: {
    fontWeight: "600",
    fontSize: 17,
  },
  iconLeft: {
    position: "absolute",
    left: 16,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HeaderScreen;
