import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_class_teachers_fragment on sche_class_teachers {
  key:id
  id
  user_id  
  class:scheClassesByclassId{
    class_name
    classroom:scheClassroomsByclassroomId{
      classroom_name
      building
      floor
    }
    age:scheAgesByageId{
      age_name
      is_active      
    }
  }
}
`

export const query = gql`
query{
sche_class_teachers{
  ...sche_class_teachers_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_class_teachers{
  ...sche_class_teachers_fragment
}
}
${fragment}
`

export default query
