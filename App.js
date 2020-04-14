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
import IncidentScreen from './screens/IncidentScreen'

const Drawer = createDrawerNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>        
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="LoginScreen" component={LoginScreen} />
        <Drawer.Screen name="CheckInOutScreen" component={CheckInOutScreen} />
        <Drawer.Screen name="SiteVisitScreen" component={SiteVisitScreen} />
        <Drawer.Screen name="PatrollScreen" component={PatrollScreen} />
        <Drawer.Screen name="IncidentScreen" component={IncidentScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
