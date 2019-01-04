import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_students_fragment on sche_students {
  key:id
  id
  first_name
  last_name
  code
  gender
  middle_name  
  birth_of_date
}
`

export const query = gql`
query{
sche_students{
  ...sche_students_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_students{
  ...sche_students_fragment
}
}
${fragment}
`

export default query
