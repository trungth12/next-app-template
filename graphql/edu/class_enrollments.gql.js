import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_class_enrollments_fragment on sche_class_enrollments {
  key:id
  id
  status
  student:scheStudentsBystudentId{
    first_name
    middle_name
    last_name
  }
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
sche_class_enrollments{
  ...sche_class_enrollments_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_class_enrollments{
  ...sche_class_enrollments_fragment
}
}
${fragment}
`

export default query
