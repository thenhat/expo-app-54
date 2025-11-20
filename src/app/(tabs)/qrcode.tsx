import XIcon from "@/assets/icons/my/x.svg";
import DownloadIcon from "@/assets/icons/qrcode/download.svg";
import ReloadIcon from "@/assets/icons/qrcode/reload.svg";
import { apiConfig } from "@/constants/apiConfig";
import { useModal } from "@/contexts/ModalContext";
import { useProfile } from "@/hooks/useProfile";
import sendApiRequest from "@/utils/api";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from "expo-media-library";
import { useGlobalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { captureScreen } from "react-native-view-shot";

const SCAN_BOX_SIZE = 200;
const { height } = Dimensions.get("window");

const QrCode: React.FC = () => {
  const { setModal } = useModal();
  const qrRender = useRef<any>(null);
  const { profile } = useProfile();
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [qrCode, setQrCode] = useState<string>(profile?.qrCode);
  const { open } = useGlobalSearchParams();

  useEffect(() => {
    if (open) {
      startScanning();
    }
  }, [open]);

  const handleReload = async () => {
    try {
      const resp: any = await sendApiRequest({
        ...apiConfig.my.changeQr,
        body: {},
      });
      if (resp.data) {
        setQrCode(resp.qrCode);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const showReloadAlert = () => {
    Alert.alert(
      "QR코드 갱신", // Title of the alert
      "QR코드를 바꾸시겠습니까? 기존 QR코드는 더이상 사용할 수\n없으며 새로운 QR코드가 생성됩니다.", // Message
      [
        {
          text: "Cancel", // Button text
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK", // Button text
          onPress: handleReload,
        },
      ],
      { cancelable: true } // Make the alert cancelable by tapping outside of it
    );
  };

  const handleDownload = async () => {
    try {
      // Capture the QR code as an image
      const uri = await captureScreen({
        format: "jpg",
        quality: 0.8,
        result: "tmpfile",
      });

      // Save the captured image to the device's gallery
      const permissionResponse = await MediaLibrary.requestPermissionsAsync();
      if (permissionResponse.granted) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("QR Codes", asset, false);
        setModal({ open: "success", message: "QR코드 사진이 다운로드되었습니다." });
      } else {
        setModal({
          open: "info",
          message: "Permission to save the image is required!",
        });
      }
    } catch (error) {
      console.log("Download failed", error);
      setModal({
        open: "error",
        message: "Failed to download QR code",
      });
    }
  };

  const handleScanQr = async (scanningResult: BarcodeScanningResult) => {
    try {
      const resp: any = await sendApiRequest({
        ...apiConfig.store.openDoorStore,
        body: {
          email: profile.email,
          qrCode: scanningResult.data,
        },
      });
      if (resp.status === 200) {
        if (resp.data.success) {
          setModal({
            open: "success",
            message: "문열림 성공",
          });
        } else {
          setModal({
            open: "error",
            message: "문열림 실패",
          });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsScanning(false);
  };

  const startScanning = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        setModal({
          open: "info",
          message: "Permission is required to scan QR codes",
        });
        return;
      }
    }
    setIsScanning(true);
  };

  if (isScanning) {
    return (
      <CameraView
        className="flex-1 flex-row justify-center relative"
        facing={"back"}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleScanQr}
      >
        <View className="z-10 flex-1 items-center">
          {/* Nút "Close" */}
          <TouchableOpacity
            onPress={() => setIsScanning(false)}
            className="absolute z-10 top-[36px] right-[16px] p-[8px] rounded-full shadow z-40"
          >
            <XIcon />
          </TouchableOpacity>
          {/* Text hướng dẫn */}
          <View className="absolute bottom-[20%] w-full px-[16px] z-[6]">
            <Text className="text-center text-[16px] text-[#fff] z-[6]">
              복구할 장비의 QR코드를 촬영해주세요.
            </Text>
          </View>
        </View>
        {/* Hiệu ứng mờ nền */}
        <View style={styles.overlay}>
          <View style={[styles.mask, styles.topMask]} />
          <View style={styles.middleRow}>
            <View style={styles.mask} />
            <View style={styles.scanBox} />
            <View style={styles.mask} />
          </View>
          <View style={[styles.mask, styles.bottomMask]} />
        </View>
      </CameraView>
    );
  }

  return (
    <SafeAreaView className="bg-[#fff] flex-1">
      <ScrollView>
        <View className="p-[16px]">
          <View className="h-[30px]" />
          <View className="h-[60px] flex-row items-center justify-center relative mx-[16px]">
            <Text className="text-[#222] text-[17px] leading-[18px] font-defaultSemiBold">
              My Code
            </Text>
          </View>
          <View className="flex-row justify-center py-[16px]">
            <QRCode
              getRef={(ref) => (qrRender.current = ref)}
              value={qrCode}
              size={180}
            />
          </View>
          <Text className="text-[14px] text-[#917EB1] leading-[18.2px] font-defaultRegular mb-[21px] text-center">
            기기 혹은 매장을 이용하실 경우{"\n"}상단의 QR 코드를 스캐너에
            스캔해주세요.
          </Text>
          <View className="flex-row gap-[53px] items-center justify-center">
            <TouchableOpacity
              onPress={showReloadAlert}
              className="flex-col gap-[5px] items-center"
            >
              <ReloadIcon />
              <Text className="text-[15px] leading-[18px] text-[#2F265D] font-defaultRegular">
                갱신하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDownload}
              className="flex-col gap-[5px] items-center"
            >
              <DownloadIcon />
              <Text className="text-[15px] leading-[18px] text-[#2F265D] font-defaultRegular">
                다운로드
              </Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={["#2F265D", "#6350C3"]}
            start={{ x: 0.85, y: 0 }}
            end={{ x: 0.28, y: 1 }}
            className="relative mt-[50px] mb-[30px] h-[272px] w-full rounded-[30px] flex-col justify-center items-center"
          >
            <Text className="absolute top-4 right-5 text-[#FFFFFF] text-[14px] font-montserrat400 underline text-right cursor-pointer" onPress={() => Linking.openURL(`tel:028672657`)}>
              상담원 연결
            </Text>
            <TouchableOpacity
              onPress={startScanning}
              className="w-[166px] h-[166px] rounded-full border-[#fff] border-[6px] flex-row justify-center items-center p-[12px]"
            >
              <View className="justify-center items-center bg-[#fff] w-[130px] h-[130px] rounded-full">
                <Text className="text-[14px] leading-[16.94px] font-defaultRegular text-[#2F265D]">
                  원격복구QR
                </Text>
                <Text className="text-[25px] leading-[30.26px] font-defaultSemiBold text-[#2F265D] mt-[4px]">
                  촬영하기
                </Text>
              </View>
            </TouchableOpacity>
            <Text className="text-[#FFFFFF] text-[14px] font-montserrat500 w-full mx-auto mt-4 text-center">
              복구할 장비의 QR코드를 촬영해주세요.
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  mask: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
  },
  topMask: {
    width: "100%",
    height: (height - SCAN_BOX_SIZE) / 2,
  },
  middleRow: {
    flexDirection: "row",
    height: SCAN_BOX_SIZE,
  },
  scanBox: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  bottomMask: {
    width: "100%",
    height: (height - SCAN_BOX_SIZE) / 2,
  },
});

export default QrCode;
