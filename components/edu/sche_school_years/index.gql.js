import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_school_years_fragment on sche_school_years {
  key:id
  id
  school_year_name
  from_year
  to_year
}
`

export const query = gql`
query{
sche_school_years{
  ...sche_school_years_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_school_years{
  ...sche_school_years_fragment
}
}
${fragment}
`

export default query
