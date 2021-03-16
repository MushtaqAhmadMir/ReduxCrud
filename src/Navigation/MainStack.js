import React, {Fragment} from 'react';
import navigationStrings from '../constants/navigationStrings';
import {Home} from '../Screens';

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
    </Fragment>
  );
}

export default MainStack;
