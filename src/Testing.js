import React, {useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {data} from './const';

const Testing = () => {
  const [menuItems, setMenuItems] = useState(data);

  const selectItem = index => {
    let temp = menuItems;
    if (temp[index].isFavorite === false) {
      temp[index].isFavorite = true;
    } else {
      temp[index].isFavorite = false;
    }
    setMenuItems([...temp]);
  };
  return (
    <View style={{flex: 1}}>
      <Text>123</Text>
      <FlatList
        data={menuItems}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: !item.isFavorite ? 'white' : 'red',
                padding: 5,
                margin: 3,
              }}
              onPress={() => selectItem(index)}>
              <Text style={{color: 'black'}}>{item.name}</Text>
              <Text style={{color: 'black'}}>{item.price}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Testing;
