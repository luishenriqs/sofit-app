import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../Components/Button';
import { Input } from '../../Components/Input';
import { PasswordInput } from '../../Components/PasswordInput';

import {
  Container, 
  Header,
  TitleContent,
  TitleWhite,
  TitleGreen, 
  Introduction, 
  SubTitle, Form, 
  Footer 
} from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();
  const navigation = useNavigation();
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUp');
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Header>
            <TitleContent>
              <TitleWhite>So</TitleWhite>
              <TitleGreen>,</TitleGreen>
              <TitleWhite>f</TitleWhite>
              <TitleGreen>i</TitleGreen>
              <TitleWhite>t</TitleWhite>
            </TitleContent>
            <Introduction>
              SISTEMA COMPLETO PARA{'\n'}GESTÃO DE FROTAS! 
            </Introduction>
            <SubTitle>
              Gerencie custos com abastecimento,{'\n'}
              pneus, manutenções, infrações e muito mais.{'\n'} 
              Centralize a sua gestão integrando todos os seus 
              fornecedores em um único sistema!{'\n'} 
              Saia das planilhas e assuma o controle da sua operação!
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title='Login'
              enabled={true}
              loading={false}
              onPress={handleSignIn}
            />

            <Button
              title='Criar conta gratuita'
              color={theme.colors.shape}
              enabled={true}
              loading={false}
              light
              onPress={handleNewAccount}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}