import {fetchWrapper, formatData, stringify} from './utils';
import {
  loginQuery, 
  registerQuery, 
  editUserQuery, 
  editUserDetailsQuery, 
  removeUserDetailsQuery,
  readUserDetailsQuery,
  getDocDetailsQuery,
  uploadDocQuery
} from './gqlQueries';

export const loginGQL = (username, password) => {
  let queryString = stringify(loginQuery(username, password));
  let data = formatData(queryString);
  return fetchWrapper(data);
};

export const registerGQL = (username, password) => {
  let queryString = stringify(registerQuery(username, password));
  let data = formatData(queryString);
  return fetchWrapper(data);
}

export const editUserGQL = (username, password) => {
  let queryString = stringify(editUserQuery(username, password));
  let data = formatData(queryString);
  return fetchWrapper(data);
}

export const editUserDetailsGQL = (username, place, doc_id) => {
  let queryString = stringify(editUserDetailsQuery(username, place, doc_id));
  let data = formatData(queryString);
  return fetchWrapper(data);
}

export const removeUserDetailsGQL = (username) => {
  let queryString = stringify(removeUserDetailsQuery(username))
  let data = formatData(queryString);
  return fetchWrapper(data);
}

export const readUserDetailsGQL = (username) => {
  let queryString = stringify(readUserDetailsQuery(username))
  let data = formatData(queryString);
  return fetchWrapper(data);
}

export const getDocDetailsGQL = (username) => {
  let queryString = stringify(getDocDetailsQuery(username));
  let data = formatData(queryString);
  return fetchWrapper(data);
}

export const uploadDocGQL = (username, type, file) => {
  let queryString = stringify(uploadDocQuery(username, type, file));
  let data = formatData(queryString);
  return fetchWrapper(data);
}