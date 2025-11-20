import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  defaultValue?: string;
  errors?: any;
  touched?: any;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
}

const InputField: React.FC<InputProps> = ({
  label,
  disabled = false,
  className = "",
  labelClassName = "",
  containerClassName = "",
  defaultValue = "",
  secureTextEntry = false,
  errors,
  touched,
  onBlur,
  onFocus,
  onChangeText,
  ...props
}) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [isPasswordVisible, setPasswordVisible] =
    useState<boolean>(secureTextEntry);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setInputFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setInputFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleChangeText = (text: string) => {
    setValue(text);
    if (onChangeText) onChangeText(text);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const getClassName = () => {
    if (touched && errors)
      return "h-[50px] bg-[#F2F2F2] rounded-full px-[20px] text-[15px] font-defaultRegular text-[#888888] border border-[#DF1519]";
    if (disabled)
      return "h-[50px] text-[15px] font-defaultSemiBold text-[#222222]";
    if (value) {
      return inputFocused
        ? "h-[50px] bg-[#F2F2F2] rounded-full px-[20px] text-[15px] font-defaultRegular text-[#888888]"
        : "h-[50px] border-b border-b-[#DADADA] text-[15px] font-defaultSemiBold";
    }
    return "h-[50px] bg-[#F2F2F2] rounded-full px-[20px] text-[15px] font-defaultRegular text-[#888888]";
  };

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  return (
    <View className={`${containerClassName}`}>
      {label && (
        <Text
          className={`${
            labelClassName
              ? labelClassName
              : `text-[#999999] text-[14px] leading-[18.2px] font-defaultRegular mb-[5px]`
          }`}
        >
          {label}
        </Text>
      )}
      <View className="relative">
        <TextInput
          className={`${getClassName()} ${touched && errors ? "border border-[#DF1519]" : ""}`}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          secureTextEntry={isPasswordVisible}
          value={value}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="absolute right-4 top-[15px]"
          >
            <Feather
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#888888"
            />
          </TouchableOpacity>
        )}
      </View>
      {touched && errors && (
        <Text className="text-[#DF1519] text-[12px] mt-[2px]">{errors}</Text>
      )}
    </View>
  );
};

export default InputField;
