import React from 'react';
import {
  Button,
  View,
  Text,
  ImageBackground,
  BackHandler,
  Alert,
} from 'react-native';
import AppStatusBar from '../Common/appStatusBar';
import styles from '../Component/ListStyles';

export default class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  handleBackPress = () => {
    Alert.alert(
      'EXAM APP',
      'Are you want to close the app ?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  render() {
    return (
      <ImageBackground
        source={require('../Assets/Images/bg.jpg')}
        style={styles.startContainer}>
        <AppStatusBar color={'light-content'} />
        <View style={styles.instructionMessage}>
          <Text style={[styles.instructionText]}>
            {`1. Every question will be a 1-minute maximum time.\n`}
          </Text>
          <Text style={[styles.instructionText, {textAlign: 'right'}]}>
            {`2. After answering the question other options will be freeze.\n`}
          </Text>
          <Text style={[styles.instructionText]}>
            {`3. After answering the question will be changed in 5 seconds.`}
          </Text>
        </View>
        <View style={[styles.buttonStyle, {marginBottom: 60}]}>
          <Button
            onPress={() => this.props.navigation.navigate('FirstQuestion')}
            title="Start Quiz"
            color="green"
          />
        </View>
      </ImageBackground>
    );
  }
}
