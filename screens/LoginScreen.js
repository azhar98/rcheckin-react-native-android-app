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
    Alert,
    BackHandler
} from 'react-native';
import styles from '../StyleSheets/LoginStyle';


class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
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
        }
        
    }

    SuccessAlert(){
        this.props.navigation.navigate("HomeDrawer")
    }

    FailedAlert(){
        alert("Wrong username or password");
    }

    FailedRegistrationAlert(){
        alert("Registration Failure");
    }

    SuccessRegistrationAlert(){
        alert("Registration Success");
    }

    render() {
        const { userDetails,responseTriggerred,successMessage, failureMessage,login } = this.props.userState;
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
            debugger
            console.log('ud',userDetails)
            const message = userDetails.ticket ? successMessage : failureMessage;
            if (message==="Failure"){
                this.FailedAlert()
                this.props.updateState({failureMessage:"" });
            }else if(message==="LoginSuccess"){
                this.SuccessAlert()
                this.props.updateState({successMessage:"" });
            }else if(message==="RegistrationSuccess"){  
                this.SuccessRegistrationAlert()
                this.props.updateState({successMessage:"" });

            }else if(message==="RegistrationFailure"){  
                this.FailedRegistrationAlert()
                this.props.updateState({failureMessage:"" });
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