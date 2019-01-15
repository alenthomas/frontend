import {fetchWrapper, formatData, stringify} from './utils';
import {
  loginQuery, 
  registerQuery, 
  editUserQuery, 
  editUserDetailsQuery, 
  removeUserDetailsQuery
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