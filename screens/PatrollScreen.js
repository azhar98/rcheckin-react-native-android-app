import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userRegistration, updateState, userPatrol } from '../actions/user';

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
import { CheckBox, Button, ListItem, Header } from 'react-native-elements';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
navigator.geolocation = require('@react-native-community/geolocation');

class PatrollScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petrolGps: false,
      petrolQRCode: false,
      petrolNfc: false,
      isModalVisible: false,
      hasCameraPermission: null,
      scanned: false,
      tagType: null,
      data: null,
    };
  }
  async componentDidMount() {
    console.log('props', this.props.userState.patrol)

    if (this.props.userState.coords.latitude !== null) {
      this.setState({ petrolGps: true })
    }
    else {
      this.getLocation();
    }
    NfcManager.start();
  }

  componentWillUnmount() {
    this._cleanUp();
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
      if (this.state.petrolGps) {
        this.setState({ petrolGps: false })
      } else {
        this.setState({ petrolGps: true })
      }

    } else if (title == 'QRCode') {
      if (this.state.petrolQRCode) {
        this.setState({ petrolQRCode: false })

      } else {
        this.setState({ petrolQRCode: true, tagType: 3, petrolNfc: false })
        this.setState({ isModalVisible: !this.state.isModalVisible });
      }

    } else if (title == 'NFC') {
      if (this.state.petrolNfc) {
        this.setState({ petrolNfc: false })
      } else {
        this.readData();

      }

    }
  }

  button() {
    console.log('hi')
    this.props.userPatrol(this.state);
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
        petrolNfc: true,
        tagType: 2,
        petrolQRCode: false
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
    const { userDetails, responseTriggerred, successMessage, failureMessage, login, petrolGps, petrolQRCode, petrolNfc, patrollist, calendericon, clockicon } = this.props.userState;
    console.log('Patrol', successMessage)
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
          centerComponent={{ text: 'Patroll', style: { color: '#fff' } }}
          rightComponent={{ icon: 'settings', color: '#fff', onPress: () => this.props.navigation.navigate('SettingScreen') }}
        />
        <View style={{ height: 50, backgroundColor: '#f4f0f0d6', justifyContent: 'center', paddingLeft: 10, }}>
          <Text style={{ fontWeight: 'bold' }}>Track With</Text>
        </View>
        <View>
          <CheckBox
            title='GPS'
            checked={this.state.petrolGps}
            onPress={(title) => this.check('GPS')}
          />
        </View>
        <View>
          <CheckBox
            title='QRCode'
            checked={this.state.petrolQRCode}
            onPress={(title) => this.check('QRCode')}
          />
        </View>
        <View>
          <CheckBox
            title='NFC'
            checked={this.state.petrolNfc}
            onPress={(title) => this.check('NFC')}
          />
        </View>
        <View style={{ padding: 10, paddingLeft: Dimensions.get('window').width - 140 }}>
          <Button
            title="Checkpoint"
            onPress={() => this.button()}
          />
        </View>
        <ScrollView>
          <View style={{ padding: 10, justifyContent: 'center', alignItems: 'stretch', backgroundColor: '#f4f0f0d6' }}>
            {
              patrollist.map((item, i) => (
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

//export default Patrol;
PatrollScreen.propTypes = {
  userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
  userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ userLogin, userRegistration, updateState, userPatrol }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PatrollScreen);