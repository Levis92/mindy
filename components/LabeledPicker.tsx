import React, {FC} from 'react';
import styled from 'styled-components/native';
import {Picker} from '@react-native-community/picker';
import {StyleSheet} from 'react-native';

export const PickerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
`;

const PickerLabel = styled.Text`
  color: white;
  font-size: 20px;
`;

interface LabeledPickerProps {
  label: string;
  selectedValue: any;
  onValueChange(itemValue: any): void;
  children: React.ReactNode;
}

export const LabeledPicker: FC<LabeledPickerProps> = ({
  label,
  selectedValue,
  onValueChange,
  children,
}) => (
  <PickerContainer>
    <Picker
      selectedValue={selectedValue}
      style={styles.pickerStyle}
      itemStyle={styles.itemStyle}
      onValueChange={onValueChange}>
      {children}
    </Picker>
    <PickerLabel>{label}</PickerLabel>
  </PickerContainer>
);

const styles = StyleSheet.create({
  pickerStyle: {
    height: 216,
    width: 60,
  },
  itemStyle: {
    color: 'white',
  },
});
