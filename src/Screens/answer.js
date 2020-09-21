import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  Button,
  SafeAreaView,
} from 'react-native';
import Card from '../Common/Card';
import styles from '../Component/ListStyles';
import AppStatusBar from '../Common/appStatusBar';
import {connect} from 'react-redux';
import Header from '../Common/header';
import {clearAnswerList} from '../Redux/action';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }

  onPullDown = () => {
    this.setState({refresh: true});
    this.setState({refresh: false});
  };

  backToInitial = async () => {
    this.props.clearAnswerList();
    this.props.navigation.navigate('StartScreen');
  };

  renderItem = ({item}) => {
    return (
      <Card
        question={item.question}
        id={item.id}
        showAnswer={true}
        value={item.value}
        correctoption={item.correctoption}
      />
    );
  };
  render() {
    const {QuestionAnswer} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <AppStatusBar color={'light-content'} />
        <Header title={'Result Of Quiz'} />
        {this.props.loading ? (
          <ActivityIndicator
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            size="large"
            color="black"
          />
        ) : (
          <View style={styles.resultView}>
            <FlatList
              data={QuestionAnswer.answeredData}
              renderItem={(item) => this.renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={this.onPullDown}
                />
              }
            />
          </View>
        )}
        <View style={[styles.buttonStyle, {marginBottom: 40}]}>
          <Button
            onPress={() => this.backToInitial()}
            title="Back to Initial"
            color="blue"
          />
        </View>
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
  clearAnswerList,
})(Answer);
