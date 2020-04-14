import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
}
  render(){
    const LoginScreen = () => {
      return (
        <View style={styles.container}>
          <Text>Login Screen</Text>
          <Button
            title="Click Here"
            onPress={() => alert('Button Clicked!')}
          />
          <Button
              title="Go to home"
              onPress={() => this.props.navigation.navigate('SupportScreen')}
          />
        </View>
      );
  };
    return(
      <LoginScreen></LoginScreen>
    )
  }
}


export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
