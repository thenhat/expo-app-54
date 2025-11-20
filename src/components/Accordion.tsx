import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type AccordionProps = {
  title: string;
  content: string;
  color?: "primary" | "secondary";
};

const Accordion = ({ title, content, color = "primary" }: AccordionProps) => {
  const contentHeightRef = useRef(0); // Ref to store content height
  const [isOpen, setIsOpen] = useState(false);
  const height = useRef(new Animated.Value(0)).current; // Animated height
  const rotation = useRef(new Animated.Value(0)).current; // Animated rotation

  const toggleAccordion = () => {
    if (isOpen) {
      // Close animation
      Animated.timing(height, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));

      Animated.timing(rotation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setIsOpen(true);
      // Open animation
      Animated.timing(height, {
        toValue: contentHeightRef.current, // Use measured height
        duration: 300,
        useNativeDriver: false,
      }).start();

      Animated.timing(rotation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const rotateIcon = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"], // Rotate from 0° to 45°
  });

  const themeStyles: any =
    color === "primary" ? styles.primary : styles.secondary;

  return (
    <View style={[styles.container, themeStyles.container, {borderLeftColor: isOpen ? "#887EE5" : "transparent"}]}>
      {/* Header */}
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        {/* Animated Icon */}
        <Animated.View
          style={{ width: 20, transform: [{ rotate: rotateIcon }] }}
        >
          <AntDesign
            name="plus"
            size={20}
            color={isOpen || color === "primary" ? "#887EE5" : "#CACACA"}
          />
        </Animated.View>
        {/* Title */}
        <Text
          style={[
            styles.title,
            themeStyles.title,
            { fontWeight: isOpen ? "700" : "500" },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
      {/* Content */}
      <Animated.View style={[styles.content, { height }]}>
        <View>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </Animated.View>

      <View
        style={[styles.hiddenContent]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          contentHeightRef.current = height; // Capture content height
        }}
      >
        <Text style={styles.contentText}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: 8,
    overflow: "hidden",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderLeftWidth: 2,
    borderLeftColor: "#887EE5",
  },
  header: {
    alignItems: "center",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    color: "#2F265D",
  },
  content: {
    paddingHorizontal: 16,
    paddingLeft: 35,
    overflow: "hidden",
  },
  hiddenContent: {
    position: "absolute",
    top: 46,
    left: 16,
    paddingHorizontal: 16,
    paddingLeft: 35,
    overflow: "hidden",
    opacity: 0
  },
  contentText: {
    paddingTop: 16,
    fontSize: 15,
    color: "#2F265D",
    lineHeight: 27,
  },
  primary: {
    container: {
      backgroundColor: "#F3F0FF",
    },
    title: {
      color: "##2F265D",
    },
  },
  secondary: {
    container: {
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      color: "#2F265D",
    },
  },
});

export default Accordion;
