import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userRegistration, updateState } from '../actions/user';

import {
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableHighlight,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Platform,
    Alert,
    BackHandler,
    TouchableOpacity
} from 'react-native';
import styles from '../StyleSheets/LoginStyle';
import { URI } from '../constants';
import { Button } from 'react-native-elements';


class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            loginButtonDisable:false,
        }
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        console.log('nav',this.props)
        if (this.props.route.name=="LoginScreen") {
            this.props.navigation.navigate("LoginScreen")
        } else {
            this.props.navigation.navigate("LoginScreen")
        }
        return true;
    }


    switchToRegistration() {
        this.props.updateState({ login: false });
    }

    switchToLogin() {
        this.props.updateState({ login: true });
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
        console.log('details', userDetails)
    }

    onClickListener(viewId) {
        console.log("ViewID", viewId)
        if (viewId == "login") {
            this.login()
            //this.props.userLogin();
        } else if (viewId == "registration") {
            this.registration();
        }
    }

    login() {
        this.setState({loginButtonDisable:true})
        const { userDetails } = this.props.userState;
        fetch(`${URI.login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usernameOrEmailAddress: userDetails.usernameOrEmailAddress,
                password: userDetails.password
            }),
        }).then(response => response.json())
            .then((data) => {
                console.log('data', data)
                if (data.success == true) {
                    this.props.updateState({ userDetails: data.result });
                    this.setState({loginButtonDisable:false})
                    this.props.navigation.navigate("HomeDrawer")
                    
                } else {
                    
                    alert("Wrong Username or Password")
                    this.setState({loginButtonDisable:false})
                }

            })
            .catch((error) => { alert(error) });
    }


    registration() {
        debugger;
        const { userDetails } = this.props.userState;
        fetch(`${URI.registration}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                tenancyName: userDetails.tenancyName,
                phoneNo: userDetails.telephone,
                userName: userDetails.userName,
                password: userDetails.rpassword
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('data', data);
                if (data.success == true && data.error==null) {
                    alert("Registration Successfull")
                } else {
                    alert(data.error.message)
                }
            })
            .catch(error => { alert(error) });

    }


    FailedRegistrationAlert() {
        alert("Registration Failure");
    }

    SuccessRegistrationAlert() {
        alert("Registration Success");
    }

    render() {
        const { userDetails, responseTriggerred, successMessage, failureMessage, login } = this.props.userState;
        let content;
        if (login) {
            content =
                <View style={styles.viewContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="USERNAME"
                            value={userDetails.usernameOrEmailAddress}
                            onChangeText={(e) => this.onValueChangeLogin(e, 'usernameOrEmailAddress')} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="PASSWORD"
                            secureTextEntry={true}
                            value={userDetails.password}
                            onChangeText={(e) => this.onValueChangeLogin(e, 'password')} />
                    </View>
                    <Button
                        title="Registration"
                        type="clear"
                        onPress={() => this.switchToRegistration()}
                    />
                    {/* <TouchableHighlight onPress={() => this.switchToRegistration()}>
                        <Text style={styles.underlineText}>Registration</Text>
                    </TouchableHighlight> */}
                    <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')} disabled={this.state.loginButtonDisable}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>
        } else {
            content =
                <View style={[styles.viewContainer, { paddingTop: 50 }]}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="TENANCY NAME"
                            value={userDetails.tenancyName}
                            onChangeText={(e) => this.onValueChangeRegistration(e, 'tenancyName')} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="TELEPHONE"
                            value={userDetails.telephone}
                            onChangeText={(e) => this.onValueChangeRegistration(e, 'telephone')} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="USERNAME"
                            value={userDetails.userName}
                            onChangeText={(e) => this.onValueChangeRegistration(e, 'userName')} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="PASSWORD"
                            value={userDetails.rpassword}
                            onChangeText={(e) => this.onValueChangeRegistration(e, 'rpassword')} />
                    </View>
                    <Button
                        title="Login"
                        type="clear"
                        onPress={() => this.switchToLogin()}
                    />
                    {/* <TouchableHighlight onPress={() => this.switchToLogin()}>
                        <Text style={styles.underlineText}>Login</Text>
                    </TouchableHighlight> */}
                    <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('registration')}>
                        <Text style={styles.loginText}>Registration</Text>
                    </TouchableOpacity>
                </View>
        }

        if (responseTriggerred) {
            console.log('ud', userDetails)
            const message = userDetails.ticket ? successMessage : failureMessage;
            if (message === "Failure") {
                this.FailedAlert()
                this.props.updateState({ failureMessage: "" });
            } else if (message === "LoginSuccess") {
                this.SuccessAlert()
                this.props.updateState({ successMessage: "" });
            } else if (message === "RegistrationSuccess") {
                this.SuccessRegistrationAlert()
                this.props.updateState({ successMessage: "" });

            } else if (message === "RegistrationFailure") {
                this.FailedRegistrationAlert()
                this.props.updateState({ failureMessage: "" });
            }
        }

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/images/login.png')} style={styles.backgroundImage}>
                    <KeyboardAvoidingView style={{ flex: 1 }}
                        behavior={(Platform.OS === 'ios') ? "padding" : "paddingTop:20"}
                        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
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
    ...bindActionCreators({ userLogin, userRegistration, updateState }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);