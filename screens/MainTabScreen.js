import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import CheckInOutScreen from './CheckInOutScreen';
import SiteVisitScreen from './SiteVisitScreen';
import PatrollScreen from './PatrollScreen';
import IncidentScreen from './IncidentScreen'

const HomeStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#557afef7',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CheckIn/Out"
        component={CheckInOutScreen}
        options={{
          tabBarLabel: 'CheckIn/Out',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-checkmark-circle-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SiteVisit"
        component={SiteVisitScreen}
        options={{
          tabBarLabel: 'SiteVisit',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-navigate" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Patroll"
        component={PatrollScreen}
        options={{
          tabBarLabel: 'Patroll',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-people" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Incident"
        component={IncidentScreen}
        options={{
          tabBarLabel: 'Incident',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-warning" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#557afef7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Home',
        headerTitleAlign:'center',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#557afef7" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        headerRight: () => (
            <Icon.Button name="ios-settings" size={25} backgroundColor="#557afef7" onPress={() => navigation.navigate('SettingScreen')}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);

