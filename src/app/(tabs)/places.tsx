import BellIcon from "@/assets/images/svgs/bell.svg";
import CalendarIcon from "@/assets/images/svgs/calendar-icon.svg";
import DiamondIcon from "@/assets/images/svgs/diamond-icon.svg";
import HeadphoneIcon from "@/assets/images/svgs/headphone.svg";
import HeartIcon from "@/assets/images/svgs/heart-icon.svg";
import NewPlaceIcon from "@/assets/images/svgs/new-place.svg";
import Input from "@/components/Input";
import PlaceItemComp, { PlaceItemType } from "@/components/PlaceItemComp";
import TabUnderline from "@/components/TabUnderline";
import ToggleSort from "@/components/ToggleSort";
import { apiConfig } from "@/constants/apiConfig";
import { useCategories } from "@/hooks/useCategories";
import { useAppSelector } from "@/store/hook";
import sendApiRequest from "@/utils/api";
import formatNumbers from "@/utils/format";
import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon9White from "@/assets/icons/my/menu/menu-9-icon-white.svg";
import CloseIcon from "@/assets/images/svgs/close.svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Button from "@/components/Button";
import { LinearGradient } from 'expo-linear-gradient';
import EmptyData from "@/components/EmptyData";

type SortType = { star: boolean; distance: boolean };

const filterOptions = [
  {
    label: "캐시매장",
    icon: <DiamondIcon />,
    colorActive: "#FFF2DE",
    value: 0,
  },
  { label: "이벤트", icon: <CalendarIcon />, colorActive: "#E7FFEF", value: 1 },
  {
    label: "단골가게",
    icon: <HeartIcon />,
    colorActive: "#F335711A",
    value: 2,
  },
  {
    label: "신규 오픈",
    icon: <NewPlaceIcon />,
    colorActive: "#0A9EE81A",
    value: 3,
  },
];

