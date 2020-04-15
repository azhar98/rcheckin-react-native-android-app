//import React, { Component } from 'react';
//import { View, Text, Button, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userRegistration, updateState } from '../actions/user';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation')
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator } from '@react-navigation/stack';
//import { LinearGradient } from 'expo-linear-gradient';

//import { PERMISSIONS } from 'react-native-permissions';
//import * as Permissions from 'expo-permissions';

// import * as TaskManager from 'expo-task-manager';
// import * as Location from 'expo-location';
// const LOCATION_TASK_NAME = 'background-location-task';
// import { EventEmitter } from 'fbemitter';
// import { URI } from '../../constants';
//const eventEmitter = new EventEmitter();
const items = [
  { name: 'Check In/Out', background: '#2898fed6', icon: 'check-circle-o', },
  { name: 'Site Visit', background: '#2898fed6', icon: 'map-marker' },
  { name: 'Patrol', background: '#2898fed6', icon: 'user-secret' },
  { name: 'Incident', background: '#2898fed6', icon: 'warning' },
];


class HomeScreen extends Component {
  
componentWillUnmount() {
 
  //this.eventSubscription.remove();
}

  async componentDidMount() {
    console.log('home',this.props.userState)
    if(this.props.userState.userDetails.token==null){
      this.props.navigation.navigate("LoginScreen")
    }


    // const { status } = await Location.requestPermissionsAsync();
    // console.log("Status",status)
    // if (status === 'granted') {
    //   await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    //     accuracy: Location.Accuracy.Balanced,
    //   });
    // }

//     this.eventSubscription = eventEmitter.addListener("locationChanged", locationData => {
      
      
//       fetch(`${URI.checkInOrOut}`, {
//         method: 'post',
//         headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+this.props.userState.userDetails.ticket},
//         body: JSON.stringify({
//           appType: 1,
//           eventType: 10,
//           trackTime: new Date().toISOString(),
//           latitude: locationData.locations[0].coords.latitude,
//           longitude: locationData.locations[0].coords.longitude,
//           employeeId: this.props.userState.userDetails.employeeId,
//           tagType:null,
//           tagValue:null
//         })
//       }).then(response => response.json())
//         .then((data) =>{debugger
// console.log("data",data);
//         })
//         .catch(error => dispatch(userCheckInFailure(error)));
//     });

    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000, //20 second  
      //  maximumAge: 1000 //1 second  
    };
    navigator.geolocation.getCurrentPosition(this.geoSuccess,
      this.geoFailure,
      geoOptions);    
  }

  geoSuccess = (position) => {
  
    console.log('position', position);
    const location = [{
      "date": new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
      "time": new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
      "subtitle": "(GPS)"
    }]
    this.props.updateState({ coords: position.coords, history: location });
    
  }
  geoFailure = (err) => {
    console.log('err', err);
    //this.setState({ error: err.message });
  }

  _card(name) {
    console.log('Card: ' + name)
    if (name === "Check In/Out") {
     this.props.navigation.navigate("CheckInOutScreen")
      
    }
    if (name === "Site Visit") {
      this.props.navigation.navigate("SiteVisitScreen")
    }
    if (name === "Patrol") {
      this.props.navigation.navigate("PatrollScreen")
    }
    if (name === "Incident") {
      this.props.navigation.navigate("IncidentScreen")
    }

  };

  render(){
    const { userDetails, responseTriggerred, successMessage, failureMessage, login, coords } = this.props.userState;
    const HomeScreen = () => {
      return (
        
      <View style={styles.container}>
      <View style={{ height: 100, backgroundColor: '#2898fe' }}>
        <LinearGradient colors={['#24c6dc', '#24c6dc', '#514a9d']} style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50, }}
            source={require('../assets/profile.png')}
          />
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{userDetails.usernameOrEmailAddress}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>Manager</Text>
        </LinearGradient>
      </View>
      <LinearGradient colors={['#514a9d', '#24c6dc', '#24c6dc']} style={{ padding: 20, flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ flex: 0.4, backgroundColor: 'white', height: 150, alignItems: 'center', justifyContent: 'center',borderRadius:10 }}>
            <TouchableOpacity onPress={() => this._card('Check In/Out')}>
              <Image
                style={{ width: 50, height: 50, }}
                source={require('../assets/images/1.png')}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>Check In/Out</Text>

          </View>

          <View style={{ flex: 0.4, backgroundColor: 'white', height: 150, alignItems: 'center', justifyContent: 'center',borderRadius:10 }}>
            <TouchableOpacity onPress={() => this._card('Site Visit')}>
              <Image
                style={{ width: 50, height: 50, }}
                source={require('../assets/images/2.png')}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>Site Visit</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ flex: 0.4, backgroundColor: 'white', height: 150, alignItems: 'center', justifyContent: 'center',borderRadius:10 }}>
            <TouchableOpacity onPress={() => this._card('Patrol')}>
              <Image
                style={{ width: 50, height: 50, }}
                source={require('../assets/images/3.png')}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>Patrol</Text>
          </View>

          <View style={{ flex: 0.4, backgroundColor: 'white', height: 150, alignItems: 'center', justifyContent: 'center',borderRadius:10 }}>
            <TouchableOpacity onPress={() => this._card('Incident')}>
              <Image
                style={{ width: 50, height: 50, }}
                source={require('../assets/images/4.png')}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>Incident</Text>
          </View>
        </View>
      </LinearGradient>
      {/* <Dashboard items={items} background={true} card={this._card} column={2} /> */}
    </View>
      );
  };
    return(
      <HomeScreen></HomeScreen>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});

HomeScreen.propTypes = {
  userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
  userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ userLogin, userRegistration, updateState }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
//   if (error) {
//     // Error occurred - check `error.message` for more details.
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     eventEmitter.emit("locationChanged", data);
//     //EventEmitter.emit("locationChanged", data);
//     // do something with the locations captured in the background
//   }
// });





