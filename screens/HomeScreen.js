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
  Image,
  Linking,
  Alert
} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
import BackgroundFetch from "react-native-background-fetch";
import { URI } from '../constants';
import store from '../store/index';



class HomeScreen extends Component {

  componentWillUnmount() {

 }

  async componentDidMount() {
    console.log('store',store)
    // Configure it.
    BackgroundFetch.configure({
      minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
      // Android options
      forceAlarmManager: false,     // <-- Set true to bypass JobScheduler.
      stopOnTerminate: false,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
      requiresCharging: false,      // Default
      requiresDeviceIdle: false,    // Default
      requiresBatteryNotLow: false, // Default
      requiresStorageNotLow: false  // Default
    }, async (taskId) => {
      console.log("[js] Received background-fetch event: ", taskId);
      navigator.geolocation.getCurrentPosition(this.geoSuccess,
        this.geoFailure,
        geoOptions);

      fetch(`${URI.checkInOrOut}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.userState.userDetails.ticket },
        body: JSON.stringify({
          appType: 1,
          eventType: 10,
          trackTime: new Date().toISOString(),
          latitude: this.props.userState.coords.latitude,
          longitude: this.props.userState.coords.longitude,
          employeeId: this.props.userState.userDetails.employeeId,
          tagType: null,
          tagValue: null
        })
      }).then(response => response.json())
        .then((data) => {
          console.log("data", data);
        })
        .catch(error => dispatch(userCheckInFailure(error)));
      console.log('Background', this.props.userState)
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time


      BackgroundFetch.finish(taskId);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });

    console.log('home', this.props.userState)


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
    var joined = this.props.userState.history.concat(location);
    //this.setState({ myArray: joined })
    this.props.updateState({ coords: position.coords, history: joined });

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

  render() {
    const { userDetails, responseTriggerred, successMessage, failureMessage, login, coords, call911 } = this.props.userState;
    
    const HomeScreen = () => {
      return (

        <View style={styles.container}>
          <View style={{ height: 100, backgroundColor: '#2898fe' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10,backgroundColor:'#ecf0f1' }}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 50, }}
                source={require('../assets/user.png')}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{userDetails.userName}</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}></Text>
            </View>
          </View>
          <View style={{ padding: 20, flex: 1 }}>
            <View style={{ flex: 0.7, flexDirection: 'row', justifyContent: 'space-between' }}>

              <View style={{ flex: 0.4, backgroundColor: 'white', height: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <TouchableOpacity onPress={() => this._card('Check In/Out')}>
                  <Image
                    style={{ width: 50, height: 50, }}
                    source={require('../assets/images/1.png')}
                  />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>Check In/Out</Text>

              </View>

              <View style={{ flex: 0.4, backgroundColor: 'white', height: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
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

              <View style={{ flex: 0.4, backgroundColor: 'white', height: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <TouchableOpacity onPress={() => this._card('Patrol')}>
                  <Image
                    style={{ width: 50, height: 50, }}
                    source={require('../assets/images/3.png')}
                  />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>Patrol</Text>
              </View>

              <View style={{ flex: 0.4, backgroundColor: 'white', height: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <TouchableOpacity onPress={() => this._card('Incident')}>
                  <Image
                    style={{ width: 50, height: 50, }}
                    source={require('../assets/images/4.png')}
                  />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>Incident</Text>
              </View>
            </View>
          </View>

          {/* <Dashboard items={items} background={true} card={this._card} column={2} /> */}
        </View>
      );
    };
    return (
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





