import {put, call} from 'redux-saga/effects';
import ReduxActions from '../Services/ReduxActions';
import {LiveGetApiCall} from '../Services/CommonApi';
import {AddBanquetAvailibilityResponse} from '../Action/AddBanquetAvailibilityAction';
import {SCREENS} from '../../Utils/Constant/NavigationConstant';
import GlobalInclude from '../../globalInclude/GlobalInclude';
import {KEY} from '../../Utils/Constant/AsyncKey';
export function* AddBanquetAvailibiltySaga(action) {
  try {
    let header = {
      auth_token: action.token,
    };

    const response = yield call(
      LiveGetApiCall,
      header,
      `GetBanquetAvability?date=${action.Date}&vNucode=${action.vnu}`,
    );

    let responseJson = yield response.json();

    if (responseJson.response_code === 200) {
      yield put(AddBanquetAvailibilityResponse(responseJson.data));
    } else if (responseJson.response_code === 401) {
      if (responseJson.data === 'Invalid token or token expired') {
        action.navigation.reset({
          index: 0,
          routes: [
            {
              name: SCREENS.AUTH_NAVIGATOR,
            },
          ],
        });
        GlobalInclude.AsyncStorage.removeItem('KEY.TOKEN');
        yield put(ReduxActions.AddEditArticalResponse(null));
      }
    } else {
    }
    // yield put(LoaderAction(false));
  } catch (err) {
    // yield put(LoaderAction(false));
  }
}
