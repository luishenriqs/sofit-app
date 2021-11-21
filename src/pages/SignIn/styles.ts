import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: 100%;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.silver};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 10}px;
`;

export const TitleContent = styled.View`
  flex-direction: row;
`;

export const TitleWhite = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const TitleGreen = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.green_yellow};
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Introduction = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.green_sheen};
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
  line-height: ${RFValue(20)}px;
  margin-top: 5px;
`;

export const Form = styled.View`
  width: 100%;
  margin: 25px 0;
`;

export const Footer = styled.View``;