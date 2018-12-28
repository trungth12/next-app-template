import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_weeks_fragment on sche_weeks {
  key:id
  id
  week
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
sche_weeks{
  ...sche_weeks_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_weeks{
  ...sche_weeks_fragment
}
}
${fragment}
`

export default query
