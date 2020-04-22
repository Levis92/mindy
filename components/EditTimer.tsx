import React, {useState, FC} from 'react';
import styled from 'styled-components/native';
import {Picker} from '@react-native-community/picker';
import {CircleButton} from '../components/Buttons';
import {Center, Space} from '../components/Layout';
import {Heading} from '../components/Text';
import {PickerContainer, LabeledPicker} from './LabeledPicker';

const OverlayContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: black;
`;

interface EditTimerProps {
  timerValue: number;
  setTimerValue(seconds: number): void;
  close(): void;
}

interface TimerPickerProps {
  seconds: number;
  onValueChange(seconds: number): void;
}

const TimerPicker: FC<TimerPickerProps> = ({seconds, onValueChange}) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = (seconds % 3600) / 60;

  return (
    <PickerContainer>
      <LabeledPicker
        label="hours"
        selectedValue={hours}
        onValueChange={(itemValue) =>
          onValueChange(minutes * 60 + itemValue * 3600)
        }>
        {[...Array(23).keys()].map((h) => (
          <Picker.Item key={h} label={String(h)} value={h} />
        ))}
      </LabeledPicker>
      <LabeledPicker
        label="minutes"
        selectedValue={minutes}
        onValueChange={(itemValue) =>
          onValueChange(hours * 3600 + itemValue * 60)
        }>
        {[...Array(59).keys()].map((m) => (
          <Picker.Item key={m} label={String(m)} value={m} />
        ))}
      </LabeledPicker>
    </PickerContainer>
  );
};

export const EditTimer: FC<EditTimerProps> = ({
  timerValue,
  setTimerValue,
  close,
}) => {
  const [time, setTime] = useState(timerValue);
  const updateTimer = () => {
    setTimerValue(time);
    close();
  };
  return (
    <OverlayContainer>
      <Center>
        <Heading type="big">Timer</Heading>
        <Space spacing="unit300" />
        <TimerPicker
          seconds={time}
          onValueChange={(itemValue: number) => setTime(itemValue)}
        />
        <Space spacing="unit800" />
        <CircleButton text="Done" onPress={updateTimer} />
      </Center>
    </OverlayContainer>
  );
};
