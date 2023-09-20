import React from 'react';
import {View, Text, Image} from 'react-native';
import GlobalInclude from '../../../globalInclude/GlobalInclude';
import {scale} from '../../../constant/Scalling';
import style from './style';

const SignUp = () => {
  return (
    <View style={style.conatiner}>
      <Image source={GlobalInclude.Assets.Angry} style={style.image} />
      <Text style={style.text}>{GlobalInclude.String.signUp}</Text>
    </View>
  );
};
export default SignUp;
