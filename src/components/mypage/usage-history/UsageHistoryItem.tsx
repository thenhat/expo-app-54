import { View, Text, TouchableOpacity, Alert } from "react-native";
import VectorIcon from "@/assets/icons/my/Vector.svg";
import WindIcon from "@/assets/icons/my/Wind.svg";
import StoreIcon from "@/assets/icons/my/Store.svg";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { setLoading } from "@/store/slice/globalSlice";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import ModalConfirm from "@/components/ModalConfirm";
import ModalStart from "../ModalStart";
import moment from "moment";

export type ItemDataType = {
  orderId: string;
  oid: string;
  storeId: string;
  placeId: string;
  machineId: string;
  startTime: string;
  endTime: string;
  time: string;
  bookingDate: string;
  name: string;
  model: string;
  option: any;
  amount: string;
  method?: string;
  type: "TYPE_A" | "TYPE_B" | "TYPE_C";
  reviewActive?: boolean;
  orderStatus?: string;
};

interface Props {
  items: ItemDataType;
  btnReview?: boolean;
  filterActive: string;
  tabActive: any;
}

const typeMapping: Record<ItemDataType["type"], JSX.Element> = {
  TYPE_A: (
    <View className="bg-blue15 h-[28px] rounded-full px-[15px] pb-[4px] w-fit flex-row items-center gap-[5px]">
      <VectorIcon />
      <Text className="text-[14px] leading-[16px] text-[#222] font-defaultSemiBold">
        일반세탁
      </Text>
    </View>
  ),
  TYPE_B: (
    <View className="bg-green15 h-[28px] rounded-full px-[15px] pb-[4px] w-fit flex-row items-center gap-[5px]">
      <WindIcon />
      <Text className="text-[14px] leading-[16px] text-[#222] font-defaultSemiBold">
        드라이클리닝
      </Text>
    </View>
  ),
  TYPE_C: (
    <View className="bg-pink1 h-[28px] rounded-full px-[15px] pb-[4px] w-fit flex-row items-center gap-[5px]">
      <StoreIcon />
      <Text className="text-[14px] leading-[16px] text-[#222] font-defaultSemiBold">
        주변가게
      </Text>
    </View>
  ),
};

