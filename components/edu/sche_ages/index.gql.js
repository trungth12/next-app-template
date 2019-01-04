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
/*
{
  "age_name": "Test 1",
  "from_month": 2,
  "to_month": 4,
  "is_active": false
}
*/
export const createAgesMutation = gql`
mutation createAges(
  $age_name:String,
  $from_month:Int,
  $to_month:Int,
){
  insert_sche_ages(
    objects:{
      age_name:$age_name,
      from_month:$from_month,
      to_month:$to_month,
    }
  ){
    affected_rows
    returning{
      id
    }
  }
}
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
