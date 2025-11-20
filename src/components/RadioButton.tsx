import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type RadioButtonProps = {
  selected: boolean;
  onPress: Function;
  label: string;
};

const RadioButton = ({ selected = false, onPress, label }: RadioButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={(event) => onPress()}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.circle,
          selected ? styles.circleSelected : styles.circleUnselected,
        ]}
      >
        {/* {selected && <View style={styles.innerCircle} />} */}
      </View>
      <Text
        style={[
          styles.label,
          selected ? styles.labelSelected : styles.labelUnselected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
  },
  circleUnselected: {
    borderColor: "#E8E8E8",
  },
  circleSelected: {
    borderColor: "#00C853",
    backgroundColor: "#FFF",
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00C853",
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
  },
  labelUnselected: {
    color: "#888888",
  },
  labelSelected: {
    color: "#222222",
    fontWeight: "500",
  },
});

export default RadioButton;
