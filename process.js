const secret_key = process.env.SECRET_KEY
const table = process.env.TABLE
const endpoint = 'https://edu-1.herokuapp.com/v1alpha1/graphql'
const {inspect} = require('util')
const roles = [
  "anonymous",
  "user",
  "manager"
]

const graphqlQuery = table => `
query {
  query:__type(name: ${table}) {
    columns:fields {
      name
      type {
        name
      }
    }
  }
  update:__type(name: "${table}_set_input") {
    columns:inputFields {
      name
      type {
        name
      }
    }
  }
  insert:__type(name: "${table}_insert_input") {
    columns:inputFields {
      name
      type {
        name
      }
    }
  }
}
`
console.log(secret_key)
const { query } = require('graphqurl')
const headers = role => ({
  'Content-Type': 'application/json',
  'X-Hasura-Access-Key': secret_key,
  'X-Hasura-Role': role
})

async function test() {
  const t = await Promise.all(roles.map(async role => {
    try {
      const {data} = await query({
        query: graphqlQuery(table),
        endpoint,
        headers: headers(role)
      })
    
      return {
        [role]: {
          query: data.query.columns.map(it => it.name),
          update: data.update.columns.map(it => it.name),
          insert: data.insert.columns.map(it => it.name)
        }
      }
    } catch (err) {
      console.log(inspect(err))
    }
    return null
  }))
  console.log(inspect(t))
}
test()
