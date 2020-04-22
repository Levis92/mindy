import React, {useState} from 'react';
import styled from 'styled-components/native';
import {faUndoAlt} from '@fortawesome/free-solid-svg-icons';
import {CircleButton, LabeledIconButton} from '../components/Buttons';
import {Center, Space} from '../components/Layout';
import {Heading} from '../components/Text';
import {useTimer} from '../hooks/timer';
import {EditTimer} from '../components/EditTimer';

const Digits = styled.Text`
  font-size: 120px;
  color: white;
`;

const ViewContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

function formatTimer(hours: number, minutes: number, seconds: number): string {
  const mm = hours > 0 && minutes < 10 ? `0${minutes}` : minutes;
  const ss = seconds < 10 ? `0${seconds}` : seconds;
  return `${hours > 0 ? `${hours}:` : ''}${mm}:${ss}`;
}

export const TimerView = () => {
  const [
    {running, totalTime, secondsLeft, hours, minutes, seconds},
    {setTimer, toggleTimer, resetTimer},
  ] = useTimer(1800);
  const [editTime, setEditTime] = useState(false);

  return (
    <ViewContainer>
      <Center>
        <Heading type="small">Background sound</Heading>
        <Heading type="big">Pouring rain</Heading>
        <Space spacing="unit600" />
        <Digits onPress={() => !running && setEditTime(true)}>
          {formatTimer(hours, minutes, seconds)}
        </Digits>
        <Space spacing="unit600" />
        {secondsLeft !== 0 && (
          <CircleButton
            text={running ? 'Pause' : 'Start'}
            onPress={toggleTimer}
          />
        )}
        <Space spacing="unit600" />
        <LabeledIconButton
          icon={faUndoAlt}
          label="Reset"
          onPress={resetTimer}
        />
      </Center>
      {editTime && (
        <EditTimer
          timerValue={totalTime}
          setTimerValue={setTimer}
          close={() => setEditTime(false)}
        />
      )}
    </ViewContainer>
  );
};
