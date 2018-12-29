const { json, send, createError, run } = require('micro')
const fetch = require('isomorphic-unfetch')
const { query } = require('graphqurl');
const jwt = require('jsonwebtoken')
/*
https://mkjwk.org/
*/
const createHasuraJwtClaim = ({
  roles = ["user", "admin"],
  userId,
  userName,
  admin
}) => {
  return {
    "sub": userId,
    "name": userName,
    "admin": admin,
    "iat": new Date().getTime() / 1000,
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": roles,
      "x-hasura-default-role": "user",
      "x-hasura-user-id": userId,
    }
  }
}
const hasuraQuery = `
mutation CreateUser($email:String!,$name:String!,$imageUrl:String,$firstName:String!,$lastName:String!){
  insert_sche_users(objects:[{
    email:$email,
    image_url:$imageUrl,
    name:$name,
    first_name:$firstName,
    last_name:$lastName
  }],on_conflict:{
    constraint:sche_users_email_key,
    update_columns:image_url
  }){
    affected_rows
    returning{
      id
      userName:name
      admin:is_admin
    }
  }
}`
/*
{
  "email": "checkraiser11@gmail.com",
  "name": "Dung",
  "imageUrl": "",
  "firstName": "Truong",
  "lastName": "Dung"
}
*/
const login = async (req, res) => {
  const { id_token } = await json(req)
  const googleVerifyUri = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`

  try {
    const response = await fetch(googleVerifyUri)
    if (response.ok) {
      const { 
        name, 
        email, 
        picture
      } = await response.json()

      const firstName = name.split(' ').slice(0, -1).join(' ');
      const lastName = name.split(' ').slice(-1).join(' ');

      const variables = {
        name, email, imageUrl:picture, firstName, lastName
      }

      const {data} = await query({
        query: hasuraQuery,
        variables,
        endpoint: 'https://edu-1.herokuapp.com/v1alpha1/graphql',
        headers: {
          'X-Hasura-Access-Key': process.env.HASURA_GRAPHQL_ACCESS_KEY,
        }
      })
      const {id, admin, userName} = data.insert_sche_users.returning[0]
      const roles = ["user"]
      if (admin) roles.push("admin")
      const claim = createHasuraJwtClaim({userId:id, admin, userName, roles})
      const jwtToken = jwt.sign(claim, process.env.HASURA_GRAPHQL_JWT_SECRET)      
      send(res, 200, { token: jwtToken })
    } else {
      send(res, response.status, response.statusText)
    }
  } catch (error) {
    throw createError(error.statusCode, error.statusText)
  }
}

const handler = (req, res) => run(req, res, login)
module.exports = handler
