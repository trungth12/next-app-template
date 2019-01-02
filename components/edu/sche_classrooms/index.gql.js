import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_classrooms_fragment on sche_classrooms {
  key:id
  id
  classroom_name
  amount
  building
  floor
  url_camera
  classes:scheClassessByclassroomId{
    class_name
    is_skill
    ages:scheAgesByageId{
      age_name
    }
  }
}
`

export const query = gql`
query{
sche_classrooms{
  ...sche_classrooms_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_classrooms{
  ...sche_classrooms_fragment
}
}
${fragment}
`

export default query
