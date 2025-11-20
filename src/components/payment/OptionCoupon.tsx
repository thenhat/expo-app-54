import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  useWindowDimensions
} from "react-native";
import CloseIcon from "../Icon/CloseIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import formatNumbers from "@/utils/format";
import { cn } from "@/lib/utils";
import HTML from "react-native-render-html";
const coupon_bg = require("@/assets/images/coupon/coupon-bg.png");
const coupon_bg_active = require("@/assets/images/coupon/coupon-active.png");

const POINTS_OPTIONS = {
  value: '',
  label: "선택안함",
  id: '',
  idCoupon: '',
  name: "선택안함",
  requite: "<p>선택안함</p>"
};

export default function OptionCoupon({ onClose, options, value, onSelect }: any) {
  const { width } = useWindowDimensions();

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
        ]}
        onPress={() => item.value === value?.value ? onSelect(POINTS_OPTIONS) : onSelect(item)}
      >
        <Image
          source={value?.value === item?.value ? coupon_bg_active : coupon_bg}
          style={styles.image}
        />
        <View
          style={[
            styles.itemContent,
          ]}
        >
          <View className="absolute left-0 right-0 top-[20px] z-10 flex flex-col pl-[12px]">
            <View className="flex flex-row items-center gap-[5px]">
              <View className="flex flex-col items-center">
                {(() => {
                  const nameParts = item.name?.split(' ') || [];
                  const name1 = nameParts[0] || '';
                  const name2 = nameParts.slice(1).join(' ') || '';

                  const getFontSize = (length: number) => {
                    if (length === 3) return 'text-[22px]';
                    if (length === 4 || length === 5) return 'text-[20px]';
                    return 'text-[15px]';
                  };

                  const fontSize1 = getFontSize(name1.length);
                  const fontSize2 = getFontSize(name2.length);
                  const isActive = value?.value === item?.value;
                  const name1Color = isActive ? (item.type === 'DISCOUNT_PERCENT' ? 'text-[#6350C3]' : 'text-[#FEA31B]') : (item.type === 'DISCOUNT_PERCENT' ? 'text-[#FFF]' : 'text-[#FBE118]');
                  const name2Color = isActive ? 'text-[#6350C3]' : 'text-[#FFF]';

                  return (
                    <>
                      {name1 && <Text className={cn(`${name1Color} ${fontSize1} font-montserrat500 leading-[25px]`)}>{name1}</Text>}
                      {name2 && <Text className={cn(`${name2Color} ${fontSize2} font-montserrat500 leading-[25px]`)}>{name2}</Text>}
                    </>
                  );
                })()}
              </View>
              <View>
                <Text className={cn("text-[45px] font-oswald600",
                  { "text-[#6350C3]": value?.value === item?.value, "text-[#FFF]": value?.value !== item?.value }
                )}>
                  {item.type === 'DISCOUNT_PERCENT' ? `${formatNumbers(item.discountPercent)}` : `${formatNumbers(+item.discountFixed / 1000)}`}
                  <Text className={cn("text-[20px] font-oswald600 ml-[2px]",
                    { "text-[#6350C3]": value?.value === item?.value, "text-[#FFF]": value?.value !== item?.value }
                  )}>{item.type === 'DISCOUNT_PERCENT' ? "%" : "천원"}</Text>
                </Text>
              </View>
            </View>
            <View className="mt-0 ml-[5px]">
              <HTML
                contentWidth={width}
                source={{ html: item?.requite }}
                tagsStyles={{
                  p: {
                    fontSize: 12,
                    color: value?.value === item?.value ? '#6350C3' : '#FFF',
                    fontFamily: "montserrat400",
                    lineHeight: 20,
                    marginBottom: 0,
                    marginTop: 0,
                  },
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>쿠폰선택</Text>
        <TouchableOpacity onPress={onClose}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "relative",
    flex: 1,
    width: "100%",
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 13,
    paddingBottom: 10
  },

  titleText: {
    color: "#222222",
    fontWeight: '600',
    fontSize: 23,
    lineHeight: 30,
    flex: 1,
    textAlign: "center",
  },
  itemText: {
    color: "#222222",
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
  },

  desText: {
    color: "#888888",
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  listMachine: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  item: {
    position: "relative",
    flex: 1,
    margin: 5,
    maxWidth: '47%',
  },
  itemActive: {
  },
  image: {
    justifyContent: "center",
    width: "100%",
    resizeMode: 'stretch',
    flex: 1,
  },
  itemContent: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: "100%",
    zIndex: 9999
  },
  itemContentActive: {
  },
  leftItem: {
    width: "22%",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 40,
  },
  rightItem: {
    marginLeft: 15,
  },
  itemTextActive: {
    color: "#2F265D",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
});
