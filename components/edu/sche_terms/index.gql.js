import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_terms_fragment on sche_terms {
  key:id
  id
  semester:scheSemestersBysemesterId{
    id
    is_holiday
    semester_name
  }
  start_date
  end_date
}
`

export const query = gql`
query{
sche_terms{
  ...sche_terms_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_terms{
  ...sche_terms_fragment
}
}
${fragment}
`

export default query
