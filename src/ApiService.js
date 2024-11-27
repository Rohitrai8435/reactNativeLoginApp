import axios from "axios";
const ApiService = axios.create({
  baseURL: 'https://dashboard.shrotitele.com/apitpms/tpiamsApi/',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const getLogin = async (login_id, password) => {
  try {
    const response = await ApiService.post('login', {login_id, password});
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAlaramData = async (
  imei,
  aid,
  ctm_id,
  s_date,
  e_date,
  usertype,
  client_version,
) => {
  try {
    const response = await ApiService.post('getAlarmLogByImei', {
      imei,
      aid,
      ctm_id,
      s_date,
      e_date,
      usertype,
      client_version,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};