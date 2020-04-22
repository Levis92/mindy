import React, {FC} from 'react';
import styled from 'styled-components/native';

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
