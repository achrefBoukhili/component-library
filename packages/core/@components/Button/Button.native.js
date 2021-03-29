import React from 'react';
import styled from 'styled-components/native';

const CustomButton = props => (
  <ButtonContainer
    onPress={() => alert('Hi!')}
    // backgroundColor={props.backgroundColor}
  >
    <ButtonText>Hello</ButtonText>
  </ButtonContainer>
);

export default CustomButton;

const ButtonContainer = styled.TouchableOpacity`
  width: 100px;
  height: 40px
  padding: 12px;
  border-radius: 10px;
  /* background-color: ${props => props.backgroundColor}; */
`;

const ButtonText = styled.Text`
  font-size: 15px;
  /* color: ${props => props.textColor}; */
  text-align: center;
`;
