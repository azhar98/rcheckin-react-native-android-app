import React from 'react';
import { View, StyleSheet, Image, Button,Linking, } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';
import store from '../store/index';


export function DrawerContent(props) {

    let content;
    if (store.getState().userState.call911) {
        content =
            <Button
                title="Call-911"
                color="red"
                onPress={() => {
                    let phoneNumber = '';
                    let number ='911'
                    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
                    else { phoneNumber = `telprompt:${number}`; }
                    Linking.openURL(phoneNumber);
                }}
            />
    }



    return (
        <View style={{ flex: 1, }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', margin:15 }}>
                            <Image
                                style={{ width: 50, height: 50, borderRadius: 50, }}
                                source={require('../assets/user.png')}
                            />

                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{store.getState().userState.userDetails.firstName}</Title>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="ios-home"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="ios-checkmark-circle-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="CheckIn/Out"
                            onPress={() => { props.navigation.navigate('CheckInOutScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="ios-navigate"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Site Visit"
                            onPress={() => { props.navigation.navigate('SiteVisitScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="ios-people"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Patrol"
                            onPress={() => { props.navigation.navigate('PatrollScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="ios-people"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Incident"
                            onPress={() => { props.navigation.navigate('IncidentScreen') }}
                        />
                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="ios-log-out"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { store.getState().userState.userDetails.length=0;
                        store.getState().userState.userDetails.length=0;
                    store.getState().userState.apiUrl.tenancyName="";
                    props.navigation.navigate('LoginScreen') }}
                />
            </Drawer.Section>
            {content}
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{textDecorationLine:'underline',fontStyle:'italic'}}>Current version 0.0.1</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        //paddingLeft: 20,
        backgroundColor:'#2898fe',
        marginLeft:5,
        marginRight:5
    },
    title: {
        fontSize: 20,
        marginTop: 3,
        fontWeight: 'bold',
        color:'white',
        paddingTop:4
        //textAlign:'center',
        //justifyContent:'center'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});