import Axios from 'axios';

export const JPlaceholderClient = Axios.create({
  baseURL: process.env.REACT_APP_JSON_PLACEHOLDER,
});

export const DebitClientApi = Axios.create({
  baseURL: process.env.REACT_APP_DEBITS_CLIENT_API,
});
