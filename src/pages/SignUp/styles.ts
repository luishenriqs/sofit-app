import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.silver};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 15}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  margin-top: 35px;
  margin-bottom: 16px;
`;

export const Introduction = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.green_sheen};
  margin-top: 35px;
  margin-bottom: 16px;
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
  margin-top: 60px;
  margin-bottom: 8px;
`;

export const FormTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
  margin-bottom: 16px;
`;