import React, {Component} from 'react';
import Data from '../Component/data.json';
import moment from 'moment';
import {connect} from 'react-redux';
import {updateQuestionAnswerList} from '../Redux/action';
import QuestionView from '../Common/questionView';

class FirstQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      isAnswered: false,
      answerDuration: moment.duration().add({seconds: 5}),
      questionDuration: moment.duration().add({minutes: 1}),
      stayTimeAfterAnswer: 0,
      stayTimeWithoutAnswer: 0,
    };
  }

  componentDidMount = async () => {
    this.onQuestionTimer();
  };

  componentDidUpdate() {
    const {navigation} = this.props;
    const {questionDuration, answerDuration} = this.state;
    if (
      answerDuration._milliseconds === 0 ||
      questionDuration._milliseconds === 0
    ) {
      navigation.navigate('SecondQuestion');
    }
  }

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
      let {isAnswered, questionDuration} = this.state;
      if (isAnswered) {
        clearInterval(x);
      } else {
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
      }
    }, 1000);
  };

  onPullDown = () => {
    this.setState({refresh: true});
    this.setState({refresh: false});
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
    this.setState({
      isAnswered: true,
    });
    this.onAnswerTimer();
    await updateQuestionAnswerList(params);
  };

  render() {
    const {
      stayTimeAfterAnswer,
      stayTimeWithoutAnswer,
      refresh,
      isAnswered,
    } = this.state;
    return (
      <QuestionView
        afterAnswerTimer={stayTimeAfterAnswer}
        questionTimer={stayTimeWithoutAnswer}
        isRefreshing={refresh}
        isAnsweredByUser={isAnswered}
        questionData={Data.question[0]}
        onSelectOption={this.clickOnAnswer}
        pullToRefresh={this.onPullDown}
      />
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