const UsageHistoryItem: React.FC<Props> = ({
  items,
  btnReview,
  tabActive,
  filterActive,
}) => {
  const router = useRouter();
  const {
    orderId,
    storeId,
    time,
    startTime,
    endTime,
    bookingDate,
    name,
    model,
    option,
    amount,
    type,
    method,
    placeId,
    reviewActive,
  } = items;
  const dispatch = useAppDispatch();

  const [machineActive, setMachineActive] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleStart = async (oid: string) => {
    dispatch(setLoading(true));
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.order.startMachineOrderApp,
        body: { oid },
      });
      if (res?.success) {
        dispatch(setLoading(false));
        setMachineActive({});
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
      else {
        dispatch(setLoading(false));
        Alert.alert(
          "알림",
          res?.message,
          [{ text: "확인" }]
        );
      }
    } catch (error: any) {
      console.error("error:", error);
      dispatch(setLoading(false));
      Alert.alert(
        "알림",
        error?.response?.data?.message,
        [{ text: "확인" }]
      );
    }
  };

  const goToReview = () => {
    router.push({
      pathname: "/mypage/usage-history-review/[id]",
      params: {
        id: ["TYPE_A", "TYPE_B"].includes(filterActive) ? storeId : placeId,
        orderId,
        type: filterActive,
        name,
      },
    } satisfies Href<string>);
  };

  const goToDetail = () => {
    const routes: Record<string, Href<string>> = {
      TYPE_A_pending: {
        pathname: "/mypage/usage-history-detail/[id]",
        params: { id: orderId, type: "TYPE_A", tab: tabActive?.value },
      },
      TYPE_A_complete: {
        pathname: "/mypage/usage-history-detail/[id]",
        params: { id: orderId, type: "TYPE_A", tab: tabActive?.value },
      },
      TYPE_C: {
        pathname: "/places/place-detail/[id]",
        params: { id: placeId },
      },
      default: {
        pathname: "/mypage/usage-history-detail/[id]",
        params: { id: orderId, type: "TYPE_A", tab: tabActive?.value },
      },
    };

    const key =
      filterActive === "TYPE_A" ? `TYPE_A_${tabActive.value}` : filterActive;
    router.push(routes[key] || routes["default"]);
  };

  return (
    <View className="py-[24px]">
      <TouchableOpacity onPress={goToDetail}>
        <View className="flex-row justify-between pb-[12px]">
          {typeMapping[type] || <Text>Unknown Type</Text>}
          <View className="flex-row items-center">
            <Text className="text-[13px] text-[#888] font-defaultRegular">
              {bookingDate}
            </Text>
            {filterActive === "TYPE_A" && (
              <View className="flex-row items-center gap-[5px] ml-[1px]">
                <View className="bg-[#888888] w-[4px] aspect-square rounded-full"></View>
                <Text className="text-[13px] text-[#888] font-defaultRegular">
                  {moment(startTime).format("HH:mm")} ~
                  {moment(endTime).format("HH:mm")}
                </Text>
              </View>
            )}
          </View>

        </View>
        <Text className="text-[15px] font-defaultSemiBold leading-[24px] text-[#FEA31B] mb-[4px]">
          {name}
        </Text>

        {type !== "TYPE_C" && model && (
          <Text className="text-[19px] font-defaultSemiBold leading-[24.7px] text-[#222]">
            {model}
          </Text>
        )}
        {type === "TYPE_C" && method && (
          <Text className="text-[14px] font-defaultMedium leading-[18.2px] text-[#222]">
            {method}
          </Text>
        )}
        <View className="flex-row justify-between items-center mt-[22px]">
          {type !== "TYPE_C" && option && (
            <Text className="text-[14px] font-defaultMedium leading-[18.2px] text-[#222]">
              {option}
            </Text>
          )}

          <Text className="text-[#2F265D] text-[18px] leading-[23.4px] font-defaultSemiBold ml-auto">
            {amount}
            {type !== "TYPE_C" && "원"}
          </Text>
        </View>
      </TouchableOpacity>
      <View className="h-[1px] bg-[#DADADABF] block mt-[20px]" />


      <View className="flex gap-2" style={{ flexDirection: 'row', gap: 2, width: '100%' }}>
        <TouchableOpacity
          onPress={goToDetail}
          className="flex-1"
        >
          <View className="border-solid border border-[#2F265D] bg-transparent h-[40px] rounded-full px-[16px] text-center mt-[20px]">
            <Text
              className={`text-[#2F265D] text-[14px] font-defaultSemiBold leading-[40px] text-center`}
            >
              예약내용보기
            </Text>
          </View>
        </TouchableOpacity>
        {tabActive.value === "pending" && items?.orderStatus === 'V_READY' && (
          <TouchableOpacity
            onPress={() => (setMachineActive(items), setModalVisible(true))}
            className="flex-1"
          >
            <View className="bg-[#222] h-[40px] rounded-full px-[16px] text-center mt-[20px]">
              <Text
                className={`text-[#fff] text-[14px] font-defaultSemiBold leading-[40px] text-center`}
              >
                바로 사용하기
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {btnReview && (
          <TouchableOpacity disabled={!reviewActive} onPress={goToReview} className="flex-1">
            <View
              className={`${reviewActive ? "bg-[#222]" : "bg-[#F3F2F2]"} h-[40px] rounded-full px-[16px] text-center mt-[20px]`}
            >
              <Text
                className={`${reviewActive ? "text-[#fff]" : "text-[#D2D1D1]"} text-[14px] font-defaultSemiBold leading-[40px] text-center`}
              >
                리뷰남기기
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <ModalStart
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        onConfirm={() => handleStart(machineActive?.oid)}
        title={`${machineActive?.model} 바로 사용하시겠어요?`}
      />
    </View>
  );
};

export default UsageHistoryItem;
