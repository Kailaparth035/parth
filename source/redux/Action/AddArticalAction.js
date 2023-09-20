import * as TYPES from './Type';

export function AddEditArticalResponse(data) {
  return {
    type: TYPES.ADD_EDIT_ARTICAL_RESPONSE,
    payload: data,
  };
}

export function AddEditArticalRequest(data, navigation) {
  return {
    type: TYPES.ADD_EDIT_ARTICAL_REQUEST,
    data: data,
    navigation: navigation,
  };
}
