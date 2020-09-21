import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#87cefa',
    paddingTop: 10,
  },
  startContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  timerBg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 20,
    marginVertical: 10,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyle: {
    width: '90%',
    height: 50,
    marginHorizontal: '5%',
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
  },
  resultView: {
    flex: 1,
    marginVertical: '2%',
  },
  instructionMessage: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: '30%',
  },
  instructionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default styles;
