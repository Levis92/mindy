import React, {FC} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {Center, Space} from './Layout';

const CircleButtonBackground = styled.TouchableOpacity`
  background-color: white;
  height: 152px;
  width: 152px;
  border-radius: 76px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: black;
  font-size: 40px;
`;

interface CircleButtonProps {
  text: string;
  onPress(): void;
}

export const CircleButton: FC<CircleButtonProps> = ({text, onPress}) => (
  <CircleButtonBackground onPress={onPress}>
    <ButtonText>{text.toLocaleUpperCase()}</ButtonText>
  </CircleButtonBackground>
);

const LabelText = styled.Text`
  color: white;
  font-size: 20px;
`;

interface LabeledIconButtonProps {
  icon: IconDefinition;
  label: string;
  onPress(): void;
}

export const LabeledIconButton: FC<LabeledIconButtonProps> = ({
  icon,
  label,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Center>
      <FontAwesomeIcon icon={icon} color="white" size={32} />
      <Space />
      <LabelText>{label}</LabelText>
    </Center>
  </TouchableOpacity>
);
