import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Alert, Button, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { startNewOrder } from '../services/OrderService';
import { getMenuData } from '../services/MenuService';
import { hr80, incdecbtn, incdecinput, incdecout } from '../src/globals/style';
import { colors } from '../src/globals/style';


export default function MenuScreen({ route }) {
  //navigation
  const navigation = useNavigation();


  const { tableId } = route.params;

  //state
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const[quantity, setQuantity] = useState('0');


  const addItemToOrder = (item) => {

    
    // add item if it does not already exist
    let existingItem = null;
    for (const orderItem of selectedItems) {
      if (orderItem.id === item.id) {
        existingItem = orderItem;
        break;
      }
    }


    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        //qty: existingItem.qty + 1
        qty: existingItem.qty + 1
      };

      console.log(quantity)

      const updatedItems = selectedItems.map((i, index) => {
        if (i.id === updatedItem.id) {
          return updatedItem;
        } else {
          return i;
        }
      });

      setSelectedItems(updatedItems);
    } else {
      // otherwise, increase qty if it does
      setSelectedItems((prevItems) => [...prevItems, {
        ...item,
        qty: 1
      }]);
    }


  };

  async function save() {

    const order = {

      TableId: tableId,
      Items: selectedItems,

    }

    try {
      const orderData = await startNewOrder(order);
      navigation.navigate('OrderDetail', { orderData });


      // update state for order data
      const newOrderData = data.concat(orderData);
      setData(newOrderData);


      Alert.alert('The order was saved successfully!');
    } catch (error) {
      // const validationErrors = error.validationErrors;
      // const errorMessage = validationErrors.join('\n');
      //Alert.alert(errorMessage);
    }
  }

  useEffect(() => {
    getMenuData().then(setProducts).catch(e => Alert.alert(e));
  }, []);

  const renderProduct = p => {
    let item = p.item;

    const increaseQuantity = () => {
      setQuantity((parseInt(quantity)+1).toString())
    }
    const decreaseQuantity = () => {
      if(parseInt(quantity)>1){
        setQuantity((parseInt(quantity) - 1).toString())
      }
    }

     return <TouchableOpacity style={styles.menuItem} onPress={() => addItemToOrder(item)}>
       <Text style={styles.menuItemText}>{item.itemName}</Text>
       <View style={styles.container3}>
             <View style={hr80}></View>
             <Text style={styles.txt5}>Food Quantity</Text>
             <View style={incdecout}>
               <Text style={incdecbtn} onPress={()=>increaseQuantity()}>+</Text>
               <TextInput style={incdecinput} value={quantity} />
               <Text style={incdecbtn} onPress={()=>decreaseQuantity()}>-</Text>
           </View>
           <View style={hr80}></View>
         </View>
     </TouchableOpacity>
   }


  return <View style={styles.container}>
    <Text>Table ID: {tableId}</Text>
    <FlatList 
    data={products} 
    renderItem={renderProduct} 
    keyExtractor={(item) => item.id} />

    <Button title='Place order' onPress={save}


    />
  </View>






}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    //alignItem:'center',
    width:"100%",
  },
  container1:{
    //position:'absolute',
    top:5,
    flex:1,
    backgroundColor:"#fff",
    alignItem:'center',
    justifyContent:'center',
  },
  s1:{
    width:'100%',
    height:300,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  cardimgin:{
    width:'100%',
    height:'100%',
  },
  s2:{
    width:'100%',
    padding:20,
  },
  s2in:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10,
  },
  head1:{
    fontSize:20,
    fontWeight:'500',
    color:colors.text1,
    width:220,
    marginRight:10,
  },
  head2:{
    fontSize:20,
    fontWeight:'200',
    color:colors.text3,
  },
  s3:{
    width:'95%',
    backgroundColor: colors.text1,
    padding:20,
    borderRadius:10,
    marginLeft:'2.5%',
  },
  head3:{
    fontSize:30,
    fontWeight:'200',
    color:colors.col1,
  },
  head4:{
    marginVertical:10,
    fontSize:20,
    fontWeight:'400',
    color: colors.col1,
  },
  s3in:{
    backgroundColor: '#fff',
    padding:10,
    borderRadius:10,
    width:100,
    flexDirection:'row',
    justifyContent:'center',
    alignItem:'center',
  },
  head5:{
    color: colors.text3,
    fontSize:20,
    fontWeight: '200',
    marginLeft:10,
  },
  btnout:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    // marginTop:10,
    flexDirection:'row',
  },
  btntxt:{
    color: '#fff',
    paddingHorizontal:10,
    paddingVertical:5,
    fontSize:20,
    borderRadius:10,
    width:'90%',
    textAlign:'center',
  },
  container2:{
    width: '90%',
    backgroundColor: colors.col1,
    padding:20,
    borderRadius:20,
    alignSelf: 'center',
    marginVertical:5,
    elevation:10,
    alignItems:'center',
  },
  txt1:{
    color: colors.text1,
    fontSize:20,
    fontWeight:'200',
  },
  txt2:{
    color: colors.text3,
    fontSize:30,
    fontWeight:'200',
    marginVertical:10,
  },
  container2in:{
    flexDirection:'row',
    alignItems: 'center',
  },
  txt3:{
    color: 'red',
    fontSize:16,
    width:'30%',
    textAlign: 'center',
  },
  dash:{
    width:1,
    height:20,
    backgroundColor: colors.text1,
    marginHorizontal:10,
  },
  container3:{
    width:'100%',
    alignItems:'center',
    // justifyContent:'center',
  },
  txt5:{
    color: 'red',
    fontSize:18,
    // width:'30%',
    textAlign: 'center',
  },
  container4:{
    width:'90%',
    alignSelf:'center',
    alignItems:'center',
  },
  c4in:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:'100%',
    alignItems:'center',
  },
  txt6:{
    color: 'red',
    fontSize:25,
    // width:'30%',
    textAlign: 'center',
  },
})
