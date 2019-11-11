import React from "react";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,NavigationScreenProp } from "react-navigation";


import ShopDisplay from "../RenderedElement/Shop.Display";
import LoginForm from "../Component/Login/Login.index";
import PaymentScreen from "../RenderedElement/Payment.screen";

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any,any>
};


const AppNavigator = createStackNavigator({
  
  Login:{screen:LoginForm},Detaild :{screen:ShopDisplay},Payment :{screen:PaymentScreen}
  
},{
    initialRouteName: 'Detaild',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#544caa',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
})


export default createAppContainer(AppNavigator);
