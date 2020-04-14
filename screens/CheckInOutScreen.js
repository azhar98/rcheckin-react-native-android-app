import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class CheckInOutScreen extends Component {
  constructor(props) {
    super(props);
}
  render(){
    const CheckInOutScreen = () => {
      return (
        <View style={styles.container}>
          <Text>CheckInOutScreen</Text>
          <Button
            title="Click Here"
            onPress={() => alert('Button Clicked!')}
          />
          <Button
              title="Go to home"
              onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      );
  };
    return(
      <CheckInOutScreen></CheckInOutScreen>
    )
  }
}


export default CheckInOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
