import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_class_attendances_fragment on sche_class_attendances {
  key:id
  id
  is_check_in
  is_check_out
  check_in_at
  check_out_at
  date_attendance  
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
sche_class_attendances{
  ...sche_class_attendances_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_class_attendances{
  ...sche_class_attendances_fragment
}
}
${fragment}
`

export default query
