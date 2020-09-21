import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  SafeAreaView,
} from 'react-native';
import Card from '../Common/Card';
import Data from '../Component/data.json';
import styles from '../Component/ListStyles';
import AppStatusBar from '../Common/appStatusBar';
import {connect} from 'react-redux';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
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

  onPullDown = () => {
    this.setState({refresh: true});
    this.setState({refresh: false});
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
        {this.props.loading ? (
          <ActivityIndicator
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            size="large"
            color="black"
          />
        ) : (
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

export default connect(mapStateToProps)(Answer);
