import EmptyData from "@/components/EmptyData";
import Panagition from "@/components/Panagition";
import PlaceItemComp, { PlaceItemType } from "@/components/PlaceItemComp";
import Wrapper from "@/components/Wrapper";
import PageName from "@/constants/PageName";
import sendApiRequest from "@/utils/api";
import formatNumbers from "@/utils/format";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

const FavoritePlaceManagement: React.FC = () => {
  const [favoData, setFavoData] = useState<PlaceItemType[]>([]);
  const [page, setPage] = useState<{ current: number; total: number }>({
    current: 0,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async (currentPageParam?: number) => {
    setLoading(true);
    try {
      const res: any = await sendApiRequest({
        method: "get",
        endPoint: "/favourites",
        body: {
          page: page.current,
          size: 10,
        },
      });
      if (res?.data) {
        const data = res?.data?.content;
        const formatData: PlaceItemType[] = data?.map((item: any) => {
          const imagesFormatted = [
            { url: item?.image1Place ?? null, name: null, price: null, defaultType: 'place' },
            ...(Array.isArray(item?.eventInfo)
              ? item.eventInfo.map((el: any) => ({
                url: el.image,
                name: null,
                price: null,
              }))
              : []),
            ...(Array.isArray(item?.newMenus)
              ? item.newMenus.map((el: any) => ({
                url: el.image1,
                name: el.name,
                price: formatNumbers(el.price),
              }))
              : []),
            ...(Array.isArray(item?.allMenus)
              ? item.allMenus.map((el: any) => ({
                url: el.image1,
                name: el.name,
                price: formatNumbers(el.price),
              }))
              : []),
            { url: item?.image2Place ?? null, name: null, price: null, defaultType: 'event' },
            { url: item?.image3Place ?? null, name: null, price: null },
          ];

          return {
            id: item?.idPlace,
            status: [
              item.cashPlace && "CASH_PLACE",
              item.eventPlace && "EVENT",
            ],
            title: item?.namePlace,
            isOpen: item?.open,
            starCount: item?.star?.toFixed(1),
            reviewCount: item?.totalReview,
            isFavorite: item?.favourited,
            images: imagesFormatted,
          };
        });

        setFavoData(formatData);
        setPage({
          current: res?.data?.page?.number,
          total: res?.data?.page?.totalPages,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("error:", error);
    }
  };
  // console.log("favoData", favoData);

  useEffect(() => {
    getData();
  }, [page.current]);

  return (
    <Wrapper
      backUrl={"/(tabs)/mypage"}
      headerType="BACK"
      headerScreenName={PageName.FAVORITE_PLACE_MANAGEMENT}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View className="">
          {favoData?.length > 0 ?
            <>
              <FlashList
                contentContainerStyle={{ paddingHorizontal: 16 }}
                data={favoData}
                keyExtractor={(_item) => `${_item.id}`}
                renderItem={({ item, index }: any) => {
                  return (
                    <PlaceItemComp
                      index={index}
                      renderData={getData}
                      item={item}
                    />
                  );
                }}
                onEndReached={() => {
                  if (page.current < page.total - 1) {
                    getData(page.current + 1);
                  }
                }}
                estimatedItemSize={253}
                onEndReachedThreshold={0.5}
              // ListFooterComponent={
              //   loading ? <ActivityIndicator size="large" /> : null
              // }
              />

              {page.total > 1 && (
                <Panagition
                  onChange={(p: number) =>
                    setPage((prev: { current: number; total: number }) => ({
                      ...prev,
                      current: p,
                    }))
                  }
                  totalPage={page.total}
                />
              )}
            </>
            : (
              <EmptyData />
            )}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default FavoritePlaceManagement;
