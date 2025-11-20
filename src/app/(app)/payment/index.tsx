import { Alert, Linking, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoMachine from "@/components/payment/InfoMachine";
import Points from "@/components/payment/Points";
import CardOptions from "@/components/payment/CardOptions";
import Refund from "@/components/payment/Refund";
import Amount from "@/components/payment/Amount";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderScreen from "@/components/HeaderScreen";
import { useEffect, useState } from "react";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ApiUrl } from "@/constants/endpoints";
import { useModal } from "@/contexts/ModalContext";
import * as WebBrowser from 'expo-web-browser';
import * as LinkingExpo from 'expo-linking';
import { useAppDispatch } from "@/store/hook";
import { setLoading, resetProcessedPaymentId } from "@/store/slice/globalSlice";
import { setOrderType } from "@/store/slice/storeSlice";

const POINTS_OPTIONS = {
  value: "",
  label: "선택안함",
  id: "",
  idCoupon: "",
  name: "선택안함",
  requite: "<p>선택안함</p>",
};

// Ensure auth sessions complete correctly on iOS so SafariViewController can auto-dismiss
WebBrowser.maybeCompleteAuthSession();

export default function AppointmentScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { setModal } = useModal();
  const { oid, type } = useLocalSearchParams<any>();
  const [coupon, setCoupon] = useState(POINTS_OPTIONS);
  const [paymentInfo, setPaymentInfo] = useState<any>({});
  const [pointActive, setPointActive] = useState<any>(0);
  const [cashActive, setCashActive] = useState<any>(0);
  const [method, setMethod] = useState<any>("CARD");
  const [detailDryCleaning, setDetailDryCleaning] = useState<any>(null);

  useEffect(() => {
    dispatch(resetProcessedPaymentId());
    if (type === "cleaning") {
      fetchDetailDryCleaning();
    }
  }, [type, dispatch]);

  const fetchDetailDryCleaning = async () => {
    const res: any = await sendApiRequest({
      ...apiConfig.order.getDetailDryCleaning,
      endPoint: `/dry-cleaning/order/${oid}`,
      body: {},
    });

    if (res) {
      setDetailDryCleaning(res?.data);
    }
  };

  const onSubmitPayment = async () => {
    const finalTotal =
      type === "cleaning"
        ? Number(paymentInfo?.finalTotal)
        : Math.max(0, Number(paymentInfo?.totalPriceMachine) -
        paymentInfo?.totalPriceCoupon -
        Number(pointActive) -
        Number(cashActive));
    if (method === "NAVER_PAY" && finalTotal < 10) {
      Alert.alert("알림", "10원 미만 금액 결제 불가능합니다.", [
        { text: "확인" },
      ]);
      return;
    }

    dispatch(setLoading(true));

    if (type === "cleaning") {
      const resDryCleaning: any = await sendApiRequest({
        ...apiConfig.order.updateOrderDryCleaning,
        endPoint: `/dry-cleaning/update/${oid}`,
        body: {
          idCoupon: coupon?.id,
          point: pointActive,
        },
      });
      if (resDryCleaning?.success) {
        if (resDryCleaning?.data?.totalPrice === 0) {
          dispatch(setLoading(false));
          router.push({
            pathname: "/",
            params: {
              isSuccess: 'true',
              paymentId: Date.now().toString()
            },
          });
        } else {
          SwitchMethodPayment(true);
        }
      }
    } else {
      const res: any = await sendApiRequest({
        ...apiConfig.order.createPayment,
        body: {
          oid: oid,
          idCoupon: coupon?.id,
          point: pointActive,
          cash: cashActive,
          payMethod: method,
          finalPrice: Math.max(0,
            paymentInfo?.totalPriceMachine -
            paymentInfo?.totalPriceCoupon -
            Number(pointActive) -
            Number(cashActive)),
        },
      });
      if (res) {
        if (res?.totalPaymentPrice === 0) {
          dispatch(setLoading(false));
          router.push({
            pathname: "/",
            params: {
              isSuccess: 'true',
              paymentId: Date.now().toString()
            },
          });
        } else {
          SwitchMethodPayment();
        }
      }
    }
  };

  const SwitchMethodPayment = (isCleaning?: boolean) => {
    switch (method) {
      case "CARD":
        requestPaymentReady(
          isCleaning
            ? {
              endPoint: ApiUrl.CARD_DRY_READY,
              body: { oid, payMethod: method },
            }
            : { endPoint: ApiUrl.CARD_READY, body: { oid, payMethod: method } }
        );
        break;
      case "KAKAO_PAY":
        requestPaymentReady(
          isCleaning
            ? { endPoint: ApiUrl.KAKAO_DRY_READY, body: { oid } }
            : { endPoint: ApiUrl.KAKAO_READY, body: { oid } }
        );
        break;
      case "NAVER_PAY":
        requestPaymentReady(
          isCleaning
            ? { endPoint: ApiUrl.NAVER_DRY_READY, body: { oid } }
            : { endPoint: ApiUrl.NAVER_READY, body: { oid } }
        );
        break;
      default:
        requestPaymentReady(
          isCleaning
            ? {
              endPoint: ApiUrl.CARD_DRY_READY,
              body: { oid, payMethod: method },
            }
            : { endPoint: ApiUrl.CARD_READY, body: { oid, payMethod: method } }
        );
        break;
    }
  };

  const requestPaymentReady = async (body: any) => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.order.paymentReady,
        endPoint: body?.endPoint,
        body: body?.body,
      });

      dispatch(setLoading(false));
      if (res) {
        switch (method) {
          case "CARD":
            requestPayCard({ ...res, mode: 'CARD' });
            break;
          case "KAKAO_PAY":
            handlekapiKakao({ ...res, mode: 'KAKAO_PAY' });
            break;
          case "NAVER_PAY":
            router.push({
              pathname: "/paymentsuccess/naver-detail",
              params: { data: encodeURIComponent(JSON.stringify({ ...res, mode: 'NAVER_PAY' })) },
            });
            break;
          default:
            break;
        }
      }
    } catch (error) {
      dispatch(setLoading(false));
      setModal({ open: "error", message: "결제 준비 실패" });
    }
  };

  function checkIfiOS() {
    return Platform.OS === "ios";
  }

  const handlekapiKakao = async (data: any) => {
    try {
      const url = checkIfiOS()
        ? data?.next_redirect_app_url
        : data?.next_redirect_mobile_url;
      // const result = await WebBrowser.openBrowserAsync(url);
      await Linking.openURL(url);
    } catch (error) {
      setModal({ open: "error", message: "카카오결제가 열리지 않습니다" });
    }
  };

  const requestPayCard = async (data: any) => {
    if (data) {
      openBrowserWithData(data);
    }
  };

  const openBrowserWithData = async (data: any) => {
    const queryParams = new URLSearchParams();
    queryParams.append('dataOrder', encodeURIComponent(JSON.stringify(data)));
    const url = `https://dev.hotel-laundry.com/payment?orderApp=true&${queryParams.toString()}`;

    // Ensure this matches what the web redirects to: hotel-laundry-app://?...
    const returnUrl = 'hotel-laundry-app://';

    try {
      const result = await WebBrowser.openAuthSessionAsync(url, returnUrl);

      // Xử lý kết quả từ WebBrowser
      if (result.type === 'success' && result.url) {
        console.log('WebBrowser result:', result.url);
        const handled = handleDeepLink(result.url);

        if (handled) {
          // Đã xử lý thành công, không cần làm gì thêm
          return;
        }
      } else if (result.type === 'dismiss') {
        // Người dùng đóng trình duyệt mà không thanh toán
        console.log('User dismissed browser');
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log('WebBrowser error:', error);
      dispatch(setLoading(false));
      setModal({ open: "error", message: "결제 페이지를 열 수 없습니다" });
    }
  };

  // Helper function để xử lý deep links
  const handleDeepLink = (url: string) => {
    try {
      console.log('Processing deep link:', url);

      if (!url.includes('hotel-laundry-app://')) {
        console.log('Not a valid deep link for this app');
        return false;
      }

      const urlWithoutScheme = url.replace('hotel-laundry-app://', '');
      console.log('URL without scheme:', urlWithoutScheme);

      if (urlWithoutScheme.includes('isSuccess=true')) {
        console.log('Payment success detected via query param');
        router.push({ pathname: '/', params: { isSuccess: 'true', paymentId: Date.now().toString() } });
        return true;
      }

      if (urlWithoutScheme.includes('isError=true')) {
        console.log('Payment error detected via query param');
        router.push({ pathname: '/', params: { isError: 'true', paymentId: Date.now().toString() } });
        return true;
      }

      const successPaths = ['payment-success', 'paymentsuccess'];
      const errorPaths = ['payment-error', 'payment-failed', 'error'];

      for (const path of successPaths) {
        if (urlWithoutScheme === path || urlWithoutScheme.startsWith(path + '?')) {
          console.log('Success route detected:', path);
          router.push({ pathname: '/', params: { isSuccess: 'true', paymentId: Date.now().toString() } });
          return true;
        }
      }

      for (const path of errorPaths) {
        if (urlWithoutScheme === path || urlWithoutScheme.startsWith(path + '?')) {
          console.log('Error route detected:', path);
          router.push({ pathname: '/', params: { isError: 'true', paymentId: Date.now().toString() } });
          return true;
        }
      }

      // Fallback: sử dụng LinkingExpo.parse
      const parsed: any = LinkingExpo.parse(url);
      const pathname = parsed?.pathname || '';
      const qp: any = parsed?.queryParams || {};

      if (qp?.isSuccess === 'true' || qp?.isSuccess === true) {
        console.log('Payment success detected via parsed query param');
        router.push({ pathname: '/', params: { isSuccess: 'true', paymentId: Date.now().toString() } });
        return true;
      }

      if (qp?.isError === 'true' || qp?.isError === true) {
        console.log('Payment error detected via parsed query param');
        router.push({ pathname: '/', params: { isError: 'true', paymentId: Date.now().toString() } });
        return true;
      }

      // Kiểm tra pathname từ parsed result
      const successRoutes = ['/payment-success', '/paymentsuccess'];
      const errorRoutes = ['/payment-error', '/payment-failed', '/error'];

      if (successRoutes.includes(pathname)) {
        console.log('Success route detected via parsed pathname:', pathname);
        router.push({ pathname: '/', params: { isSuccess: 'true', paymentId: Date.now().toString() } });
        return true;
      }

      if (errorRoutes.includes(pathname)) {
        console.log('Error route detected via parsed pathname:', pathname);
        router.push({ pathname: '/', params: { isError: 'true', paymentId: Date.now().toString() } });
        return true;
      }

      console.log('No matching deep link pattern found');
      return false;
    } catch (error) {
      console.log('Error parsing deep link:', error);
      return false;
    }
  };


  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
        <HeaderScreen title="예약확인/결제하기" />
        <ScrollView>
          <InfoMachine detailDryCleaning={detailDryCleaning} />
          <Points
            coupon={coupon}
            paymentInfo={paymentInfo}
            pointActive={pointActive}
            cashActive={cashActive}
            setCoupon={setCoupon}
            setPaymentInfo={setPaymentInfo}
            setPointActive={setPointActive}
            setCashActive={setCashActive}
            detailDryCleaning={detailDryCleaning}
          />
          <Amount
            paymentInfo={paymentInfo}
            pointActive={pointActive}
            cashActive={cashActive}
          />
          <CardOptions method={method} setMethod={setMethod} />
          <Refund onSubmit={onSubmitPayment} />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}