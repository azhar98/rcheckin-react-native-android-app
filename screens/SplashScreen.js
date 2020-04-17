import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userRegistration, updateState, userIncident } from '../actions/user';

import {
  View,
  Image,
  StyleSheet
} from 'react-native';

class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  
  componentDidMount() {
    this.timeoutHandle = setTimeout(()=>{
        this.props.navigation.navigate("LoginScreen")
   }, 3000);
  }

  componentWillUnmount(){
    clearTimeout(this.timeoutHandle);
}


  render() {
    return (
        <View style={ styles.container }>
        <Image source={require('../assets/splash_rcheck.png')} style={styles.backgroundImage}>
        </Image>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
});


SplashScreen.propTypes = {
  userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
  userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ userLogin, userRegistration, updateState, userIncident }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);