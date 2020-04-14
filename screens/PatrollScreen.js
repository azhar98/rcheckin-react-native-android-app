import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class PatrollScreen extends Component {
  constructor(props) {
    super(props);
}
  render(){
    const PatrollScreen = () => {
      return (
        <View style={styles.container}>
          <Text>PatrollScreen</Text>
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
      <PatrollScreen></PatrollScreen>
    )
  }
}


export default PatrollScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
