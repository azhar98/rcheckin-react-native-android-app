import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userRegistration, updateState, userIncident } from '../actions/user';

import {
  Text,
  View,
  Button,
  Image,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  Alert
} from 'react-native';
import { CheckBox, ListItem, Input, Header } from 'react-native-elements';
import styles from '../StyleSheets/LoginStyle'

class IncidentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Subject: '',
      Content: '',
    };
  }
  componentDidMount() {
    console.log('props', this.props.userState)
  }

  buttonClear() {
    this.setState({ Subject: '', Content: '' })
  }

  buttonSend() {
    this.props.userIncident(this.state);
  }

  onValueChangeIncident = (value, id) => {
    if (id === 'Subject') {
      this.setState({ Subject: value })
    }
    if (id === 'Content') {
      this.setState({ Content: value })
    }
  }

  render() {
    const { userDetails, responseTriggerred, successMessage, failureMessage, login, checkGps, checkQRCode, checkNfc, accountButton, mainButton } = this.props.userState;
    console.log('Incident', successMessage)
    if (successMessage === 'IncidentSuccess') {
      Alert.alert('Success')
    }
    return (
      <View style={{ flex: 1, }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'settings', color: '#fff', onPress: () => this.props.navigation.navigate('Home') }}
        />
        <Input
          placeholder='Subject'
          value={this.state.Subject}
          onChangeText={(e) => this.onValueChangeIncident(e, 'Subject')}
        />
        <View style={{ height: 20 }}></View>
        <Input
          placeholder='Content'
          value={this.state.Content}
          onChangeText={(e) => this.onValueChangeIncident(e, 'Content')}
        />
        <View style={{ flax: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 30, alignItems: 'flex-end' }}>
          <View>
            <Button
              title="Clear"
              onPress={() => this.buttonClear()}
            />
          </View>
          <View style={{ width: 10 }}>
          </View>
          <View>
            <Button
              title="Send"
              onPress={() => this.buttonSend()}
            />
          </View>
        </View>
      </View>
    );
  }
}


IncidentScreen.propTypes = {
  userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
  userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ userLogin, userRegistration, updateState, userIncident }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IncidentScreen);