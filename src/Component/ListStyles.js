import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#87cefa',
    paddingTop: 10,
  },
  timerBg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginVertical: 10,
  },
  timerText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default styles;
