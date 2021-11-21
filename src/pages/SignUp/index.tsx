import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { BackButton } from '../../Components/BackButton';
import { Input } from '../../Components/Input';
import { PasswordInput } from '../../Components/PasswordInput';
import { Button } from '../../Components/Button';

import {
  Container,
  Header,
  Title,
  Introduction,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

export function SignUp() {
  const [user_name, setUser_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        user_name: Yup.string().required('Nome é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
      });

      const data = { user_name, email, password };
      await schema.validate(data);

      await api
      .post('/user/', {
        user_name: data.user_name,
        email: data.email,
        password: data.password,
      })
      .then(() => {
        navigation.navigate('SignIn', {
          title: 'Conta criada!',
          message: `Agora é só fazer login\ne aproveitar`,
          nextScreenRoute: 'SignIn',
        });
      })
      .catch(() => {
        Alert.alert('Opa', 'Não foi possível cadastrar, tente novamente');
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
          </Header>

          <Introduction>Crie uma {'\n'}conta SO,FIT</Introduction>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>Seus dados:</FormTitle>

            <Input
              iconName='user'
              placeholder='Nome'
              value={user_name}
              onChangeText={setUser_name}
            />

            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
            />

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Button
            color={theme.colors.green_sheen}
            title='Cadastrar'
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}