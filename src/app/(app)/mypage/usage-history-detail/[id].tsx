import MessageErrorModal from "@/components/Modal/MessageError";
import MessageSuccessModal from "@/components/Modal/MessageSuccess";
import ModalConfirm from "@/components/ModalConfirm";
import OptionAccordion from "@/components/mypage/usage-history/OptionAccordion";
import Wrapper from "@/components/Wrapper";
import { apiConfig } from "@/constants/apiConfig";
import {
  optionMapping,
  paymentMethodMapping,
  washingModeMapping,
} from "@/constants/mapping";
import PageName from "@/constants/PageName";
import { setLoading } from "@/store/slice/globalSlice";
import sendApiRequest from "@/utils/api";
import { formatDate, formatDate2 } from "@/utils/dateCalculator";
import formatNumbers from "@/utils/format";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const WashImg = require("@/assets/images/my/wash.png");

type DetailDataType = {
  storeName: string;
  machineName: string;
  option: any;
  options: any;
  dryOption: any;
  otherOption: any;
  timeUse: string;
  oid?: string;
  orderStatus?: string;
  amount: string;
  paymentAmount: string;
  amountUse: string;
  couponUse: string;
  cashAmout: string;
  pointAmout: string;
  cashpointAmout: string;
  pointAccumulate: string;
  paymentMethod: string;
  paymentStatus: string;
};

interface Props { }

