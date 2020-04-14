import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class SettingScreen extends Component {
  constructor(props) {
    super(props);
}
  render(){
    const SettingScreen = () => {
      return (
        <View style={styles.container}>
          <Text>SettingScreen</Text>
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
      <SettingScreen></SettingScreen>
    )
  }
}


export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
