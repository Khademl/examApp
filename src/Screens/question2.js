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
import {updateQuestionAnswerList, changeOptionStatus} from '../Redux/action';

class SecondQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      isAnswered: false,
      data: Data.question2[0],
      value: [],
      stayDuration: moment.duration().add({seconds: 5}),
      secs: 0,
    };
  }

  componentDidUpdate() {
    if (this.state.stayDuration._milliseconds === 0) {
      this.props.navigation.navigate('AnswerScreen');
    }
  }

  static navigationOptions = {
    title: 'React Quiz',
    headdingStyle: {
      fontWeight: '300',
    },
    headerStyle: {
      backgroundColor: '#3db0f7',
    },
    headerTitleStyle: {alignSelf: 'center', color: 'white'},
  };

  startTimer = () => {
    const x = setInterval(() => {
      let {stayDuration} = this.state;
      if (stayDuration <= 0) {
        clearInterval(x);
      } else {
        stayDuration = stayDuration.subtract(1, 's');
        const secs = stayDuration.seconds();
        this.setState({
          secs,
          stayDuration,
        });
      }
    }, 1000);
  };

  onPullDown = () => {
    this.setState({refresh: true});
    this.setState({refresh: false});
  };

  componentWillUnmount = () => {
    this.startTimer();
  };

  onSubmit = (id, value, correctoption, question) => {
    const data = {
      id: id,
      value: value,
      correctoption: correctoption,
      question: question,
    };
    const newData = [...this.state.value, data];
    this.setState({value: newData});
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
    this.startTimer();
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
    const {secs} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <AppStatusBar color={'light-content'} />
        <View style={styles.timerBg}>
          <Text style={styles.timerText}>{`${secs}`}</Text>
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
        {/* <Button
          onPress={() => this.props.navigation.navigate('AnswerScreen')}
          title="Submit"
          color="#841584"
        /> */}
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
  changeOptionStatus,
})(SecondQuestion);
