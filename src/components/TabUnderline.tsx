import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
const Filter = require("@/assets/icons/filter.png");


type TabType = {
  value: string;
  label: string;
};

type TabProps = {
  onChange: (v: string) => void;
  listTab: Array<TabType>;
  defaultTab?: string;
  onPressFilter?: () => void;
};

const TabUnderline = ({ listTab, onChange, defaultTab, onPressFilter }: TabProps) => {
  const [activeTab, setActiveTab] = useState<string>();

  const handleChangeTab = (v: string) => {
    setActiveTab(v);
    onChange(v);
  };
  // console.log('activeTab',activeTab);

  // Check if filter button should be disabled
  const isFilterDisabled = !activeTab || activeTab === 'undefined' || activeTab === '전체';

  useEffect(() => {
    defaultTab && setActiveTab(defaultTab);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {listTab?.map((tab: TabType, index: number) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              activeTab === tab.value && styles.activeTab,
              { marginLeft: !index ? 16 : 0 },
            ]}
            onPress={() => handleChangeTab(tab.value)}
          >
            <Text
              style={[
                styles.label,
                activeTab === tab.value && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
            {activeTab === tab.value && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </ScrollView> 
      {/* Filter button */}
      <TouchableOpacity
        className="border-solid border-l border-[#DADADA] pl-3 pr-4"
        onPress={isFilterDisabled ? undefined : onPressFilter}
        activeOpacity={isFilterDisabled ? 1 : 0.7}
        disabled={isFilterDisabled}
      >
        <Image 
          source={Filter} 
          style={[
            styles.imageFilter,
            isFilterDisabled && styles.imageFilterDisabled
          ]} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  imageFilter: {
    width: 24,
    height: 24
  },
  imageFilterDisabled: {
    opacity: 0.3
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    position: "relative",
  },
  label: {
    fontSize: 16,
    lineHeight: 20.8,
    color: "#888",
  },
  activeTab: {
    alignItems: "center",
  },
  activeLabel: {
    color: "#2F265D",
    fontWeight: "700",
  },
  underline: {
    position: "absolute",
    bottom: -1,
    width: "100%",
    height: 3,
    backgroundColor: "#2F265D",
  },
});

export default TabUnderline;
