/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import LoginScreen from './screens/LoginScreen';
import CheckInOutScreen from './screens/CheckInOutScreen';
import SiteVisitScreen from './screens/SiteVisitScreen';
import PatrollScreen from './screens/PatrollScreen';
import IncidentScreen from './screens/IncidentScreen';
import SettingScreen from './screens/SettingScreen';
import History from './screens/History';
import SplashScreen from './screens/SplashScreen';
import TagDefined from './screens/TagDefined';
import store from './store/index';
import { Provider } from 'react-redux';

const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}> 
        <Drawer.Screen name="Splashcreen" component={SplashScreen} />
        <Drawer.Screen name="LoginScreen" component={LoginScreen} />       
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="CheckInOutScreen" component={CheckInOutScreen} />
        <Drawer.Screen name="SiteVisitScreen" component={SiteVisitScreen} />
        <Drawer.Screen name="PatrollScreen" component={PatrollScreen} />
        <Drawer.Screen name="IncidentScreen" component={IncidentScreen} />
        <Drawer.Screen name="SettingScreen" component={SettingScreen} />
        <Drawer.Screen name="HistoryScreen" component={History} />
        <Drawer.Screen name="TagDefinedScreen" component={TagDefined} />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
