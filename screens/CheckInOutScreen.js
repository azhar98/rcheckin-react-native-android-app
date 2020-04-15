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
    Alert
} from 'react-native';
import { CheckBox, Button, ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';
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
        };
    }
    componentDidMount() {
        console.log('props', this.props.userState)
        debugger
        if (this.props.userState.coords.latitude !== null) {
            this.setState({ checkGps: true })
          }
          else{
            this.getLocation();
          }
        
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
                this.setState({ checkNfc: true });
            }

        }
    }

    button(name) {
        console.log('hi', name);
        if (name == "Check In") {
            this.props.userCheckIn(this.state);
        }
        if (name == "Check Out") {
            this.props.userCheckOut(this.state);
        }
    }

    render() {
        const { userDetails, responseTriggerred, successMessage, failureMessage, login, checkGps, checkQRCode, checkNfc, list, calendericon, clockicon } = this.props.userState;
        console.log('succcccccc', successMessage);
        console.log('this.props.userState', this.props.userState)
        
        return (
            <View style={styles.container}>
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
                            onPress={() => this.button('Check In')}
                        />
                    </View>
                    <View style={{ width: 10 }}>
                    </View>
                    <View>
                        <Button
                            title="Check Out"
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
                                    rightSubtitle='(Patrol)'
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
                </Modal>
            </View>
        );
    }
    barcodeRecognized = ({ barcodes }) => {
        barcodes.forEach(barcode => {
            this.setState({ scanned: true, isModalVisible: !this.state.isModalVisible, data: barcode.data })
            alert(`Bar code data ${barcode.data} has been scanned!`);
        })

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