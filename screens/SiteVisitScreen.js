import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class SiteVisitScreen extends Component {
  constructor(props) {
    super(props);
}
  render(){
    const SiteVisitScreen = () => {
      return (
        <View style={styles.container}>
          <Text>SiteVisitScreen</Text>
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
      <SiteVisitScreen></SiteVisitScreen>
    )
  }
}


export default SiteVisitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
