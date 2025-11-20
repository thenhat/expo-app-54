
import { Text, View, StyleSheet, Pressable } from "react-native";
import ListMachine from "./ListMachine";
import { useLocalSearchParams, useRouter } from "expo-router";

interface Props {
  dataMachine?: any;
  machineActive?: any;
  setMachineActive?: any;
  useTime?: any;
  useDate?: any;
}

export default function ChooseMachineScreen({ dataMachine, machineActive, setMachineActive, useTime, useDate }: Props) {
  const { type }: any = useLocalSearchParams<{ user: string }>();
  const isDryCleaning = type === 'DRYCLEANING' || type === 'DRY_BOOKING';
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View className="flex-row items-center justify-between">
        <Text style={styles.titleText}>장비선택</Text>
        <View className="flex-row items-center">
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/mypage/laundry-tips",
              })
            }
          >
            <View className="bg-[#2F265D] rounded-[8px] px-[10px] py-[6px] mr-[12px]">
              <Text className="text-[#FFFFFF] whitespace-nowrap text-[13px] font-montserrat500">세탁TIP</Text>
            </View>
          </Pressable>

          {!isDryCleaning &&
            <View className="flex-row items-center gap-[12px] pb-[10px]">
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/usage/detail/[id]",
                    params: { id: 'washing' },
                  })
                }
              >
                <Text className="text-[#888888] underline text-[15px] font-montserrat500">세탁기 사용법</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/usage/detail/[id]",
                    params: { id: 'dryer' },
                  })
                }
              >
                <Text className="text-[#888888] underline text-[15px] font-montserrat500">건조기 사용법</Text>
              </Pressable>
            </View>
          }

          {isDryCleaning &&
            <View className="flex-row items-center gap-[12px] pb-[10px]">
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/usage/detail/[id]",
                    params: { id: 'washing-drycleaning' },
                  })
                }
              >
                <Text className="text-[#888888] underline text-[15px] font-montserrat500">드라이 세탁</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/usage/detail/[id]",
                    params: { id: 'dryer-drycleaning' },
                  })
                }
              >
                <Text className="text-[#888888] underline text-[15px] font-montserrat500">드라이 건조</Text>
              </Pressable>
            </View>
          }
        </View>

      </View>

      <ListMachine dataMachine={dataMachine} machineActive={machineActive} setMachineActive={setMachineActive} useTime={useTime} useDate={useDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 40,
    marginTop: 8,
    flex: 1,
    minHeight: 500
  },
  info: {
    backgroundColor: "#2F265D",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoText: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  titleText: {
    color: "#222222",
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 24.7,
  },
  desText: {
    color: "#FFFFFF",
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19.5,
    marginTop: 4,
  },
  listMachine: {
    marginTop: 20,
    gap: 8,
    maxHeight: 348,
    paddingRight: 2,
    marginRight: -2
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  itemMachine: {
    flexDirection: "row",
    color: "#888888",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#0000001A",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 8
  },
  itemMachineActive: {
    borderColor: "#2F265D",
    color: "#2F265D",
  },
  machineText: {
    fontWeight: '500',
    color: "#222222",
    fontSize: 14,
  },
  priceText: {
    color: "#06C164",
    fontWeight: '700',
    fontSize: 18,
  },

});
