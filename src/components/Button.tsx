import { StyleSheet, View, Pressable, Text } from "react-native";

type Props = {
  label?: string;
  color:
    | "primary"
    | "black"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "error";
  mode: "contained" | "outlined" | "text" | "link" | "icon";
  size?: "large" | "medium" | "small";
  disabled?: boolean;
  onPress?: Function;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  styleButton?: any;
  styleText?: any;
};

const BUTTON_SIZE = {
  large: { height: 50 },
  medium: { height: 40 },
  small: { height: 30 },
};

const BUTTON_COLOR = {
  primary: {
    backgroundColor: "#2F265D",
    borderColor: "#2F265D",
  },
  secondary: {
    backgroundColor: "#E9E9E9",
    borderColor: "#E9E9E9",
  },
  black: {
    backgroundColor: "#222222",
    borderColor: "#222222",
  },
  warning: {
    backgroundColor: "#FEA31B",
    borderColor: "#FEA31B",
  },
  success: {
    backgroundColor: "#06C164",
    borderColor: "#06C164",
  },
  info: {
    backgroundColor: "#0A9EE8",
    borderColor: "#0A9EE8",
  },
  error: {
    backgroundColor: "#DF1519",
    borderColor: "#DF1519",
  },
};

const BUTTON_MODE = {
  contained: {
    color: "#FFFFFF",
  },
  outlined: {
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    backgroundColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
  },
  icon: {},
};

const TEXT_COLOR = {
  secondary: { color: "#222222" },
  primary: { color: "#2F265D" },
  black: { color: "#222222" },
  info: { color: "#0A9EE8" },
  warning: { color: "#FEA31B" },
  success: { color: "#06C164" },
  error: { color: "#DF1519" },
};

const TEXT_STYLE = {
  contained: {},
  outlined: {},
  text: {},
  link: { textDecorationLine: "underline" },
  icon: {},
};

const DISABLED_MODE = {
  true: {
    contained: {
      color: "#D2D1D1",
      backgroundColor: "#F3F2F2",
      borderColor: "#F3F2F2",
    },
    outlined: {
      color: "#D2D1D1",
      backgroundColor: "transparent",
      borderColor: "#F3F2F2",
    },
    text: {
      color: "#D2D1D1",
    },
    link: {},
    icon: {},
  },
  false: {
    contained: {},
    outlined: {},
    text: {},
    link: {},
    icon: {},
  },
};

export default function Button({
  label,
  color = "primary",
  mode = "contained",
  onPress = () => {},
  size = "large",
  disabled = false,
  endIcon,
  startIcon,
  styleButton,
  styleText
}: Props) {
  
  if (mode === "icon") {
    return (
      <View style={styles.buttonIconContainer}>
        <Pressable
          style={{
            ...styles.button,
            ...BUTTON_COLOR[color],
            ...DISABLED_MODE[`${disabled}`][mode],
          }}
          onPress={() => onPress()}
          disabled={disabled}
        >
          {startIcon}
        </Pressable>
      </View>
    );
  }

  if (mode === "link" || mode == "text") {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => onPress()}
          disabled={disabled}
        >
          {startIcon}
          <Text
            style={{
              ...styles.buttonLabel,
              ...TEXT_COLOR[color],
              ...styleText,
              textDecorationLine: mode === "link" ? "underline" : "none",
              ...DISABLED_MODE[`${disabled}`][mode],
            }}
          >
            {label}
          </Text>
          {endIcon}
        </Pressable>
      </View>
    );
  }

  if (mode === 'outlined') {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={{
            ...styles.button,
            ...BUTTON_SIZE[size],
            ...BUTTON_COLOR[color],
            ...BUTTON_MODE[mode],
            ...styleButton,
            ...DISABLED_MODE[`${disabled}`][mode],
          }}
          onPress={() => onPress()}
          disabled={disabled}
        >
          {startIcon}
          <Text
            style={{
              ...styles.buttonLabel,
              ...TEXT_COLOR[color],
              ...DISABLED_MODE[`${disabled}`][mode],
            }}
          >
            {label}
          </Text>
          {endIcon}
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={{
          ...styles.button,
          ...BUTTON_SIZE[size],
          ...BUTTON_COLOR[color],
          ...BUTTON_MODE[mode],
          ...styleButton,
          ...DISABLED_MODE[`${disabled}`][mode],
        }}
        onPress={() => onPress()}
        disabled={disabled}
      >
        {startIcon}
        <Text
          style={{
            ...styles.buttonLabel,
            color: color === 'secondary' ? '#222' : '#FFF',
            ...DISABLED_MODE[`${disabled}`][mode],
          }}
        >
          {label}
        </Text>
        {endIcon}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 30,
  },
  buttonIconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 50,
    paddingHorizontal: 12,
    // width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonLabel: {
    color: "inherit",
    fontSize: 14,
    lineHeight: 18.2,
    fontWeight: '600',
  },
});
