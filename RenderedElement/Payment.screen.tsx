import React  from "react";
import {Button,View, Input} from 'native-base';
import { Text,AsyncStorage } from "react-native";


interface State {
onScreen : boolean
}
interface Props{

}

class PaymentScreen extends React.Component<Props,State>{

    constructor(Props){
        super (Props);

        this.state = {
            onScreen : false
        }
    }

    static navigationOptions =({ navigation }) => {
        return {
        //   headerLeft: null, //  for not  showing  back buton
          headerTitle: () => (
        <Text style={{color:"white", fontSize:20,fontWeight:"bold",marginLeft:10}}>Complete Payment</Text>
      ),
      }};

    render () {
        return (<View><Text>Payment Page </Text></View>)
    }
}

export default PaymentScreen;