import React, {Fragment} from 'react';
import navigationStrings from '../constants/navigationStrings';
import  {Cart, DetailPage,  OtpVerification} from '../Screens';
// import {Cart, Home} from '../Screens';
import TabRoutes from './TabRoutes'

function MainStack(Stack) {
  return(
    <>
    <Stack.Screen
      name={navigationStrings.TAB_ROUTES}
      options={{
        headerShown:false
      }}
      component={TabRoutes}
    />
    <Stack.Screen
      name={navigationStrings.CART}
      options={{
        headerShown:false
      }}
      component={Cart}
    />
    <Stack.Screen
      name={navigationStrings.DETAIL_PAGE}
      options={{
        headerShown:false
      }}
      component={DetailPage}
    />
      </>
  )







  //return (
    // <Fragment>
    //   <Stack.Screen
    //     component={Home}
    //     options={{
    //       headerShown: false,
    //     }}
    //     name={navigationStrings.HOME_PAGE}
    //   />
    //   <Stack.Screen
    //     component={Cart}
    //     options={{
    //       headerShown: false,
    //     }}
    //     name={navigationStrings.CART}
    //   />
    // </Fragment>
  //);
}

export default MainStack;
