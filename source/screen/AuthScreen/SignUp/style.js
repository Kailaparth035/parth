import {StyleSheet} from 'react-native';
import GlobalInclude from '../../../globalInclude/GlobalInclude';
import {scale} from '../../../constant/Scalling';

export default styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: scale(100),
    height: scale(100),
  },
  text: {
    color: GlobalInclude.Color.Black,
    fontSize: scale(20),
    fontWeight: '700',
    marginTop: scale(10),
  },
});
