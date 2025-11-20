import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  TouchableOpacity,
  AppState,
  Platform
} from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { setGeolocation, setStoreSelectedMap } from "@/store/slice/storeSlice";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import moment from "moment";
import OptionMapMachine from "@/components/appointment/OptionMapMachine";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import formatNumbers from "@/utils/format";
const LogoDark = require("@/assets/images/logo-dark.png");
const Storemap = require("@/assets/images/Store-map.png");

export default function StoresScreen() {
  const { idStore } = useLocalSearchParams();
  const appState = useRef(AppState.currentState);

  const webViewRef = useRef<any>(null);
  const router = useRouter();
  const { listStoreMap, geolocation, storeSelectedMap } = useSelector(
    (state: any) => state.store
  );
  const storeActive = listStoreMap?.find((store: any) => store.id == idStore);
  const dispatch = useDispatch();
  const arrowAnimation = useRef(new Animated.Value(0)).current;
  const arrowAnimationTime = useRef(new Animated.Value(0))?.current;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisibleTime, setIsDropdownVisibleTime] = useState(false);
  const [isShowOptionMap, setIsShowOptionMap] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (idStore) {
      fetchApiStore(Number(idStore));
    } else {
      dispatch(setStoreSelectedMap(null));
    }
  }, [idStore]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        requestLocationPermission();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        if (isDropdownVisible) {
          toggleDropdown();
        }
        if (isDropdownVisibleTime) {
          toggleDropdownTime();
        }
        if (isShowOptionMap) {
          setIsShowOptionMap(false);
        }
      }
    },
    [isDropdownVisible, isDropdownVisibleTime]
  );

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible((prev) => {
      if (!prev) handlePresentModalPress();
      return !prev;
    });
    // Start arrow animation
    Animated.timing(arrowAnimation, {
      toValue: isDropdownVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [arrowAnimation, isDropdownVisible]);

  const toggleDropdownTime = useCallback(() => {
    setIsDropdownVisibleTime((prev) => {
      if (!prev) handlePresentModalPress();
      return !prev;
    });
    Animated.timing(arrowAnimationTime, {
      toValue: isDropdownVisibleTime ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [arrowAnimationTime, isDropdownVisibleTime]);

  const handlePresentModalPress = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        dispatch(setGeolocation(null));
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // dispatch(
      //   setGeolocation({
      //     latitude: 37.45333322,
      //     longitude: 126.944444,
      //   })
      // );
      dispatch(
        setGeolocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
    } catch (error) {
      console.error("Error getting location:", error);
      dispatch(setGeolocation(null));
    }
  };

  const fetchApiStore = async (id: number) => {
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

  // const htmlContent = `
  // <!DOCTYPE html>
  // <html>
  //     <head>
  //         <meta name="viewport" content="width=device-width, initial-scale=1">
  //     </head>
  //     <body >
  //         <div id="map" style="width:100%;height:100%;position:relative;">
  //           <div id="my-geo" style="position: absolute;cursor: pointer;left: 6px;top: 6px;z-index: 10;width: 42px;"><img src="https://i.ibb.co/1Ympw59J/reload.png"/></div>
  //         </div>
  //         <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=877b07bc5e6b78c9cf093dfbc3bb2f78&libraries=services,clusterer"></script>
  //         <script type="text/javascript">
  //             (function () {
  //                document.addEventListener("DOMContentLoaded", function () {
  //                   const container = document.getElementById("map");
  //                   const geoButton = document.getElementById("my-geo");
  //                     let myLocationMarker = null;
  //                   const options = {
  //                       center: new kakao.maps.LatLng(33.450701, 126.570667),
  //                       level: 7,
  //                   };

  //                   const map = new kakao.maps.Map(container, options);
  //                   const bounds = new kakao.maps.LatLngBounds();

  //                   const stores = ${JSON.stringify(listStore)};

  //                   function createMarkerImage(iconSrc, size, option) {
  //                       return new kakao.maps.MarkerImage(iconSrc, new kakao.maps.Size(size.width, size.height, option));
  //                   }

  //                   let startOption = {
  //                       offset: new kakao.maps.Point(24, 24)
  //                   };

  //                   const normalImage = createMarkerImage("https://laundry-s3.s3.ap-northeast-2.amazonaws.com/icon+3.png", { width: 30, height: 39 });
  //                   const clickImage = createMarkerImage("https://laundry-s3.s3.ap-northeast-2.amazonaws.com/Group+1000004209.png", { width: 33, height: 43 });
  //                   const meImage = createMarkerImage("https://laundry-s3.s3.ap-northeast-2.amazonaws.com/pin+client.png", { width: 48, height: 48 }, startOption);
  //                   let selectedMarker = null;

  //                   function addMarker(store) {
  //                       let position = new kakao.maps.LatLng(store.latitude, store.longitude);
  //                       let marker = new kakao.maps.Marker({
  //                           position: position,
  //                           map: map,
  //                           image: normalImage,
  //                       });
  //                       marker.normalImage = normalImage;

  //                       kakao.maps.event.addListener(marker, "click", function () {
  //                           if (selectedMarker) {
  //                               selectedMarker.setImage(selectedMarker.normalImage);
  //                           }
  //                           marker.setImage(clickImage);
  //                           selectedMarker = marker;

  //                           window.ReactNativeWebView.postMessage(JSON.stringify({
  //                               type: 'STORE_SELECTED',
  //                               store: store
  //                           }));
  //                       });

  //                       bounds.extend(position);
  //                       return marker;
  //                   }

  //                   let markers = stores.map(store => addMarker(store));

  //                   const clusterer = new kakao.maps.MarkerClusterer({
  //                       map: map,
  //                       averageCenter: true,
  //                       minLevel: 10,
  //                       disableClickZoom: true,
  //                   });

  //                   clusterer.addMarkers(markers);
  //                   map.setBounds(bounds);

  //                   function getMyLocation() {
  //                       if (navigator.geolocation) {
  //                           if (${geolocation?.latitude}) {
  //                               showMyLocation(${geolocation?.latitude}, ${geolocation?.longitude})
  //                           } else {
  //                               window.ReactNativeWebView.postMessage('REQUEST_LOCATION');
  //                           }
  //                       } else {
  //                           window.ReactNativeWebView.postMessage('REQUEST_LOCATION');
  //                     }
  //                   }

  //                   function showMyLocation(lat, lon) {
  //                       if (myLocationMarker) {
  //                           myLocationMarker.setMap(null);
  //                       }

  //                       let locPosition = new kakao.maps.LatLng(lat, lon);
  //                       myLocationMarker = new kakao.maps.Marker({
  //                           position: locPosition,
  //                           map: map,
  //                           image: meImage
  //                       });
  //                       map.setCenter(locPosition);
  //                       map.setLevel(5);
  //                   }

  //                   function focusOnStore() {
  //                         let position = new kakao.maps.LatLng(${storeActive?.latitude}, ${storeActive?.longitude});
  //                         map.setCenter(position);
  //                         map.setLevel(5);

  //                         let activeMarker = markers.find(m => {
  //                           let markerLat = m.getPosition().getLat();
  //                           let markerLng = m.getPosition().getLng();
  //                           return Math.abs(markerLat - ${storeActive?.latitude}) < 0.00001 &&
  //                                 Math.abs(markerLng - ${storeActive?.longitude}) < 0.00001;
  //                         });

  //                         if (activeMarker) {
  //                             if (selectedMarker) {
  //                                 selectedMarker.setImage(selectedMarker.normalImage);
  //                             }
  //                             activeMarker.setImage(clickImage);
  //                             selectedMarker = activeMarker;
  //                         }
  //                     }

  //                   setTimeout(() => {
  //                       getMyLocation();
  //                       if (${storeActive?.id}) {
  //                         focusOnStore()
  //                       }
  //                   }, 500 );

  //                   geoButton.addEventListener("click", getMyLocation);
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

  const sendDataToWeb = () => {
    const data = JSON.stringify({
      type: "INIT_DATA",
      listStore: listStoreMap,
      geolocation,
      storeActive,
    });

    webViewRef.current?.injectJavaScript(`
      (function() {
        window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(data)} }));
      })();
    `);
  };

  const onMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "REQUEST_LOCATION") {
        requestLocationPermission();
      } else {
        if (data.type === "STORE_SELECTED") {
          fetchApiStore(data.store.id);
        }
      }
    } catch (error) {
      console.error("Error handling WebView message:", error);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Image source={LogoDark} style={{ width: 65, height: 40 }} />
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity onPress={() => router.push("/auth/customer-service")}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M2.6 10h1.6c.212 0 .416.09.566.251.15.16.234.379.234.606v4.286a.889.889 0 01-.234.606A.774.774 0 014.2 16H2.6c-.424 0-.831-.18-1.131-.502A1.778 1.778 0 011 14.286v-2.572c0-.454.169-.89.469-1.212.3-.321.707-.502 1.131-.502v0zM21.4 16h-1.6a.774.774 0 01-.566-.251.89.89 0 01-.234-.606v-4.286a.89.89 0 01.234-.606A.774.774 0 0119.8 10h1.6c.424 0 .831.18 1.131.502.3.322.469.758.469 1.212v2.572c0 .454-.169.89-.469 1.212-.3.321-.707.502-1.131.502v0zM16 21c1.06 0 2.078-.383 2.828-1.065.75-.682 1.172-1.607 1.172-2.571V16M13.813 19c.58 0 1.136.21 1.546.586.41.375.641.884.641 1.414 0 .53-.23 1.04-.64 1.414-.41.375-.967.586-1.547.586h-2.626c-.58 0-1.136-.21-1.546-.586A1.917 1.917 0 019 21c0-.53.23-1.04.64-1.414.41-.375.967-.586 1.547-.586h2.626z"
                  stroke="#888"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M4 10V8.364c0-1.953.843-3.826 2.343-5.207C7.843 1.776 9.878 1 12 1s4.157.776 5.657 2.157C19.157 4.537 20 6.41 20 8.364V10M9 7v2M15 7v2M9 13c0 2.667 6 2.667 6 0"
                  stroke="#888"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/mypage/notification")}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a1.999 1.999 0 01-3.46 0"
                  stroke="#888"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <View style={styles.common}>
            <Pressable
              style={{
                ...styles.inputContainer,
                borderRadius: 10,
                borderColor: "#ccc",
              }}
              onPress={() => {
                handlePresentModalPress();
                setIsShowOptionMap(true);
              }}
            >
              <View style={[styles.input]}>
                <Text style={{ color: "#888888" }}>매장주소 검색</Text>
              </View>
              <AntDesign name="search1" size={24} color="#888" />
            </Pressable>
          </View>
          <View style={styles.mapContainer}>
            {/* <WebView
              originWhitelist={["*"]}
              source={{ html: htmlContent }}
              style={{ flex: 1 }}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
              }}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView HTTP error: ', nativeEvent);
              }}
              onMessage={(event: any) => {
                try {
                  if (event.nativeEvent.data === 'REQUEST_LOCATION') {
                    requestLocationPermission();
                  } else {
                    const data = JSON.parse(event.nativeEvent.data);
                    if (data.type === 'STORE_SELECTED') {
                      fetchApiStore(data.store.id);
                    }
                  }
                } catch (error) {
                  console.error('Error handling WebView message:', error);
                }
              }}
              mixedContentMode="compatibility"
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowUniversalAccessFromFileURLs={true}
              allowFileAccess={true}
              androidLayerType="hardware"
            /> */}

            <WebView
              ref={webViewRef}
              source={{ uri: "https://dev.hotel-laundry.com/maps.html" }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onLoadEnd={sendDataToWeb}
              onMessage={onMessage}
              injectedJavaScriptBeforeContentLoaded={`
                window.isWebView = true;
              `}
            />

            {storeSelectedMap && (
              <View style={styles.detailContainer}>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/store-detail/[id]",
                      params: { id: storeSelectedMap?.id },
                    })
                  }
                >
                  <View style={styles.detail}>
                    <Image
                      style={styles.image}
                      source={
                        storeSelectedMap?.image
                          ? { uri: storeSelectedMap?.image }
                          : Storemap
                      }
                    />
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        flex: 1,
                      }}
                    >
                      <Text style={styles.title}>{storeSelectedMap?.name}</Text>
                      <Text>
                        <Text style={[styles.textInfo]}>
                          {formatNumbers(storeSelectedMap?.distance * 1000, 0)}{" "}
                          m
                        </Text>
                        <Text style={[styles.textNormal]}>
                          {" "}
                          · {storeSelectedMap?.address?.value}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            )}
          </View>
        </View>
        <StatusBar
          style={Platform.OS === "ios" ? "dark" : "auto"}
          backgroundColor="#FFFFFF"
        />
          <OptionMapMachine
            onChange={handleSheetChanges}
            show={isShowOptionMap}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            isMap={true}
          />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F2F2F2",
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#222",
  },
  common: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 0,
    marginBottom: 16,
    position: "relative",
  },
  header: {
    backgroundColor: "#FFF",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    gap: 24,
    paddingTop: 30,
    marginBottom: 16,
    position: "relative",
  },
  headerText: {
    color: "#FFF",
    fontSize: 17,
    lineHeight: 18,
    fontWeight: "600",
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: "#ccc",
    borderRadius: 20,
    position: "relative",
  },
  detailContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    borderRadius: 24,
    padding: 12,
    width: "100%",
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  detail: {
    width: "100%",
    minHeight: 90,
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    lineHeight: 27,
    fontWeight: "600",
  },
  textInfo: {
    fontSize: 13,
    lineHeight: 23.4,
    fontWeight: "500",
    color: "#0A9EE8",
  },
  textNormal: {
    fontSize: 13,
    lineHeight: 23.4,
    fontWeight: "400",
    color: "#888",
  },
  footerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
});
