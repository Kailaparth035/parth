import React from 'react';
import {View, Text, Image} from 'react-native';
import GlobalInclude from '../../../globalInclude/GlobalInclude';
import {scale} from '../../../constant/Scalling';
import style from './style';

const Login = () => {
  return (
    <View style={style.conatiner}>
      <Image source={GlobalInclude.Assets.Angry} style={style.image} />
      <Text style={style.text}>{GlobalInclude.String.login}</Text>
    </View>
  );
};
export default Login;
