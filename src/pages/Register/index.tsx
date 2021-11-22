import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputForm } from '../../Components/Form/InputForm';
import { Button } from '../../Components/Form/Button';
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../Components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
} from './styles';

interface IFormData {
    value: string;
    description: string;
}

const schema = Yup.object().shape({
    value: Yup
        .number()
        .required('O valor é obrigatório')
        .positive('O valor não pode ser negativo')
        .typeError('Informe um valor numérico'),
    description: Yup.string(),
});
  

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'categoria',
    });

    const navigation = useNavigation();

    const { control, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const handleSelectTransactionsTypes = (type: 'up' | 'down') => {
        setTransactionType(type);
    }

    const handleOpenSelectCategoryModal = () => {
        setCategoryModalOpen(true);
    }

    const handleCloseSelectCategoryModal = () => {
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: IFormData) {
        if (category.key === 'category')
            return Alert.alert('Selecione a categoria.')
        if (!transactionType) 
            return Alert.alert('Selecione o tipo da transação.')

        try {
            await api.post('/transaction', {
                category: category.key,
                value: form.value,
                type: transactionType,
                description: form.description,
            })
            .then(() => {
                navigation.navigate('Listagem', {
                title: 'Transação salva',
                message: `Sucesso!`,
                nextScreenRoute: 'Listagem',
                });
            })
        } catch (error) {
            console.log('Não foi possível salvar os dados: ',error);
            Alert.alert('Não foi possível salvar os dados')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Registre uma nova{'\n'} movimentação</Title>
                </Header>
                <Form>
                    <Fields>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                        <InputForm
                            name='value'
                            control={control}
                            placeholder='R$'
                            keyboardType='numeric'
                            error={errors.value && errors.value.message}
                        />
                        <TransactionsTypes>
                            <TransactionTypeButton
                                type='up'
                                title='Entrada'
                                onPress={() => handleSelectTransactionsTypes('up')}
                                isActive={transactionType === 'up'}
                            />
                            <TransactionTypeButton
                                type='down'
                                title='Saída'
                                onPress={() => handleSelectTransactionsTypes('down')}
                                isActive={transactionType === 'down'}
                            />
                        </TransactionsTypes>

                        <InputForm
                            name='description'
                            control={control}
                            placeholder='Descrição'
                            multiline
                            numberOfLines={2}
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.description && errors.description.message}
                        />
                    </Fields>
                    <Button
                        title='Enviar'
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category= {category}
                        setCategory= {setCategory}
                        closeSelectCategory= {handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
};