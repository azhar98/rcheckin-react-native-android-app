import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userRegistration, updateState, userBeginVisit, userEndVisit } from '../actions/user';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    ScrollView,
    Alert,
    BackHandler
} from 'react-native';
import { CheckBox, Button, ListItem,Header } from 'react-native-elements';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
navigator.geolocation = require('@react-native-community/geolocation');


class SiteVisitScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            siteVisitGps: false,
            siteVisitQRCode: false,
            siteVisitNfc: false,
            isModalVisible: false,
            hasCameraPermission: null,
            scanned: false,
            tagType: null,
            data: null,
        };
        this.handleBackButton = this.handleBackButton.bind(this);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        console.log('props', this.props.userState)
        if (this.props.userState.coords.latitude !== null) {
            this.setState({ siteVisitGps: true })
        }
        else {
            this.getLocation();
        }

        NfcManager.start();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        this._cleanUp();
    }

    handleBackButton() {
        if (this.props.route.name=="SiteVisitScreen") {
            this.props.navigation.navigate("HomeDrawer")
        }
        return true;
    }

    _cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log('post', position)
                const location = [{
                    "date": new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
                    "time": new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
                    "subtitle": "(GPS)"
                }]
                this.setState({ checkGps: true })
                this.props.updateState({ coords: position.coords, history: location });

            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    check(title) {
        console.log('sdas', title)
        if (title == 'GPS') {
            if (this.state.siteVisitGps) {
                this.setState({ siteVisitGps: false })
            } else {
                this.setState({ siteVisitGps: true })
            }

        } else if (title == 'QRCode') {
            if (this.state.siteVisitQRCode) {
                this.setState({ siteVisitQRCode: false })
            } else {
                this.setState({ siteVisitQRCode: true, tagType: 3, siteVisitNfc: false })
                this.setState({ isModalVisible: !this.state.isModalVisible });
            }

        } else if (title == 'NFC') {
            if (this.state.siteVisitNfc) {
                this.setState({ siteVisitNfc: false })
            } else {
                this.readData();
            }

        }
    }

    button(name) {
        console.log('hi')
        //
        if (name == "Begin Visit") {
            Alert.alert(
                "Begin Visit",
                "Press yes to begin visit",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => this.props.userBeginVisit(this.state) }
                ],
                { cancelable: false }
              );

            
        }
        if (name == "End Visit") {
            Alert.alert(
                "End Visit",
                "Press yes to end visit",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => this.props.userEndVisit(this.state) }
                ],
                { cancelable: false }
              );
            
        }
    }

    readData = async () => {
        try {
            let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
            let resp = await NfcManager.requestTechnology(tech, {
                alertMessage: 'Ready to do some custom Mifare cmd!'
            });

            let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;

            resp = await cmd([0x3A, 4, 4]);
            let payloadLength = parseInt(resp.toString().split(",")[1]);
            let payloadPages = Math.ceil(payloadLength / 4);
            let startPage = 5;
            let endPage = startPage + payloadPages - 1;

            resp = await cmd([0x3A, startPage, endPage]);
            bytes = resp.toString().split(",");
            let text = "";

            for(let i=0; i<bytes.length; i++){
                if (i < 5){
                    continue;
                }

                if (parseInt(bytes[i]) === 254){
                    break;
                }

                text = text + String.fromCharCode(parseInt(bytes[i]));

            }
            alert(text)
            this.setState({
                data: text,
                siteVisitNfc: true, 
                tagType: 2, 
                siteVisitQRCode: false
            })

            this._cleanUp();
        } catch (ex) {
            ex.toString()
            this.setState({
                data: ex.toString()
            })
            this._cleanUp();
        }
    }


    render() {
        const { userDetails, responseTriggerred, successMessage, failureMessage, login, siteVisitGps, siteVisitQRCode, siteVisitNfc, visitlist, calendericon, clockicon,userVisit } = this.props.userState;
        console.log('Site Visit', successMessage)

        return (
            <View style={styles.container}>
            <Header
            leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer()}}
            centerComponent={{ text: 'Site Visit', style: { color: '#fff' } }}
            rightComponent={{ icon: 'settings', color: '#fff',onPress: () => this.props.navigation.navigate('SettingScreen')}}
        />
                <View style={{ height: 50, backgroundColor: '#f4f0f0d6', justifyContent: 'center', paddingLeft: 10, }}>
                    <Text style={{ fontWeight: 'bold' }}>Track With</Text>
                </View>
                <View>
                    <CheckBox
                        title='GPS'
                        checked={this.state.siteVisitGps}
                        onPress={(title) => this.check('GPS')}
                    />
                </View>
                <View>
                    <CheckBox
                        title='QRCode'
                        checked={this.state.siteVisitQRCode}
                        onPress={(title) => this.check('QRCode')}
                    />
                </View>
                <View>
                    <CheckBox
                        title='NFC'
                        checked={this.state.siteVisitNfc}
                        onPress={(title) => this.check('NFC')}
                    />
                </View>
                <View style={{ padding: 10, flax: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <View>
                        <Button
                            title="Begin Visit"
                            disabled={userVisit.startVisit}
                            onPress={() => this.button('Begin Visit')}
                        />
                    </View>
                    <View style={{ width: 10 }}>
                    </View>
                    <View>
                        <Button
                            title="End Visit"
                            disabled={userVisit.endVisit}
                            onPress={() => this.button('End Visit')}
                        />
                    </View>
                </View>
                <ScrollView>
                    <View style={{ padding: 10, justifyContent: 'center', alignItems: 'stretch', backgroundColor: '#f4f0f0d6' }}>
                        {
                            visitlist.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.date}
                                    leftIcon={{ name: calendericon }}
                                    rightIcon={{ name: clockicon }}
                                    rightTitle={item.time}
                                    rightSubtitle='(Visit)'
                                    bottomDivider
                                />
                            ))
                        }
                    </View>
                </ScrollView>
                <Modal isVisible={this.state.isModalVisible}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{
                            flex: 1,
                            width: '100%',
                        }}
                        onGoogleVisionBarcodesDetected={this.barcodeRecognized}
                    >
                    </RNCamera>
                    <Button
                        title="Close"
                        onPress={() => {
                            if (this.state.data == null) {
                                this.setState({ siteVisitQRCode: false })
                            }
                            this.setState({ isModalVisible: false })
                        }}
                    />
                </Modal>
            </View>
        );
    }
    barcodeRecognized = ({ barcodes }) => {
        // barcodes.forEach(barcode => {
            this.setState({ scanned: true, isModalVisible: !this.state.isModalVisible, data: barcodes[0].data })
            alert(`Bar code data ${barcodes[0].data} has been scanned!`);
        //})

    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

SiteVisitScreen.propTypes = {
    userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
    userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ userLogin, userRegistration, updateState, userBeginVisit, userEndVisit }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteVisitScreen);