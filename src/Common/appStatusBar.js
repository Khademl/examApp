import React from 'react';
import {StatusBar, Platform} from 'react-native';

const AppStatusBar = (props) => {
  return <>{Platform.OS === 'ios' && <StatusBar barStyle={props.color} />}</>;
};

export default AppStatusBar;
