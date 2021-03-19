import React, {Component, Fragment} from 'react';
import {View, Text} from 'react-native';
import Routes from './src/Navigation/Routes';
import FlashMessage from 'react-native-flash-message';
import {getUserData} from './src/utils/utils';
import { Provider } from 'react-redux';
import store from './src/redux/store';
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
        this.setState({isLoggedIn: true});
      }
    });
  }

  render() {
    const {isLoggedIn} = this.state;
    console.log(this.state.isLoggedIn, 'app');
    return (
      <Fragment>
      <Provider store={store}>
        <Routes isLoggedIn={isLoggedIn} />
        </Provider>
        <FlashMessage position="top" />
      </Fragment>
    );
  }
}

export default App;
