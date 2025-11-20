import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TickIcon from "@/assets/images/svgs/tick-icon.svg";

type CheckboxProps = {
  checked: boolean;
  onPress: Function;
  label: string;
};

const Checkbox = ({ checked, onPress, label }:CheckboxProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={(event) => onPress()}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.checkbox,
          checked ? styles.checkboxChecked : styles.checkboxUnchecked,
        ]}
      >
        {checked && <TickIcon />}
      </View>
      <Text
        style={[
          styles.label,
          checked ? styles.labelChecked : styles.labelUnchecked,
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
    marginVertical: 4,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxUnchecked: {
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "#E8E8E8",
  },
  checkboxChecked: {
    backgroundColor: "#06C164",
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
  },
  labelUnchecked: {
    color: "#888",
  },
  labelChecked: {
    color: "#222",
    fontWeight: "500"
  },
});

export default Checkbox;
