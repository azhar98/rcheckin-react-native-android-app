import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userRegistration, updateState, userCheckIn, userCheckOut } from '../actions/user';

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
import { CheckBox, Button, ListItem, Header } from 'react-native-elements';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
navigator.geolocation = require('@react-native-community/geolocation');





class CheckInOutScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkGps: false,
            checkQRCode: false,
            checkNfc: false,
            location: null,
            ready: false,
            where: { lat: null, lng: null },
            error: null,
            isModalVisible: false,
            hasCameraPermission: null,
            scanned: false,
            tagType: null,
            data: null,
            status:'(check)'
        };
        this.handleBackButton = this.handleBackButton.bind(this);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        console.log('props', this.props.userState)

        if (this.props.userState.coords.latitude !== null) {
            this.setState({ checkGps: true })
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
        if (this.props.route.name=="CheckInOutScreen") {
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
        const { checkGps, checkQRCode, checkNfc, userDetails } = this.props.userState;
        console.log('sdas', this.props.userState)
        if (title == 'GPS') {
            if (this.state.checkGps) {
                this.setState({ checkGps: false })
            } else {
                this.setState({ checkGps: true })
                //this.props.updateState({ checkGps:true});
            }

        } else if (title == 'QRCode') {
            if (this.state.checkQRCode) {
                this.setState({ checkQRCode: false })
            } else {
                this.setState({ checkQRCode: true, tagType: 3 })
                this.setState({ isModalVisible: !this.state.isModalVisible });
            }

        } else if (title == 'NFC') {
            if (this.state.checkNfc) {
                this.setState({ checkNfc: false, });
            } else {
                this.readData();
            }

        }
    }

    button(name) {
        if (name == "Check In") {
            Alert.alert(
                "Check In",
                "Press yes to check in",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => this.props.userCheckIn(this.state) }
                ],
                { cancelable: false }
              );
        }
        if (name == "Check Out") {
            Alert.alert(
                "Check Out",
                "Press yes to check out",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => this.props.userCheckOut(this.state) }
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

            for (let i = 0; i < bytes.length; i++) {
                if (i < 5) {
                    continue;
                }

                if (parseInt(bytes[i]) === 254) {
                    break;
                }

                text = text + String.fromCharCode(parseInt(bytes[i]));

            }
            alert(text)
            this.setState({
                data: text,
                checkNfc: true,
                tagType: 2
            })

            this._cleanUp();
        } catch (ex) {
            alert(ex.toString())
            this.setState({
                data: ex.toString()
            })
            this._cleanUp();
        }
    }

    render() {
        const { userDetails, responseTriggerred, successMessage, failureMessage, login, checkGps, checkQRCode, checkNfc, list, calendericon, clockicon,userCheckIn } = this.props.userState;
        console.log('succcccccc', successMessage);
        console.log('this.props.userState', this.props.userState)

        return (

            <View style={styles.container}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
                    centerComponent={{ text: 'Check In/Out', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'settings', color: '#fff', onPress: () => this.props.navigation.navigate('SettingScreen') }}
                />

                <View style={{ height: 50, backgroundColor: '#f4f0f0d6', justifyContent: 'center', paddingLeft: 10, }}>
                    <Text style={{ fontWeight: 'bold' }}>Track With</Text>
                </View>
                <View>
                    <CheckBox
                        title='GPS'
                        checked={this.state.checkGps}
                        onPress={(title) => this.check('GPS')}
                    />
                </View>
                <View>
                    <CheckBox
                        title='QRCode'
                        checked={this.state.checkQRCode}
                        onPress={(title) => this.check('QRCode')}
                    />
                </View>
                <View>
                    <CheckBox
                        title='NFC'
                        checked={this.state.checkNfc}
                        onPress={(title) => this.check('NFC')}
                    />
                </View>
                <View style={{ padding: 10, flax: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <View>
                        <Button
                            title="Check In"
                            disabled={userCheckIn.checkIn}
                            onPress={() => this.button('Check In')}
                        />
                    </View>
                    <View style={{ width: 10 }}>
                    </View>
                    <View>
                        <Button
                            title="Check Out"
                            disabled={userCheckIn.checkOut}
                            onPress={() => this.button('Check Out')}
                        />
                    </View>
                </View>
                <ScrollView>
                    <View style={{ padding: 10, justifyContent: 'center', alignItems: 'stretch', backgroundColor: '#f4f0f0d6' }}>
                        {
                            list.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.date}
                                    leftIcon={{ name: calendericon }}
                                    rightIcon={{ name: clockicon }}
                                    rightTitle={item.time}
                                    rightSubtitle={this.state.status}
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
                                this.setState({ checkQRCode: false })
                            }
                            this.setState({ isModalVisible: false })
                        }}
                    />
                </Modal>
            </View>
        );
    }
    barcodeRecognized = ({ barcodes }) => {
        console.log('barcode',barcodes)
        //barcodes.forEach(barcode => {
            this.setState({ scanned: true, isModalVisible: !this.state.isModalVisible, data: barcodes[0].data })
            alert(`Bar code data ${barcodes[0].data} has been scanned!`);
        //})

    };
    //   handleBarCodeScanned = ({ type, data }) => {
    //     this.setState({ scanned: true });
    //     this.setState({ isModalVisible: !this.state.isModalVisible });
    //     this.setState({ data: data });
    //     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    //   };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

CheckInOutScreen.propTypes = {
    userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
    userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ userLogin, userRegistration, updateState, userCheckIn, userCheckOut }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckInOutScreen);