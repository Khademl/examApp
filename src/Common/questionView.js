import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import Card from './Card';
import styles from '../Component/ListStyles';
import AppStatusBar from './appStatusBar';
import Header from './header';

class QuestionView extends Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({item}) => {
    return (
      <Card
        question={item.question}
        options={item.options}
        isDisable={this.props.isAnsweredByUser}
        onPress={(value) =>
          this.props.onSelectOption(
            item.id,
            value,
            item.correctoption,
            item.question,
          )
        }
      />
    );
  };

  render() {
    const {
      afterAnswerTimer,
      questionTimer,
      isRefreshing,
      questionData,
      pullToRefresh,
    } = this.props;
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
              ]}>{`${questionTimer}`}</Text>
          </View>
          <View style={styles.timerBg}>
            <Text
              style={[
                styles.timerText,
                {color: 'green'},
              ]}>{`${afterAnswerTimer}`}</Text>
          </View>
        </View>
        {isRefreshing ? (
          <ActivityIndicator
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            size="large"
            color="black"
          />
        ) : (
          <FlatList
            data={questionData}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={pullToRefresh}
              />
            }
          />
        )}
      </SafeAreaView>
    );
  }
}

export default QuestionView;
