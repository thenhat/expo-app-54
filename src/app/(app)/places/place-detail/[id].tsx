import PhoneRangIcon from "@/assets/icons/phone-order-icon.svg";
import CalendarIcon from "@/assets/images/svgs/calendar-icon.svg";
import DiamondIcon from "@/assets/images/svgs/diamond-icon.svg";
import Button from "@/components/Button";
import DotLoading from "@/components/Loading/DotLoading";
import { apiConfig } from "@/constants/apiConfig";
import sendApiRequest from "@/utils/api";
import formatNumbers, { maskName } from "@/utils/format";
import { AntDesign, Feather, Foundation } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Carousel, {
  ICarouselInstance,
} from "react-native-reanimated-carousel";

import { useAppDispatch } from "@/store/hook";
import { setLoading } from "@/store/slice/globalSlice";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import WebView from "react-native-webview";
import { Linking } from "react-native";
import PrevCarouselIcon from "@/assets/icons/arrow-carousel-prev.svg";
import NextCarouselIcon from "@/assets/icons/arrow-carousel-next.svg";
import PlaceMapBottom from "../PlaceMapBottom";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
const DefaultPlace = require("@/assets/images/default_place.png");

export const daysMapping: Record<string, string> = {
  Mon: "월",
  Tue: "화",
  Wed: "수",
  Thu: "목",
  Fri: "금",
  Sat: "토",
  Sun: "일",
};

export const convertDaysToKorean = (days: string[]) => {
  return days?.map((day) => {
    return day
      .split(",")
      .map((singleDay) => daysMapping[singleDay.trim()] || singleDay)
      .join(", ");
  });
};

type MenuItemProps = {
  id?: string;
  categoryMenu?: string;
  name?: string;
  description?: string;
  price?: 75000.0;
  image1: string;
  image2?: string;
  image3?: string;
};

type MenuSectionProps = { sectionTitle: string; items: MenuItemProps[] };

// Individual Menu Item Component
const MenuItem: React.FC<MenuItemProps> = ({
  name,
  description,
  price,
  image1,
}) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.menuItem}>
      <Image source={{ uri: image1 }} style={styles.menuImage} />
      <View style={styles.menuDetails}>
        <Text style={styles.menuTitle}>{name}</Text>
        <RenderHTML
          contentWidth={width}
          source={{ html: `${description}` }}
          tagsStyles={tagsStyles}
        />
        <Text style={styles.menuPrice}>{formatNumbers(price)}원</Text>
      </View>
    </View>
  );
};

// Menu Section Component
const MenuSection: React.FC<MenuSectionProps> = ({ sectionTitle, items }) => {
  return (
    <View style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {items?.map((item, index) => (
        <MenuItem
          key={item.id}
          // id={item.id}
          description={item.description}
          image1={item.image1}
          name={item.name}
          price={item.price}
        />
      ))}
    </View>
  );
};

type ReviewItemProps = {
  id?: number;
  comment?: string;
  star?: number;
  userName?: string;
  createdDate?: string;
  idUser?: number;
  userImage?: string;
  visitDate?: string;
};

type ReviewSectionProps = {
  averageStar: number;
  totalReviews: number;
  reviews: ReviewItemProps[];
};

// Component to render individual stars
const StarRating: React.FC<{ rating: number; header: boolean }> = ({
  rating,
  header,
}) => {
  const stars = Array(5)
    .fill(0)
    ?.map((_, index) =>
      index < rating ? (
        <AntDesign
          key={index}
          name="star"
          color={header ? "#FEA31B" : "#2F265D"}
          size={header ? 18 : 12}
        />
      ) : (
        <AntDesign
          key={index}
          name="star"
          color={"#DADADA"}
          size={header ? 18 : 12}
        />
      )
    );
  return (
    <View style={[styles.starRating, { gap: header ? 4 : 2 }]}>
      {stars.map((star, idx) => star)}
    </View>
  );
};

