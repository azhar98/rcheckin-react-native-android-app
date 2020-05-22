import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import CheckInOutScreen from './CheckInOutScreen';
import SiteVisitScreen from './SiteVisitScreen';
import PatrollScreen from './PatrollScreen';
import IncidentScreen from './IncidentScreen';
import SettingScreen from './SettingScreen';

const HomeStack = createStackNavigator();
const CheckInOut = createStackNavigator();
const SiteVisit = createStackNavigator();
const Patroll = createStackNavigator();
const Incident = createStackNavigator();
const Setting = createStackNavigator();

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
        name="Patrol"
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
          tabBarColor: '#FF5733',
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

const CheckInOutStackScreen = ({navigation}) => (
  <CheckInOut.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#557afef7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <CheckInOut.Screen name="CheckInOut" component={CheckInOutScreen} options={{
          title:'Check In/Out',
          headerTitleAlign:'center',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#557afef7" onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
          headerRight: () => (
              <Icon.Button name="ios-settings" size={25} backgroundColor="#557afef7" onPress={() => navigation.navigate('SettingScreen')}></Icon.Button>
          )
          }} />
  </CheckInOut.Navigator>
  );


const SiteVisitStackScreen = ({navigation}) => (
  <SiteVisit.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#557afef7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <SiteVisit.Screen name="SiteVisit" component={SiteVisitScreen} options={{
          title:'Site Visit',
          headerTitleAlign:'center',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#557afef7" onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
          headerRight: () => (
              <Icon.Button name="ios-settings" size={25} backgroundColor="#557afef7" onPress={() => navigation.navigate('SettingScreen')}></Icon.Button>
          )
          }} />
  </SiteVisit.Navigator>
  );

  const PatrollStackScreen = ({navigation}) => (
    <Patroll.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#557afef7',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <Patroll.Screen name="Patroll" component={PatrollScreen} options={{
            title:'Patroll',
            headerTitleAlign:'center',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#557afef7" onPress={() => navigation.openDrawer()}></Icon.Button>
            ),
            headerRight: () => (
                <Icon.Button name="ios-settings" size={25} backgroundColor="#557afef7" onPress={() => navigation.navigate('SettingScreen')}></Icon.Button>
            )
            }} />
    </Patroll.Navigator>
    );

    const IncidentStackScreen = ({navigation}) => (
      <Incident.Navigator screenOptions={{
              headerStyle: {
              backgroundColor: '#557afef7',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold'
              }
          }}>
              <Incident.Screen name="Incident" component={IncidentScreen} options={{
              title:'Incident',
              headerTitleAlign:'center',
              headerLeft: () => (
                  <Icon.Button name="ios-menu" size={25} backgroundColor="#557afef7" onPress={() => navigation.openDrawer()}></Icon.Button>
              ),
              headerRight: () => (
                  <Icon.Button name="ios-settings" size={25} backgroundColor="#557afef7" onPress={() => navigation.navigate('SettingScreen')}></Icon.Button>
              )
              }} />
      </Incident.Navigator>
      );

      const SettingStackScreen = ({navigation}) => (
        <Setting.Navigator screenOptions={{
                headerStyle: {
                backgroundColor: '#557afef7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold'
                }
            }}>
                <Setting.Screen name="Setting" component={SettingScreen} options={{
                title:'Setting',
                headerTitleAlign:'center',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#557afef7" onPress={() => navigation.openDrawer()}></Icon.Button>
                ),
                headerRight: () => (
                    <Icon.Button name="ios-settings" size={25} backgroundColor="#557afef7" onPress={() => navigation.navigate('SettingScreen')}></Icon.Button>
                )
                }} />
        </Setting.Navigator>
        );