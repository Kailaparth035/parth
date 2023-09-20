import NetInfo from '@react-native-community/netinfo';
import ApiConstants from './ApiContstants';
import {Method} from './ApiMethod';

export async function adminApiCall(bodyData, api) {
  try {
    const isConnected = await NetInfo.fetch();

    if (isConnected.isConnected) {
      return fetch(ApiConstants.ADMIN_BASE_URL + api, {
        method: Method.POST,
        body: bodyData,
      });
    } else {
    }
  } catch (error) {}
}

export async function adminWithoutBodyApiCall(api) {
  try {
    const isConnected = await NetInfo.fetch();

    if (isConnected.isConnected) {
      return fetch(ApiConstants.ADMIN_BASE_URL + api, {
        method: Method.POST,
      });
    } else {
    }
  } catch (error) {}
}

export async function withoutadminApiCall(api) {
  try {
    const isConnected = await NetInfo.fetch();

    if (isConnected.isConnected) {
      return fetch(ApiConstants.ADMIN_BASE_URL + api, {
        method: Method.POST,
      });
    } else {
    }
  } catch (error) {}
}

export async function LiveApiCall(header, api, bodyData) {
  try {
    const isConnected = await NetInfo.fetch();

    if (isConnected.isConnected) {
      return fetch(ApiConstants.LIVE_BASE_URL + api, {
        method: Method.POST,
        headers: header,
        body: JSON.stringify(bodyData),
      });
    } else {
    }
  } catch (error) {}
}

export async function LiveGetApiCall(header, api) {
  try {
    const isConnected = await NetInfo.fetch();

    if (isConnected.isConnected) {
      return fetch(ApiConstants.LIVE_BASE_URL + api, {
        method: Method.GET,
        headers: header,
      });
    } else {
    }
  } catch (error) {}
}