export default function PlacesScreen() {
  const router = useRouter();
  const { filter } = useLocalSearchParams();
  const isFirstRender = useRef(true);
  const { storeActive } = useAppSelector((state: any) => state.store);
  const { categories } = useCategories("전체");
  const [placesData, setPlacesData] = useState<PlaceItemType[]>([]);
  const [page, setPage] = useState<{ current: number; total: number }>({
    current: 0,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalFilterVisible, setIsModalFilterVisible] = useState<boolean>(false);
  const [isModalPlace, setIsModalPlace] = useState<boolean>(false);
  const [querySearch, setQuerySearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [checkButton, setCheckButton] = useState<number[]>([]);
  const [sort, setSort] = useState<SortType>({ star: false, distance: false });
  const [sortType, setSortType] = useState<"star" | "distance">("distance");
  const [cateActive, setCateActive] = useState<string>();
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>([]);
  const [subList, setSubList] = useState<any>([]);

  // Check if current category is "전체" (All)
  const isAllCategory = cateActive === undefined;

  // Function to set subcategories based on selected category
  const updateSubList = (selectedValue: string) => {
    if (!categories || !selectedValue) {
      setSubList([]);
      return;
    }

    // Find the category that matches the selected value
    const selectedCategory = categories.find((cat: any) => cat.value === selectedValue);

    if (selectedCategory && selectedCategory.subcategory) {
      setSubList(selectedCategory.subcategory);
    } else {
      setSubList([]);
    }
  };

  const handleCheckButton = (value: number) => {
    if (checkButton.includes(value)) {
      const newArray = checkButton.filter((item: number) => value !== item);
      setCheckButton(newArray);
    } else {
      setCheckButton([value, ...checkButton]);
    }
  };

  const fetchPlaces = async (currentPageParam?: number) => {
    setLoading(true);
    const payload: any = {
      query: debouncedSearch.trim() || undefined,
      bigCategory: cateActive,
      categories: selectedFilterOptions.length > 0 ? selectedFilterOptions.join(',') : undefined,
      cashPlace: checkButton.includes(0) ? true : undefined,
      event: checkButton.includes(1) ? true : undefined,
      favourite: checkButton.includes(2) ? true : undefined,
      newOpen: checkButton.includes(3) ? true : undefined,
      page: currentPageParam,
      size: 5,
    };

    if (sortType === "star") {
      payload.sort = sort.star ? "star,desc" : "star,asc";
    } else if (sortType === "distance") {
      payload.sort = sort.distance ? "distance,desc" : "distance,asc";
      payload.longitude = storeActive?.longitude;
      payload.latitude = storeActive?.latitude;
      payload.idStore = storeActive?.id;
    }

    try {
      const res: any = await sendApiRequest({
        ...apiConfig.places.getListPlace,
        body: payload,
      });

      if (res?.data) {
        const data = res?.data?.content;
        const formatData: PlaceItemType[] = data?.map((item: any) => {
          const imagesFormatted = [
            { url: item.image1, name: null, price: null, defaultType: 'place' },
            ...(item?.eventInfo?.map((el: any) => ({
              url: el.image,
              name: null,
              price: null,
            })) || []),
            ...(item?.newMenus?.map((el: any) => ({
              url: el.image1,
              name: el.name,
              price: formatNumbers(el.price),
            })) || []),
            ...(item?.allMenus?.map((el: any) => ({
              url: el.image1,
              name: el.name,
              price: formatNumbers(el.price),
            })) || []),
            { url: item.image2, name: null, price: null, defaultType: 'event' },
            ...(item.image3 ? [{ url: item.image3, name: null, price: null }] : []),
          ];

          return {
            key: item.id,
            id: item?.id,
            status: [
              item.cashPlace && "CASH_PLACE",
              item.event && "EVENT",
            ].filter(Boolean),
            title: item?.name,
            isOpen: item?.isOpen,
            starCount: item?.star?.toFixed(1),
            reviewCount: item?.totalReview,
            isFavorite: item?.favourite,
            images: imagesFormatted,
          };
        });
        setPlacesData((prev) => {
          if (currentPageParam && currentPageParam !== page.current) {
            const mergedData = [...prev, ...formatData];
            return mergedData.filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.id === item.id)
            );
          }
          return formatData;
        });
        setPage({
          current: res?.data?.page?.number,
          total: res?.data?.page?.totalPages,
        });
      }
    } catch (error) {
      console.error("error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(querySearch);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [querySearch]);

  // Clear selected options when switching to 전체
  useEffect(() => {
    if (isAllCategory && selectedFilterOptions.length) {
      setSelectedFilterOptions([]);
    }
  }, [isAllCategory]);

  useEffect(() => {
    if (filter === "near" && isFirstRender.current) {
      isFirstRender.current = false;
      // setSort({ star: false, distance: true });
      // setSortType("distance");

      // getPlacesData();
    } else if (filter === "nearCash") {
      isFirstRender.current = false;
      // setSort({ star: false, distance: true });
      // setSortType("distance");
      setCheckButton([0]);

      // getPlacesData({ cashPlace: true });
    }
  }, [filter]);

  useEffect(() => {
    fetchPlaces();
  }, [debouncedSearch, sort, checkButton, cateActive, selectedFilterOptions, storeActive]);

  const handlePresentModalPress = useCallback(() => {
    setIsModalPlace(true)
  }, []);

  const handleOpenFilterSheet = useCallback(() => {
    if (!isAllCategory) {
      setIsModalFilterVisible(true);
    }
  }, [isAllCategory]);

  const textDistance = sortType !== "distance" ? '거리순' : sort.distance ? '먼거리' : '가까운거리';
  const textStar = sortType !== "star" ? '별점순' : sort.star ? '별점높은순' : '별점낮은순';

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Button
        styleButton={{ width: "100%" }}
        label="적용"
        disabled={isAllCategory}
        size="large"
        mode="contained"
        color="primary"
        onPress={() => {
          setIsModalFilterVisible(false);
        }}
      />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerText}>주변 가게</Text>
            <Pressable onPress={handlePresentModalPress}>
              <MenuIcon9White />
            </Pressable>
            <View style={{ flex: 1 }}></View>
            <Pressable style={{ marginRight: 15 }} onPress={() => router.push("/auth/customer-service")}>
              <HeadphoneIcon />
            </Pressable>
            <Pressable onPress={() => router.push("/mypage/notification")}>
              <BellIcon />
            </Pressable>
          </View>
          <View style={styles.common}>
            <Input
              mode="contained"
              rounded={false}
              value={querySearch}
              placeholder="가게이름검색"
              onChangeText={setQuerySearch}
              right={<AntDesign name="search1" size={24} color="#888" />}
            />
          </View>
          <TabUnderline
            listTab={categories}
            onChange={(v) => {
              setCateActive(v);
              updateSubList(v);
              setSelectedFilterOptions([]);
            }}
            onPressFilter={handleOpenFilterSheet}
          />
          <ScrollView style={[styles.common, styles.filterTop]} horizontal showsHorizontalScrollIndicator={false}>
            {filterOptions?.map(({ label, icon, colorActive, value }) => (
              <TouchableOpacity
                key={value}
                style={{
                  height: 32,
                  paddingHorizontal: 16,
                  borderRadius: 32,
                  borderWidth: 1,
                  gap: 8,
                  marginRight: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  borderColor: checkButton.includes(value) ? "#888" : "#E1E1E1",
                  backgroundColor: checkButton.includes(value)
                    ? colorActive
                    : "#FFF",
                }}
                onPress={() => handleCheckButton(value)}
                activeOpacity={0.7}
              >
                {icon}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: checkButton.includes(value) ? "#2F265D" : "#222222",
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="flex-row py-[16px] space-x-[20px] px-[16px]">
            <View>
              <ToggleSort
                initValue={false}
                label={textDistance}
                onToggle={(v) => {
                  setSort((prev: SortType) => ({ ...prev, distance: v }));
                  setSortType("distance");
                }}
              />
            </View>
            <View>
              <ToggleSort
                label={textStar}
                onToggle={(v) => {
                  setSort((prev: SortType) => ({ ...prev, star: v }));
                  setSortType("star");
                }}
              />
            </View>
          </View>
          <View className="h-[8px] mx-[-16px] block bg-[#F4F4F4]" />
          <View className="pt-[16px] flex-1">
            {placesData?.length > 0 ? (
              <View style={{ flexGrow: 1 }}>
                <FlashList
                  contentContainerStyle={{ paddingHorizontal: 16 }}
                  data={placesData}
                  keyExtractor={(_item) => `${_item.id}`}
                  renderItem={({ item, index }: any) => {
                    return (
                      <PlaceItemComp
                        index={index}
                        renderData={fetchPlaces}
                        item={item}
                      />
                    );
                  }}
                  onEndReached={() => {
                    if (page.current < page.total - 1) {
                      fetchPlaces(page.current + 1);
                    }
                  }}
                  estimatedItemSize={253}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={
                    loading ? <ActivityIndicator size="large" /> : null
                  }
                />
              </View>
            )
              : (
                <EmptyData />
              )
            }
          </View>
        </ScrollView>

        <StatusBar
          style={Platform.OS === "ios" ? "dark" : "auto"}
          backgroundColor="#2F265D"
        />

        <Modal animationType="slide" transparent={true} visible={isModalPlace}>
          <TouchableWithoutFeedback onPress={() => setIsModalPlace(false)}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <View style={styles.containerSheetPlace}>
                  <View className="relative w-full">
                    <Text className="leading-[29.9px] text-[23px] font-defaultSemiBold text-center">
                      주변가게
                    </Text>
                    <TouchableOpacity
                      onPress={() => setIsModalPlace(false)}
                      className="top-[2px] absolute right-[0]"
                    >
                      <CloseIcon />
                    </TouchableOpacity>
                  </View>

                  <Text className="text-[#7e7e7e] text-[14px] font-montserrat500">
                    수수료없는 착한 주문으로 우리동네 주변가게를 응원합니다!
                  </Text>

                  <View className="py-[10px] flex-col gap-[4px]"
                  >
                    <View className="flex-row w-full gap-[10px] mb-1">
                      <View className={`flex-row gap-[5px] border border-solid rounded-[50px] cursor-pointer px-[5px] py-0 whitespace-nowrap border-[#888888] bg-[#fff2de]
            w-[95px] min-w-[95px] h-[30px]
            `}>
                        <DiamondIcon />
                        <Text className="text-[13px] font-montserrat600">캐시매장</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-[#7e7e7e] text-[13px]">캐시매장은 방문 포장이나 전화 주문 고객에게 자율적으로 업소 주인이 보상하는 버블캐시로
                          호텔런드리에서 세탁시 현금처럼 사용합니다.
                        </Text>
                        <Text className="text-[#222222] text-[13px] text-center">* 버블캐시 구매를 원하는 업소 사장님은 1577-2657로 전화 주세요</Text>
                      </View>
                    </View>

                    <View className="flex-row w-full gap-[10px] mb-1">
                      <View className={`flex-row gap-[5px] border border-solid rounded-[50px] cursor-pointer px-[5px] py-0 whitespace-nowrap border-[#888888] bg-[#e7ffef]
            w-[95px] min-w-[95px] h-[30px]
            `}>
                        <CalendarIcon />
                        <Text className="text-[13px] font-montserrat600">이벤트</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-[#7e7e7e] text-[13px]">이벤트 동네 업소들의 실시간 이벤트나 신메뉴 소식을 전하는 소통 창구힙니다.
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row w-full gap-[10px] mb-1">
                      <View className={`flex-row gap-[5px] border border-solid rounded-[50px] cursor-pointer px-[5px] py-0 whitespace-nowrap border-[#888888] bg-[#f335711a]
            w-[95px] min-w-[95px] h-[30px]
            `}>
                        <HeartIcon />
                        <Text className="text-[13px] font-montserrat600">단골가게</Text>
                      </View>
                      <View className="flex-1" >
                        <Text className="text-[#7e7e7e] text-[13px]">단골가게에 등록해야 버블캐시 보상도 받고 해당 매장의 소식을 알림으로 받을 수 있어요
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row w-full gap-[10px] mb-1">
                      <View className={`flex-row gap-[5px] border border-solid rounded-[50px] cursor-pointer px-[5px] py-0 whitespace-nowrap border-[#888888] bg-[#0a9ee81a]
            w-[95px] min-w-[95px] h-[30px]
            `}>
                        <NewPlaceIcon />
                        <Text className="text-[13px] font-montserrat600">신규 오픈</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-[#7e7e7e] text-[13px]">신규오픈은 우리동네 오픈 매장을 1년간 공개하여 '힘내라' 응원합니다.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Filter bottom sheet */}
        <Modal animationType="slide" transparent={true} visible={isModalFilterVisible}>
          <TouchableWithoutFeedback onPress={() => setIsModalFilterVisible(false)}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <View style={styles.containerSheet}>
                  <View style={styles.headerSheet}>
                    <Text style={styles.titleText}>소분류 선택</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalFilterVisible(false);
                      }}
                    >
                      <CloseIcon />
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'flex-start', gap: 6, paddingHorizontal: 6, marginTop: 5, width: '100%' }}>
                    {subList
                      ?.filter((c: any) => c?.id !== undefined)
                      ?.map((c: any, idx: number) => {
                        const isActive = selectedFilterOptions.includes(c.id);
                        const isDisabled = isAllCategory; // 전체: không cho chọn
                        return (
                          <TouchableOpacity
                            key={`${c.id}-${idx}`}
                            disabled={isDisabled}
                            onPress={() => {
                              if (isDisabled) return;
                              setSelectedFilterOptions((prev) => {
                                if (prev.includes(c.id)) {
                                  return prev.filter((v) => v !== c.id);
                                }
                                return [...prev, c.id];
                              });
                            }}
                            activeOpacity={0.7}
                            style={{ marginRight: 0, marginBottom: 3 }}
                          >
                            {isActive ? (
                              <LinearGradient
                                colors={["#2F265D", "#6350C3"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={{
                                  height: 36,
                                  paddingHorizontal: 14,
                                  borderRadius: 32,
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderWidth: 1,
                                  borderColor: "transparent",
                                  minWidth: 80,
                                }}
                              >
                                <Text className="text-[16px]" style={{ color: "#FFFFFF", fontWeight: "600" }}>{c.name}</Text>
                              </LinearGradient>
                            ) : (
                              <View
                                style={{
                                  height: 36,
                                  paddingHorizontal: 14,
                                  borderRadius: 32,
                                  borderWidth: 1,
                                  borderColor: isDisabled ? "#E9E9E9" : "#888888",
                                  backgroundColor: isDisabled ? "#F5F5F5" : "#FFFFFF",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  minWidth: 80,
                                  opacity: isDisabled ? 0.4 : 1,
                                }}
                              >
                                <Text className="text-[16px]" style={{ color: isDisabled ? "#C4C4C4" : "#888888", fontWeight: "600" }}>{c.name}</Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                  </View>

                  {renderFooter()}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFF", flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(47, 38, 93, 0.85)",
  },
  containerSheet: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
    height: "45%",
  },
  containerSheetPlace: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
    height: "55%",
  },
  headerSheet: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    marginBottom: 14,
  },
  common: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 0,
    marginBottom: 16,
  },
  header: {
    backgroundColor: "#2F265D",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    gap: 6,
    paddingTop: 30,
    marginBottom: 24,
  },
  headerText: {
    color: "#FFF",
    fontSize: 17,
    lineHeight: 18,
    fontWeight: "600",
  },
  titleText: {
    color: "#222222",
    fontWeight: "700",
    fontSize: 23,
    lineHeight: 30,
    textAlign: "center",
    flex: 1,
  },
  filterTop: {
    marginTop: 24,
    marginBottom: 0,
    paddingRight: 20,
    gap: 8,
  },
  filterBottom: {
    marginBottom: 0,
    paddingBottom: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 24,
    borderBottomColor: "#DADADABF",
    borderBottomWidth: 1,
  },
  contentContainerSheet: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: { width: "100%" },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
    paddingHorizontal: 16,
    height: 28,
    borderRadius: 28,
  },
  badgeText: {
    lineHeight: 18.2,
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
});
