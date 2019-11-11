import React from "react";
import { StyleSheet,Image, Dimensions,Keyboard,Text, KeyboardAvoidingView } from "react-native";

import {
  Container,
  Grid,
  Card,
  Item,
  Input,
  Button,
  Icon,
  ListItem,
  List,
  Header,
  Left,
  Title,
  Body,
  Right,
  Content} from "native-base";
 
  import {  NavigationNavigatorProps } from 'react-navigation';
import SvgComponent from "../../utils/svg/Login.background";

import logo from "../../assets/logo.png";
  interface State {
    isReady:boolean,
    showSocial:boolean,
    submit:true
  }
  interface NavigationNavigatorProps {
    navigate:any,
    navigation:any
  }
var width = Dimensions.get("window").width; //full width

class LoginForm extends React.Component<NavigationNavigatorProps,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      isReady: false,
      showSocial:true,
      submit : false
    };
  }
  static navigationOptions = {
    title: 'Shivola App',
    /* No more header config here! */
  };

  getPhoneNumber  =(e:any)=> {
    console.log(e.nativeEvent.text);
    let mobNumber = e.nativeEvent.text;
    if  (mobNumber)
    {
      this.setState({
        showSocial:false
      })
     if( mobNumber.length ==10 ){
      Keyboard.dismiss();
      this.setState({
        submit : true
      })
      }
      else {
        this.setState({
          submit : false
        })
      }
    }
    else{
      this.setState({
        showSocial:true
      })
    }
  }
 

  render() {
   
    
    return (
     
      <KeyboardAvoidingView behavior="padding" enabled> 
        <SvgComponent></SvgComponent>
      
        <Grid style={styles.container}>
          <List>
            <ListItem style={styles.logoImage} noIndent>
            <Image  source={logo}></Image>
            </ListItem>
            <ListItem style={styles.listElement} noIndent>
              <Card style={styles.loginTextFields}>
                <Item regular style={styles.textItem}>
                  <Input
                    placeholder="Enter Mobile Number"
                    keyboardType="numeric"
                  
                    onChange={this.getPhoneNumber}
                  />
                </Item>
              </Card>
            </ListItem>
            {this.state.showSocial ? <><ListItem style={styles.listElement} noIndent>
              <List style={styles.socialButton}>
                <Button style={{borderRadius:10}} full danger>
                <Icon name='logo-google' />
                  <Text style={{fontSize:15,color:"white",fontWeight:"500"}}>Login</Text>
                </Button>
              </List>
            </ListItem>
            <ListItem style={styles.listElement} noIndent>
              <List style={styles.socialButton} >
                 <Button style={{borderRadius:10}}  full info>
                 <Icon name='logo-facebook' />
                    <Text style={{fontSize:15,color:"white",fontWeight:"500"}}>Login</Text>
                    
                  </Button>
               </List>
            </ListItem></>:<><ListItem style={styles.listElement} noIndent>
              <List style={styles.socialButton}>
                <Button title="Go to Details"  onPress={() => this.props.navigation.navigate('Detaild')}  style={{borderRadius:10}} full dark disabled={this.state.submit ? false: true}>
               
                  <Text style={{fontSize:15,color:"white",fontWeight:"500"}}>Login with Number</Text>
                  
                </Button>
              </List>
            </ListItem></>}
            
          </List>
        </Grid>
        </KeyboardAvoidingView>
     
    );
  }
}

const styles = StyleSheet.create({
 
  logoImage:{
    borderBottomColor: "rgba(52, 52, 52, 1.0)",
    borderBottomWidth:0,
justifyContent:"center"
  },
  container: {
    flex: 1,
    position:"absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    marginTop: 0
  },
  textItem: {
    width: width - 60,
    borderColor: "white",
    borderRadius: 20
  },
  loginTextFields: {
    borderRadius: 20,
    
  },
  listElement: {
    borderBottomColor: "rgba(52, 52, 52, 1.0)",
    borderBottomWidth:0,
    borderWidth:0,
    width: width - 60,
  },
  socialButton: {
    borderRadius: 20,
    width: width - 60,
    borderWidth:0
    
  }
});

export default LoginForm;
