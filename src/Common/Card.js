import PropTypes from 'prop-types';
import React from 'react';
import {Image, Text, View} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Correct from '../Assets/Images/correct.png';
import Wrong from '../Assets/Images/cross.png';
import styles from './CardStyles';

const Card = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.container} onPress={props.onPress}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.collectionTxt}>{props.question}</Text>
          <View style={{marginVertical: 20}}>
            {props.showAnswer ? (
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Text
                    style={
                      styles.collectionTxt
                    }>{`Your answer:- ${props.value}`}</Text>
                  <Text
                    style={
                      styles.collectionTxt
                    }>{`Correct answer:- ${props.correctoption}`}</Text>
                </View>
                {props.value == props.correctoption ? (
                  <Image source={Correct} />
                ) : (
                  <Image source={Wrong} />
                )}
              </View>
            ) : (
              <RadioForm
                radio_props={props.options}
                disabled={props.isDisable}
                onPress={props.onPress}
                initial={null}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

Card.propTypes = {
  question: PropTypes.string.isRequired,
};

export default Card;
