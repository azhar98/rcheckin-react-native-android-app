import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userRegistration, updateState } from '../actions/user';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    ImageBackground,
    Switch,
    ScrollView,
    Alert
} from 'react-native';
import { CheckBox, Button, ListItem, Header } from 'react-native-elements';
import styles from '../StyleSheets/LoginStyle';

class SettingScreen extends Component {
    componentDidMount() {
        console.log('props', this.props.userState)
    }


    listiten(i) {
        console.log('key', i.name)
        if (i.name === 'Scan Tags to be Defined') {
            this.props.navigation.navigate("TagDefinedScreen")
        }
        if (i.name === 'Days to keep History') {
            this.props.navigation.navigate("HistoryScreen")
        }

    }

    onChangeFunction(newState) {
        console.log('toggle', newState)
        const { call911 } = this.props.userState;
        //this.setState(newState, () => Alert.alert("Changed", "==> " + this.state));
        if (call911) {
            this.props.updateState({ call911: false });
        } else {
            this.props.updateState({ call911: true });
        }

    }

    logout(){
        this.props.navigation.navigate('LoginScreen') 
    }

    render() {
        const { userDetails, responseTriggerred, successMessage, failureMessage, login, checkGps, checkQRCode, checkNfc, accountButton, mainButton, call911 } = this.props.userState;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/setting.png')} style={styles.backgroundImage}>
                    <ScrollView>
                        {/* <View style={{ padding: 10, justifyContent: 'center', alignItems: 'stretch', marginTop: 50,}}>
                            <View style={{ padding: 20, }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>ACCOUNT</Text>
                                </View>
                            </View>
                            {
                                accountButton.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        title={item.name}
                                        bottomDivider
                                        chevron={{ color: 'gray',size:25 }}
                                        onPress={() => { this.listiten(item) }}

                                    />
                                ))
                            }
                            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 15, justifyContent: 'space-between' }}>
                                <View>
                                    <Text>Notification</Text>
                                </View>
                                <View>
                                    <Switch
                                        //onValueChange={props.toggleSwitch1}
                                        value={true} />
                                </View>
                            </View>
                        </View> */}

                        <Header
                            leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer() }}
                            centerComponent={{ text: 'Setting', style: { color: '#fff' } }}
                            rightComponent={{ icon: 'logout', color: '#fff',onPress: () => this.logout()}}
                        />
                        <View style={{ padding: 10, justifyContent: 'center', alignItems: 'stretch', }}>
                            <View style={{ padding: 20, }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>MAIN</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 15, justifyContent: 'space-between', marginBottom: 2 }}>
                                <View>
                                    <Text>Enable "Call 911" Button</Text>
                                </View>
                                <View>
                                    <Switch
                                        onValueChange={(value) => this.onChangeFunction({ taskCreated: value })}
                                        value={call911} />
                                </View>
                            </View>
                            {
                                mainButton.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        title={item.name}
                                        bottomDivider
                                        chevron={{ color: 'gray', size: 25 }}
                                        onPress={() => { this.listiten(item) }}

                                    />
                                ))
                            }

                        </View>
                        <View style={{ height: 100 }}>

                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}


SettingScreen.propTypes = {
    userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
    userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ userLogin, userRegistration, updateState }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);