import EmptyData from "@/components/EmptyData";
import ConfirmDeleteReviewModal from "@/components/Modal/ConfirmDeleteReview";
import AmountTop from "@/components/mypage/AmountTop";
import ReviewItem, { ReviewItemType } from "@/components/mypage/ReviewItem";
import TabComponent from "@/components/Tab";
import Wrapper from "@/components/Wrapper";
import PageName from "@/constants/PageName";
import sendApiRequest from "@/utils/api";
import formatNumbers from "@/utils/format";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const tabs = [
  { value: "stores", label: "호텔런드리매장" },
  { value: "place", label: "주변가게" },
];

const ReviewManagement: React.FC = () => {
  const [tab, setTab] = useState(tabs[0]);
  const [dataReview, setDataReview] = useState<any>();
  const [total, setTotal] = useState<number>(0);
  // const [idRv, setIdRv] = useState<number>();
  const [openModal, setOpenModal] = useState<number>();

  const getDataReview = async (url?: string) => {
    try {
      const res: any = await sendApiRequest({
        method: "get",
        endPoint: `/${url}/my-reviews`,
      });
      if (res?.data) {
        const isPlace = url === "place";
        const dataFormat: ReviewItemType[] = res.data?.reviews?.map(
          (el: any) => {
            return {
              id: el.review?.id,
              detailId: isPlace ? el.place?.id : el.store?.id,
              author: isPlace ? el.place?.name : el.store?.name,
              content: el.review?.comment,
              starNumber: el.review?.star,
              createdAt: el.review?.createdDate,
              visitAt: el.review?.visitDate,
              type: url,
            };
          }
        );
        setDataReview(dataFormat);
        setTotal(res?.data?.totalElements);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteReview = async (id: number, url: string) => {
    try {
      const res: any = await sendApiRequest({
        method: "delete",
        endPoint: `/${url}/reviews/${id}`,
      });
      if (res) {
        getDataReview(url);
        setOpenModal(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeTab = (t: any) => {
    getDataReview(t.value);
    setTab(t);
  };
  useEffect(() => {
    getDataReview("stores");
  }, []);

  return (
    <Wrapper
      backUrl={"/(tabs)/mypage"}
      headerType="BACK"
      headerScreenName={PageName.REVIEW_MANAGEMENT}
    >
      <ConfirmDeleteReviewModal
        visible={Boolean(openModal)}
        handleCloseModal={() => setOpenModal(undefined)}
        onAction={() => {
          handleDeleteReview(openModal as number, tab.value);
        }}
      />
      <View className="px-[16px]">
        <TabComponent
          activeTab={tab}
          listTab={tabs}
          onChange={handleChangeTab}
          mode="default"
          color="primary"
        />
      </View>
      <View className="px-[16px] pt-[24px]">
        <AmountTop label="전체" qty={formatNumbers(total)} type="REVIEW" />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View className="px-[16px] pb-[24px]">
          {dataReview?.map((item: any, index: number) => (
            <View key={index}>
              {index > 0 && (
                <View className="block h-[8px] bg-[#F4F4F4] mx-[-16px]" />
              )}
              <ReviewItem
                setOpenModal={setOpenModal}
                // handleDeleteReview={handleDeleteReview}
                item={item}
              />
            </View>
          ))}
          {dataReview?.length <= 0 && <EmptyData text={`방문한 가게의 리뷰는 
이용내역에서 등록할 수 있습니다.`} />}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default ReviewManagement;
