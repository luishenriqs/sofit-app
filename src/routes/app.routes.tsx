import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../pages/Dashboard';
import { Register } from '../pages/Register';
import { Resume } from '../pages/Resume';

const { Navigator, Screen } = createBottomTabNavigator();
export function AppRoutes () {
    const theme = useTheme();
    return (
        <Navigator>
            <Screen
                name='Listagem' 
                component={Dashboard} 
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.secondary,
                    tabBarInactiveTintColor: theme.colors.title,
                    tabBarLabelPosition: 'beside-icon',
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name='Cadastrar' 
                component={Register} 
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.secondary,
                    tabBarInactiveTintColor: theme.colors.title,
                    tabBarLabelPosition: 'beside-icon',
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name='Resumo' 
                component={Resume} 
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.secondary,
                    tabBarInactiveTintColor: theme.colors.title,
                    tabBarLabelPosition: 'beside-icon',
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </Navigator>
    );
}