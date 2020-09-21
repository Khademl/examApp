/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';

const Header = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.headerView}>
        <Text style={[styles.labelText, {letterSpacing: 2}]}>
          {props.title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 63,
  },
  headetTextMargin: {
    marginRight: 30,
  },
  labelText: {
    color: 'black',
    fontSize: 20,
    marginRight: 30,
  },
  backIcon: {
    fontSize: 20,
    marginLeft: 25,
    justifyContent: 'center',
    color: '#87cefa',
  },
});

export default Header;
