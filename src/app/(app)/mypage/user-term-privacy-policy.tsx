import Wrapper from "@/components/Wrapper";
import PageName from "@/constants/PageName";
import { ScrollView, View, Text } from "react-native";

const UserTermPrivacyPolicy: React.FC = () => {
  return (
    <Wrapper
      backUrl={"/(tabs)/mypage"}
      headerType="BACK"
      headerScreenName={PageName.USER_TERM_PRIVACY_POLICY}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="px-[16px] pb-[40px]">
          {/* Terms of Service Section */}
          <View className="mb-[40px]">
            <Text className="text-[16px] leading-[20px] text-[#222] font-defaultBold mb-[8px]">
              이용약관
            </Text>
            <View className="rounded-[20px] bg-[#F5F2FF]">
              <View className="p-[16px]">
                <View>
                  <Text className="text-[15px] leading-[20px] font-defaultBold text-[#333333] mb-[12px]">
                    1. 서비스 이용약관
                  </Text>
                  
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    호텔런드리를 이용해 주셔서 감사합니다. 호텔런드리는 세탁 서비스를 더욱 빠르고 편리하게 제공하기 위해 만들어졌습니다. 여러분의 생활에 여유를 더하기 위해 제공되는 서비스인 만큼 서비스가 오래도록 지속될 수 있도록 조금만 시간을 내서 아래 약관을 읽어주시길 부탁드립니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    용어의 정리
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • "호텔런드리"라 함은 주식회사 워시업코리아에서 운영하는 어플리케이션(이하 "앱")과 앱을 통해 "세탁예약 및 모바일 결제"를 제공하는 서비스로 구체적인 내용은 호텔런드리 운영정책에 따릅니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • "회사"라 함은 호텔런드리 서비스를 운영하는 주식회사 워시업코리아를 말합니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    • "여러분"이라 함은 호텔런드리에 가입하고 서비스를 이용하는 모든 사용자를 말합니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    여러분은 이런 의무를 가지게 됩니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    여러분은 주식회사 워시업코리아가 제공하지 않은 방법으로 호텔런드리 서비스에 접근 할 수 없습니다. 또한 회사의 동의 없이 서비스 또는 이에 포함된 소프트웨어의 일부를 복사, 수정, 배포, 판매, 양도, 대여, 담보제공하거나 타인에게 그 이용을 허락하는 행위와 소프트웨어를 역설계하거나 소스 코드의 추출을 시도하는 등 서비스를 복제, 분해 또는 모방하거나 변형하는 행위가 금지됩니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    호텔런드리는 여러분의 편리한 세탁서비스 이용을 위해 최선을 다할 것입니다. 하지만 이러한 점을 이용해 회사가 제공하는 서비스 이외의 어떠한 지시, 활용, 부탁 등을 하실 수 없습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    호텔런드리는 여러분 본인만 이용할 수 있으며, 다른 사람이 여러분의 계정을 이용하도록 허락할 수 없습니다. 만일 다른 사람의 명의나 주소 등 개인정보를 이용하여 서비스를 이용하려 한 경우, 서비스 이용에 필요한 정보를 입력하지 않거나 허위의 정보를 입력한 경우 등에는 여러분의 서비스 가입을 거부할 수 있습니다. 만약, 여러분이 위 조건에 위반하여 계정을 생성한 것으로 판명된 때에는 호텔런드리는 즉시 여러분의 호텔런드리 서비스 이용을 중단하거나 계정을 삭제하는 등 적절한 제한을 할 수 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    여러분은 회사가 제공하는 서비스에 대한 금전적인 책임을 가지며, 서비스를 제공받았음에도 그에 대한 비용을 지불하지 않을 경우 서비스 사용 제한 및 기타 조치가 진행됩니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    여러분에게 연락할 수도 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    호텔런드리는 항상 여러분의 목소리에 귀를 기울이겠습니다. 또한 호텔런드리는 오직 서비스를 제공하기 위해 여러분에게 직접 연락할 수 있습니다. 앱을 이용한 푸시 메시지 또는 서비스 가입시 알려주신 휴대폰번호, 이메일주소, (주)카카오가 제공하는 카카오톡 알림 메시지를 통해 여러분에게 개별적으로 연락을 할 수 있습니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    이런 점을 주의하여 주시기 바랍니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    여러분이 호텔런드리를 이용함으로써 더 많은 여유를 누리는 것이 호텔런드리의 보람입니다. 다만, 여러분은 호텔런드리 서비스를 잘못된 방법으로 이용할 수 없다는 점을 잊지 말아주셨으면 합니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    예를 들어, 여러분은 잘못된 방법으로 호텔런드리 서비스 제공을 방해하거나 호텔런드리 앱 이외의 다른 방법을 사용하여 서비스를 이용할 수 없습니다. 또한, 여러분과 여러분의 세탁물에 대한 잘못된 정보를 제공하거나 허위 주문을 접수하거나 회사가 정하는 노쇼 행위가 반복될 경우 서비스를 제한할 수 있습니다. 회사의 동의 없이 호텔런드리 서비스 또는 이에 포함된 적립금 및 쿠폰 등을 판매, 양도, 대여, 담보제공하거나 타인에게 그 이용을 허락하는 행위도 금지됩니다. 무엇보다 호텔런드리 직원에게 욕설, 고성, 인신공격이나 협박 등의 폭언, 물리적 위협, 폭력 등 공서양속 및 법령에 위반되는 행위가 강력히 금지됩니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    혹시라도 여러분이 호텔런드리의 모든 약관 또는 정책을 준수하지 않는다면, 호텔런드리는 여러분의 부정행위를 조사하거나 호텔런드리 서비스 이용을 잠시 또는 계속하여 중단할 수 있습니다. 또한 회사는 법령에서 정하는 기간 동안 여러분이 서비스를 이용하기 위해 로그인 혹은 접속한 기록이 없는 경우 여러분이 등록한 전자우편, SMS 등 기타 유효한 수단으로 통지 후 여러분의 정보를 파기하거나 분리 보관할 수 있으며, 이로 인해 서비스 이용을 위한 필수적인 정보가 부족할 경우 이용계약이 해지될 수도 있습니다. 그 밖에 호텔런드리 서비스의 이용에 관한 자세한 사항은 호텔런드리 운영정책을 참고해 주시기 바랍니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    위치기반 서비스를 제공합니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    회사는 보다 편리한 서비스를 제공하기 위하여 여러분의 위치정보를 이용할 수 있습니다. 호텔런드리의 위치정보수집은 여러분의 단말기기의 위치정보를 수집하는 위치정보사업자로부터 위치정보를 전달받아 제공하는 무료서비스입니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    호텔런드리는 위치정보사업자로부터 전달받은 현재위치정보는 저장하지 않습니다. 다만, 여러분이 호텔런드리 서비스 이용을 목적으로 직접 입력한 주소정보는 서비스 탈퇴 시까지 유지됩니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    만약 여러분과 호텔런드리 간의 위치정보와 관련한 분쟁에 대하여 협의가 어려운 때에는 여러분은 위치정보의 보호 및 이용 등에 관한 법률 제 28조 2항 및 개인정보보호법 제43조의 규정에 따라 개인정보 분쟁조정위원회에 조정을 신청할 수 있습니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    가끔은 서비스가 중단될 수도 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    회사는 호텔런드리 서비스를 365일 쉬지 않고 제공하기 위하여 최선의 노력을 다합니다. 다만, 장비의 유지∙보수를 위한 정기 또는 임시 점검 또는 다른 상당한 이유로 서비스의 제공이 일시 중단될 수 있으며, 이때에는 미리 서비스 제공화면에 공지하겠습니다. 만약, 회사로서도 예측할 수 없는 이유로 서비스가 중단된 때에는 상황을 파악하는 즉시 통지하겠습니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    여러분의 개인정보를 존중합니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    회사는 여러분의 개인정보를 지키는 일에 아끼지 않고 투자하겠습니다. 여러분의 개인정보는 호텔런드리 서비스의 원활한 제공을 위해 여러분이 동의한 목적과 범위 내에서만 이용됩니다. 법령에 의하거나 여러분이 별도로 동의하지 않는 한 여러분의 개인정보를 제3자에게 제공하는 일은 결코 없을 예정이니, 안심하셔도 좋습니다. 기타 상세한 사항은 개인정보 처리방침을 참고하여 주십시오.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    모든 것을 보증하는 것은 아닙니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    호텔런드리는 여러분의 윤택한 생활을 위하여 최선을 다하며, 여러분이 마음껏 호텔런드리 서비스를 이용할 수 있도록 합리적인 수준의 주의를 기울여 서비스를 제공합니다. 회사는 법령상 허용되는 한도 내에서 호텔런드리 서비스와 관련하여 본 약관에 명시되지 않은 어떠한 구체적인 사항에 대한 약정이나 보증을 하지 않습니다. 예를 들어, 호텔런드리는 파트너가 호텔런드리에게 제공한 정보·사실의 신뢰도, 서비스의 특정 기능, 서비스의 이용가능성에 대하여 어떠한 약정이나 보증을 하는 것이 아니며, 호텔런드리 서비스를 '있는 그대로' 제공할 뿐입니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    호텔런드리의 잘못은 호텔런드리가 책임집니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    호텔런드리는 여러분이 호텔런드리 서비스를 이용함으로써 더 많은 즐거움과 혜택을 받기를 희망합니다. 만일 호텔런드리의 과실로 인하여 여러분이 손해를 입게 될 경우 법령과 호텔런드리 운영정책에 따라 여러분의 손해를 배상하겠습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    다만 호텔런드리는 호텔런드리 서비스에 접속 또는 이용과정에서 발생하는 개인적인 손해, 제3자가 불법적으로 호텔런드리의 서버에 접속하거나 서버를 이용함으로써 발생하는 손해, 제3자가 호텔런드리 서버에 대한 전송 또는 호텔런드리 서버로부터의 전송을 방해함으로써 발생하는 손해, 제3자에 의한 세탁물의 도난으로 발생한 손해, 전송된 데이터의 생략, 누락, 파괴 등으로 발생한 손해, 명예훼손, 천재지변 또는 이에 준하는 불가항력에 의해 발생하는 손해 등 호텔런드리의 과실 없이 제3자가 여러분에게 발생시킨 손해에 대하여 책임을 부담하지 않습니다. 또한 호텔런드리는 법률상 허용되는 한도 내에서 간접 손해, 특별 손해, 결과적 손해, 징계적 손해 및 징벌적 손해에 대한 책임을 부담하지 않습니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    약관은 수정될 수도 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    호텔런드리는 법률이나 호텔런드리 서비스의 변경사항을 반영하기 위한 목적 등으로 본 약관을 수정할 수 있습니다. 본 약관이 변경되는 경우 호텔런드리는 변경된 약관의 내용과 시행일을 정하여, 그 시행일로부터 7일전 앱에 게시합니다. 다만 이용자에게 불리하게 약관 내용을 변경하는 경우에는 시행일로부터 30일 전 앱에 게시하며, 변경된 약관은 게시한 시행일로부터 효력이 발생합니다. 단, 서비스의 새로운 기능과 관련된 변경이나 법률적인 사유로 인한 변경은 즉시 발효되며 호텔런드리 이용정책, 앱 내 정책 설명 등은 수시로 업데이트될 수 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    여러분이 호텔런드리 서비스를 계속 사용할 경우 변경된 약관에 따라 서비스를 이용하는 데에 동의하는 것으로 보겠습니다. 호텔런드리로서는 매우 안타까운 일이지만, 여러분이 변경된 약관에 동의하지 않는 경우 호텔런드리 서비스의 제공이 더 이상 불가능하게 됩니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    마지막으로
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    본 약관은 호텔런드리와 여러분과의 관계에 적용되며, 제3자의 수익권을 발생시키지 않습니다. 여러분이 본 약관을 준수하지 않은 경우에, 호텔런드리가 즉시 조치를 취하지 않더라도 호텔런드리가 가지고 있는 권리를 포기하는 것이 아니며, 본 약관 중 일부 조항의 집행이 불가능하게 되더라도 다른 조항에는 영향을 미치지 않습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    본 약관 또는 호텔런드리 서비스와 관련하여서는 대한민국의 법률이 적용됩니다.
                  </Text>
                  <Text className="text-[12px] leading-[20px] font-defaultRegular text-[#333333] mt-[12px]">
                    이 약관은 2021년 10월 1일부터 시행합니다.
                </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Privacy Policy Section */}
          <View>
            <Text className="text-[16px] leading-[20px] text-[#222] font-defaultBold mb-[8px]">
              개인정보처리방침
            </Text>
            <View className="rounded-[20px] bg-[#F5F2FF]">
              <View className="p-[16px]">
                <View>
                  <Text className="text-[15px] leading-[20px] font-defaultBold text-[#333333] mb-[12px]">
                    2. 개인정보 처리방침
                  </Text>
                  
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    주식회사 워시업코리아(이하 "회사"라 함)은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고 이와 관련한 문제를 빠르고 정확하게 처리하기 위해 다음과 같이 개인정보 처리방침을 수립합니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    개인정보처리방침을 통해 회사가 어떤 개인정보를 수집하고, 어떻게 이용하며, 누구에게 제공하고 언제 어떻게 파기하는지 등에 대해 확인할 수 있으며, 변경사항이 발생할 경우 개인정보처리방침을 통해 안내하겠습니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    1. 개인정보의 수집 항목
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    회사는 다음과 같이 이용자의 개인정보를 수집합니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    회사는 회원가입, 본인확인 및 원활한 고객상담, 각종 서비스의 제공 등을 위해 아래와 같은 최소한의 개인정보를 필수 항목으로 수집하고 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    • 휴대전화번호, 이메일
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    서비스 이용과정이나 서비스 제공 업무처리 과정에서 아래와 같은 정보들이 자동으로 생성되거나 추가로 수집될 수 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    • 단말기정보(OS, 화면사이즈, 디바이스 아이디), IP Address, 접속로그, 방문일시, 서비스 이용기록, 불량 이용기록
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    2. 개인정보의 수집·이용 목적
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 관련 법률에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 공통인증, 회원제 서비스 이용 및 상담 관리
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    • 서비스 이용을 위한 이용자 식별
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    3. 개인정보의 제 3자 제공
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    회사는 이용자의 개인정보를 [개인정보의 수집·이용 목적]에서 명시한 범위 내에서 사용하며, 이용자의 사전 동의 없이 [개인정보의 수집·이용 목적]을 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 이용자가 사전에 공개 또는 제 3자 제공에 동의한 경우
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    • 법령의 규정에 의거하거나, 수사목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    4. 개인정보의 취급위탁
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    회사는 개인정보를 위탁하지 않습니다. 다만, 원활하고 향상된 서비스 제공을 위해 필요한 때에는 개인정보의 취급을 일부 위탁할 수 있고 이 경우 위탁처리 기관 및 위탁업무의 내용을 아래와 같이 고지합니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    5. 이용자 및 법정대리인의 권리와 그 행사방법
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3 자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 아래 [개인정보의 보유 및 이용기간]에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용자의 부정확한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    • 타인의 개인정보를 도용한 회원가입의 경우 이용자 자격을 상실하거나 관련 개인정보보호 법령에 의해 처벌받을 수 있습니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    6. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    회사는 이용자의 쿠키를 수집하지 않습니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    7. 개인정보의 보유 및 이용기간
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    회사는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 이용자의 개인정보를 지체없이 파기합니다. 단, 관련법령 및 회사정책에 따라 보존할 필요가 있는 경우에는 일정 기간 동안 개인정보를 보관할 수 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    전자상거래 등에서의 소비자 보호에 관한 법률
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 계약 또는 청약철회 등에 관한 기록, 5년
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 대금결제 및 재화 등의 공급에 관한 기록, 5년
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    • 소비자의 불만 또는 분쟁처리에 관한 기록, 3년
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    회사 정책
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 회원가입남용 및 서비스 부정사용 확인, 3년
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    • 서비스 이용에 따른 채권 채무관계 잔존, 해당 채권 채무관계 정산시까지
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    8. 개인정보 파기절차 및 방법
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    회사는 개인정보 보유기관의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다. 개인정보 파기의 절차 및 방법은 다음과 같습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • <Text className="font-defaultBold">파기절차:</Text> 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보보호책임자의 승인을 받아 개인정보를 파기합니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    • <Text className="font-defaultBold">파기방법:</Text> 전자적 파일 형태로 저장된 개인정보는 다시 이용할 수 없도록 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄합니다.
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    9. 개인정보관리책임자 및 담당자의 연락처
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 고객님의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 관리책임자를 지정하고 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    이용자께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보보호와 관련된 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보관리책임자 혹은 담당부서로 문의하실 수 있습니다. 회사는 이용자의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mb-[8px]">
                    개인정보 관리책임자
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 성명 : 안용찬
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 소속 : (주)워시업코리아
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 직위 : 대표이사
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 이메일 : ayc011@naver.com
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 전화 : 1577-2657
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    • 주소 : 서울특별시 금천구 서부샛길 606 대성디폴리스 B동 1302-2호
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 개인정보침해신고센터 (http://privacy.kisa.or.kr | 국번없이 118)
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 개인정보분쟁조정위원회 (http://kopico.go.kr | 1833-6972)
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[4px]">
                    • 대검찰청 사이버수사과 (http://www.spo.go.kr/spo/index.jsp | 국번없이 1301)
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    • 경찰청 사이버안전국 (http://cyber.go.kr | 국번없이 182)
                  </Text>

                  <Text className="text-[13px] leading-[20px] font-defaultBold text-[#333333] mt-[16px] mb-[8px]">
                    10. 개인정보취급방침의 개정과 그 고지
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[8px]">
                    본 개인정보취급방침은 법령, 정부의 정책 또는 회사 내부 정책 등 필요에 의하여 변경될 수 있습니다.
                  </Text>
                  <Text className="text-[13px] leading-[20px] font-defaultRegular text-[#333333] mb-[12px]">
                    내용 추가, 삭제 및 수정이 있을 때에는 개정 최소 7일 전에 앱 또는 홈페이지의 '공지사항'을 통해 고지할 것입니다. 다만, 이용자의 소중한 권리 또는 의무에 중요한 내용이 발생하는 경우에는 최소 30일 전에 고지합니다.
                </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default UserTermPrivacyPolicy;