// Individual Review Item Component
const ReviewItem: React.FC<ReviewItemProps> = ({
  comment,
  star,
  userName,
  createdDate,
  visitDate,
}) => {
  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <StarRating rating={star || 5} header={false} />
        <Text style={styles.reviewerName}>{maskName(`${userName}`)}</Text>
      </View>
      <Text style={styles.reviewComment}>{comment}</Text>
      <Text style={styles.reviewDate}>
        {dayjs(createdDate).format("YYYY.MM.DD HH:mm:ss")}{" "}
        {`방문 ${dayjs(visitDate).format("YYYY.MM.DD")}`}
      </Text>
    </View>
  );
};

// Review Section Component
const ReviewSection: React.FC<ReviewSectionProps> = ({
  averageStar,
  totalReviews,
  reviews,
}) => {
  return (
    <View>
      {/* Header */}
      <View style={styles.headerReview}>
        <View style={styles.ratingRow}>
          <StarRating rating={averageStar} header={true} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={styles.averageRating}
          >{`${averageStar && averageStar.toFixed(1)}`}</Text>
          <Text style={styles.totalReviews}>|</Text>
          <Text style={styles.totalReviews}>({totalReviews}건)</Text>
        </View>
      </View>

      {/* Reviews List */}
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.reviewList}
      >
        {reviews?.map((review, index) => (
          <ReviewItem
            key={review.id}
            comment={review.comment}
            star={review.star}
            userImage={review.userImage}
            userName={review.userName}
            createdDate={review.createdDate}
            visitDate={review.visitDate}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const TagComponent: React.FC<{ tag: 0 | 1 }> = ({ tag }) => {
  if (tag === 0) {
    return (
      <View style={{ ...styles.badge, backgroundColor: "#FFF2DE" }}>
        <DiamondIcon />
        <Text style={styles.badgeText}>캐시매장</Text>
      </View>
    );
  }

  return (
    <View style={{ ...styles.badge, backgroundColor: "#E7FFEF" }}>
      <CalendarIcon />
      <Text style={styles.badgeText}>이벤트</Text>
    </View>
  );
};

const PlaceDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id, type } = useGlobalSearchParams();
  const webViewPlaceRef = useRef<any>(null);
  const carouselRef = React.useRef<ICarouselInstance>(null);
  const [loadingFavo, setLoadingFavo] = useState<boolean>(false);
  const scrollPos = useRef(new Animated.Value(0)).current;
  const [tabActive, setTabActive] = useState<number>(0);
  const [menuData, setMenuData] = useState<any>({});
  const [review, setReview] = useState<any>({});
  const [detailData, setDetailData] = useState<any>({});
  const { width } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowOptionMap, setIsShowOptionMap] = useState(false);
  const [isModalVisibleMap, setIsModalVisibleMap] = useState(false);
  const data = detailData?.eventInfoList || [];

  const handlePresentModalPress = useCallback(() => {
    setIsModalVisibleMap(true);
  }, []);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next(); // Chuyển sang item tiếp theo
      setCurrentIndex((prev) => Math.min(prev + 1, data.length - 1));
    }
  };

  const handleBack = () => {
    if (carouselRef.current) {
      carouselRef.current.prev(); // Quay lại item trước đó
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };
  // Interpolate the background color based on scroll position
  const textColorHeader = scrollPos.interpolate({
    inputRange: [200, 300], // Change 500 to your desired scroll threshold
    outputRange: ["#ffffff", "#222222"],
    extrapolate: "clamp",
  });

  const opacityHeader = scrollPos.interpolate({
    inputRange: [200, 300],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const is24Hours =
    (detailData?.openTime === "00:00:00" &&
      detailData?.closeTime === "00:00:00") ||
    !detailData?.openTime;

  const getMenuData = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.places.getMenuList,
        endPoint: `/menu-list/${id}`,
      });
      if (res) {
        setMenuData(res);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  const getReview = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.places.getReview,
        endPoint: `/review-list/${id}`,
        // body: {},
      });
      if (res) {
        setReview(res);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  const getDetail = async () => {
    dispatch(setLoading(true));
    try {
      const res: any = await sendApiRequest({
        method: "get",
        endPoint: `/place/${id}`,
      });
      if (res?.data) {
        setDetailData(res?.data);
      }
    } catch (error) {
      console.error("error:", error);
    }
    dispatch(setLoading(false));
  };

  const handleToggleFavorite = async () => {
    setLoadingFavo(true);
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.places.toggleFavorite,
        endPoint: `favourites/${id}/toggle`,
      });
      if (res?.data) {
        await getDetail();
        setLoadingFavo(false);
      }
    } catch (error) {
      console.error("error:", error);
      setLoadingFavo(false);
    }
  };

  const handlePhoneOrder = async () => {
    Linking.openURL(`tel:${detailData?.phone}`).catch((err) =>
      console.error("Không thể mở trình gọi", err)
    );
    try {
      const res: any = await sendApiRequest({
        method: "post",
        endPoint: `/place/${id}/phone-order`,
      });
      if (res?.data) {
        getDetail();
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleCallCancelOrder = async () => {
    Linking.openURL(`tel:${detailData?.phone}`).catch((err) =>
      console.error("Không thể mở trình gọi", err)
    );
  };

  useEffect(() => {
    tabActive === 1 && getMenuData();
    tabActive === 2 && getReview();
    // getDetail();
  }, [tabActive]);

  useEffect(() => {
    // oo
    getDetail();
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        if (isShowOptionMap) {
          setIsShowOptionMap(false);
        }
      }
    },
    []
  );

  const renderItem = ({ item }: any) => {
    return (
      <View
        key={item?.id}
        style={{
          width: "100%",
          height: 220,
        }}
      >
        <View className="mr-[10px]">
          <View className="mb-[10px]">
            <Image
              source={{
                uri: item?.image,
              }}
              style={{ width: "100%", height: 115, objectFit: "cover" }}
            />
          </View>
          <View>
            <Text className="text-[15px] leading-[20px] font-semibold">
              {item?.title}
            </Text>
            <Text
              style={{
                color: "#888",
                fontSize: 14,
                fontFamily: "montserrat400",
              }}
            >
              <RenderHTML
                contentWidth={width}
                source={{ html: item?.content }}
                tagsStyles={tagsStyles}
              />
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const sendDataToWeb = () => {
    const data = JSON.stringify({
      type: "STORE_DATA",
      store: detailData,
    });

    webViewPlaceRef.current?.injectJavaScript(`
      (function() {
        window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(data)} }));
      })();
    `);
  };
  // console.log("detailData?.favourited", detailData?.favourited);

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        {/** header */}
        <View
          style={{
            width: "100%",
            height: 100,
            opacity: 0.7,
            zIndex: 1,
            position: "absolute",
            top: 0,
          }}
        >
          <Svg height={100} width="100%">
            <Defs>
              <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="10%" stopColor="rgb(0, 0, 0)" />
                <Stop
                  offset="100%"
                  stopColor="rgb(255,255,255)"
                  stopOpacity={0}
                />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#gradient)" />
          </Svg>
        </View>
        <Animated.View
          style={{
            width: "100%",
            height: 60,
            zIndex: 2,
            position: "absolute",
            backgroundColor: "#fff",
            top: 30,
            opacity: opacityHeader,
          }}
        ></Animated.View>
        <Animated.View style={styles.header}>
          <Pressable
            onPress={() =>
              type === "list" ? router.push("/(tabs)/places") : router.back()
            }
          >
            <AntDesign name="close" size={22} color={"#FFF"} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Animated.Text
              style={[styles.headerText, { color: textColorHeader }]}
            >
              {detailData?.name}
            </Animated.Text>
          </View>
          <View style={{ width: 22 }}></View>
        </Animated.View>

        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollPos } } }],
            { useNativeDriver: false } // Use false because colors can't be animated natively
          )}
          style={styles.container}
        >
          {/* Top Section */}
          <View>
            <Image
              style={styles.image}
              source={detailData?.image1 ? { uri: detailData?.image1 } : DefaultPlace} // Replace with real image URL
            />
            <View style={styles.tagsContainer}>
              {detailData?.cashPlace && <TagComponent tag={0} />}
              {detailData?.event && <TagComponent tag={1} />}
            </View>
            <View style={styles.titleContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{detailData?.name}</Text>
                <View style={styles.titleInfo}>
                  <Text
                    style={[
                      styles.status,
                      detailData?.isOpen ? styles.open : styles.closed,
                    ]}
                  >
                    {detailData?.isOpen ? `영업중` : "영업종료"}
                  </Text>
                  <Text style={styles.rating}>
                    {detailData?.star && detailData?.star?.toFixed(1)}{" "}
                    <AntDesign name="star" color={"#FFC529"} />
                  </Text>
                  <Text style={styles.dot}>•</Text>
                  <Text
                    style={styles.reviews}
                  >{`${detailData?.totalReview} 리뷰`}</Text>
                </View>
              </View>
              {detailData?.ordered ? (
                <Pressable
                  className="flex-row items-center w-[104px] h-[40px] border border-[#2F265D] rounded-full px-[8px] justify-center space-x-[4px]"
                  onPress={handleCallCancelOrder}
                >
                  <PhoneRangIcon />
                  <View>
                    <Text className="text-[14px] font-defaultBold leading-[18.2px] text-[#2F265D]">
                      주문완료
                    </Text>
                    <Text className="text-[11px] font-defaultRegular leading-[14.3px] text-[#2F265D]">
                      (취소하기)
                    </Text>
                  </View>
                </Pressable>
              ) : (
                <Button
                  label="전화주문"
                  size="large"
                  color="primary"
                  mode="outlined"
                  startIcon={<PhoneRangIcon />}
                  onPress={handlePhoneOrder}
                />
              )}
            </View>
            <View style={styles.infoContainer}>
              <View className="flex-row items-center justify-between gap-[10px]">
                <Text style={styles.infoText} className="flex-1">
                  <Feather name="map-pin" size={16} color="black" />{" "}
                  {detailData?.address?.value || "Address"}
                </Text>
                <TouchableOpacity
                  onPress={handlePresentModalPress}>
                  <Text style={[styles.infoText, { color: "#0A9EE8" }]}>
                    <Feather name="map" size={16} color="#0A9EE8" />{" "}
                    길찾기
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.infoText}>
                <Feather name="clock" size={16} color="black" />{" "}
                {is24Hours && "24시간 /"}
                {!is24Hours &&
                  `${detailData?.openTime?.replace(/:\d{2}$/, "")} ~ ${detailData?.closeTime?.replace(/:\d{2}$/, "")} /`}
                {convertDaysToKorean(detailData?.dayOfWeek)}
              </Text>
              <Text style={styles.infoText}>
                <Feather name="phone" size={16} color="black" />{" "}
                {detailData?.phone}
              </Text>
              <Text style={styles.infoTags}>
                <Feather name="tag" size={16} color="black" />{" "}
                {detailData?.tag?.split(",").map((el: any) => `#${el.trim()} `)}
              </Text>
            </View>
            <View className="px-[16px]">
              <TouchableOpacity
                className={`w-full h-[50px] rounded-full flex-row justify-center items-center  ${detailData?.favourite ? "border border-[#2F265D]" : "bg-[#2F265D]"}`}
                onPress={handleToggleFavorite}
              >
                {loadingFavo ? (
                  <DotLoading
                    color={detailData?.favourite ? "#2F265D" : "#ffffff"}
                  />
                ) : (
                  <>
                    <Foundation
                      name="heart"
                      size={18}
                      color={detailData?.favourite ? "#F33571" : "#ffffff"}
                    />
                    <Text
                      className={`text-[14px] pl-[10px] font-defaultBold ${detailData?.favourite ? "text-[#2F265D]" : "text-[#fff]"}`}
                    >
                      {detailData?.favourite ? "나의 단골가게" : "단골가게 등록"}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs Section */}
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tab} onPress={() => setTabActive(0)}>
              <Text
                style={tabActive === 0 ? styles.tabTextActive : styles.tabText}
              >
                정보
              </Text>
            </TouchableOpacity>
            <Text style={styles.textSlice}>|</Text>
            <TouchableOpacity style={styles.tab} onPress={() => setTabActive(1)}>
              <Text
                style={tabActive === 1 ? styles.tabTextActive : styles.tabText}
              >
                메뉴
              </Text>
            </TouchableOpacity>
            <Text style={styles.textSlice}>|</Text>
            <TouchableOpacity style={styles.tab} onPress={() => setTabActive(2)}>
              <Text
                style={tabActive === 2 ? styles.tabTextActive : styles.tabText}
              >
                리뷰
              </Text>
            </TouchableOpacity>
          </View>

          {/* Event Section */}
          <View style={{ backgroundColor: "#F4F4F4", flex: 1 }}>
            {tabActive === 0 && (
              <View style={styles.eventContainer}>
                {detailData?.eventInfoList?.length > 0 && (
                  <View
                    className="flex-1"
                    onLayout={(event) =>
                      setContainerWidth(event.nativeEvent.layout.width)
                    }
                  >
                    <View style={styles.cashSliderContainer}>
                      <View className="flex-row justify-between items-center mb-[10px]">
                        <View className="self-start">
                          <TagComponent tag={1} />
                        </View>
                        <View className="flex-row items-center justify-center space-x-[14px]">
                          <Pressable
                            onPress={handleBack}
                            disabled={currentIndex === 0}
                            className={`${currentIndex === 0 ? "opacity-[0.4]" : ""}`}
                          >
                            <PrevCarouselIcon />
                          </Pressable>
                          <View className="h-[18px] w-[1px] bg-[#DADADA] block" />
                          <Pressable
                            onPress={handleNext}
                            disabled={currentIndex === data.length - 1}
                            className={`${currentIndex === data.length - 1 ? "opacity-[0.4]" : ""}`}
                          >
                            <NextCarouselIcon />
                          </Pressable>
                        </View>
                      </View>
                      {containerWidth > 0 && (
                        <Carousel
                          ref={carouselRef}
                          loop
                          width={containerWidth + 10}
                          height={220}
                          data={detailData?.eventInfoList || []}
                          renderItem={renderItem}
                          autoPlay={false}
                          autoPlayInterval={3000}
                          scrollAnimationDuration={1000}
                        />
                      )}
                      {/* <Pagination.Basic
                      progress={progress}
                      data={detailData?.eventInfoList || []}
                      dotStyle={{
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: 50,
                      }}
                      containerStyle={{ gap: 5, marginTop: 10 }}
                      onPress={onPressPagination}
                    /> */}
                    </View>
                    <View style={styles.break}></View>
                  </View>
                )}

                <Text style={styles.eventTitleText}>가게정보</Text>
                {/* <Text style={styles.eventText}>
                {detailData?.eventInfo?.introducePlace}
              </Text> */}
                <RenderHTML
                  contentWidth={width}
                  source={{ html: `${detailData?.introduce}` }}
                  tagsStyles={tagsStyles}
                />

                <View style={styles.break}></View>

                <Text style={styles.eventTitleText}>가게위치</Text>
                <View
                  style={{
                    height: 150,
                    borderRadius: 5,
                    backgroundColor: "#f4f4f4",
                  }}
                >
                  <WebView
                    ref={webViewPlaceRef}
                    source={{ uri: "https://dev.hotel-laundry.com/store.html" }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onLoadEnd={sendDataToWeb}
                    injectedJavaScriptBeforeContentLoaded={`
                    window.isWebView = true;
                  `}
                  />
                </View>
              </View>
            )}

            {tabActive === 1 && (
              <View style={styles.eventContainer}>
                <MenuSection
                  sectionTitle="신메뉴"
                  items={menuData?.newMenus as any}
                />
                <View style={styles.break}></View>
                <MenuSection
                  sectionTitle="전체메뉴"
                  items={menuData?.allMenus as any}
                />
              </View>
            )}
            {tabActive === 2 && (
              <View style={styles.eventContainer}>
                {review.countReviews ? (
                  <ReviewSection
                    averageStar={review.averageStar}
                    totalReviews={review.countReviews}
                    reviews={review.reviews as any}
                  />
                ) : (
                  <Text>No review</Text>
                )}
              </View>
            )}
          </View>
        </Animated.ScrollView>

        <PlaceMapBottom
          onChange={handleSheetChanges}
          show={isShowOptionMap}
          isModalVisibleMap={isModalVisibleMap}
          setIsModalVisibleMap={setIsModalVisibleMap}
          data={detailData}
        />
      </SafeAreaView>
    </GestureHandlerRootView>

  );
};

