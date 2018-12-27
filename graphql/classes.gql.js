import gql from 'graphql-tag'

export const fragment = gql`
fragment sche_classes_fragment on sche_classes {
  key:id
  id
  class_name
  is_skill
}
`

export const query = gql`
query{
sche_classes{
  ...sche_classes_fragment
}
}
${fragment}
`


export const subscription = gql`
subscription{
sche_classes{
  ...sche_classes_fragment
}
}
${fragment}
`

export default query
