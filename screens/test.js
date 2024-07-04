import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView,Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { startNewOrder } from '../services/OrderService';
import { getMenuData } from '../services/MenuService';
import { hr80, incdecbtn, incdecinput, incdecout } from '../src/globals/style';
import { colors } from '../src/globals/style';

export default function TestScreen() 

{const ListItem = ({ item, onSubtract, onAdd }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
      <Text>{item.name} - </Text>
      <Text>{item.price}</Text>
    </View>
    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
      <Button title="Subtract" onPress={onSubtract} />
      <Text>{item.quantity}</Text>
      <Button title="Add" onPress={onAdd} />
    </View>
  </View>
);
  
  
  
  
  const [products, setProducts] = React.useState([
  { _id: 1, name: 'Item 1', price: 50, quantity:0},
  { _id: 2, name: 'Item 2', price: 29, quantity: 0 },
  { _id: 3, name: 'Item 3', price: 200,quantity:0},
]);

const onSubtract = (item, index) => {
  const nextProducts = [...products];
  nextProducts[index].quantity -= 1;
  setProducts(nextProducts);
};

const onAdd = (item, index) => {
  const nextProducts = [...products];
  nextProducts[index].quantity += 1;
  setProducts(nextProducts);
};

let totalQuantity = 0;
let totalPrice = 0;
products.forEach((item) => {
  totalQuantity += item.quantity;
  totalPrice += item.quantity * item.price;

});


return (
  <SafeAreaView style={{ flex: 1 }}>
    <FlatList
      data={products}
      renderItem={({ item, index }) => (
        <ListItem
          item={item}
          onSubtract={() => onSubtract(item, index)}
          onAdd={() => onAdd(item, index)}
        />
      )}
      keyExtractor={(item) => item._id}
    />
    <Text>Total Quantity: {totalQuantity}</Text>
    <Text>Total Price: {totalPrice}</Text>
  </SafeAreaView>
);
};


