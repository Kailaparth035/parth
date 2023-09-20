import {
  ADD_BANQUET_AVAILIBILITY_REQUEST,
  ADD_BANQUET_AVAILIBILITY_RESPONSE,
} from '../Action/Type';

const initialState = {
  data: null,
  loading: false,
};

export const AddBanquetAvailibilyReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type} = action;

  switch (type) {
    case ADD_BANQUET_AVAILIBILITY_REQUEST:
      return {
        ...prevState,
        action: action,
        loading: true,
      };
    case ADD_BANQUET_AVAILIBILITY_RESPONSE:
      return {
        ...prevState,
        data: action.payload,
        loading: false,
      };
  }
  return prevState;
};
