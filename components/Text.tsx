import styled from 'styled-components/native';

type HeadingType = 'big' | 'middle' | 'small';

interface HeadingProps {
  type: HeadingType;
}

const fontSizes: Record<HeadingType, number> = {
  big: 42,
  middle: 28,
  small: 18,
};

export const Heading = styled.Text`
  color: white;
  font-size: ${(props: HeadingProps) => fontSizes[props.type]}px;
`;
