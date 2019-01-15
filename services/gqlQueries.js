import gql from 'graphql-tag';

export const loginQuery = (username, password) => (
  gql`mutation {
    login(username: "${username}" password: "${password}")
    {
      success 
      info 
      user { username }
    }
  }`
);

export const registerQuery = (username, password) => (
  gql`mutation {
    register(username: "${username}" password: "${password}")
    {
      success
      info
      user { username }
    }
  }`
)

export const editUserQuery = (username, password) => (
  gql`mutation {
    editUser(username: "${username}" password: "${password}")
    {
      success
      info
      user { username }
    }
  }`
)

export const editUserDetailsQuery = (username, place, doc_id) => (
  gql`mutation {
    editUserDetails(username: "${username}" place: "${place}" doc_id: "${doc_id}")
    {
      success
      info
      user_details { place doc_id }
    }
  }`
)

export const removeUserDetailsQuery = (username) => (
  gql`mutation {
    removeUserDetails(username: "${username}")
    {
      success
      info
      user_details { place doc_id }
    }
  }`
)

export const readUserDetailsQuery = (username) => (
  gql`query {
    readUserDetails(username: "${username}")
    {
      success
      info
      user_details { place doc_id}
    }
  }`
)