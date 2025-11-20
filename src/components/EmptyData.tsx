import React from "react";
import { View, Text, StyleSheet } from "react-native";
import EmptyIcon from "@/assets/icons/empty-data.svg";

interface Props {
  text?: string;
  paddingTop?: number;
}

const EmptyData: React.FC<Props> = ({
  text = "데이터가 없습니다.",
  paddingTop = 80,
}) => {
  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.iconContainer}>
        <EmptyIcon />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 16,
    textAlign: "center",
  },
  iconContainer: {
    marginBottom: 25,
  },
  text: {
    fontSize: 15,
    alignItems:'center',
    textAlign:'center',
    lineHeight:21
  },
});

export default EmptyData;
