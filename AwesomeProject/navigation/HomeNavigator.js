import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductsScreen from '../screens/ProductsScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const headerOptions = {
    headerShown: false
}

function ProductNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Products" 
            component={ProductsScreen} 
            options={{ headerShown: false }} />

            <Stack.Screen name="Information" 
            component={ProductInfoScreen} 
            options={{
                headerStyle: {
                    backgroundColor: '#ACE145',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },}}
            initialParams={{ product: undefined }} />

            <Stack.Screen name="Order" 
            component={OrderScreen}  
            options={{
                headerStyle: {
                    backgroundColor: '#ACE145',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },}}
            initialParams={{ product: undefined }} />
        </Stack.Navigator>
    )
}

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Fresh Fruit"
                component={ProductNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarActiveTintColor: 'orange',
                    headerStyle: {
                        backgroundColor: 'orange',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                      },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Transactions"
                component={TransactionsScreen}
                options={{
                    tabBarLabel: 'Transactions',
                    tabBarActiveTintColor: 'orange',
                    headerStyle: {
                        backgroundColor: 'orange',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                      },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="credit-card-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarActiveTintColor: 'orange',
                    headerStyle: {
                        backgroundColor: 'orange',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                      },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}



