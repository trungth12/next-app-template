const jwt_secret = process.env.HASURA_GRAPHQL_JWT_SECRET || '{"type":"HS256","key":"ae4daeb1e8bc693448bafb6b2a19f3dabff5a8fd69f0314932ed5d7775f3a0d8"}'
const hasura_secret = process.env.HASURA_GRAPHQL_ACCESS_KEY || 'tanphong'
const endpoint = process.env.ACCOUNTS_ENDPOINT
const domain = process.env.DOMAIN || 'localhost'
const { json, send, createError, run } = require('micro')
const fetch = require('isomorphic-unfetch')
const { query } = require('graphqurl');
const jwt = require('jsonwebtoken')
const cookie = require('cookie');
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://2dd7ed0bb5b24186b9658d20a557c127@sentry.io/1362680' });
/*
sample:
"eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5NzhhOTEzNDcyNjFhMjkxYmQ3MWRjYWI0YTQ2NGJlN2QyNzk2NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzQ4MjI3MDM1NzA4LXRlcjducjNja29rNzdqbjA4aDFzanRpcmNubzU5amtqLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzQ4MjI3MDM1NzA4LXRlcjducjNja29rNzdqbjA4aDFzanRpcmNubzU5amtqLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2NDQzNDg0ODM0NTE4NjY1NjMyIiwiZW1haWwiOiJjaGVja3JhaXNlcjExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoieWdSN1psODVNR01qT2d2SmtxN3FRZyIsIm5hbWUiOiJIYW1tZXIgSm9obiIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLUhjb3lzR21sQlZFL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FLeHJ3Y2JhNmpkak5odHRkRnpzZ09ZcWpzYzBtZE5scXcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkhhbW1lciIsImZhbWlseV9uYW1lIjoiSm9obiIsImxvY2FsZSI6InZpIiwiaWF0IjoxNTQ2MjQ5MjE5LCJleHAiOjE1NDYyNTI4MTksImp0aSI6IjhjZmEwYzc0YTMxYWI4YTljMjRjMTI0YjhjMjEwM2UyNjQ3M2QyNTUifQ.peOnqb9aIBJcloR0MNnk8lq8DhRVFkllr_SDIqzRQyY0fZKpx5EMlejuVidz0BvjYLsnSMHokv9eCNUrK28yT1my2orKCq8KlXVvFZVcXcQoHiLlt6KlG8DN1GXK1t52QLOMh5vIAkW4qVIUP5w-dnzVSEi6L8OBRCxixx8TsIXTvqgR3EUp5eWEkgM8gbzxzUKIH0Xud2Vr1GH-Wpa-pKrPKfEc2A1m4PtsTjlDxpcSo01ji7eK4kiwI1NKY6SmTJUYjvmzup7v7JxOoOzB7fKUpTvep_AZiqwfOOGGx2es-ey_STko6ZSCdNSCDPy9wkCjAQmHqC-4ik1OYO_56g"
*/
/*
https://mkjwk.org/
*/
const createHasuraJwtClaim = ({
  roles = ["user", "admin", "manager", "teacher"],
  userId,
  userName,
  admin
}) => {
  return {
    "sub": userId,
    "name": userName,
    "admin": admin,
    "roles": roles,
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
  insert_accounts(objects:[{
    email:$email,
    image_url:$imageUrl,
    name:$name,
    first_name:$firstName,
    last_name:$lastName
  }],on_conflict:{
    constraint:accounts_email_key,
    update_columns:image_url
  }){
    affected_rows
    returning{
      id
      userName:name
      is_admin
      is_teacher
      is_manager
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
  if (req.method !== 'POST') {
    send(res, 200, {})
  }
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
        endpoint,
        headers: {
          'X-Hasura-Access-Key': hasura_secret,
        }
      })
      const {
        id, 
        userName,
        is_admin,
        is_teacher,
        is_manager,
      } = data.insert_accounts.returning[0]
      let roles = ["user"]
      if (is_admin) roles.push("admin")
      if (is_teacher) roles.push("teacher")
      if (is_manager) roles.push("manager")

      const claim = createHasuraJwtClaim({userId:id, admin: is_admin, userName, roles})
      const jwtToken = jwt.sign(claim, jwt_secret)      
      const cookieOptions = {
        domain,
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }
      const tokenCookie = cookie.serialize('token', String(jwtToken), cookieOptions)
      const roleCookie = cookie.serialize('role', String("user"), cookieOptions)
      res.setHeader('Set-Cookie', [tokenCookie, roleCookie]);      
      send(res, 200, { token: jwtToken })
    } else {
      send(res, response.status, response.statusText)
    }
  } catch (error) {
    Sentry.captureException(error);
    throw createError(error.statusCode, error.statusText)
  }
}

const handler = (req, res) => run(req, res, login)

if (!process.env.NOW_REGION) {
  var http = require('http');
  http.createServer(login).listen(3001);
}

module.exports = handler
