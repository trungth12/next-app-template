const fetch = require('isomorphic-unfetch')
const { query } = require('graphqurl');
const jwt = require('jsonwebtoken')
const {inspect} = require('util')

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
const login = async ({id_token}) => {
  const googleVerifyUri = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`

  try {
    const response = await fetch(googleVerifyUri)
    if (response.ok) {
      const t = await response.json()
      console.log(inspect(t))
      const { 
        name, 
        email, 
        picture
      } = t

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
          'X-Hasura-Access-Key': 'tanphong'
        }
      })
      
      const {id, admin, userName} = data.insert_sche_users.returning[0]
      console.log(id)
      console.log(admin)
      console.log(userName)
      let roles=["user"]
      if (admin) roles.push("admin")
      const secret = '{"type":"HS256","key":"ae4daeb1e8bc693448bafb6b2a19f3dabff5a8fd69f0314932ed5d7775f3a0d8"}'
      const claim = createHasuraJwtClaim({userId:id, admin, userName, roles})
      const jwtToken = jwt.sign(claim, secret) 
      console.log(jwtToken)
    } else {
      console.log(response.statusText)
      //send(res, response.status, response.statusText)
    }
  } catch (err) {
    console.log(err)
  }
}
/*
login({
  id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5NzhhOTEzNDcyNjFhMjkxYmQ3MWRjYWI0YTQ2NGJlN2QyNzk2NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzQ4MjI3MDM1NzA4LXRlcjducjNja29rNzdqbjA4aDFzanRpcmNubzU5amtqLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzQ4MjI3MDM1NzA4LXRlcjducjNja29rNzdqbjA4aDFzanRpcmNubzU5amtqLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2NDQzNDg0ODM0NTE4NjY1NjMyIiwiZW1haWwiOiJjaGVja3JhaXNlcjExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiRmQxRENGRk45WlltQURnNVVtX3BEZyIsIm5hbWUiOiJIYW1tZXIgSm9obiIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLUhjb3lzR21sQlZFL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FLeHJ3Y2JhNmpkak5odHRkRnpzZ09ZcWpzYzBtZE5scXcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkhhbW1lciIsImZhbWlseV9uYW1lIjoiSm9obiIsImxvY2FsZSI6InZpIiwiaWF0IjoxNTQ2MDc5MTY2LCJleHAiOjE1NDYwODI3NjYsImp0aSI6ImZhNmQ0N2ZkZmNmZjcwMDJhZGRhNDhkNzg1ZjJjMDhkNDVkZGE1MGYifQ.RDAOxFcw-m_KeI0ubAfv_Vozq5uPcBjluZfbpPRI293zj-2MB-Aa2scZ8NPNs0C6Ejr5-S9KIl-d15IXBN0y2KVQBl4kpGEOWbi4W3j0wt76eqveEHH5oXgk_bLLVyLXILEdtldqPX1lefAxoNLG17BcuMPlhn3CBXTMitgt7RdwWByuE8lYOM1UMa39ns1Wbzf7M3F-0apL387caTqvJLl_NMF6zUwDrKBdPQXbVjpZKC_awy1LoRjR5VKNzC9NvCxq8YkDwhu77RlU9bSU8OpfZgW9gKdWWbgEyEgVLJsMVpWcoS_tYUIQgWZcK4U8T2TmO8D7ZjFrUIc6vvlYCA"
})
*/


const secret = '{"type":"HS256","key":"anx0bMh8q2ZmVrpQEEFVbRSFjj8LHhJGrdTFJNyDGqRT9KvKmWhWXaO-HSh3-8NJBL3lLb_y-ZxJ9ip6H-rNe1x3Wrx4VVG9YAPyp1XogMdTs1C_jr6kxH2g9I_GTBzhsccJUh3XlD0ZRNmUqPNUevNp5ugzQSm_yBhDbAwtn-kv0BQ9OPURgHXuE4n7oK2AMImTQynKY4NcxHlPTL2w9oWug0D-gDTi15Q_RLsX3RFlAlR9fGBnIt_3807lBX4JWHQDU8F_qMpTQekvEDp3oWCehFfAdgupeAY-ARMHAOyWU6l8qUR6y_DAyPaIme5oQgrHKp4LYDN1l9wthXZYuw"}'
const jwt1 = createHasuraJwtClaim({userId:'abc',admin:false,userName:'Dung'})
console.log(jwt.sign(jwt1, 'anx0bMh8q2ZmVrpQEEFVbRSFjj8LHhJGrdTFJNyDGqRT9KvKmWhWXaO-HSh3-8NJBL3lLb_y-ZxJ9ip6H-rNe1x3Wrx4VVG9YAPyp1XogMdTs1C_jr6kxH2g9I_GTBzhsccJUh3XlD0ZRNmUqPNUevNp5ugzQSm_yBhDbAwtn-kv0BQ9OPURgHXuE4n7oK2AMImTQynKY4NcxHlPTL2w9oWug0D-gDTi15Q_RLsX3RFlAlR9fGBnIt_3807lBX4JWHQDU8F_qMpTQekvEDp3oWCehFfAdgupeAY-ARMHAOyWU6l8qUR6y_DAyPaIme5oQgrHKp4LYDN1l9wthXZYuw'))
