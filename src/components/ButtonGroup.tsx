import { StyleSheet, View, Pressable, Text } from 'react-native';
import ChooseBooking from './mypage/modal/ChooseBooking';
import { useState } from 'react';
import { Dimensions } from 'react-native';

type Props = {
  labels: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  disabled?: boolean;
};

export default function ButtonGroup({ labels, selectedIndex, onSelect, disabled }: Props) {
  const [openChoose, setOpenChoose] = useState<boolean>(false);
  const { width } = Dimensions.get('window');

  const handleOpenChoose = () => {
    setOpenChoose(true);
  };

  return (
    <View style={styles.buttonContainer}>
      {labels.map((label, index) => (
        <Pressable
          key={index}
          style={[
            styles.button,
            // index === selectedIndex && styles.activeButton,
            index === 0 && styles.leftButton,
            index === labels.length - 1 && styles.rightButton,
            index === labels.length - 1 && disabled && styles.disabled,
          ]}
          onPress={() => index === 1 ? handleOpenChoose() : onSelect(index)}
        >
          <Text
            style={[
              styles.buttonLabel,
              // index === selectedIndex && styles.activeLabel,
              index === labels.length - 1 && disabled && styles.textDisabled,
              { fontSize: width < 375 ? 12 : 14 }
            ]}
          >
            {label}
          </Text>
        </Pressable>
      ))}
      <ChooseBooking
        visible={openChoose}
        handleCloseModal={() => setOpenChoose(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 48,
    flexDirection: 'row',
    borderRadius: 50,
    overflow: 'hidden',
    gap: 6,
  },
  button: {
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2F265D',
  },
  disabled: {
    backgroundColor: '#f2f2f2',
    borderColor: '#f2f2f2',
    pointerEvents: 'none'
  },
  textDisabled: {
    color: '#b8b8b8',
  },
  activeButton: {
    backgroundColor: '#2F265D',
  },
  buttonLabel: {
    fontSize: 14,
    color: '#2F265D',
    fontWeight: '700',
  },
  activeLabel: {
    color: '#fff',
  },
  leftButton: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    flex: 1
  },
  rightButton: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    flex: 1
  },
});