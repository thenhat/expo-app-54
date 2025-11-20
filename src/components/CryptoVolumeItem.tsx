import React from 'react';
import { View, Text } from 'react-native';

type CryptoVolumeItemProps = {
  symbol: string;
  volume: string;
  percentage: string;
  color: string;
  width: string;
};

const CryptoVolumeItem: React.FC<CryptoVolumeItemProps> = ({ symbol, volume, percentage, color, width }) => {
  return (
    <View className="flex flex-col min-w-[240px] w-full">
      <View className="flex gap-10 justify-between items-start w-full text-xs leading-none text-white">
        <View>
          <Text>{symbol}</Text>
        </View>
        <View className="font-semibold text-right">
          <Text>{`${volume} (${percentage})`}</Text>
        </View>
      </View>
      <View className="flex flex-col mt-1.5 max-w-full rounded-sm w-[337px]">
        <View className="flex flex-col items-start rounded-none bg-slate-900">
          <View className={`flex shrink-0 h-1 ${color} rounded-sm ${width}`} />
        </View>
      </View>
    </View>
  );
};

export default CryptoVolumeItem;