export default PlaceDetail;

const tagsStyles = {
  div: {
    color: "#888",
    fontSize: 15,
    fontFamily: "montserrat500",
  },
  p: {
    color: "#888",
    fontSize: 15,
    fontFamily: "montserrat500",
  },
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFF", height: "100%" },
  header: {
    position: "absolute",
    width: "100%",
    top: 0,
    height: 140,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 0,
    gap: 24,
    // marginTop: 30,
    marginBottom: 24,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    color: "#FFF",
    fontSize: 17,
    lineHeight: 18,
    fontWeight: "600",
    textAlign: "center",
    textShadowColor: 'rgba(80, 80, 80, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
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

  image: {
    width: "100%",
    height: 261,
    objectFit: "cover",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 24,
    marginHorizontal: 16,
    gap: 8,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 19,
    lineHeight: 25,
    color: "#222",
    fontWeight: "600",
    marginBottom: 4,
  },
  titleInfo: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  status: { fontSize: 13, fontWeight: "600", color: "#0A9EE8" },
  open: { color: "#4CAF50" },
  closed: { color: "#888888" },
  rating: { fontSize: 13, color: "#222", marginLeft: 16, fontWeight: "600" },
  reviews: { fontSize: 12, color: "#888888" },
  dot: { marginHorizontal: 6, color: "#DADADA", fontSize: 22 },
  infoContainer: { margin: 16, marginVertical: 0, marginBottom: 24, gap: 4 },
  infoText: { fontSize: 15, marginBottom: 4, color: "#222" },
  infoTags: { color: "#0A9EE8", fontSize: 14 },
  favoriteButton: {
    backgroundColor: "#2F265D",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    alignItems: "center",
  },
  favoriteText: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderTopWidth: 4,
    borderColor: "#DADADA",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    flex: 1,
  },
  textSlice: { fontSize: 16, fontWeight: "600", color: "#DADADA" },
  tabTextActive: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20.8,
    color: "#2F265D",
  },
  tabText: { fontSize: 14, color: "#AAA", paddingVertical: 8 },
  eventContainer: {
    margin: 16,
    marginBottom: 50,
    backgroundColor: "#FFFFFF",
    shadowColor: "#666666",
    borderRadius: 8,
    padding: 16,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  eventTag: { fontSize: 14, fontWeight: "bold", color: "#28A745" },
  eventImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginVertical: 8,
  },
  eventText: { fontSize: 15, lineHeight: 27, color: "#222" },
  eventTitleText: {
    fontSize: 16,
    lineHeight: 27,
    fontWeight: "700",
    marginBottom: 8,
  },
  break: {
    borderBottomColor: "#F4F4F4",
    borderBottomWidth: 1,
    marginVertical: 16,
  },

  // menu lisst
  menuSection: { marginBottom: 0 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 16 },
  menuItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  menuImage: { width: 86, height: 86, borderRadius: 5 },
  menuDetails: { flex: 1, paddingVertical: 4, paddingHorizontal: 16 },
  menuTitle: { fontSize: 15, lineHeight: 27, fontWeight: "500", color: "#222" },
  menuSubtitle: {
    fontSize: 13,
    lineHeight: 23.4,
    color: "#888",
    marginBottom: 4,
  },
  menuPrice: { fontSize: 16, fontWeight: "600", color: "#222" },

  // review
  headerReview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  averageRating: {
    fontSize: 18,
    lineHeight: 23.4,
    fontWeight: "600",
    marginLeft: 8,
    color: "#222",
  },
  totalReviews: {
    fontSize: 13,
    lineHeight: 23.4,
    color: "#888",
    marginLeft: 8,
  },
  reviewList: { paddingVertical: 8 },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 4,
    gap: 16,
  },
  reviewerName: { fontSize: 12, lineHeight: 21.6, color: "#222" },
  reviewComment: {
    fontSize: 15,
    lineHeight: 27,
    color: "#222",
    marginVertical: 4,
  },
  reviewDate: {
    fontSize: 12,
    lineHeight: 21.6,
    color: "#888",
    marginTop: 4,
    marginBottom: 8,
  },
  starRating: { flexDirection: "row" },
  filledStar: { fontSize: 18 },
  emptyStar: { fontSize: 12 },
  cashSliderContainer: { width: "100%", marginTop: 10 },
});
