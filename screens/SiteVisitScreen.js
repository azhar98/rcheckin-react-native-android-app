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
    Alert
} from 'react-native';
import { CheckBox, Button, ListItem,Header } from 'react-native-elements';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';
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
    }
    componentDidMount() {
        console.log('props', this.props.userState)
        if (this.props.userState.coords.latitude !== null) {
            this.setState({ siteVisitGps: true })
        }
        else {
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
                this.setState({ siteVisitNfc: true, tagType: 2, siteVisitQRCode: false })
            }

        }
    }

    button(name) {
        console.log('hi')
        //
        if (name == "Begin Visit") {

            this.props.userBeginVisit(this.state);
        }
        if (name == "End Visit") {
            this.props.userEndVisit(this.state);
        }
    }


    render() {
        const { userDetails, responseTriggerred, successMessage, failureMessage, login, siteVisitGps, siteVisitQRCode, siteVisitNfc, visitlist, calendericon, clockicon } = this.props.userState;
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
                            onPress={() => this.button('Begin Visit')}
                        />
                    </View>
                    <View style={{ width: 10 }}>
                    </View>
                    <View>
                        <Button
                            title="End Visit"
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