import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userRegistration, updateState,userUploadScannedTag } from '../../actions/user';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    TextInput,
    ScrollView
} from 'react-native';
import { CheckBox, Button, ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';


class TagDefined extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tagNew: false,
            tagQRCode: false,
            tagNfc: false,
            isModalVisible: false,
            hasCameraPermission: null,
            scanned: false,
            tagValue: 0,
            TextInputDisableStatus:false,
            setName:''
        };
    }
    async componentDidMount() {
        console.log('props', this.props.userState.patrol)
        this.getPermissionsAsync();
        if (this.props.userState.coords.latitude !== null) {
            this.setState({ petrolGps: true })
        }
    }
    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    check(title) {
        console.log('Tag', title)
        if (title == 'NEW') {
            if (this.state.tagNew) {
                this.setState({ tagNew: false })
            } else {
                this.setState({ tagNew: true, tagValue: 0,tagQRCode: false,tagNfc: false,TextInputDisableStatus:true,setName:'New' })
            }

        } else if (title == 'QRCode') {
            if (this.state.tagQRCode) {
                this.setState({ tagQRCode: false })

            } else {
                this.setState({ tagQRCode: true, tagValue: 3,tagNew: false,tagNfc: false,TextInputDisableStatus:false,setName:'QR' })
                //this.setState({ isModalVisible: !this.state.isModalVisible });
            }

        } else if (title == 'NFC') {
            if (this.state.tagNfc) {
                this.setState({ tagNfc: false })
            } else {
                this.setState({ tagNfc: true, tagValue: 2,tagNew: false,tagQRCode: false,TextInputDisableStatus:false,setName:'NFC' })
            }

        }
    }

    button() {
        this.props.userUploadScannedTag(this.state);
    }

    onValueChange(e) {
        console.log('eeeeeee', e)
        const { tag } = this.props.userState;
        tag['newTag'] = e
        this.props.updateState({ tag });
    }


    render() {
        const { userDetails, tag, responseTriggerred, successMessage, failureMessage, login, petrolGps, petrolQRCode, petrolNfc, taglist, calendericon, clockicon } = this.props.userState;
        console.log('taglist',successMessage)
        const { hasCameraPermission, scanned } = this.state;
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={styles.container}>
            <Header
            leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer()}}
            centerComponent={{ text: 'Check In/Out', style: { color: '#fff' } }}
            rightComponent={{ icon: 'settings', color: '#fff',onPress: () => this.props.navigation.navigate('SettingScreen')}}
        />
                <View style={{ height: 50, backgroundColor: '#f4f0f0d6', justifyContent: 'center', paddingLeft: 10, }}>
                    <Text style={{ fontWeight: 'bold' }}>Tags Name</Text>
                </View>
                <View>
                    <CheckBox
                        title='NFC'
                        checked={this.state.tagNfc}
                        onPress={(title) => this.check('NFC')}
                    />
                </View>
                <View>
                    <CheckBox
                        title='QRCode'
                        checked={this.state.tagQRCode}
                        onPress={(title) => this.check('QRCode')}
                    />
                </View>
                <View>
                    <CheckBox
                        title='Start a new set'
                        checked={this.state.tagNew}
                        onPress={(title) => this.check('NEW')}
                    />
                </View>
                <View style={{ padding: 10 }}>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5, borderRadius: 3 }}
                        placeholder="Set Name"
                        value={tag.newTag}
                        editable={this.state.TextInputDisableStatus}
                        onChangeText={(e) => this.onValueChange(e, 'newTag')} />
                </View>

                <View style={{ padding: 10, paddingLeft: Dimensions.get('window').width - 140 }}>
                    <Button
                        title="Submit"
                        onPress={() => this.button()}
                    />
                </View>
                <ScrollView>
                <View style={{ padding: 10, justifyContent: 'center', alignItems: 'stretch', backgroundColor: '#f4f0f0d6' }}>
                    {
                        taglist.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.date}
                                leftIcon={{ name: calendericon }}
                                rightIcon={{ name: clockicon }}
                                rightTitle={item.time}
                                rightSubtitle='(Tag)'
                                bottomDivider
                            />
                        ))
                    }
                </View>
                </ScrollView>
                <Modal isVisible={this.state.isModalVisible}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View style={{ justifyContent: 'flex-end' }}>
                        {/* <Button
            title="Close"
            onPress={() => this.setState({isModalVisible:false})}
          /> */}
                    </View>
                    {scanned}
                </Modal>
            </View>
        );
    }
    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        this.setState({ isModalVisible: !this.state.isModalVisible });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

TagDefined.propTypes = {
    userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
    userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ userLogin, userRegistration, updateState,userUploadScannedTag }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TagDefined);