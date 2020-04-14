import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class IncidentScreen extends Component {
  constructor(props) {
    super(props);
}
  render(){
    const IncidentScreen = () => {
      return (
        <View style={styles.container}>
          <Text>IncidentScreen</Text>
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
      <IncidentScreen></IncidentScreen>
    )
  }
}


export default IncidentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
