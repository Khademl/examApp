import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './index';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export default function configureStore() {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    keyPrefix: '',
    whitelist: ['QuestionAnswer'],
    timeout: null,
  };
  // const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(reducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return store;
}
