import React  from "react";
import DetailsScreen from "../Component/Shop/Shop.index";
import { Container, View,  Input } from "native-base";
import { Text,AsyncStorage } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import _ from "lodash";
import {Button} from 'native-base';


const ProductList = [
  {
    pid: 1,
    productName: "Parle G Biscuit",
    quantity: "100 G",
    price: 5,
    consumerQuant:0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhZ9RxLxBMDK0LRhLs6nBQUTiIv7ouqqVFhyXqWujTWMN5idN2"
  },
  {
    pid: 2,
    productName: "Maggie",
    quantity: "100 G",
    price: 10,
    consumerQuant:0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVh2W6MqvLVxhkILpqbQhklV9nA-WoQf-fyuvIYGRKptnPCoVP"
  },
  {
    pid: 3,
    productName: "Nivea Deo ",
    quantity: "150 G",
    price: 300,
    consumerQuant:0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKH9KGj6dEA1oHMuB1NP1eLoWMxoeJ4zCo7HcK9Lo-S-n2LcVN"
  },
  {
    pid: 5,
    productName: "Cinthol Deo",
    quantity: "150 G",
    price: 400,
    consumerQuant:0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkp1f2se9UFAvdgRf4kW9cMnDasikE1k-JvnQ31n8UE55I8Eyn"
  },
  ,
  {
    pid: 4,
    productName: "Cinthol Deo",
    quantity: "150 G",
    price: 400,
    consumerQuant:0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkp1f2se9UFAvdgRf4kW9cMnDasikE1k-JvnQ31n8UE55I8Eyn"
  },
  {
    pid: 6,
    productName: "Cinthol Deo",
    quantity: "150 G",
    price: 400,
    consumerQuant:0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkp1f2se9UFAvdgRf4kW9cMnDasikE1k-JvnQ31n8UE55I8Eyn"
  },
  {
    pid: 7,
    productName: "Cinthol Deo",
    quantity: "150 G",
    price: 400,
    consumerQuant:0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkp1f2se9UFAvdgRf4kW9cMnDasikE1k-JvnQ31n8UE55I8Eyn"
  },
  {
    pid: 8,
    productName: "Cinthol Deo",
    quantity: "150 G",
    price: 400,
    consumerQuant:0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkp1f2se9UFAvdgRf4kW9cMnDasikE1k-JvnQ31n8UE55I8Eyn"
  },
  {
    pid: 9,
    productName: "Cinthol Deo",
    consumerQuant:0,
    quantity: "150 G",
    price: 400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkp1f2se9UFAvdgRf4kW9cMnDasikE1k-JvnQ31n8UE55I8Eyn"
  }
];
const ProductArray = [];

interface state {
  count:Number,
  valuet:0,
  filteredProductList:any,
  unfilteredProduct : any
}

interface NavigationNavigatorProps {
  navigate:any,
  navigation:any
}


class ShopDisplay extends React.Component<NavigationNavigatorProps,state> {


  constructor(props){
    super(props);
    this.state = {
      count : 0,
      valuet:0,
      filteredProductList : [],
      unfilteredProduct:[]
    }
  }

 
  static navigationOptions =({ navigation }) => {
    return {
      headerLeft: null,
      headerTitle: () => (
    <Input
      onChange={navigation.getParam('increaseCount')}
      placeholder="Search Product"
      placeholderTextColor="c9d1d3"
      style={{color:"#ffdc34",fontWeight:"bold"}}

      title="Press Me"
    />
  ),
  }};
  
 async componentDidMount() {
  console.log('asasas');
  let selectedItem = [];
  let item = null;
  let res = [];
  try {
     item =await AsyncStorage.getItem('AddedProduct');

     selectedItem =JSON.parse(item);
     res = ProductList.map(obj => selectedItem.find(o => o.pid === obj.pid) || obj);
     this.setState({
      filteredProductList:res,
      unfilteredProduct:res
    })
  } catch (error) {
    this.setState({
      filteredProductList:ProductList,
      unfilteredProduct:ProductList
    })
  }  
  
  
 

  console.log(this.state.filteredProductList);
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }
  _increaseCount = async (e) => {
    // this.setState({ count: this.state.valuet + 1 });
    
    await this.filterItem(e.nativeEvent.text);
    // console.log(this.state.valuet);
  };
   addItem = async e => {
    let ProductInfo = e.data;
    let ProductState = e.state;
    let currProduct = {
      pid: ProductInfo.pid,
      image:ProductInfo.image,
      productName: ProductInfo.productName,
      price: ProductInfo.price,
      quantity: ProductInfo.quantity,
      consumerQuant: ProductState.quantity
    };


    await pushToArray(ProductArray,currProduct);
  let price = 0;

    await ProductArray.map(e=>{
      price +=  e.price * e.consumerQuant;
    })

    AsyncStorage.setItem('AddedProduct',JSON.stringify(ProductArray));
  this.setState({count:price})
  };
  
  filterItem =async (productinfo) =>{
console.log('Filter Product');
    let filteredData = this.state.unfilteredProduct.filter((e)=>{
       let item = e.productName.toLowerCase();
      return item.includes(productinfo.toLowerCase())
    })
    if (filteredData)
    {
      
      this.setState({
        filteredProductList:filteredData
      })
    }
    else {
        await  this.setState({
        filteredProductList:this.state.unfilteredProduct
      })
    }
  
  }
  render () {
    return (
      <>
      <Container>
        <ScrollView>
          {this.state.filteredProductList.map((e, key) => {
            return <DetailsScreen pd={e} uk={key} onAdd={this.addItem} />;
          })}
        </ScrollView>
       {this.state.count !=0 ?  <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          <Button style={{ justifyContent: "center" }} title={"Hello Payemnt"} onPress={() => this.props.navigation.navigate('Payment')} success>
            <Text style={{ color: "white", fontSize: 25 }}>Pay   {this.state.count !=0 ? '₹ '+this.state.count  : ''}</Text>
          </Button>
        </View> :<></>}
      </Container>
      </>
    );
  }
  
};

function pushToArray(arr, obj) {
  const index = arr.findIndex((e) => e.pid === obj.pid);

  if (index === -1) {
      arr.push(obj);
  } else {
      arr[index] = obj;
  }
}

export default ShopDisplay;
