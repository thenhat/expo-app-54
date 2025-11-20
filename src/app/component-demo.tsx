import { useColorScheme } from "nativewind";

import ArrowRightIcon from "@/assets/images/svgs/arrow-right.svg";
import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import ButtonGroup from "@/components/ButtonGroup";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import RadioButton from "@/components/RadioButton";
import SelectBox from "@/components/SelectBox";
import SwitchButton from "@/components/Switch";
import TabComponent from "@/components/Tab";
import TabUnderline from "@/components/TabUnderline";
import ToggleTheme from "@/components/ToggleTheme";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ComponentDemo() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [textViewValue, setTextViewValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedRadioOption, setSelectedRadioOption] = useState("option1");
  const [selectedCheckbox, setSelectedCheckbox] = useState<Array<string>>([]);
  const [isOn, setOn] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState({
    value: "tab1",
    label: "코리아식당",
  });
  const [activeUnderlineTab, setActiveUnderlineTab] = useState({
    value: "tab1",
    label: "코리아식당",
  });

  const tabs = [
    { value: "tab1", label: "코리아식당" },
    { value: "tab2", label: "코리아식당" },
    { value: "tab3", label: "코리아식당" },
  ];

  const options = [
    { value: "111111", label: "1111111111" },
    { value: "222222", label: "2222222222" },
    { value: "333333", label: "3333333333" },
    { value: "444444", label: "4444444444" },
    { value: "555555", label: "5555555555" },
    { value: "666666", label: "6666666666" },
    { value: "777777", label: "7777777777" },
  ];

  const tabUnderlines = [
    { value: "tab1", label: "코리아식당" },
    { value: "tab2", label: "코리아식당" },
    { value: "tab3", label: "코리아식당" },
    { value: "tab4", label: "코리아식당" },
    { value: "tab5", label: "코리아식당" },
    { value: "tab6", label: "코리아식당" },
  ];

  const radioOptions = [
    { value: "option1", label: "주변 가게를 방문하면" },
    { value: "option2", label: "주변 가게를 방문하면" },
  ];

  const handleSelectedCheckbox = (value: string) => {
    if (selectedCheckbox.includes(value)) {
      setSelectedCheckbox(selectedCheckbox.filter(item => item !== value));
    } else {
      setSelectedCheckbox([value, ...selectedCheckbox]);
    }
  }

  return (
    <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: "#ffffff" }}>
     
      <SafeAreaView className="flex-1 pt-2 items-center justify-start bg-white dark:bg-black">
      <Text className="text-xl font-bold text-dark dark:text-white">
          test
        </Text>
        <Text className="text-xl font-bold text-dark dark:text-white">
          Settings
        </Text>
        {/* THEME SETTINGS */}
        <View
          className="flex w-full items-center justify-center my-10"
          style={{ gap: 2 }}
        >
          <Text className="w-5/6 text-lg text-start text-dark dark:text-neutral-200 mb-4">
            Theme Settings
          </Text>
          <ToggleTheme
            colorScheme={colorScheme}
            setColorScheme={setColorScheme}
            theme="light"
          />
          <ToggleTheme
            colorScheme={colorScheme}
            setColorScheme={setColorScheme}
            theme="dark"
          />
        </View>
        <StatusBar style={"auto"} />

        <ButtonGroup
          labels={["1", "2", "3", "4"]}
          selectedIndex={1}
          onSelect={() => {}}
        />
        <View style={{ width: "100%" }}>
          <Button
            label="Button"
            size="large"
            mode="contained"
            color="primary"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="Button"
            size="large"
            mode="outlined"
            color="success"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="Button"
            size="large"
            mode="text"
            color="info"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="Button"
            size="medium"
            mode="contained"
            color="secondary"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="Button"
            size="medium"
            mode="outlined"
            color="secondary"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="Button"
            size="medium"
            mode="text"
            color="secondary"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="Button"
            size="small"
            mode="contained"
            disabled={true}
            color="error"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="Button"
            size="small"
            mode="outlined"
            color="warning"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="Button"
            size="small"
            mode="text"
            color="error"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="TEXT DEMO"
            size="large"
            mode="link"
            color="primary"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="TEXT DEMO"
            size="large"
            mode="link"
            color="success"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            startIcon={<ArrowRightIcon stroke="black" />}
            mode="icon"
            color="success"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            startIcon={<ArrowRightIcon style={{ color: "inherit" }} />}
            mode="icon"
            color="secondary"
            onPress={() => {}}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="TEXT DEMO"
            endIcon={<ArrowRightIcon style={{ color: "inherit" }} />}
            mode="text"
            color="secondary"
            onPress={() => {}}
          />
        </View>
        {/* <View>
        <CircularProgress />
      </View> */}
        {/* <View>
        <CryptoVolumeItem symbol="ABC" color="red" percentage="50" volume="10" width="30" key="sdjfhsd" />
      </View>
      <View>
        <ExternalLink href="https://fb.com">Linkdsfsdfs</ExternalLink>
      </View>
      <View>
        <Input value="" label="키보드를" placeholder="이 한국어 키보드를" onChangeText={() => {}} rounded={true} right={<Text>원</Text>} />
        <Input value="dfgfdgd" label="키보드를" placeholder="이 한국어 키보드를" onChangeText={() => {}} right={<Text>원</Text>} />
        <Input value="dfgfdgd" label="키보드를" placeholder="이 한국어 키보드를" onChangeText={() => {}} mode="flat" right={<Text>원</Text>} />
      </View> */}

        <View style={{ padding: 20, width: "100%" }}>
          <SelectBox
            value={selectedValue}
            options={options}
            onSelect={setSelectedValue}
            label="한국어"
            placeholder="Select location"
          />
        </View>

        <View style={{ width: "100%" }}>
          <Input
            value={textViewValue}
            label="키보드를"
            placeholder="이 한국어 키보드를"
            onChangeText={setTextViewValue}
            rounded={true}
            right={<Text>원</Text>}
          />
          <Input
            value="dfgfdgd"
            label="키보드를"
            placeholder="이 한국어 키보드를"
            onChangeText={() => {}}
            right={<Text>원</Text>}
          />
          <Input
            value="dfgfdgd"
            label="키보드를"
            placeholder="이 한국어 키보드를"
            onChangeText={() => {}}
            mode="flat"
            right={<Text>원</Text>}
          />
        </View>

        <View style={{width: "100%", padding: 20}}>
          <TabUnderline
            activeTab={activeUnderlineTab}
            listTab={tabUnderlines}
            onChange={(tab: any) => setActiveUnderlineTab(tab)}
          />
        </View>

        {/* Chế độ default */}
        <View style={{width: "100%", padding: 20}}>
          <TabComponent
            activeTab={activeTab}
            listTab={tabs}
            onChange={(val: any) => setActiveTab(val)}
            mode="default"
            color="primary"
          />
        </View>

        {/* Chế độ rounded */}
        <View style={{width: "100%", padding: 20}}>
          <TabComponent
            activeTab={activeTab}
            listTab={tabs}
            onChange={(val: any) => setActiveTab(val)}
            mode="rounded"
            color="black"
          />
        </View>

        {/* Radio Button */}
        <View style={{ paddingHorizontal: 20 }}>
          {radioOptions.map((option) => (
            <RadioButton
              key={option.value}
              selected={selectedRadioOption === option.value}
              onPress={() => setSelectedRadioOption(option.value)}
              label={option.label}
            />
          ))}
        </View>

        {/* Checkbox Button */}
        <View style={{ paddingHorizontal: 20 }}>
          {radioOptions.map((option) => (
            <Checkbox
              key={option.value}
              checked={selectedCheckbox.includes(option.value)}
              onPress={() => handleSelectedCheckbox(option.value)}
              label={option.label}
            />
          ))}
        </View>

        {/* Switch Button */}
        <View style={{ paddingHorizontal: 20 }}>
          <SwitchButton isOn={isOn} onToggle={setOn} />
        </View>

        {/* Accordion Component */}
        <View style={{ paddingHorizontal: 20, width: "100%" }}>
          <Accordion title={"HOCL친환경 살균수 세탁이란?"} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} />
        </View>

        <View style={{ paddingHorizontal: 20, width: "100%" }}>
          <Accordion title={"HOCL친환경 살균수 세탁이란?"} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} color="secondary" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
