import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin,userRegistration,updateState} from '../actions/user';

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
import styles from '../StyleSheets/LoginStyle';


class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    switchToRegistration(){
        Keyboard.dismiss()
        this.props.updateState({ login:false });
    }

    switchToLogin(){
        Keyboard.dismiss()
        this.props.updateState({ login:true });
    }

    onValueChangeLogin = (value, id) => {
        const { userDetails } = this.props.userState;
        userDetails[id] = value;
        this.props.updateState({ userDetails });
    }
    onValueChangeRegistration = (value, id) => {
        const { userDetails } = this.props.userState;
        userDetails[id] = value;
        this.props.updateState({ userDetails });
        console.log('details',userDetails)
    }

    onClickListener(viewId){
        console.log("ViewID",viewId)
        if(viewId=="login"){
            this.props.userLogin();
        }else if(viewId=="registration"){
            this.props.userRegistration();
            Alert.alert(
                'Registration failed',
                'Wrong details',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            
        }
        
    }

    SuccessAlert(){
      debugger;
        if(this.props.userState.login==true){
            this.props.navigation.navigate("Home")
        }    
    }

    render() {
        const { userDetails,responseTriggerred,successMessage, failureMessage,login } = this.props.userState;
        console.log('ffff',failureMessage)
        let content;
        if (login) {
            content =
                <View style={styles.viewContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="USERNAME"
                            underlineColorAndroid='transparent'
                            value={userDetails.usernameOrEmailAddress}
                            onChangeText={(e) => this.onValueChangeLogin(e, 'usernameOrEmailAddress')} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="PASSWORD"
                            underlineColorAndroid='transparent'
                            value={userDetails.password}
                            onChangeText={(e) => this.onValueChangeLogin(e, 'password')} />
                    </View>
                    <TouchableHighlight onPress={() => this.switchToRegistration()}>
                    <Text style={styles.underlineText}>Registration</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableHighlight>
                </View>
        } else {
            content =
                <View style={[styles.viewContainer,{paddingTop:50}]}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="TENANCY NAME"
                            underlineColorAndroid='transparent'
                            value={userDetails.tenancyName}
                            onChangeText={(e) => this.onValueChangeRegistration(e, 'tenancyName')}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="TELEPHONE"
                            value={userDetails.telephone}
                            onChangeText={(e) => this.onValueChangeRegistration(e, 'telephone')}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="USERNAME"
                            underlineColorAndroid='transparent'
                            value={userDetails.userName}
                            onChangeText={(e) => this.onValueChangeRegistration(e, 'userName')}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="PASSWORD"
                            underlineColorAndroid='transparent'
                            value={userDetails.password}
                            onChangeText={(e) => this.onValueChangeRegistration(e, 'password')}/>
                    </View>
                    <TouchableHighlight onPress={() => this.switchToLogin()}>
                    <Text style={styles.underlineText}>Login</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('registration')}>
                        <Text style={styles.loginText}>Registration</Text>
                    </TouchableHighlight>
                </View>
        }

        if (responseTriggerred) {
            console.log('ud',userDetails)
            const message = userDetails.ticket ? successMessage : failureMessage;
            if (message==="Failure"){
                Alert.alert(
                    'Login '+message,
                    'Wrong username or password',
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
                  this.props.updateState({failureMessage:"",});
            }else if(message==="LoginSuccess"){
                this.SuccessAlert()
            }else if(message==="RegistrationSuccess"){  
                Alert.alert(
                    'Registration Success',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
                  this.props.updateState({successMessage:"" });
            }        
        }

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/images/login.png')} style={styles.backgroundImage}>
                    <KeyboardAvoidingView style={{flex:1}}
                    behavior= {(Platform.OS === 'ios')? "padding" : "paddingTop:20"}
                    keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
                    enabled>
                    {content}
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        );
    }
}

LoginScreen.propTypes = {
    userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
    userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ userLogin,userRegistration,updateState}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);