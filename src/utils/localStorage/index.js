import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};


export const apiURL = 'https://sejiwa.okeadmin.com/api/';
export const MYAPP = 'SEJIWA';
export const api_token = 'd4e729bcd8aab6f0a710e8ca3d31524cb5783dd1d63ddbf32fbed278c435605f';
export const webURL = apiURL.replace("api/", "");
export const webPDF = apiURL.replace("api/", "assets/pdf/");
export const registerExpress = 'http://192.168.60.19:3000/register';
export const loginExpress = 'http://192.168.60.19:3000/login';
export const pasien = "http://192.168.60.19:3000/pasien";
export const getdataPasien = "http://192.168.60.19:3000/api/getDataPasien";
export const rekamanDataPasien = "http://192.168.60.19:3000/api/rekamanData"
export const getRekamanDataPasien = "http://192.168.60.19:3000/api/rekaman_data"
export const getHasilRekamanDataPasien = "http://192.168.60.19:3000/api/getHasilRekaman"
