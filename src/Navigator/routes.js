import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../Screens/startScreen';
import AnswerScreen from '../Screens/answer';
import FirstQuestion from '../Screens/question1';
import SecondQuestion from '../Screens/question2';

const HomeStack = createStackNavigator();

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <AppHomeStack />;
  }
}

function AppHomeStack() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        <HomeStack.Screen name="StartScreen" component={StartScreen} />
        <HomeStack.Screen name="FirstQuestion" component={FirstQuestion} />
        <HomeStack.Screen name="SecondQuestion" component={SecondQuestion} />
        <HomeStack.Screen name="AnswerScreen" component={AnswerScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default AppRouter;
