import React from 'react';
import SplashScreen from './src/Screens/SplashScreen';
import AppRouter from './src/Navigator/routes';
import {Provider} from 'react-redux';
import configureStore from './src/Redux/store';

const store = configureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLoading: true};
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({isLoading: false});
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}
