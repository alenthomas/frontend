const API = '/api';

export const fetchWrapper = (data, url=API, method='POST') => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(data => data.json())
};

export const stringify = (gqlObj) => (gqlObj.loc.source.body);
export const formatData = (data) => ({query: data});