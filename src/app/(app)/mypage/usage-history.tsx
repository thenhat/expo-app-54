import EmptyData from "@/components/EmptyData";
import FilterButton from "@/components/mypage/usage-history/FilterButton";
import UsageHistoryItem, {
  ItemDataType,
} from "@/components/mypage/usage-history/UsageHistoryItem";
import Panagition from "@/components/Panagition";
import TabComponent from "@/components/Tab";
import Wrapper from "@/components/Wrapper";
import { optionMapping, washingModeMapping } from "@/constants/mapping";
import PageName from "@/constants/PageName";
import { useAppDispatch } from "@/store/hook";
import { setLoading } from "@/store/slice/globalSlice";
import sendApiRequest from "@/utils/api";
import { formatDate, formatDate2 } from "@/utils/dateCalculator";
import formatNumbers from "@/utils/format";
import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const tabs = [
  { value: "pending", label: "예약/이용중" },
  { value: "complete", label: "이용완료" },
];

const UsageHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { statusParam, filterParam }: any = useGlobalSearchParams();
  const [activeTab, setActiveTab] = useState<any>({
    value: "pending",
    label: "예약/이용중",
  });
  const [active, setActive] = useState<string>("TYPE_A");
  const [history, setHistory] = useState<ItemDataType[]>([]);
  // const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);

  const renderTitleOption = (options: any) => {
    let titleOption: any = [];
    options?.forEach((item: any) => {
      const count = item?.count ?? 1;
      titleOption = [...titleOption, `${item.title}: ${count}회`];
    });

    return titleOption?.length > 0 ? titleOption.join(", ") : '없음';
  }
  // console.log("totalPage", totalPage);

  const getHistory = async (
    apiUrl: string,
    status?: "complete" | "pending",
    currentPage?: number
  ) => {
    dispatch(setLoading(true));
    try {
      const res: any = await sendApiRequest({
        method: "get",
        endPoint: `/orders/history/${apiUrl}?status=${status}`,
        body: {
          page: currentPage,
          size: 10,
        },
      });

      const orders = res?._embedded?.orders ?? [];
      const totalP = res?.page?.totalPages || 1;

      setHistory(
        orders.map((el: any): ItemDataType => {
          const isWashingMachine = apiUrl === "washing-machine";
          const isDryCleaning = apiUrl === "dry-cleaning";
          const totalQuantity = el.orderDetails?.reduce(
            (sum: any, item: any) => sum + item.quantity,
            0
          );
          const method = el.usageMethod === "VISIT" ? "직접방문" : "전화주문";
          return {
            orderId: el?.orderId,
            oid: el?.oid,
            storeId: el?.storeId,
            machineId: el?.machine?.id,
            placeId: el?.placeId,
            time: formatDate(el.machine?.startTime, el.machine?.endTime),
            startTime: el.machine?.startTime,
            endTime: el.machine?.endTime,
            bookingDate: formatDate2(el.bookingTime),
            name: el.storeName ?? el.placeName,
            model: el.machine?.name,
            reviewActive: el.reviewActive,
            method,
            option: `${washingModeMapping[el.machine?.washingMode] || ""} / ${el.machine?.options?.length ? renderTitleOption(el.machine?.options) : "옵션 없음"}`,
            amount: isWashingMachine
              ? formatNumbers(el?.totalPrice)
              : isDryCleaning
                ? formatNumbers(el?.totalPrice)
                : el.orderStatus === "CASHBACK_COMPLETED"
                  ? `${formatNumbers(el.fcCash)}원`
                  : "캐시 적립 예정",
            type: isWashingMachine
              ? "TYPE_A"
              : isDryCleaning
                ? "TYPE_B"
                : "TYPE_C",
            orderStatus: el.orderStatus
          };
        })
      );
      setTotalPage(totalP);
    } catch (error) {
      console.error("error:", error);
    }
    dispatch(setLoading(false));
  };

  const handleChangeTab = (tab: any) => {
    const typeMapping: any = {
      TYPE_A: "washing-machine",
      TYPE_B: "dry-cleaning",
      TYPE_C: "nearby-place",
    };
    getHistory(typeMapping[active], tab.value);
    setActiveTab(tab);
  };

  const handleFilter = (value: string) => {
    // console.log("handleFilter", value);

    const typeMapping: any = {
      TYPE_A: "washing-machine",
      TYPE_C: "nearby-place",
      TYPE_B: "dry-cleaning",
    };
    setActive(value);
    getHistory(typeMapping[value], activeTab.value);
  };

  useEffect(() => {
    !filterParam && getHistory("washing-machine", "pending");
  }, [filterParam]);

  useEffect(() => {
    if (statusParam && statusParam === "complete") {
      setActiveTab(tabs[1]);
    }


    if (filterParam) {
      const typeMapping: any = {
        TYPE_A: "washing-machine",
        TYPE_C: "nearby-place",
        TYPE_B: "dry-cleaning",
      };

      setActive(filterParam as string);
      getHistory(typeMapping[filterParam], statusParam);
    }
  }, [statusParam, filterParam]);

  return (
    <Wrapper
      backUrl="/(tabs)/mypage"
      headerType="BACK"
      headerScreenName={PageName.USAGE_HISTORY}
    >
      <View className="flex-1">
        <View className="p-[16px]">
          {/* tab */}
          <TabComponent
            activeTab={activeTab}
            listTab={tabs}
            onChange={handleChangeTab}
            mode="default"
            color="primary"
          />
          {/* filter */}
          <View className="pt-[21px]">
            <FilterButton onFilterChange={handleFilter} active={filterParam} />
            <View className="h-[1px] bg-[#DADADABF] block mx-[-16px] mt-[16px]" />
          </View>
        </View>
        {/* list */}

        {history?.length > 0 ? (
          <>
            <ScrollView
              contentContainerStyle={{ paddingHorizontal: 16 }}
              nestedScrollEnabled={true}
              className="flex-1"
            >
              {history?.map((item: ItemDataType, index: number) => (
                <View key={index}>
                  {index > 0 && (
                    <View className="h-[8px] bg-[#F4F4F4] block mx-[-16px]" />
                  )}
                  <UsageHistoryItem
                    tabActive={activeTab}
                    filterActive={active}
                    items={item}
                    btnReview={activeTab.value === "complete"}
                  />
                </View>
              ))}
            </ScrollView>
            {totalPage > 1 && (
              <Panagition
                onChange={(p: number) => {
                  const typeMapping: any = {
                    TYPE_A: "washing-machine",
                    TYPE_C: "nearby-place",
                    TYPE_B: "dry-cleaning",
                  };
                  getHistory(typeMapping[active], activeTab.value, p);
                }}
                totalPage={totalPage}
              />
            )}
          </>
        ) : (
          <EmptyData />
        )}
      </View>
    </Wrapper>
  );
};

export default UsageHistory;
