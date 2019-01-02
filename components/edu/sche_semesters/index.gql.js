import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_semesters_fragment on sche_semesters {
  key:id
  id
  semester_name
  school_year:scheSchoolYearsByschoolYearId{
    key:id
    id
    from_year
    school_year_name
  }
  start_date
  to_date
}
`

export const query = gql`
query{
sche_semesters{
  ...sche_semesters_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_semesters{
  ...sche_semesters_fragment
}
}
${fragment}
`

export default query
