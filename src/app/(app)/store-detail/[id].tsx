import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  Animated,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import Button from "@/components/Button";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as Linking from "expo-linking";
import {
  setStoreActive,
  setStoreSelectedMap,
  setTimeOrder,
} from "@/store/slice/storeSlice";
import { WebView } from "react-native-webview";
import ListMachine from "@/components/appointment/ListMachine";
import sendApiRequest from "@/utils/api";
import moment from "moment";
import RenderHTML from "react-native-render-html";
import { maskName } from "@/utils/format";
import { apiConfig } from "@/constants/apiConfig";
import { useAppSelector } from "@/store/hook";
import ButtonGroup from "@/components/ButtonGroup";
import ListMachineBase from "@/components/appointment/ListMachineBase";

const storeDetail = require("@/assets/images/store-detail.png");
const phoneRangIcon = require("@/assets/icons/Phone-Store.png");

type ReviewItemProps = {
  name: string;
  rating: number;
  comment: string;
  date: string;
  visitDate: string;
};

type ReviewSectionProps = {
  averageRating: number;
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
    .map((_, index) =>
      index < rating ? (
        <AntDesign
          key={index}
          name="star"
          color={header ? "#FEA31B" : "#2F265D"}
          size={header ? 18 : 12}
        />
      ) : (
        <AntDesign key={index} name="star" color={"#DADADA"} />
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
  name,
  rating,
  comment,
  date,
  visitDate,
}) => {
  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <StarRating rating={rating} header={false} />
        <Text style={styles.reviewerName}>{maskName(name)}</Text>
      </View>
      <Text style={styles.reviewComment}>{comment}</Text>
      <View className="flex-row space-x-4">
        <Text style={styles.reviewDate}>{date}</Text>
        <Text style={styles.reviewDate}>(방문 {visitDate})</Text>
      </View>
    </View>
  );
};

