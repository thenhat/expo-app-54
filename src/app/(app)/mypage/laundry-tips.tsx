import Wrapper from "@/components/Wrapper";
import PageName from "@/constants/PageName";
import { ScrollView, Text, View, TouchableOpacity, LayoutAnimation } from "react-native";
import { useState } from "react";
import IconUp from "@/assets/icons/chevron-up.svg";
import IconDown from "@/assets/icons/chevron-down.svg";

interface CollapseItemProps {
  title: string;
  children: React.ReactNode;
}

const CollapseItem: React.FC<CollapseItemProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="mb-[8px] mt-[4px]">
      <TouchableOpacity
        className="flex-row justify-between items-center py-[12px]"
        onPress={toggleAccordion}
      >
        <Text className="text-[18px] leading-[24px] font-montserrat600 text-[#222] flex-1">
          {title}
        </Text>
        {isExpanded ? <IconUp /> : <IconDown />}
      </TouchableOpacity>
      {isExpanded && (
        <View className="pt-[8px] pb-[16px]">
          {children}
        </View>
      )}
    </View>
  );
};

const LaundryTips: React.FC = () => {
  return (
    <Wrapper
      backUrl={"/(tabs)/mypage"}
      headerType="BACK"
      headerScreenName={PageName.LAUNDRY_TIPS}
    >
      <ScrollView className="flex-1">
        <View className="py-[24px] px-[16px]">
          {/* 음식물 얼룩제거 팁 */}
          <CollapseItem title="음식물 얼룩제거 팁">
            <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222] mb-[12px]">
              옷에 생겨버린 과일 얼룩 제거하는 방법은 얼룩이 생기자마자 지우는 것이 가장 빠르고 간편
            </Text>
            <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222] mb-[20px]">
              의류에 묻은 자국들이 오랜 시간이 지나면 지날수록 더욱 지우기 힘들어지게 되기 때문에 빠르게 지워야만 한다는 사실을 기억해 주세요
            </Text>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                1) 주방 세제를 활용하는 방법
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                옷에 과일 물, 카레 얼룩과 같은 음식이 묻었다면 물을 먼저 묻히기보다는 주방 세제를 떨어뜨려 거품이 나도록 손으로 잘 비벼준 후 물로 헹구는 것이 좋습니다.
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                2) 폼클렌징 활용방법
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                폼클렌징도 물을 묻히지 않은 상태에서 같은 방법으로 지워주신다면 힘을 별로 들이지 않고도 지워보실 수 있습니다.
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222] mt-[8px]">
                주방 세제 그리고 폼클렌징은 가급적 얼룩이 생기자마자 사용했을 때에 가장 효과적인 방법
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                3) 식초 활용방법
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                얼룩이 생기고 오랜 시간이 지났다면 식초를 따뜻한 물에 희석해 주시고 그 물에 10분가량 옷을 담가주시면 되며 만약 물에 식초를 희석할 수 없는 경우 마른 천에 식초를 묻혀 얼룩의 부위를 톡톡 두드려가며 제거
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                4) 과탄산소다 활용방법
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                과탄산소다는 표백제 역할을 하는 성분으로 옷에 과일 물이 묻은경우 뿐 아니라 각종 기름때의 제거 시에도 유용하게 쓰이는 제품 중 하나
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222] mt-[8px]">
                따뜻한 물에 과탄산소다를 희석하고 얼룩 제거가 필요하 옷들을 20~30분 정도 길게 담아두신다면 얼룩이 사라짐
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222] mt-[8px]">
                단, 과탄산소다는 찬물에는 잘 녹지 않기 때문에 따뜻한 물에 사용
              </Text>
            </View>
          </CollapseItem>

          <View className="bg-[#DADADABF] h-[1px] my-[8px]" />

          {/* 볼펜자국 지우는 방법 */}
          <CollapseItem title="볼펜자국 지우는 방법">
            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                1) 알콜 활용법
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                자국이 난 부위를 알코올에 담궈 기존에 세탁하던 방식 그대로 세탁을 해보기만 하더라도 자국이 지워집니다.
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222] mt-[8px]">
                옷 뿐 아니라 가죽과 같은 매트들에 볼펜이 묻게 되었다면 알코올을 솜에 묻혀 잉크가 묻어있는 부분에 몇 분간 대었다가 지우게 된다면 깔끔하게 해결!
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                2) 헤어스프레이, 물파스
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                자국이 있는 곳에 키친타월을 덧대어두고 타월이 젖을 때까지 스프레이를 충분히 뿌려준 후 수건과 같이 깨끗한 천을 이용해서 톡톡 두드리듯 닦아주면 깔끔해집니다.
              </Text>
            </View>
          </CollapseItem>

          <View className="bg-[#DADADABF] h-[1px] my-[8px]" />

          {/* 옷에 묻은 김치국물 제거하는 방법 */}
          <CollapseItem title="옷에 묻은 김치국물 제거하는 방법">
            <View className="mb-[12px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                1) 즉시 물로 세척 후에 물에 식초와 베이킹소다를 풀고 잠시 담구어 두셨다가 얼룩 부위를 손으로 잘 문지른 후에 세탁
              </Text>
            </View>

            <View className="mb-[12px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                2) 다진양파를 얼룩 위에 올려놓고 약 1시간 후에 세탁
              </Text>
            </View>
          </CollapseItem>

          <View className="bg-[#DADADABF] h-[1px] my-[8px]" />

          {/* 옷에 묻은 페이트 지우는 법 */}
          <CollapseItem title="옷에 묻은 페이트 지우는 법">
            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                1) 에탄올 활용법
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                에탄올은 공기에 닿으면 바로 마르는 특징이 있어 옷에 에탄올을 뿌릴 때에는 분무기에 옮겨 담은 후 사용하고 페이트가 어느정도 녹으면 물로 헹굼 뒤에 세탁
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                2) 아세톤, 물파스 활용
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                아세톤과 물파스의 경우에는 일반 가정집에서도 잘 볼 수 있는 물품들입니다. 이에 페인트 묻은 부분에 그것을 칠해주고 살살 문질러 주게 된다면 서서히 떨어지게 됩니다.
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222] mt-[8px]">
                물파스 같은 경우에는 페인트 부분에 묻혀서 10분 정도 기다린 다음 마른걸레로 살살 문질러서 제거
              </Text>
            </View>
          </CollapseItem>

          <View className="bg-[#DADADABF] h-[1px] my-[8px]" />

          {/* 립스틱 지우는 방법 */}
          <CollapseItem title="립스틱 지우는 방법">
            <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
              마른천에 알코올을 뭍혀 두드리듯 닦아낸 후에 세탁
            </Text>
          </CollapseItem>

          <View className="bg-[#DADADABF] h-[1px] my-[8px]" />

          {/* 크레파스 제거 방법 */}
          <CollapseItem title="크레파스 제거 방법">
            <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
              얼룩 위 아래로 흰종이를 높고 다림질을 하며 묻은 크레파스가 종이로 붙고 이후에 세탁하시면 됩니다.
            </Text>
          </CollapseItem>

          <View className="bg-[#DADADABF] h-[1px] my-[8px]" />

          {/* 의류에 핀 곰팡이와 냄새 제거하는 법 */}
          <CollapseItem title="의류에 핀 곰팡이와 냄새 제거하는 법">
            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                1. 빨래 세제 대신 식초 250 mL를 준비하기.
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                평범한 백식초는 곰팡이 냄새와 같은 빨래의 불쾌한 냄새를 제거할 수 있는 천연 재료이며, 냄새를 유발하는 균과 세제 찌꺼기도 제거할 수 있습니다.
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                2. 베이킹 소다 120 mL로 빨래하기.
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                식초와 베이킹 소다는 모두 곰팡이를 제거하지만, 서로 냄새를 유발하는 다른 종류의 균을 공격하는데요. 이미 곰팡이 냄새가 나는 옷을 식초로 빨았다면 베이킹 소다 120 mL를 더한 후 설정할 수 있는 가장 뜨거운 물로 세탁합니다.
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                3. 밖에서 자연건조하기.
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                세탁기로 빨래한 후, 밖에 있는 빨래 건조대에 옷을 널고, 자연스럽게 햇빛과 바람으로 옷을 말려보는 것도 좋습니다. 햇빛이 불쾌한 냄새를 초래하는 균을 제거하기 때문에 빨랫줄에 널어서 말린 옷의 냄새가 일반적으로 더 상쾌한 편입니다.
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                4. 빨래를 하고 싶지 않다면, 냉동실에 옷을 넣어두기.
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                냄새를 유발하는 균의 주변 환경 온도가 떨어지면 균이 제거되기 때문에 옷의 곰팡이 냄새를 감추는데 도움이 될 수 있습니다. 밀봉이 가능한 비닐 백에 옷을 넣고 하룻밤 동안 냉동실에 넣어둡니다.
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                5. 식초 혹은 보드카를 옷에 뿌린 후 말려주기.
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                식초와 보드카 모두 곰팡이 냄새를 유발하는 균을 제거하는데 사용할 수 있습니다. 게다가 보드카와 식초 모두 증발한 후 냄새를 남기지 않기 때문에 옷에 직접 뿌려주어도 좋습니다. 스프레이 병에 식초 혹은 보드카를 넣고 옷에 뿌려준 후 말려주기만 하면 됩니다.
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                6. 활성탄과 함께 비닐 백에 넣어주기.
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                활성탄은 강력한 필터 역할을 하기 때문에 종종 물이나 에어 필터, 뷰티 제품, 독소 치료 목적으로 사용되곤 합니다. 밀봉이 가능한 비닐 백에 몇 개의 활성탄과 옷을 넣고 최소 하룻밤 동안 놓아두고 냄새가 쉽게 제거되지 않는다면 일주일 정도 놓아두어도 좋습니다.
              </Text>
            </View>
          </CollapseItem>

          <View className="bg-[#DADADABF] h-[1px] my-[8px]" />

          {/* 옷에 묻은 기름 제거하는 법 */}
          <CollapseItem title="옷에 묻은 기름 제거하는 법">
            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                1) 밀가루는 기름을 흡수하는 성질!
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                요리에 많이 사용되는 밀가루는 음식 외에도 기름때를 제거할 때 사용 가능한데요. 밀가루는 기름을 흡수하는 성질이 강합니다. 그래서 기름때가 묻은 부위에 충분한 양의 밀가루를 뿌린 뒤 종이를 덮어 다리미로 살살 다려주면 기름때가 제거됩니다.
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                2) 주방세제를 이용하는 방법
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                이 방법이 가장 흔하고 잘 알려져 있는데요. 그만큼 지우는 데에도 효과적입니다. 주방세제로 묻힌 뒤 손으로 문질러 세탁하면 얼룩이 쉽게 제거되는 것을 볼 수 있습니다.
              </Text>
            </View>
          </CollapseItem>

          <View className="bg-[#DADADABF] h-[1px] my-[8px]" />

          {/* 옷에 커피얼룩 지우는 법 */}
          <CollapseItem title="옷에 커피얼룩 지우는 법">
            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                1) 손 세정제나 비누를 묻혀 비비기
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                미지근한 물에 적셔서 손으로 문질러주면 되는데 화장실에 있는 손 세정제나 비누를 살짝 묻혀서 비벼준 후에 다시 미지근한 물로 헹궈주면 됩니다.
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                2) 휴지나 물티슈로 커피가 묻은 곳 누르기
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                휴지나 물티슈로 커피가 묻은 곳을 눌러서 커피가 옷으로 더이상 스며들지 않게 예방해줍니다. 번지는 것을 방지하기 위해 문지르는 행위는 절대 금지
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                3) 탄산수에 10분 이상 담가두기
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                세번째로는 탄산수에 담가두는 방법입니다. 커피가 묻고 난 후에 즉시 닦아 내지 못해서 얼룩이 진 옷을 탄산수에 10분 이상 담가두고, 흐르는 물에 헹군 후에 빨래해줍니다.
              </Text>
            </View>

            <View className="mb-[16px]">
              <Text className="text-[15px] leading-[22px] font-montserrat400 text-[#222] mb-[8px]">
                4) 베이킹소다와 과탄산소다를 물에 섞어서 사용하기
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222]">
                베이킹소다와 과탄산소다를 물에 섞어서 세제로 사용하는 방법입니다. 베이킹 소다와 물을 1대1 비율로 섞어서 커피 얼룩 부분에 10분 이상 얹어서 방치한 후 손으로 비벼서 세탁을 해주면 얼룩이 지워지게 됩니다.
              </Text>
              <Text className="text-[14px] leading-[24px] font-montserrat400 text-[#222] mt-[8px]">
                과탄산소다의 경우 따뜻한 물에 녹여서 커피 얼룩이 묻은 옷을 30분 정도 담가두고 손으로 살살 비벼서 빨래하면 됩니다.
              </Text>
            </View>
          </CollapseItem>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default LaundryTips;
