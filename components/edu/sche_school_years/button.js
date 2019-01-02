import { Button } from 'antd'
import {connect} from 'react-redux'

const LoadingButton = ({loading, dispatch, ...rest}) => {
  if (loading) {
    return <Button disabled {...rest} />
  } else {
    return <Button {...rest} />
  }
}

export default connect(
  state => ({loading: state.layouts.loading})
)(LoadingButton)