const UsageHistoryDetail: React.FC<Props> = () => {
  const [detailData, setDetailData] = useState<DetailDataType>();
  const { id, type, tab } = useGlobalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [visibleSuccess, setVisibleSuccess] = useState("");
  const [visibleError, setVisibleError] = useState("");
  const router = useRouter();

  // const loca
  // console.log("type", type);
  // console.log("detailData", detailData);

  const getDetailData = async (url: string) => {
    try {
      const res: any = await sendApiRequest({
        method: "get",
        endPoint: `/orders/${url}/${id}`,
      });

      if (!res) return;

      const isTypeA = type === "TYPE_A";
      const payment = res.payment || {};

      const dryOption = res?.orderDetails?.map(
        ({ type, orderDetailTypes }: any) => ({
          key: type.key,
          name: type.name,
          url: type.url,
          price: orderDetailTypes.reduce(
            (sum: any, item: any) => sum + item.price * item.quantity,
            0
          ),
          quantity: orderDetailTypes.reduce(
            (sum: any, item: any) => sum + item.quantity,
            0
          ),
        })
      );

      setDetailData({
        storeName: isTypeA ? res.storeName : res.store?.name,
        machineName: isTypeA ? res.machine?.name : "드라이클리닝",
        option: washingModeMapping[res.machine?.washingMode],
        options: res.machine?.options,
        dryOption,
        otherOption:
          `${res.machine?.options?.map((option: any) => optionMapping[option.key]).join(" / ")}`.trim(),
        timeUse: isTypeA
          ? formatDate(res.machine?.startTime, res.machine?.endTime)
          : formatDate2(res.bookingDate),
        amount: res.totalPrice,
        oid: res.oid,
        orderStatus: res.orderStatus,
        paymentAmount: res.totalPrice,
        amountUse: res.amount,
        couponUse: isTypeA ? payment.fcCoupon : res.fcCoupon,
        cashAmout: isTypeA ? payment.fcCash : res.fcCash,
        pointAmout: isTypeA ? payment.fcPoint : res.fcPoint,
        cashpointAmout: isTypeA ? payment.fcCashPoint : res.fcCashPoint,
        pointAccumulate: res.cumulativePoint,
        paymentMethod:
          paymentMethodMapping[
          isTypeA ? payment.paymentMethod : res.paymentMethod
          ],
        paymentStatus: payment.paymentStatus,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (type === "TYPE_A") {
      getDetailData("machine");
    } else if (type === "TYPE_B") {
      getDetailData("dry-cleaning");
    }
  }, []);

  const handleCancel = async () => {
    dispatch(setLoading(true));
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.order.cancelOrder,
        body: {
          oid: detailData?.oid,
        },
      });
      if (res) {
        // alert("예약 취소 완료되었습니다");
        setVisibleSuccess("예약 취소 완료되었습니다");
        router.push("/");
      }
    } catch (error) {
      setVisibleError("에러가 나거나 취소할 수 없습니다");
      // alert("에러가 나거나 취소할 수 없습니다");
    }
    dispatch(setLoading(false));
  };

  const renderTitleOption = () => {
    let titleOption: any = [];
    detailData?.options?.forEach((item: any) => {
      const count = item?.count ?? 1;
      titleOption = [...titleOption, `${item.title}: ${count}회`];
    });

    return titleOption?.length > 0 ? titleOption.join(", ") : '없음';
  }

  return (
    <Wrapper headerType="BACK" headerScreenName={PageName.USAGE_HISTORY_DETAIL}>
      <ScrollView>
        <View className="p-[16px] block">
          <View className="flex-row py-[11px] px-[20px] bg-[#F1F1F1] rounded-[15px] items-center mb-[26px]">
            <Image source={WashImg} />
            <View className="pl-[20px]">
              <Text className="text-[#222222] text-[14px] leading-[19.5px] font-defaultRegular mb-[3px]">
                {detailData?.storeName}
              </Text>
              <Text className="text-[#222222] text-[19px] leading-[24.7px] font-defaultSemiBold mb-[3px]">
                {detailData?.machineName}
              </Text>
            </View>
          </View>
          {type === "TYPE_A" ? (
            <View>
              {/* -------------------------------------------------------- */}
              <View className="flex-row justify-between items-center">
                <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
                  주문번호
                </Text>
                <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
                  {detailData?.oid}
                </Text>
              </View>
              {/* -------------------------------------------------------- */}
              <View className="flex-row justify-between items-center">
                <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
                  세탁옵션
                </Text>
                <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
                  {detailData?.option}
                </Text>
              </View>

              {/* -------------------------------------------------------- */}
              <View className="flex-row justify-between items-center">
                <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
                  기타옵션
                </Text>
                <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
                  {renderTitleOption()}
                </Text>
              </View>
            </View>
          ) : (
            <>
              {detailData?.dryOption?.map((el: any) => (
                <View
                  key={el.key}
                  className="flex-row justify-between items-center"
                >
                  <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
                    {el.name} {el.quantity}개
                  </Text>
                  <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
                    {el?.price}원
                  </Text>
                </View>
              ))}
            </>
            // <Text>asdasd</Text>
          )}

          {/* -------------------------------------------------------- */}
          <View className="flex-row justify-between items-center">
            <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
              이용시간
            </Text>
            <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
              {detailData?.timeUse}
            </Text>
          </View>
          {/* -------------------------------------------------------- */}
          <View className="flex-row justify-between items-center">
            <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
              금액
            </Text>
            <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
              {formatNumbers(detailData?.amount)}원
            </Text>
          </View>
          {/* -------------------------------------------------------- */}
          <View className="my-[30px] mx-[-16px] h-[8px] bg-[#F4F4F4] block" />
          {/* -------------------------------------------------------- */}
          <View className="flex-row justify-between items-center mb-[15px]">
            <Text className="text-[#000] text-[19px] leading-[27.7px] font-defaultSemiBold">
              결제금액
            </Text>
            <Text className="text-[#06C164] text-[19px] leading-[27.7px] font-defaultSemiBold">
              {formatNumbers(detailData?.paymentAmount)}원
            </Text>
          </View>
          {/* -------------------------------------------------------- */}
          <View className="flex-row justify-between items-center">
            <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
              이용금액
            </Text>
            <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
              {formatNumbers(detailData?.amountUse)}원
            </Text>
          </View>
          {/* -------------------------------------------------------- */}
          <View className="flex-row justify-between items-center">
            <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
              쿠폰사용
            </Text>
            <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
              {formatNumbers(detailData?.couponUse)}원
            </Text>
          </View>
          {type !== "TYPE_B" && (
            <>
              {/* -------------------------------------------------------- */}
              <View className="flex-row justify-between items-center">
                <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
                  캐시/포인트사용
                </Text>
                <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
                  {formatNumbers(detailData?.cashpointAmout)}원
                </Text>
              </View>
              {/* -------------------------------------------------------- */}
              <View className="flex-row justify-between items-center">
                <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
                  적립포인트
                </Text>
                <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
                  {formatNumbers(detailData?.pointAccumulate)}원
                </Text>
              </View>
            </>
          )}
          {/* -------------------------------------------------------- */}
          <View className="my-[30px] mx-[-16px] h-[8px] bg-[#F4F4F4] block" />
          {/* -------------------------------------------------------- */}
          <View className="flex-row items-center mb-[15px]">
            <Text className="text-[#000] text-[19px] leading-[27.7px] font-defaultSemiBold">
              결제수단
            </Text>
          </View>
          {/* -------------------------------------------------------- */}
          <View className="flex-row justify-between items-center">
            <Text className="text-[#222222] text-[14px] leading-[35px] font-defaultRegular">
              {detailData?.paymentMethod}
            </Text>
            <Text className="text-[#222222] text-[15px] leading-[37.5px] font-defaultSemiBold">
              {detailData?.paymentStatus}
            </Text>
          </View>
          {tab === 'pending' && detailData?.orderStatus === 'V_READY' &&
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="flex-1"
            >
              <View className="border-solid border border-[#2F265D] bg-transparent h-[50px] rounded-full px-[16px] text-center mt-[20px]">
                <Text
                  className={`leading-[50px] text-[#2F265D] text-[14px] font-defaultSemiBold text-center`}
                >
                  예약취소
                </Text>
              </View>
            </TouchableOpacity>
          }

          <ModalConfirm
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            onConfirm={handleCancel}
          />

          <MessageSuccessModal
            message={visibleSuccess}
            visible={Boolean(visibleSuccess)}
            handleCloseModal={() => setVisibleSuccess("")}
          />

          <MessageErrorModal
            message={visibleError}
            visible={Boolean(visibleError)}
            handleCloseModal={() => setVisibleError("")}
          />
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default UsageHistoryDetail;
