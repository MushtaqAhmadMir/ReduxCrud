import React, {Component, Fragment} from 'react';
import {View, Text} from 'react-native';
import Routes from './src/Navigation/Routes';
import FlashMessage from 'react-native-flash-message';
import {getUserData} from './src/utils/utils';
import {  Provider } from 'react-redux';
import store from './src/redux/store';
const {dispatch}=store
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    getUserData().then((res) => {
      if (res) {
        dispatch({
          type:types.LOGIN,
          payload:res
        })
      }
    });
  }

  render() {
    console.log(this.props,"userdata in ")
    const {isLoggedIn} = this.state;
    console.log(this.state.isLoggedIn, 'app');
    return (
      <Fragment>
      <Provider store={store}>
        <Routes />
        </Provider>
        <FlashMessage position="top" />
      </Fragment>
    );
  }
}



export default App
