import withStore from 'next-app-store/lib/with-store'
import agesQuery from '../graphql/ages.gql'
import classesQuery from '../graphql/classes.gql'
import Ages from '../components/ages'
import Classes from '../components/classes'
import Link from 'next/link'

const Page = () => {
  return (
    <div>
      <Link href="/about">About</Link>
      <Ages />
      <Classes />
    </div>
  )
}

Page.getInitialConfig = async (ctx) => ({
  redux: 'REDUX_STORE_INDEX',
  apollo: {
    edu: 'edu-1.herokuapp.com/v1alpha1/graphql'
  }
})
Page.getInitialStore = (ctx) => ({
  test: {
    data: 'Hello World 1',
    changeText: (state, payload) => {
      state.data = 'Leuleu'
    }
  }
})

Page.getInitialApolloState = async ({apolloClients, fetchPolicy}) => {   
  return Promise.all([
    apolloClients.edu.query({query: agesQuery, fetchPolicy }),
    apolloClients.edu.query({query: classesQuery, fetchPolicy }),
  ])
}
export default withStore(Page)

