import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


class HomeScreen extends Component {
  constructor(props) {
    super(props);
}
componentDidMount(){
  
}
  render(){
    const HomeScreen = () => {
      return (
        <View style={styles.container}>
          <Text>Home Screen</Text>
          <Button
            title="Click Here"
            onPress={() => alert('Button Clicked!')}
          />
          <Button
              title="Go to LoginScreen"
              onPress={() => this.props.navigation.navigate('LoginScreen')}
          />
        </View>
      );
  };
    return(
      <HomeScreen></HomeScreen>
    )
  }
}


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});


