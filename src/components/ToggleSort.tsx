import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import ChevronUpIcon from "@/assets/icons/chevron-up.svg";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  onToggle: (v: boolean) => void;
  label: string;
  initValue?: boolean;
}

const ToggleSort: React.FC<Props> = ({ onToggle, label, initValue }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle((prev) => {
      const newToggle = !prev;
      onToggle(newToggle);
      return newToggle;
    });
  };
  useEffect(() => {
    if (initValue) {
      setToggle(initValue);
    }
  }, [initValue]);

  return (
    <TouchableOpacity
      onPress={handleToggle}
      className="flex-row items-center space-x-[8px]"
    >
      <Text className="text-[14px] text-[#222] font-defaultBold leading-[18.2px]">
        {label}
      </Text>
      {toggle ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </TouchableOpacity>
  );
};

export default ToggleSort;
