import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type TabType = {
  value: string;
  label: string;
};

type TabProps = {
  mode: "default" | "rounded";
  color: "primary" | "black";
  activeTab: TabType;
  onChange: Function;
  listTab: Array<TabType>;
};

const TabComponent = ({
  activeTab,
  listTab,
  onChange,
  mode = "default",
  color = "primary"
}: TabProps) => {
  return (
    <View
      style={styles.container(mode)}
    >
      {listTab.map((tab: TabType, index: number) => (
        <TouchableOpacity
          key={tab.value}
          style={[
            styles.tab(mode),
            activeTab.value === tab.value && styles.activeTab(mode, color),
          ]}
          onPress={() => onChange(tab)}
        >
          <Text
            style={[
              styles.label,
              activeTab.value === tab.value && styles.activeLabel(mode, color),
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles: any = StyleSheet.create({
  container: (mode:string) => ({
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 24,
    padding: mode === "default" ? 0 : 4,
  }),

  tab: (mode:string) => ({
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    position: "relative",
    height: mode === "default" ? 40 : 32,
    borderRadius: 20,
    paddingHorizontal: 16,
  }),
  label: {
    fontSize: 16,
    color: "#222",
    lineHeight: 20.8,
  },
  activeLabel: (mode:string, color: string) => ({
    color: mode === "default" || color === "primary" ? "#FFF" : "#222",
    fontWeight: "600",
  }),
  activeTab: (mode:string, color: string) => ({
    backgroundColor: color === "primary" ? "#2F265D" : color === "black" && mode === "default" ? "#222" : "#FFF",
  }),
});


export default TabComponent;
