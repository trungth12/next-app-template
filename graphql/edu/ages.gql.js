import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_ages_fragment on sche_ages {
  key:id
  id
  age_name
  from_month
  to_month
}
`

export const query = gql`
query{
sche_ages{
  ...sche_ages_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_ages{
  ...sche_ages_fragment
}
}
${fragment}
`

export default query