// Review Section Component
const ReviewSection: React.FC<ReviewSectionProps> = ({
  averageRating,
  totalReviews,
  reviews,
}) => {
  return (
    <View>
      {/* Header */}
      <View style={styles.headerReview}>
        <View style={styles.ratingRow}>
          <StarRating rating={5} header={true} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={styles.averageRating}
          >{`${averageRating.toFixed(1)}`}</Text>
          <Text style={styles.totalReviews}>|</Text>
          <Text style={styles.totalReviews}>({totalReviews}건)</Text>
        </View>
      </View>

      {/* Reviews List */}
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.reviewList}
      >
        {reviews.map((review, index) => (
          <ReviewItem
            key={index}
            name={review.name}
            rating={review.rating}
            comment={review.comment}
            date={review.date}
            visitDate={review?.visitDate}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const StoreDetail = () => {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const webViewStoreRef = useRef<any>(null);
  const { width } = useWindowDimensions();
  const { geolocation } = useAppSelector((state: any) => state.store);
  const dispatch = useDispatch();
  const scrollPos = useRef(new Animated.Value(0)).current;
  const [tabActive, setTabActive] = useState<number>(0);
  const [reviewData, setReviewData] = useState<any>();
  const { storeSelectedMap } = useSelector((state: any) => state.store);
  const { storeActive } = useAppSelector((state: any) => state.store);

  const textColorHeader: Animated.AnimatedInterpolation<string> = scrollPos.interpolate({
    inputRange: [100, 200],
    outputRange: ["transparent", "#222222"],
    extrapolate: "clamp",
  });

  const textColorClose: Animated.AnimatedInterpolation<string> = scrollPos.interpolate({
    inputRange: [100, 200],
    outputRange: ["#ffffff", "#222222"],
    extrapolate: "clamp",
  });

  const backgroundColorHeader: Animated.AnimatedInterpolation<string> = scrollPos.interpolate({
    inputRange: [100, 200],
    outputRange: ["transparent", "#ffffff"],
    extrapolate: "clamp",
  });

  const shadowOpacity = scrollPos.interpolate({
    inputRange: [100, 200],
    outputRange: [0, 0.25],
    extrapolate: "clamp",
  });

  const elevation = scrollPos.interpolate({
    inputRange: [100, 200],
    outputRange: [0, 5],
    extrapolate: "clamp",
  });

  const handleBtn1 = () => {
    setTabActive(1);
    dispatch(setStoreActive(storeSelectedMap));
    dispatch(setTimeOrder(""));
    router.push("/appointment?type=BOOKING");
  };

  const handleBtn2 = () => {
    setTabActive(2);
    dispatch(setStoreActive(storeSelectedMap));
    router.push("/appointment?type=DRYCLEANING");
  };

  const getReviewsData = async () => {
    try {
      const res: any = await sendApiRequest({
        method: "get",
        endPoint: `/stores/reviews/${id}`,
      });

      if (!res) return;
      const data = res.data;
      const formatData: any = {
        averageRating: data.averageRating,
        totalReviews: data.totalReviews,
      };
      const reviewFormat: any = data.reviews?.map((el: any) => {
        return {
          id: el.id,
          name: el.fullName,
          rating: el.star,
          comment: el.comment,
          date: moment(el.createdDate).format("YYYY.MM.DD"),
          visitDate: moment(el.visitDate).format("YYYY.MM.DD"),
        };
      });
      formatData.reviews = reviewFormat;
      setReviewData(formatData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApiStore = async () => {
    if (!id) return;
    const respon: any = await sendApiRequest({
      ...apiConfig.store.getStoreInfo,
      endPoint: `/stores/${id}`,
      body: {
        time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        latitude: geolocation?.latitude,
        longitude: geolocation?.longitude,
      },
    });

    if (respon?.msg === "success") {
      dispatch(setStoreSelectedMap(respon.data));
    }
    return respon;
  };

  useEffect(() => {
    id && fetchApiStore();
  }, [id]);

  useEffect(() => {
    getReviewsData();
  }, []);

  const sendDataToWeb = () => {
    const data = JSON.stringify({
      type: "STORE_DATA",
      store: storeSelectedMap,
    });

    webViewStoreRef.current?.injectJavaScript(`
      (function() {
        window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(data)} }));
      })();
    `);
  };

  const handleOpenBottomSheet = (index: number) => {
    if (index === 0) return router.push("/appointment?type=PAYMENT");
    if (index === 2) {
      router.push("/appointment?type=DRYCLEANING");
    }
  };

  // const htmlContent = `
  // <html>
  //     <head>
  //         <meta name="viewport" content="width=device-width, initial-scale=1">
  //         <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=877b07bc5e6b78c9cf093dfbc3bb2f78&libraries=services,clusterer"></script>
  //     </head>
  //     <body >
  //         <div id="map-store" style="width:100%;height:100%;position:relative;"/>
  //         <script type="text/javascript">
  //             (function () {
  //                document.addEventListener("DOMContentLoaded", function () {
  //                   const container = document.getElementById("map-store");
  //                   const options = {
  //                       center: new kakao.maps.LatLng(${storeSelectedMap?.address?.gps?.latitude}, ${storeSelectedMap?.address?.gps?.longitude}),
  //                       level: 5,
  //                   };

  //                   const map = new kakao.maps.Map(container, options);
  //                   let startOption = {
  //                       offset: new kakao.maps.Point(14, 14)
  //                   };

  //                   let markerImage = new kakao.maps.MarkerImage("https://laundry-s3.s3.ap-northeast-2.amazonaws.com/Your+Location.png", new kakao.maps.Size(28, 28), startOption)
  //                   let markerPosition = new kakao.maps.LatLng(${storeSelectedMap?.address?.gps?.latitude}, ${storeSelectedMap?.address?.gps?.longitude});

  //                   let marker = new kakao.maps.Marker({
  //                       position: markerPosition,
  //                       image: markerImage
  //                   });

  //                   marker.setMap(map);

  //               });
  //             })();
  //         </script>
  //         <script>
  //           window.onerror = function(msg, url, line) {
  //             window.ReactNativeWebView.postMessage('ERROR: ' + msg + ' at line: ' + line);
  //             return true;
  //           };
  //         </script>
  //     </body>
  // </html>
  // `;

  return (
    <SafeAreaView>
      {/** header */}
      <View
        style={{
          width: "100%",
          height: 65,
          opacity: 0.7,
          zIndex: 1,
          position: "absolute",
          top: 15,
        }}
      >
        <Svg height={65} width="100%">
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

      <Animated.View style={[
        styles.header,
        {
          backgroundColor: backgroundColorHeader,
          shadowOpacity: shadowOpacity,
          elevation: elevation
        }
      ]}>
        <Pressable onPress={() => router.back()}>
          <Animated.Text style={{ color: textColorClose }}>
            <AntDesign name="close" size={22} />
          </Animated.Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Animated.Text
            style={[styles.headerText, { color: textColorHeader }]}
          >
            {storeSelectedMap?.name}
          </Animated.Text>
        </View>
        <Pressable
          // onPress={() => Linking.openURL(`tel:${storeSelectedMap?.phone}`)}
        >
          {/* <Animated.Text style={{ color: textColorHeader }}>
            <Feather name="phone-call" size={22} />
          </Animated.Text> */}
        </Pressable>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollPos } } }],
          { useNativeDriver: false }
        )}
        style={styles.container}
      >
        {/* Top Section */}
        <View>
          <Image
            style={styles.image}
            source={
              storeSelectedMap?.image
                ? { uri: storeSelectedMap?.image }
                : storeDetail
            } // Replace with real image URL
          />

          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.title}>{storeSelectedMap?.name}</Text>
            </View>
            <Button
              label="전화걸기"
              size="large"
              color="warning"
              mode="outlined"
              styleButton={{
                height: 40, borderRadius: 50,
                borderWidth: 1,
                borderColor: "#FEA31B"
              }}
              startIcon={<Image
                style={{ width: 24, height: 24 }}
                source={phoneRangIcon}
              />}
              onPress={() => Linking.openURL(`tel:${storeSelectedMap?.phone}`)}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.infoText, { fontWeight: "600" }]}>
              <Feather name="map-pin" size={16} color="#B4B4B4" />{" "}
              {storeSelectedMap?.address?.value}
            </Text>
            <Text style={styles.infoText}>
              <Feather name="clock" size={16} color="#B4B4B4" /> 24시간 /
              연중무휴
            </Text>
            <Text style={styles.infoText}>
              <Feather name="phone" size={16} color="#B4B4B4" />{" "}
              {storeSelectedMap?.phone}
            </Text>
            <Text style={styles.infoTags}>
              <Feather name="tag" size={16} color="#B4B4B4" /> #와이파이
              #카드결제
            </Text>
          </View>
          <View style={styles.buttonGroup}>
            {/* <View style={{ flex: 1 }}>
              <Button
                label="예약하기"
                size="large"
                color="primary"
                mode="outlined"
                onPress={handleBtn1}
                styleButton={{ width: "100%" }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                label="드라이클리닝"
                size="large"
                color="primary"
                mode="contained"
                onPress={handleBtn2}
                styleButton={{ width: "100%" }}
                disabled={!storeSelectedMap?.wetCleaning}
              />
            </View> */}
             <ButtonGroup
              labels={["일반세탁결제", "예약", "드라이클리닝결제"]}
              selectedIndex={1}
              onSelect={(index) => handleOpenBottomSheet(index)}
              disabled={!storeActive?.wetCleaning}
            />
          </View>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab} onPress={() => setTabActive(0)}>
            <Text
              style={tabActive === 0 ? styles.tabTextActive : styles.tabText}
            >
              가게정보
            </Text>
          </TouchableOpacity>
          <Text style={styles.textSlice}>|</Text>
          <TouchableOpacity style={styles.tab} onPress={() => setTabActive(1)}>
            <Text
              style={tabActive === 1 ? styles.tabTextActive : styles.tabText}
            >
              시설
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
        <View style={{ backgroundColor: "#F4F4F4" }}>
          {tabActive === 0 && (
            <View style={styles.eventContainer}>
              <Text style={styles.eventTitleText}>위치</Text>
              <View
                style={{
                  height: 150,
                  borderRadius: 5,
                  backgroundColor: "#f4f4f4",
                  marginBottom: 30,
                }}
              >
                <WebView
                  ref={webViewStoreRef}
                  source={{ uri: "https://dev.hotel-laundry.com/store.html" }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  onLoadEnd={sendDataToWeb}
                  injectedJavaScriptBeforeContentLoaded={`
                    window.isWebView = true;
                  `}
                />
              </View>

              <Text style={styles.eventTitleText}>매장소개</Text>
              <View style={styles.eventText}>
                <RenderHTML
                  contentWidth={width}
                  source={{ html: storeSelectedMap?.introduce }}
                  tagsStyles={tagsStyles}
                />
              </View>
            </View>
          )}

          {tabActive === 1 && (
            <View style={{ margin: 16 }}>
              {/* <View style={styles.listMachine}>
                {dataMachine?.map((item, index) => {
                  return (
                    <View
                      style={[styles.itemMachine, styles.shadowProp]}
                      key={index}
                    >
                      <MachineIcon />
                      <Text style={styles.machineText}>{item?.title}</Text>
                      <Text style={styles.priceText}>{item?.price}</Text>
                    </View>
                  );
                })}
              </View> */}
              <ListMachineBase
                dataMachine={storeSelectedMap?.machineTimeResBodies}
              />
            </View>
          )}
          {tabActive === 2 && (
            <View style={styles.eventContainer}>
              {reviewData?.reviews.length ? (
                <ReviewSection
                  averageRating={reviewData?.averageRating}
                  totalReviews={reviewData?.totalReviews}
                  reviews={reviewData?.reviews}
                />
              ) : (
                <Text>No review</Text>
              )}
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default StoreDetail;

const tagsStyles = {
  div: {
    fontSize: 15,
    lineHeight: 27,
    color: "#222",
  },
  p: {
    fontSize: 15,
    lineHeight: 27,
    color: "#222",
  },
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFF", height: "100%" },
  common: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 0,
    marginBottom: 16,
  },
  header: {
    position: "absolute",
    width: "100%",
    top: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    gap: 24,
    marginBottom: 24,
    marginTop: 30,
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
    lineHeight: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  contentContainer: { width: "100%" },
  image: {
    width: "100%",
    height: 261,
    objectFit: "cover",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 16,
    marginVertical: 8,
    marginTop: 18
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    color: "#222",
    fontWeight: "600",
  },
  infoContainer: {
    margin: 16,
    marginTop: 14,
    marginVertical: 0,
    marginBottom: 24,
    gap: 8,
  },
  infoText: { fontSize: 15, marginBottom: 4, color: "#222" },
  buttonGroup: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 12,

  },
  actionWrap: {
    flexDirection: "row",
    gap: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    width: "100%",
  },
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
    backgroundColor: "#FFFFFF",
    shadowColor: "#666666",
    borderRadius: 10,
    padding: 16,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  machineContainer: {},
  eventTag: { fontSize: 14, fontWeight: "bold", color: "#28A745" },
  eventImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginVertical: 8,
  },
  eventText: { fontSize: 15, lineHeight: 18, color: "#222", width: "100%" },
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

  // machine
  listMachine: { marginTop: 20, gap: 16 },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  itemMachine: {
    flexDirection: "row",
    color: "#888888",
    justifyContent: "space-between",
    alignItems: "center",
    height: 83,
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    shadowColor: "#b3b3b3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  itemMachineActive: { borderColor: "#2F265D", color: "#2F265D" },
  machineText: { fontWeight: "500", color: "#2F265D", fontSize: 14 },
  priceText: { color: "#06C164", fontWeight: "700", fontSize: 18 },

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
});
