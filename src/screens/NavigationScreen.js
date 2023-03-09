import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const NavigationScreen = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
  },
});

export default NavigationScreen;
