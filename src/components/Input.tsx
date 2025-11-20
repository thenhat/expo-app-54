import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

type InputProps = React.ComponentProps<typeof TextInput> & {
  value?: string;
  label?: string;
  placeholder?: string;
  onChangeText?: Function;
  onPressIn?: Function;
  rounded?: boolean;
  mode?: "contained" | "outlined" | "flat";
  disabled?: boolean;
  left?: any;
  right?: any;
  secureTextEntry?: boolean;
  keyboardType?: string;
  height?: any;
  readOnly?: boolean;
};

const Input = ({
  value,
  label,
  placeholder,
  onChangeText,
  rounded,
  disabled,
  mode,
  left,
  right,
  secureTextEntry,
  keyboardType,
  height,
  readOnly,
  onPressIn
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  if (mode === "flat") {
    return (
      <View style={[styles.container, height? {height} : {}]}>
        {label && <Text style={styles.labelFlat}>{label || ""}</Text>}
        <View
          style={{
            ...styles.inputFlatContainer,
            borderRadius: 0,
            borderBottomColor: isFocused ? "#222" : "#DADADA",
          }}
        >
          {left}
          <TextInput
            style={{...styles.input, fontWeight: value !== '' ? '600' : '400'}}
            placeholder={placeholder}
            placeholderTextColor="#888888"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            readOnly={readOnly}
            onChangeText={(value) => onChangeText ? onChangeText(value) : ''}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
          />
          {right}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, height? {height} : {}]}>
      {label && <Text style={styles.label}>{label || ""}</Text>}
      <View
        style={{
          ...styles.inputContainer,
          borderRadius: rounded ? 50 : 10,
          borderColor: isFocused ? "#222" : mode === "outlined" ? "#ccc" : "#F2F2F2",
        }}
      >
        {left}
        <TextInput
          style={{...styles.input, fontWeight: value !== '' ? '600' : '400'}}
          placeholder={placeholder}
          placeholderTextColor="#888888"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          readOnly={readOnly}
          onPressIn={onPressIn}
          onChangeText={(value) => onChangeText ? onChangeText(value) : ''}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
        {right}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
    // height: 50
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#999",
  },
  labelFlat: {
    fontSize: 14,
    marginBottom: 4,
    color: "#999",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F2F2F2",
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15,
    paddingVertical: 8,
    height: 50,
  },
  inputFlatContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    backgroundColor: "#FFFFF",
    paddingVertical: 8,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#222",
  },
  unit: {
    fontSize: 16,
    color: "#222",
  },
});

export default Input;
