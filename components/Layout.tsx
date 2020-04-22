import React, {FC} from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';

export const Center = styled.View`
  align-items: center;
`;

interface Units {
  unit100: number;
  unit200: number;
  unit300: number;
  unit400: number;
  unit500: number;
  unit600: number;
  unit700: number;
  unit800: number;
  unit900: number;
}

const baseUnit = 8;

const units: Units = {
  unit100: baseUnit / 2,
  unit200: baseUnit,
  unit300: baseUnit * 2,
  unit400: baseUnit * 3,
  unit500: baseUnit * 4,
  unit600: baseUnit * 5,
  unit700: baseUnit * 8,
  unit800: baseUnit * 12,
  unit900: baseUnit * 20,
} as const;

interface SpaceProps {
  spacing?: keyof Units;
}

export const Space: FC<SpaceProps> = ({spacing = 'unit100'}) => (
  <View style={{height: units[spacing]}} />
);
