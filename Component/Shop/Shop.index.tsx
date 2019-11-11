import React, { Component } from "react";
import { Text } from "react-native";
import {
  
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Grid,
  Icon
} from "native-base";

// import { NavigationNavigatorProps } from "react-navigation";

interface State {
  quantity: Number;
  inCart: boolean;
}
interface props {
  onAdd: any;
  pd: any;
  uk: any;
}
export default class DetailsScreen extends Component<props, State> {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      inCart: false
    };
  }

  componentDidMount() {
    console.log(this.props);
  }
  addItem = async e => {
    await this.setState({
      quantity: e == 0 ? e + 2 : e + 1
    });
    this.props.onAdd({ state: this.state, data: this.props.pd });
  };
  removeItem = async e => {
    if (e == 1) {
      await this.setState({
        inCart: false,
        quantity: 0
      });
      this.props.onAdd({ state: this.state, data: this.props.pd });
    } else {
      await this.setState({
        quantity: e - 1
      });
      this.props.onAdd({ state: this.state, data: this.props.pd });
    }
  };

  
  addInCart = async () => {
    this.setState({
      inCart: true
    });
    await this.setState({
      quantity: 1
    });

    this.props.onAdd({ state: this.state, data: this.props.pd });
  };
  render() {
    return (
      <ListItem key={"list" + this.props.uk} thumbnail>
        <Left>
          <Thumbnail
            square
            key={"Th" + this.props.uk}
            source={{
              uri: this.props.pd.image
            }}
          />
        </Left>
        <Body key={"Body" + this.props.uk}>
          <Text
            key={"pName" + this.props.uk}
            style={{ fontWeight: "bold", fontSize: 18 }}
          >
            {this.props.pd.productName || "No Name"}
          </Text>
          <Text
            key={"pQuant" + this.props.uk}
            style={{ fontWeight: "700", fontSize: 18 }}
            numberOfLines={1}
          >
            {this.props.pd.quantity}
          </Text>
          <Text
            key={"pPrice" + this.props.uk}
            style={{ fontWeight: "bold", fontSize: 18 }}
            numberOfLines={1}
          >
            ₹ {this.props.pd.price}
          </Text>
        </Body>
        <Right>
          {(!this.state.inCart && this.props.pd.consumerQuant == 0) ? (
            <Button
              key={"pAdd" + this.props.uk}
              onPress={this.addInCart}
              style={{ padding: 20 }}
              danger
            >
              <Text key={"pAddText" + this.props.uk} style={{ color: "white" }}>
                Add
              </Text>
            </Button>
          ) : (
            <>
              <Grid
                key={"pAddGrid" + this.props.uk}
                style={{ paddingTop: 20, paddingBottom: 20 }}
              >
                <Button
                  key={"pAddPlus" + this.props.uk}
                  onPress={() => this.removeItem(this.state.quantity)}
                  style={{ borderRadius: 10 }}
                  danger
                  bordered
                  disabled={this.state.quantity == 0 ? true : false}
                >
                  <Icon name="ios-remove" />
                </Button>

                <Text
                  key={"pQuantityPlus" + this.props.uk}
                  style={{
                    fontSize: 30,
                    paddingRight: 15,
                    paddingLeft: 15,
                    fontWeight: "normal"
                  }}
                >
                  {(this.props.pd.consumerQuant != 0 ? this.props.pd.consumerQuant+this.state.quantity-1 : this.state.quantity) || 1}
                </Text>

                <Button
                  key={"pQuantityMinus" + this.props.uk}
                  onPress={() => this.addItem(this.state.quantity)}
                  style={{ borderRadius: 10 }}
                  success
                  bordered
                >
                  <Icon
                    key={"pQuantityMinusIcon" + this.props.uk}
                    name="ios-add"
                  />
                </Button>
              </Grid>
            </>
          )}
        </Right>
      </ListItem>
    );
  }
}
