import React from 'react';
import styled from 'styled-components/native';

const StyledView = styled.View`
  background-color: papayawhip;
`;

const StyledText = styled.Text`
  color: palevioletred;
`;

const StyledTextComponent = () => (
  <StyledView>
    <StyledText>Hello World!</StyledText>
  </StyledView>
);

export default StyledTextComponent;
