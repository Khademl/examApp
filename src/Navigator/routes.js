import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
        initialRouteName="FirstQuestion"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}>
        <HomeStack.Screen name="FirstQuestion" component={FirstQuestion} />
        <HomeStack.Screen name="SecondQuestion" component={SecondQuestion} />
        <HomeStack.Screen name="AnswerScreen" component={AnswerScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default AppRouter;
