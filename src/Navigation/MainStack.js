import React, {Fragment} from 'react';
import navigationStrings from '../constants/navigationStrings';
import {Cart, Home} from '../Screens';

function MainStack(Stack) {
  return (
    <Fragment>
      <Stack.Screen
        component={Home}
        options={{
          headerShown: false,
        }}
        name={navigationStrings.HOME_PAGE}
      />
      <Stack.Screen
        component={Cart}
        options={{
          headerShown: false,
        }}
        name={navigationStrings.CART}
      />
    </Fragment>
  );
}

export default MainStack;
