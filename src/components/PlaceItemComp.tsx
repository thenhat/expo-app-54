import EventIcon from "@/assets/icons/my/calendar.svg";
import DiamondIcon from "@/assets/icons/my/diamond.svg";
import StarYellow12 from "@/assets/icons/my/Star-12-Yellow.svg";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ToggleFavorite from "./ToggleFavorite";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import { useRouter } from "expo-router";
const DefaultPlace = require("@/assets/images/default_place.png");
const DefaultEvent = require("@/assets/images/default-event.png");

export type ItemStatusType = "CASH_PLACE" | "EVENT";

export type PlaceItemType = {
  id?: number;
  status: ItemStatusType[];
  title: string;
  isOpen: boolean;
  starCount: number;
  reviewCount: number;
  isFavorite: boolean;
  images: any[];
  key?: string;
};

interface PlaceItemCompProps {
  item: PlaceItemType;
  index: number;
  handleToggleFavorite?: (id?: any) => Promise<void>;
  renderData: any;
  noToggle?: boolean;
}

const placeStatusMapping: any = {
  CASH_PLACE: (
    <View className="flex-row gap-[5px] h-[28px] px-[15px] rounded-full bg-[#FFF2DE] items-center justify-center self-start">
      <DiamondIcon />
      <Text className="text-[14px] font-defaultSemiBold text-[#222]">
        캐시매장
      </Text>
    </View>
  ),
  EVENT: (
    <View className="flex-row gap-[5px] h-[28px] px-[15px] rounded-full bg-[#E7FFEF] items-center justify-center self-start">
      <EventIcon />
      <Text className="text-[14px] font-defaultSemiBold text-[#222]">
        이벤트
      </Text>
    </View>
  ),
};

const PlaceItemComp: React.FC<PlaceItemCompProps> = ({
  item,
  noToggle,
  renderData,
  index,
}) => {
  const {
    status,
    title,
    isOpen,
    starCount,
    reviewCount,
    isFavorite,
    images,
    id,
    // key,
  } = item;
  const router = useRouter();

  const handleToggleFavorite = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.places.toggleFavorite,
        fullUrl: `favourites/${id}/toggle`,
      });
      if (res?.data) {
        renderData();
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  // console.log('isFavorite', isFavorite);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/places/place-detail/[id]",
          params: { id: `${item?.id}`, type: "list" },
        })
      }
    >
      {index > 0 && (
        <View className="h-[8px] mx-[-16px] block mb-[24px] bg-[#F4F4F4]" />
      )}
      <View className="pb-[24px]">
        <View className="flex-row gap-[12px] mb-[16px]">
          {status?.map((item: string, index: number) => (
            <Text key={index}>{placeStatusMapping[item]}</Text>
          ))}
        </View>
        <Text className="text-[19px] leading-[24.7px] text-[#222] font-defaultSemiBold mb-[5px]">
          {title}
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text
              className={`mr-[16px] text-[13px] leading-[20.8px] font-defaultSemiBold ${isOpen ? "text-[#0A9EE8]" : "text-[#DADADA]"}`}
            >
              {isOpen ? "영업중" : "영업종료"}
            </Text>
            {starCount && (
              <>
                <View className="flex-row items-center gap-[4px]">
                  <Text className="text-[13px] leading-[20.8px] font-defaultSemiBold text-[#222]">
                    {starCount}
                  </Text>
                  <StarYellow12 />
                </View>
                <View className="w-[4px] h-[4px] rounded-full bg-[#DADADA] mx-[8px] block" />
              </>
            )}
            <Text>{`${reviewCount} 리뷰`}</Text>
          </View>
          <ToggleFavorite
            isFavorite={isFavorite}
            onToggle={handleToggleFavorite}
            noToggle={noToggle}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex flex-row space-x-[10px] py-2"
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <View key={index} className="relative">
                <Image
                  source={
                    image.url && typeof image.url === 'string' && image.url.trim() !== ''
                      ? { uri: image.url }
                      : image.defaultType === 'event'
                      ? DefaultEvent
                      : image.defaultType === 'place'
                      ? DefaultPlace
                      : { uri: image.url }
                  }
                  className="w-[115px] h-[115px] rounded-[5px]"
                  resizeMode="cover"
                />
                {image.name && image.price ? (
                  <View className="absolute bottom-0 left-0 right-0 px-[5px] py-[4px] bg-white75 mr-[8px] rounded-tr-[8px] flex-row justify-between">
                    <Text className="text-[9px] flex-1">{image.name}</Text>
                    <Text className="text-[10px] flex-1 max-w-[48px] font-defaultSemiBold text-right">
                      {image.price}원
                    </Text>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            ))
          ) : (
            <View className="w-[115px] h-[115px] border border-solid rounded-[5px]" />
          )}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItemComp;
