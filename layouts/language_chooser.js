import { Radio } from 'antd';
import {connect} from 'react-redux'
const RolesChooser = ({language, setLanguage, supportedLanguages}) => {
  const radios = supportedLanguages.map((item,index) => {
    return (
      <Radio.Button key={`language-${index}`} value={item}>{item}</Radio.Button>
    )
  })
  return (
    <Radio.Group 
      defaultValue={language} 
      buttonStyle="solid"
      onChange={(e) => setLanguage(e.target.value)}
    >
      {radios}
    </Radio.Group>
  )
}

export default connect(
  state => ({
    language: state.i18n.language,
    supportedLanguages: state.i18n.supportedLanguages
  }),
  dispatch => ({
    setLanguage: dispatch.i18n.setLanguage
  })
)(RolesChooser)