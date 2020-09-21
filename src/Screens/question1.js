import React, {Component} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  RefreshControl,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
  Text,
} from 'react-native';
import Card from '../Common/Card';
import Data from '../Component/data.json';
import styles from '../Component/ListStyles';
import AppStatusBar from '../Common/appStatusBar';
import moment from 'moment';
import {connect} from 'react-redux';
import Header from '../Common/header';
import {updateQuestionAnswerList} from '../Redux/action';

class FirstQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      data: Data.question1[0],
      isAnswered: false,
      answerDuration: moment.duration().add({seconds: 5}),
      questionDuration: moment.duration().add({minutes: 1}),
      stayTimeAfterAnswer: 0,
      stayTimeWithoutAnswer: 0,
    };
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.onQuestionTimer();
  };

  componentDidUpdate() {
    const {navigation} = this.props;
    const {questionDuration, answerDuration} = this.state;
    if (answerDuration._milliseconds === 0) {
      navigation.navigate('SecondQuestion');
    }
    if (questionDuration._milliseconds === 0) {
      navigation.navigate('SecondQuestion');
    }
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  onAnswerTimer = () => {
    const x = setInterval(() => {
      let {answerDuration} = this.state;
      if (answerDuration <= 0) {
        clearInterval(x);
      } else {
        answerDuration = answerDuration.subtract(1, 's');
        const secs = answerDuration.seconds();
        this.setState({
          stayTimeAfterAnswer: secs,
          answerDuration,
        });
      }
    }, 1000);
  };

  onQuestionTimer = () => {
    const x = setInterval(() => {
      let {questionDuration} = this.state;
      if (questionDuration <= 0) {
        clearInterval(x);
      } else {
        questionDuration = questionDuration.subtract(1, 's');
        const secs = questionDuration.seconds();
        this.setState({
          stayTimeWithoutAnswer: secs,
          questionDuration,
        });
      }
    }, 1000);
  };

  onPullDown = () => {
    this.setState({refresh: true});
    this.setState({refresh: false});
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

  clickOnAnswer = async (id, value, correctoption, question) => {
    const {updateQuestionAnswerList} = this.props;
    const params = {
      data: {
        id: id,
        value: value,
        correctoption: correctoption,
        question: question,
      },
    };
    this.setState({isAnswered: true});
    this.onAnswerTimer();
    await updateQuestionAnswerList(params);
  };

  renderItem = ({item}) => {
    return (
      <Card
        question={item.question}
        options={item.options}
        isDisable={this.state.isAnswered}
        onPress={(value) =>
          this.clickOnAnswer(item.id, value, item.correctoption, item.question)
        }
      />
    );
  };
  render() {
    const {stayTimeAfterAnswer, stayTimeWithoutAnswer} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <AppStatusBar color={'light-content'} />
        <Header title={'React Quiz'} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.timerBg}>
            <Text
              style={[
                styles.timerText,
                {color: 'red'},
              ]}>{`${stayTimeWithoutAnswer}`}</Text>
          </View>
          <View style={styles.timerBg}>
            <Text
              style={[
                styles.timerText,
                {color: 'green'},
              ]}>{`${stayTimeAfterAnswer}`}</Text>
          </View>
        </View>
        {this.props.loading ? (
          <ActivityIndicator
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            size="large"
            color="black"
          />
        ) : (
          <FlatList
            data={this.state.data}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={this.onPullDown}
              />
            }
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    QuestionAnswer: state.QuestionAnswer,
  };
};

export default connect(mapStateToProps, {
  updateQuestionAnswerList,
})(FirstQuestion);
